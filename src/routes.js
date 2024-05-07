const express = require('express');

const {getBooks, 
       getBook, 
       postBook} = require('./controller/bookController.js');

const router = express.Router();


router.get('/books', getBooks);
router.get('/book', getBook);
router.post('/book', postBook);

module.exports = router;