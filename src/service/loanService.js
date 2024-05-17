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

  async function idExists(idLivro) {
    const books = await prisma.book.findMany({
      where: {
        id: Number(idLivro)
      }
    });
  
    return books.length > 0;
  }

  async function updateStock(idLivro, quantidade) {
    const existingBook = await prisma.book.findFirst({
      where: {
        id: Number(idLivro)
      }
    });
  
    if (!existingBook) {
      throw new Error('Livro não encontrado.');
    }
  
    const currentStock = parseInt(existingBook.estoque);
  
    if (currentStock <= 0) {
      throw new Error('Não há estoque suficiente para realizar o empréstimo');
    }
  
    const updatedStock = currentStock - quantidade;
    await prisma.book.update({
      where: {
        id: Number(existingBook.id)
      },
      data: {
        estoque: updatedStock.toString()
      }
    });
  }
async function addLoan(cpf, idLivro, dataEmp, dataDev) {
  if (!await cpfExists(cpf)) {
    throw new Error('CPF não foi encontrado no banco de dados. Não foi possível realizar o empréstimo');
  }

  if (!await idExists(idLivro)) {
    throw new Error('Livro não foi encontrado no banco de dados. Não foi possível realizar o empréstimo');
  }

  const book = await prisma.book.findUnique({
    where: {
      id: Number(idLivro),
    },
  });

  if (!book) {
    throw new Error('Livro não encontrado no banco de dados. Não foi possível realizar o empréstimo');
  }

  if (book.estoque <= 0) {
    throw new Error('Não há estoque suficiente para realizar o empréstimo');
  }

  await updateStock(idLivro, 1);

  return await prisma.loan.create({
    data: {
      cpf,
      idLivro,
      dataEmp,
      dataDev,
    },
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
} //OK

async function listLoanBySearch(search) {
    return await prisma.loan.findMany({
        where: {
            OR: [
                {
                    id: isNaN(search) ? undefined : Number(search)
                },
                {
                    idLivro: Number(search)
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

async function updateLoanService(id, cpf, idLivro) {
  return await prisma.loan.update({
      where: {
          id: Number(id)
      },
      data: {
          cpf,
          idLivro,
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
    deleteLoanService,
    listLoanById,
    updateStock
};
