//bookService

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addBook(nome, descricao, autor, valor, categoria) {
    return await prisma.book.create({
        data: {
            nome,
            descricao,
            autor,
            valor,
            categoria,
        }
    });
}

async function listBooks() {
    return await prisma.book.findMany();
}

async function listBookById(id) {
    return await prisma.book.findUnique({
        where: {
            id: Number(id)
        }
    });
}

async function listBookByName(nome) {
    return await prisma.book.findMany({
        where: {
            nome: {
                contains: nome
            }
        }
    });
}

async function updateBookService(id, nome, descricao, autor, valor, categoria) {
    return await prisma.book.update({
        where: {
            id: Number(id)
        },
        data: {
            nome,
            descricao,
            autor,
            valor,
            categoria,
        }
    });
}

async function deleteBookService(id) {
    return await prisma.book.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    addBook,
    listBooks,
    listBookById,
    listBookByName,
    updateBookService,
    deleteBookService
};
