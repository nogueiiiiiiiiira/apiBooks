//returnController

const {
    addReturn,
    listReturns,
    listReturnById,
    listReturnBySearch,
    updateReturnService,
    deleteReturnService,
    updateStock,
    addFine
} = require("../service/returnService");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getReturns(req, res) {
    const returns = await listReturns();
    if (returns.length > 0) {
        return res.status(200).json(returns);
    }
    return res.status(204).send();
}

async function getReturnBySearch(req, res) {
    const { returnSearch } = req.params;
    if (!returnSearch) {
        return res.status(400).json({ message: 'Inserção é obrigatória.' });
    }
    const result = await listReturnBySearch(returnSearch);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(204).send();
}

async function postReturn(req, res) {
    const { cpf, idLivro } = req.body;
  
    if (!cpf || !idLivro) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
  
    try {
      const loan = await prisma.loan.findUnique({
        where: {
          id: Number(idLivro)
        }
      });
  
      if (!loan) {
        throw new Error('Livro não existe! Não foi possível realizar a devolução');
      }
  
      const prevDev = loan.dataDev;
      const dataAtual = new Date();
      const multaAtribuida = dataAtual > prevDev ? 'Sim' : 'Não';
  
      await addReturn(cpf, idLivro, prevDev, dataAtual, multaAtribuida);
      await updateStock(idLivro);

      if(multaAtribuida === 'Sim'){
        const diasAtra = dataAtual - prevDev;
        const total = diasAtra * 1;
        const statusPag = 'Não pago';
        const criadoEm = dataAtual;
        await addFine(cpf, idLivro, diasAtra, total, statusPag, criadoEm);
      }

      return res.status(201).json({ message: 'Devolução realizada com sucesso.' });

    } catch (error) {
        if (error.message.includes('CPF não existe')) {
            return res.status(400).json({ message: error.message });
         }

         if (error.message.includes('Livro não existe')) { 
            return res.status(400).json({ message: error.message });

          }
  
      return res.status(500).json({ message: 'Erro ao realizar a devolução.' });
    }
  }
  
  async function updateReturn(req, res) {
    const { cpf, idLivro } = req.body;
    const { returnId } = req.params;
  
    if (!cpf ||!idLivro) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
  
    if (!Number(returnId)) {
      return res.status(400).json({ message: 'ID de devolução inválido.' });
    }
  
    try {
      const existingReturn = await listReturnById(Number(returnId));
      if (!existingReturn) {
        return res.status(404).json({ message: 'Devolução não encontrada.' });
      }
  
      const updateReturn = await updateReturnService(returnId, cpf, idLivro);
      return res.status(200).json(updateReturn);
    } catch (error) {
      console.error('Erro ao atualizar devolução:', error);
      return res.status(500).json({ message: 'Erro ao atualizar devolução.' });
    }
  }
  
  async function deleteReturn(req, res) {
    const { idReturn } = req.params;
  
    if (!Number(idReturn)) {
      return res.status(400).json({ message: 'ID de devolução inválido.' });
    }
  
    try {
      const existingReturn = await listReturnById(Number(idReturn));
      if (!existingReturn) {
        return res.status(404).json({ message: 'Devolução não encontrada.' });
      }
  
      await deleteReturnService(Number(idReturn));
      return res.status(200).json({ message: 'Devolução deletada com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar devolução:', error);
      return res.status(500).json({ message: 'Erro ao deletar devolução.' });
    }
  }

module.exports = {
    getReturns,
    getReturnBySearch,
    postReturn,
    updateReturn,
    deleteReturn
}