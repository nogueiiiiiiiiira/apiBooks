//loanService

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//verificar se o cpf de leitor existe
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

  //verificar se o id do livro existe
  async function idExists(idLivro) {
    const book = await prisma.book.findUnique({
        where: {
            id: Number(idLivro)
        }
    });

    return book !== null && book !== undefined;
}

//realizar um empréstimo
async function addLoan(cpf, idLivro, dataEmp, dataDev) {
  
    if (!await cpfExists(cpf)) {
        throw new Error('CPF não foi encontrado no banco de dados. Não foi possível realizar o empréstimo');
    }

    if (!await idExists(idLivro)) {
        throw new Error('Livro não foi encontrado no banco de dados. Não foi possível realizar o empréstimo');
    }

    const hasStock = await updateStock(idLivro);
    if (!hasStock) {
        throw new Error('Não há estoque suficiente para realizar o empréstimo');
    }

    return await prisma.loan.create({
        data: {
            cpf,
            idLivro,
            dataEmp,
            dataDev,
        },
    });
}

//atualizar o estoque de livros quando o mesmo for emprestado
async function updateStock(idLivro) {
    const existingBook = await prisma.book.findUnique({
        where: {
            id: Number(idLivro)
        }
    });

    if (!existingBook) {
        throw new Error('Livro não encontrado.');
    }

    const currentStock = parseInt(existingBook.estoque);

    if (currentStock <= 0) {
        return false; 
    }

    const updatedStock = currentStock - 1;
    await prisma.book.update({
        where: {
            id: Number(existingBook.id)
        },
        data: {
            estoque: updatedStock.toString()
        }
    });

    return true; 
}


//buscar todos os empréstimos
async function listLoans() {
    return await prisma.loan.findMany();
}

//buscar empréstimo por id
async function listLoanById(id) {
  return await prisma.loan.findUnique({
      where: {
          id: Number(id)
      }
  });
} 

//buscar empréstimo por cpf ou idLivro
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

//atualizar os dados do empréstimo
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

//excluir o empréstimo
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