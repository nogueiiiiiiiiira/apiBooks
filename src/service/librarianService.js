const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//verificar se o cpf já existe
async function cpfExists(cpf) {
    const librariansCPF = await prisma.librarian.findMany({
      where: {
        cpf: {
          equals: cpf,
        },
      },
    });

    const readersCPF = await prisma.reader.findMany({ 
      where: {
        cpf: {
          equals: cpf,
        },
      },
    })

    return librariansCPF.length > 0 || readersCPF.length > 0;
  }

  //verificar se o email já existe
  async function emailExists(email) {
    const librariansEmail = await prisma.librarian.findMany({
      where: {
        email: {
          equals: email,
        },
      },
    });

    const readersEmail = await prisma.reader.findMany({
      where: {
        email: {
          equals: email,
        },
      },
    });

    return librariansEmail.length > 0 || readersEmail.length > 0;
  }

  //verificar se o telefone já existe
  async function telefoneExists(telefone) {
    const librariansTelefone = await prisma.librarian.findMany({
      where: {
        telefone: {
          equals: telefone,
        },
      },
    });

    const readersTelefone = await prisma.reader.findMany({
      where: {
        telefone: {
          equals: telefone,
        },
      },
    });
    return librariansTelefone.length > 0 || readersTelefone.length > 0;
  }

  //adicionar um novo bibliotecário ao banco de dados
  async function addLibrarian(nome, cpf, email, telefone, dataNasc, senha, criadoEm) {
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
        criadoEm,
      },
    });
  }

  //buscar todos os bibliotecários
async function listLibrarians() {
    return await prisma.librarian.findMany();
}

//buscar biblitocarios por id
async function listLibrarianById(id) {
  return await prisma.Librarian.findUnique({
      where: {
        id: isNaN(id) ? undefined : Number(id) 
      }
  });
}

//buscar bibliotecarios por id, cpf, email, etc...
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

//atualizar os dados de um bibliotecário
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


// deletar um bibliotecário
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
    deleteLibrarianService,
    listLibrarianById,
    
};