//loanService

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addLoan(cpf, title, dataEmp, dataDev) {
    return await prisma.loan.create({
        data: {
            cpf,
            title,
            dataEmp,
            dataDev,
        }
    });
}

async function listLoans() {
    return await prisma.loan.findMany();
}

async function listLoanBySearch(search) {
    return await prisma.loan.findMany({
        where: {
            OR: [
                {
                    id: isNaN(search) ? undefined : Number(search) // Convertendo para número apenas se `search` for um número válido
                },
                {
                    title: {
                        contains: search
                    }
                },
                {
                    cpf: {
                        contains: search
                    }
                }
            ]
        }
    });
}

async function updateLoanService(id, cpf, title) {
    return await prisma.loan.update({
        where: {
            id: Number(id)
        },
        data: {
            cpf,
            title,
        }
    });
}

async function deleteLoanService(id) {
    return await prisma.loan.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    addLoan,
    listLoans,
    listLoanBySearch,
    updateLoanService,
    deleteLoanService
};
