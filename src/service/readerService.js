const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addReader(nome, cpf, email, telefone, dataNasc) {
    return await prisma.reader.create({
        data: {
            nome,
            cpf,
            email,
            telefone,
            dataNasc,
        }
    })
}

async function listReaders() {
    return await prisma.reader.findMany();
}

async function listReaderById(id) {
    return await prisma.reader.findUnique({
        where: {
            id: Number(id)
        }
    });
}

async function listReaderByName(nome) {
    return await prisma.reader.findMany({
        where: {
            nome: {
                contains: nome
            }
        }
    });
}

async function updateReaderService(id, nome, cpf, email, telefone, dataNasc) {
    return await prisma.reader.update({
        where: {
            id: Number(id)
        },
        data: {
            nome,
            cpf,
            email,
            telefone,
            dataNasc,
        }
    });
}

async function deleteReaderService(id) {
    return await prisma.reader.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    addReader,
    listReaders,
    listReaderById,
    listReaderByName,
    updateReaderService,
    deleteReaderService
};
