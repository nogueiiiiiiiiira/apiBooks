const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cpfExists(cpf) {
    const librariansCPF = await prisma.librarian.findMany({
      where: {
        cpf: {
          equals: cpf,
        },
      },
    });
    return librariansCPF.length > 0;
  }

  async function emailExists(email) {
    const librariansEmail = await prisma.librarian.findMany({
      where: {
        email: {
          equals: email,
        },
      },
    });
    return librariansEmail.length > 0;
  }

  async function telefoneExists(telefone) {
    const librariansTelefone = await prisma.librarian.findMany({
      where: {
        telefone: {
          equals: telefone,
        },
      },
    });
    return librariansTelefone.length > 0;
  }

  async function addLibrarian(nome, cpf, email, telefone, dataNasc, senha) {
    if (await cpfExists(cpf)) {
      throw new Error('CPF já existe!');
    }
    if (await emailExists(email)) {
      throw new Error('Email já existe!');
    }
    if (await telefoneExists(telefone)) {
      throw new Error('Telefone já existe!');
    }
  
    return await prisma.librarian.create({
      data: {
        nome,
        cpf,
        email,
        telefone,
        dataNasc,
        senha,
      },
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