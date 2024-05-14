const express = require('express');
const router = express.Router();

const {
    getBooks,
    getBookById,
    getBookByName,
    postBook,
    updateBook,
    deleteBook
} = require('./bookController.js');

router.get('/books', getBooks);
router.get('/book/:bookId', getBookById);
router.get('/bookName/:bookName', getBookByName);
router.post('/book', postBook);
router.put('/book/:bookId', updateBook);
router.delete('/book/:bookId', deleteBook);

const {
    getLibrarians,
    getLibrarianById,
    getLibrarianByName,
    postLibrarian,
    updateLibrarian,
    deleteLibrarian
} = require('./librarianController.js');

router.get('/librarians', getLibrarians);
router.get('/librarian/:librarianId', getLibrarianById);
router.get('/librarianName/:librarianName', getLibrarianByName);
router.post('/librarian', postLibrarian);
router.put('/librarian/:librarianId', updateLibrarian);
router.delete('/librarian/:librarianId', deleteLibrarian);

module.exports = router;