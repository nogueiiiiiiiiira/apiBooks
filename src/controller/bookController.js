const {
    addBook,
    listBooks,
    listBookById,
    listBookByName,
    updateBookService,
    deleteBookService
} = require("../service/bookService");

async function getBooks(req, res) {
    const books = await listBooks();
    if (books.length > 0) {
        return res.status(200).json(books);
    }
    return res.status(204).send();
}

async function getBookById(req, res) {
    const { bookId } = req.params;
    if (!bookId) {
        return res.status(400).json({ message: 'ID é obrigatório' });
    }
    const result = await listBookById(bookId);
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(204).send();
}

async function getBookByName(req, res) {
    const { bookName } = req.params;
    if (!bookName) {
        return res.status(400).json({ message: 'Nome do livro é obrigatório.' });
    }
    const result = await listBookByName(bookName);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nenhum livro com este nome encontrado.' });
}

async function postBook(req, res) {
    const { nome, descricao, autor, valor, categoria } = req.body;
    if (!nome || !descricao || !autor || !valor || !categoria) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const result = await addBook(nome, descricao, autor, valor, categoria);
    if (result) {
        return res.status(201).json({ message: 'Livro adicionado com sucesso.' });
    }
    return res.status(500).json({ message: 'Erro ao adicionar o Livro.' });
}

async function updateBook(req, res) {
    const { nome, descricao, autor, valor, categoria } = req.body;
    const { bookId } = req.params;
    
    if (!nome || !descricao || !autor || !valor || !categoria) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    
    try {
        const existingBook = await listBookById(bookId); // Corrigido para listBookById
        if (!existingBook) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        
        const updatedBook = await updateBookService(bookId, nome, descricao, autor, valor, categoria); // Passando o bookId como o primeiro parâmetro
        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Erro ao atualizar o livro:', error);
        return res.status(500).json({ message: 'Erro ao atualizar o livro.' });
    }
}

async function deleteBook(req, res) {
    const { bookId } = req.params;
    try {
        const existingBook = await listBookById(bookId); // Corrigido para listBookById
        if (!existingBook) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        await deleteBookService(bookId);
        return res.status(200).json({ message: 'Livro excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir o livro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}


module.exports = {
    getBooks,
    getBookById,
    getBookByName,
    postBook,
    updateBook,
    deleteBook
};
