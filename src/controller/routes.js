//routes

const express = require('express');
const {
    getBooks,
    getBookById,
    getBookByName,
    postBook,
    updateBook,
    deleteBook,

    getLibrarians,
    getLibrarianById,
    getLibrarianByName,
    postLibrarian,
    updateLibrarian,
    deleteLibrarian
} = require('./bookController.js');

const router = express.Router();

router.get('/books', getBooks);
router.get('/book/:bookId', getBookById);
router.get('/bookByName/:nome', getBookByName); 
router.post('/book', postBook);
router.put('/book/:bookId', updateBook);
router.delete('/book/:bookId', deleteBook);

router.get('/librarians', getLibrarians);
router.get('/librarian/:librarianId', getLibrarianById);
router.get('/librarianByName/:nome', getLibrarianByName);
router.post('/librarian', postLibrarian);
router.put('/librarian/:librarianId', updateLibrarian);
router.delete('/librarian/:librarianId', deleteLibrarian);

module.exports = router;
