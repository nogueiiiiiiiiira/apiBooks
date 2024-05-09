const {PrismaClient, Prisma} = require('@prisma/client');

const prisma = new PrismaClient();

    async function addBook(nome, descricao, autor, valor, categoria) {
         return await prisma.book.create({
            data:{
                nome: nome,
                descricao: descricao,
                autor: autor,
                valor: valor,
                categoria: categoria,
            }
        });

    }
    
module.exports = addBook;