const addBook = require("../service/bookService");

const books = [];

function getBooks(req, res) {
    if (books.length > 0) {
        return res.send(books);
    }
    return res.sendStatus(204);
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
    var {nome,descricao,autor,valor,categoria} = req.body;
    if(result = await addBook(nome,descricao,autor,valor,categoria)){
        return res.send(result).sendStatus(201)
    }
    return res.send({ message: 'Erro ao adicionar o Livro.'}).sendStatus(400);
}

module.exports = {
    getBooks,
    getBook,
    postBook
};
