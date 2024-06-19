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
    deleteLibrarian,
    postLogin
} = require('./librarianController.js');

router.get('/librarians', getLibrarians);
router.get('/librarians/:librarianSearch', getLibrarianBySearch);
router.post('/librarians', postLibrarian);
router.put('/librarians/:librarianId', updateLibrarian);
router.delete('/librarians/:librarianId', deleteLibrarian);
router.post('/login', postLogin);


const {
    getLoans,
    getLoanBySearch,
    postLoan,
    updateLoan,
    deleteLoan
} = require('./loanController.js');

router.get('/loans', getLoans);
router.get('/loans/:loanSearch', getLoanBySearch);
router.post('/loans', postLoan);
router.put('/loasn/:loanId', updateLoan);
router.delete('/loans/:loanId', deleteLoan);

const {
    getReaders,
    getReaderBySearch,
    postReader,
    updateReader,
    deleteReader
} = require('./readerController.js');

router.get('/readers', getReaders);
router.get('/readers/:readerSearch', getReaderBySearch);
router.post('/readers', postReader);
router.put('/readers/:readerId', updateReader);
router.delete('/readers/:readerId', deleteReader);

const {
    getReturns,
    getReturnBySearch,
    postReturn,
    updateReturn,
    deleteReturn
} = require('./returnController.js');

router.get('/returns', getReturns);
router.get('/returns/:returnSearch', getReturnBySearch);
router.post('/returns', postReturn);
router.put('/returns/:idReturn', updateReturn);
router.delete('/returns/:idReturn', deleteReturn);

const {
    getFines,
    getFinesBySearch,
    updatePayment,
    updateFine,
    deleteFine
} = require('./fineController.js');

router.get('/fines', getFines);
router.get('/fines/:fineSearch', getFinesBySearch);
router.put('/payFine', updatePayment);
router.put('/fines/:fineId', updateFine);
router.delete('/fines/:fineId', deleteFine);

module.exports = router;