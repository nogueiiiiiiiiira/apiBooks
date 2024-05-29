const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

//verificar se o cpf do leitor existe nas multas
async function cpfExists(cpf) {
    const readers = await prisma.fine.findMany({
      where: {
        cpf: {
          equals: cpf,
        },
      },
    });

    return readers.length > 0;
}

//verificar se o id do livro existe nas multas
async function idExists(idLivro) {
    const book = await prisma.fine.findUnique({
      where: {
        idLivro: Number(idLivro)
      }
    });

    return book!== null;
}

//pagar a multa e atualizar o seu statusPag
async function payFine(cpf, idLivro, statusPag) {

    if (!await cpfExists(cpf)) {
        throw new Error('CPF não existe! Não foi possível pagar a multa');
      }
    
      if (!await idExists(idLivro)) {
        throw new Error('Livro não existe! Não foi possível pagar a multa');
      }
      return await prisma.fine.update({
          where: {
            AND: [
              { cpf: { equals: cpf } },
              { idLivro: { equals: idLivro }}
            ]
          },
          
          data: {
            statusPag: 'Multa Paga'
          }
        });
      }

//listar todas as multas
async function listFines() {
    return await prisma.fine.findMany();
}

//buscar multa pelo id
async function listFineById(id) {
    return await prisma.fine.findUnique({
        where: {
            id: Number(id)
        }
    });
}

//buscar multa por id, cpf, idLivro, status
async function listFineBySearch(search){
    return await prisma.fine.findMany({
        where: {
            OR: [
                {
                    id: isNaN(search) ? undefined : Number(search)
                },
                {
                    cpf: {
                        contais: search
                    }
                },
                {
                    idLivro: Number(search)
                },
                {
                    statusPag: {
                        contais: search
                    }
                }
            ]
        }
    });
}


//atualizar a multa
async function updateFineService(id, cpf, idLivro){
    return await prisma.fine.update({
        where: {
            id: Number(id)
        },
        data: {
            cpf,
            idLivro
        }
    });
}

//excluir a multa
async function deleteFineService(id){
    return await prisma.return.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    payFine,
    listFines,
    listFineById,
    listFineBySearch,
    updateFineService,
    deleteFineService
}