//rotas back

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
router.get('/books/:bookSearch', getBookBySearch);
router.post('/books/', postBook);
router.put('/books/:bookId', updateBook);
router.delete('/books/:bookId', deleteBook);

const {
    getLibrarians,
    getLibrarianBySearch,
    postLibrarian,
    updateLibrarian,
    deleteLibrarian
} = require('./librarianController.js');

router.get('/librarians', getLibrarians);
router.get('/librarians/:librarianSearch', getLibrarianBySearch);
router.post('/librarians', postLibrarian);
router.put('/librarians/:librarianId', updateLibrarian);
router.delete('/librarians/:librarianId', deleteLibrarian);

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

const {
    getReturns,
    getReturnBySearch,
    postReturn,
    updateReturn,
    deleteReturn
} = require('./returnController.js');

router.get('/returns', getReturns);
router.get('/readerSearch/:returnSearch', getReturnBySearch);
router.post('/return', postReturn);
router.put('/return/:returnId', updateReturn);
router.delete('/return/:returnId', deleteReturn);

const {
    getFines,
    getFinesBySearch,
    updatePayment,
    updateFine,
    deleteFine
} = require('./fineController.js');

router.get('/fines', getFines);
router.get('/finesSearch/:fineSearch', getFinesBySearch);
router.put('/payFine', updatePayment);
router.put('/fine/:fineId', updateFine);
router.delete('/fine/:fineId', deleteFine);


module.exports = router;
