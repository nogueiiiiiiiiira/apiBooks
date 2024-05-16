//loanService

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cpfExists(cpf) {
    const readers = await prisma.reader.findMany({
      where: {
        cpf: {
          equals: cpf,
        },
      },
    });
    return readers.length > 0;
  }

  async function titleExists(title) {
    const books = await prisma.book.findMany({
      where: {
        nome: {
          equals: title,
        },
      },
    });
  
    return books.length > 0;
  }

  async function addLoan(cpf, title, dataEmp, dataDev, res) {
    if (!await cpfExists(cpf)) {
      return res.status(400).json({ message: 'CPF não foi encontrado no banco de dados. Não foi possível realizar o empréstimo' });
    }
  
    if (!await titleExists(title)) {
      return res.status(400).json({ message: 'Título não foi encontrado no banco de dados. Não foi possível realizar o empréstimo' });
    }
  
    // Find the book by title and update its stock
    const book = await prisma.book.findUnique({
      where: {
        nome: title,
      },
    });
  
    if (!book) {
      return res.status(400).json({ message: 'Livro não encontrado no banco de dados. Não foi possível realizar o empréstimo' });
    }
  
    if (book.stock <= 0) {
      return res.status(400).json({ message: 'Não há estoque suficiente para realizar o empréstimo' });
    }
  
    // Decrease the stock by 1
    const updatedBook = await prisma.book.update({
      where: {
        id: book.id,
      },
      data: {
        estoque: book.estoque - 1,
      },
    });
  
    // Create the loan
    return await prisma.loan.create({
      data: {
        cpf,
        title,
        dataEmp,
        dataDev,
      },
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
