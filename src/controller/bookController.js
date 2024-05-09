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

function postBook(req, res) {
    var body = req.body;
    var existe = books.find((b) => b.id == body.id);
    if (existe) {
       return res.send({ message: "Id já utilizado." });
    }

    books.push(body);
    res.send(body).sendStatus(201);
}

module.exports = {
    getBooks,
    getBook,
    postBook
};