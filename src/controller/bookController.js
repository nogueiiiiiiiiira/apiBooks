
const addBook = require('../service/bookService');

const books = [];

function getBooks(req, res) {
    
}

function getBook(req, res) {
    const { bookId } = req.params;
    const result = books.find((b) => b.id == bookId);
    if (result) {
        return res.send(result);
    }
    return res.sendStatus(204);
}

async function postBook(req, res) {
    var {nome, descricao, autor, valor, categoria} = req.body;
    console.log(nome, descricao, autor, valor, categoria);
    var result = await addBook(nome, descricao, autor, valor, categoria);
    if(result){
        return res.send(result).sendStatus(201);
    }
    return res.send({message: 'Erro ao adicionar o livro!'})
}

module.exports = {
    getBooks,
    getBook,
    postBook
};