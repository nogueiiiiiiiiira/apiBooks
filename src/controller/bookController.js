export function getBooks(req, res) {
    if(books){
        return res.send(books);
    }

    return res.sendStatus(204);
}

export function getBook(req, res) {
    const {bookId} = req.params;
    console.log(bookId);
    var result = books.find((b) => b.id == bookId)

    if(result){
        return res.send(result);
    }

    return res.sendStatus(204);
}

export function postBook(req, res) {
    var body = req.body;
    var existe = books.find((b) => b.id == body.id);
    if(existe){
        return res.send({message: "ID já se encontra utilizado!"})
    }

    books.push(body);
    res.send(body).sendStatus(201);
}