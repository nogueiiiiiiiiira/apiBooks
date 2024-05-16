const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addLibrarian(nome, cpf, email, telefone, dataNasc, senha) {
    return await prisma.librarian.create({
        data: {
            nome,
            cpf,
            email,
            telefone,
            dataNasc,
            senha,
        }
    });
}

async function listLibrarians() {
    return await prisma.librarian.findMany();
}

async function listLibrarianBySearch(search) {
    return await prisma.librarian.findMany({
        where: {
            OR: [
                {
                    id: isNaN(search) ? undefined : Number(search) // Convertendo para número apenas se `search` for um número válido
                },
                {
                    cpf: {
                        contains: search
                    }
                },
                {
                    email: {
                        contains: search
                    }
                },
                {
                    telefone: {
                        contains: search
                    }
                },
                {
                    senha: {
                        contains: search
                    }
                }
            ]
        }
    });
}

async function updateLibrarianService(id, nome, cpf, email, telefone, dataNasc, senha) {
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
            senha,
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
    listLibrarianBySearch,
    updateLibrarianService,
    deleteLibrarianService
};