//routes

const express = require('express');
const {
    getBooks,
    getBookById,
    getBookByName,
    postBook,
    updateBook,
    deleteBook
} = require('./bookController.js');

const router = express.Router();

router.get('/books', getBooks);
router.get('/book/:bookId', getBookById);
router.get('/bookByName/:nome', getBookByName); // Alterado de bookName para nome
router.post('/book', postBook);
router.put('/book/:bookId', updateBook);
router.delete('/book/:bookId', deleteBook);

module.exports = router;
