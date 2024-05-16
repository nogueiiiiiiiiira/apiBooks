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

async function listBookBySearch(search) {
    return await prisma.book.findMany({
        where: {
            OR: [
                {
                    id: Number(search)
                },
                {
                    nome: {
                        contains: search
                    }
                },
                {
                    descricao: {
                        contains: search
                    }
                },
                {
                    autor: {
                        contains: search
                    }
                },
                {
                    valor: {
                        contains: search
                    }
                },
                {
                    categoria: {
                        contains: search
                    }
                }
            ]
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
    listBookBySearch,
    updateBookService,
    deleteBookService
};
