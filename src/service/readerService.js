const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//verificar se o cpf existe
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

//adicionar um leitor
async function addReader(nome, cpf, email, telefone, dataNasc, criadoEm) {

    if (await cpfExists(cpf)) {
        throw new Error('CPF já existe!');
      }
      if (await emailExists(email)) {
        throw new Error('Email já existe!');
      }
      if (await telefoneExists(telefone)) {
        throw new Error('Telefone já existe!');
      }

    return await prisma.reader.create({
        data: {
            nome,
            cpf,
            email,
            telefone,
            dataNasc,
            criadoEm,
        }
    })
}

//listar todos os leitores
async function listReaders() {
    return await prisma.reader.findMany();
}

//listar um leitor por id
async function listReaderById(id) {
    return await prisma.reader.findUnique({
        where: {
            id: Number(id)
        }
    });
}

//listar um leitor por cpf, email, telefone, etc...
async function listReaderBySearch(search) {
    return await prisma.reader.findMany({
        where: {
            OR: [
                {
                    id: isNaN(search) ? undefined : Number(search) 
                },
                {
                  nome: {
                    contains: search
                  }
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

//atualizar os dados de um leitor
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

//deletar um leitor
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
    deleteReaderService,
    listReaderById
};
