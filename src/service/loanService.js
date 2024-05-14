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

async function listLoanById(id) {
    return await prisma.loan.findUnique({
        where: {
            id: Number(id)
        }
    });
}

async function listLoanByCPF(cpf) {
    return await prisma.loan.findMany({
        where: {
            cpf: {
                contains: cpf
            }
        }
    });
}

async function listLoanByTitle(title) {
    return await prisma.loan.findMany({
        where: {
            title: {
                contains: title
            }
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
    listLoanById,
    listLoanByCPF,
    listLoanByTitle,
    updateLoanService,
    deleteLoanService
};
