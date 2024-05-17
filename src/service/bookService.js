const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function bookExists(title, autor, categoria) {
    const books = await prisma.book.findMany({
        where: {
            AND: [
                {
                    nome: {
                        equals: title
                    }
                },
                {
                    autor: {
                        equals: autor
                    }
                },
                {
                    categoria: {
                        equals: categoria
                    }
                }
            ]
    
            }
        });

        return books.length > 0;
    }

    async function updateStock(nome, autor, categoria, quantidade) {
        const existingBook = await prisma.book.findFirst({
            where: {
                AND: [
                    { nome: { equals: nome } },
                    { autor: { equals: autor } },
                    { categoria: { equals: categoria } }
                ]
            }
        });
    
        if (!existingBook) {
            throw new Error('Livro não encontrado.');
        }
    
        const currentStock = parseInt(existingBook.estoque); 
        const updatedStock = currentStock + parseInt(quantidade); 
        await prisma.book.update({
            where: {
                id: existingBook.id
            },
            data: {
                estoque: updatedStock.toString()
            }
        }); 
    }
    
    async function addBook(nome, descricao, autor, valor, categoria, estoque) {

        if(await bookExists(nome, autor, categoria)){
            throw new Error('Esse livro já existe! Livro adicionado ao estoque!');
        }
    
        return await prisma.book.create({
            data: {
                nome,
                descricao,
                autor,
                valor,
                categoria,
                estoque,
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

async function updateBookService(id, nome, descricao, autor, valor, categoria, estoque) {
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
            estoque,
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
    deleteBookService,
    updateStock,
    listBookById
};
