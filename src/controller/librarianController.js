const {
    addLibrarian,
    listLibrarians,
    listLibrarianById,
    listLibrarianBySearch,
    updateLibrarianService,
    deleteLibrarianService
} = require("../service/librarianService");


async function getLibrarians(req, res) {
    const librarians = await listLibrarians();
    if (librarians.length > 0) {
        return res.status(200).json(librarians);
    }
    return res.status(204).send();
}

async function getLibrarianBySearch(req, res) {
    const { librarianSearch } = req.params;
    if (!librarianSearch) {
        return res.status(400).json({ message: 'Inserção é obrigatório.' });
    }
    const result = await listLibrarianBySearch(librarianSearch);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nada foi encontrado.' });
}

async function postLibrarian(req, res) {
    const { nome, cpf, email, telefone, dataNasc, senha } = req.body;
  
    const dateParts = dataNasc.split('/');
    if (dateParts.length !== 3) {
      return res.status(400).json({ message: 'Formato de data inválido. Use o formato DD/MM/YYYY.' });
    }
  
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const year = parseInt(dateParts[2]);
  
    const isValidDate = !isNaN(day) && !isNaN(month) && !isNaN(year);
    if (!isValidDate) {
      return res.status(400).json({ message: 'Data de nascimento inválida.' });
    }
  
    const birthDate = new Date(year, month, day);
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({ message: 'Data de nascimento inválida.' });
    }
  
    const isoDate = birthDate.toISOString();
    const criadoEm = new Date();
  
    try {
      await addLibrarian(nome, cpf, email, telefone, isoDate, senha, criadoEm);
      return res.status(201).json({ message: 'Bibliotecário adicionado com sucesso.' });
    } catch (error) {
      console.error('Erro ao adicionar bibliotecário:', error);
      if (error.message === 'CPF já existe!') {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === 'Email já existe!') {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === 'Telefone já existe!') {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro ao adicionar bibliotecário.' });
    }
  }
  
async function updateLibrarian(req, res) {
    const { nome, cpf, email, telefone, dataNasc, senha } = req.body;
    const { librarianId } = req.params;  
    if (!nome || !cpf || !email || !telefone || !dataNasc || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const existingLibrarian = await listLibrariansById(bookId);
        if (!existingLibrarian) {
            return res.status(404).json({ message: 'Bibliotecário não encontrado.' });
        }      
        const updateLibrarian = await updateLibrarianService(librarianId, nome, cpf, email, telefone, dataNasc, senha);
        return res.status(200).json(updateLibrarian);
    } catch (error) {
        console.error('Erro ao atualizar bibliotecário:', error);
        return res.status(500).json({ message: 'Erro ao atualizar bibliotecário.' });
    }
}

async function deleteLibrarian(req, res) {
    const { librarianId } = req.params;
    try {
        const existingLibrarian = await listLibrarianById(librarianId);
        if (!existingLibrarian) {
            return res.status(404).json({ message: 'Bibliotecário não encontrado.' });
        }
        await deleteLibrarianService(librarianId);
        return res.status(200).json({ message: 'Bibliotecário excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir bibliotecário:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    getLibrarians,
    getLibrarianBySearch,
    postLibrarian,
    updateLibrarian,
    deleteLibrarian
};