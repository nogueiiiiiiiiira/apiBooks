const {
    addLibrarian,
    listLibrarians,
    listLibrarianById,
    listLibrarianByName,
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

async function getLibrarianById(req, res) {
    const { librarianId } = req.params;
    if (!librarianId) {
        return res.status(400).json({ message: 'ID é obrigatório' });
    }
    const result = await listLibrarianById(librarianId);
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(204).send();
}

async function getLibrarianByName(req, res) {
    const { librarianName } = req.params;
    if (!librarianName) {
        return res.status(400).json({ message: 'Nome do bibliotecário é obrigatório.' });
    }
    const result = await listLibrarianByName(librarianName);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nenhum bibliotecário com este nome encontrado.' });
}

// Considerar usar biblioteca moment.js aqui
async function postLibrarian(req, res) {
    const { nome, cpf, email, telefone, dataNasc } = req.body;

    // Verifica se a data de nascimento está no formato esperado (DD/MM/YYYY)
    const dateParts = dataNasc.split('/');
    if (dateParts.length !== 3) {
        return res.status(400).json({ message: 'Formato de data inválido. Use o formato DD/MM/YYYY.' });
    }

    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const year = parseInt(dateParts[2]);

    // Verifica se os componentes da data formam uma data válida
    const isValidDate = !isNaN(day) && !isNaN(month) && !isNaN(year);
    if (!isValidDate) {
        return res.status(400).json({ message: 'Data de nascimento inválida.' });
    }

    // Cria um objeto Date e verifica se a data é válida
    const birthDate = new Date(year, month, day);
    if (isNaN(birthDate.getTime())) {
        return res.status(400).json({ message: 'Data de nascimento inválida.' });
    }

    // Formata a data de nascimento para o formato ISO-8601
    const isoDate = birthDate.toISOString();

    try {
        const result = await addLibrarian(nome, cpf, email, telefone, isoDate);
        return res.status(201).json({ message: 'Bibliotecário adicionado com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar bibliotecário:', error);
        return res.status(500).json({ message: 'Erro ao adicionar bibliotecário.' });
    }
}

async function updateLibrarian(req, res) {
    const { nome, cpf, email, telefone, dataNasc } = req.body;
    const { librarianId } = req.params;  
    if (!nome || !cpf || !email || !telefone || !dataNasc) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const existingLibrarian = await listLibrariansById(bookId);
        if (!existingLibrarian) {
            return res.status(404).json({ message: 'Bibliotecário não encontrado.' });
        }      
        const updateLibrarian = await updateLibrarianService(librarianId, nome, cpf, email, telefone, dataNasc);
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
    getLibrarianById,
    getLibrarianByName,
    postLibrarian,
    updateLibrarian,
    deleteLibrarian
};