const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addHistoric(acao, criadoEm){
    return await prisma.historic.create({
        data: {
            acao,
            criadoEm,
        }
    })
}

module.exports = {
    addHistoric
}