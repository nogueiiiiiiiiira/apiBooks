const {
    addReader,
    listReaders,
    listReaderById,
    listReaderByName,
    updateReaderService,
    deleteReaderService
} = require("../service/readerService");

async function getReaders(req, res) {
    const readers = await listReaders();
    if (readers.length > 0) {
        return res.status(200).json(readers);
    }
    return res.status(204).send();
} //OK

async function getReaderById(req, res) {
    const { readerId } = req.params;
    if (!readerId) {
        return res.status(400).json({ message: 'ID é obrigatório'});
    }
    const result = await listReaderById(readerId);
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(204).send();
} //OK

async function getReaderByName(req, res) {
    const { readerName } = req.params;
    if (!readerName) {
        return res.status(400).json({ message: 'Nome do leitor é obrigatório'});
    }
    const result = await listReaderByName(readerName);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nenhum leitor com este nome foi encontrado'});
} //OK


async function postReader(req, res) {
    const { nome, cpf, email, telefone, dataNasc} = req.body;
    const dateParts = dataNasc.split('/');
    if (dateParts.length !== 3) {
        return res.status(400).json({ message: 'Formato de data inválido. Use o formato DD/MM/YYYY.' });
    }
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const year = parseInt(dateParts[2]);

    const isValidDate = !isNaN(day) && !isNaN(month) && !isNaN(year);
    if (!isValidDate) {
        return res.status(400).json({ message: 'Data de nascimento inválida'});
    }

    const birthDate = new Date(year, month, day);
    if (isNaN(birthDate.getTime())) {
        return res.status(400).json({ message: 'Data de nascimento inválida.' });
    }
    const isoDate = birthDate.toISOString();

    try {
        const result = await addReader(nome, cpf, email, telefone, isoDate);
        return res.status(201).json({ message: 'Leitor adicionado com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar Leitor:', error);
        return res.status(500).json({ message: 'Erro ao adicionar Leitor.' });
    }
} //OK

async function updateReader(req, res) {
    const { nome, cpf, email, telefone, dataNasc } = req.body;
    const { readerId } = req.params;
    if (!nome || !cpf || !email || !telefone || !dataNasc) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const existingReader = await listReaderById(readerId);
        if (!existingReader) {
            return res.status(404).json({ message: 'Leitor não encontrado.' });
        }
        const birthDate = new Date(dataNasc);
        const isoDate = birthDate.toISOString();
        const updateReader = await updateReaderService(readerId, nome, cpf, email, telefone, isoDate);
        return res.status(200).json(updateReader);
    } catch (error) {
        console.error('Erro ao atualizar leitor:', error);
        return res.status(500).json({ message: 'Erro ao atualizar leitor'})
    }
} //OK

async function deleteReader(req, res) {
    const { readerId } = req.params;
    try {
        const existingReader = await listReaderById(readerId);
        if (!existingReader) {
            return res.status(404).json({ message: 'Leitor não encontrado.' });
        }
        await deleteReaderService(readerId);
        return res.status(200).json({ message: 'Leitor excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir leitor:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
} //OK

module.exports = {
    getReaders,
    getReaderById,
    getReaderByName,
    postReader,
    updateReader,
    deleteReader
};
