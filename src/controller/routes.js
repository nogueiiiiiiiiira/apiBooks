const express = require('express');
const router = express.Router();

const {
    getBooks,
    getBookBySearch,
    postBook,
    updateBook,
    deleteBook
} = require('./bookController.js');

router.get('/books', getBooks);
router.get('/bookSearch/:bookSearch', getBookBySearch);
router.post('/book', postBook);
router.put('/book/:bookId', updateBook);
router.delete('/book/:bookId', deleteBook);

const {
    getLibrarians,
    getLibrarianBySearch,
    postLibrarian,
    updateLibrarian,
    deleteLibrarian
} = require('./librarianController.js');

router.get('/librarians', getLibrarians);
router.get('/librarianSearch/:librarianSearch', getLibrarianBySearch);
router.post('/librarian', postLibrarian);
router.put('/librarian/:librarianId', updateLibrarian);
router.delete('/librarian/:librarianId', deleteLibrarian);

const {
    getLoans,
    getLoanBySearch,
    postLoan,
    updateLoan,
    deleteLoan
} = require('./loanController.js');

router.get('/loans', getLoans);
router.get('/loanSearch/:loanSearch', getLoanBySearch);
router.post('/loan', postLoan);
router.put('/loan/:loanId', updateLoan);
router.delete('/loan/:loanId', deleteLoan);

const {
    getReaders,
    getReaderBySearch,
    postReader,
    updateReader,
    deleteReader
} = require('./readerController.js');

router.get('/readers', getReaders);
router.get('/readerSearch/:readerSearch', getReaderBySearch);
router.post('/reader', postReader);
router.put('/reader/:readerId', updateReader);
router.delete('/reader/:readerId', deleteReader);

module.exports = router;
