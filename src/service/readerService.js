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

async function listReaderBySearch(search) {
    return await prisma.reader.findMany({
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
            ]
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
    listReaderBySearch,
    updateReaderService,
    deleteReaderService
};
