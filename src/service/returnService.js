//returnService

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//verificar se o cpf do leitor existe nos empréstimos
async function cpfExists(cpf) {
    const readers = await prisma.loan.findMany({
      where: {
        cpf: {
          equals: cpf,
        },
      },
    });

    return readers.length > 0;
}

//verificar se o id do livro existe nos empréstimos
async function idExists(idLivro) {
    const book = await prisma.book.findUnique({
      where: {
        id: Number(idLivro)
      }
    });
  
    return !!book;
  }
  
//realizar uma devolução
async function addReturn(cpf, idLivro, prevDev, dataAtual, multaAtribuida){

    if(!await cpfExists(cpf)){
        throw new Error('CPF não existe! Não foi possível realizar a devolução');
    }

    if(!await idExists(idLivro)){
        throw new Error('Livro não existe! Não foi possível realizar a devolução');
    }

    return await prisma.return.create({
        data: {
            cpf,
            idLivro,
            prevDev,
            dataAtual,
            multaAtribuida,
        }
    });
}

//atualizar o estoque do livro após a devolução
async function updateStock(idLivro) {
    const existingBook = await prisma.book.findUnique({
      where: {
        id: Number(idLivro)
      }
    });
  
    if (!existingBook) {
      throw new Error('Livro não encontrado!');
    }
  
    const currentStock = parseInt(existingBook.estoque);
    const updatedStock = currentStock + 1;
    await prisma.book.update({
      where: {
        id: existingBook.id
      },
      data: {
        estoque: updatedStock.toString()
      }
    });
  }

//buscar todos as devolucoes
async function listReturns() {
    return await prisma.return.findMany();
}

//buscar as devoluções por id
async function listReturnById(id) {
    return await prisma.return.findUnique({
        where: {
            id: Number(id)
        }
    });
}

//buscar as devoluções por id, idLivro e cpf

async function listReturnBySearch(search) {
  if (typeof search !== 'string') {
    return [];
  }

  return await prisma.return.findMany({
    where: {
      OR: [
        {
          id: isNaN(search)? undefined : Number(search)
        },
        {
          idLivro: Number(search)
        },
        {
          cpf: {
            contains: search
          }
        }
      ]
    }
  });
}

//atualizar a devolucao
async function updateReturnService(id, cpf, idLivro) {
    return await prisma.return.update({
        where: {
            id: Number(id)
        },
        data: {
            cpf,
            idLivro
        }
    });
}

//excluir a devolucao
async function deleteReturnService(id){
    return await prisma.return.delete({
        where: {
            id: Number(id)
        }
    });
}

//atribuir multa
async function addFine(cpf, idLivro, diasAtra, total, statusPag, criadoEm){
    return await prisma.fine.create({
      data: {
        cpf,
        idLivro,
        diasAtra,
        total,
        statusPag,
        criadoEm,
      }
    });
}

module.exports = {
    addReturn,
    listReturns,
    listReturnById,
    listReturnBySearch,
    updateReturnService,
    deleteReturnService,
    updateStock,
    addFine,
};
