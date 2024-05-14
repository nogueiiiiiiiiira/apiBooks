const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addLibrarian(nome, cpf, email, telefone, dataNasc) {
    return await prisma.librarian.create({
        data: {
            nome,
            cpf,
            email,
            telefone,
            dataNasc,
        }
    });
}

async function listLibrarians() {
    return await prisma.librarian.findMany();
}

async function listLibrarianById(id) {
    return await prisma.librarian.findUnique({
        where: {
            id: Number(id)
        }
    });
}

async function listLibrarianByName(nome) {
    return await prisma.librarian.findMany({
        where: {
            nome: {
                contains: nome
            }
        }
    });
}

async function updateLibrarianService(id, nome, cpf, email, telefone, dataNasc) {
    return await prisma.librarian.update({
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

async function deleteLibrarianService(id) {
    return await prisma.librarian.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    addLibrarian,
    listLibrarians,
    listLibrarianById,
    listLibrarianByName,
    updateLibrarianService,
    deleteLibrarianService
};