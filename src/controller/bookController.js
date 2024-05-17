const {
    addBook,
    updateStock,
    listBooks,
    listBookById,
    listBookBySearch,
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

async function getBookBySearch(req, res) {
    const { bookSearch } = req.params;
    if (!bookSearch) {
        return res.status(400).json({ message: 'Inserção é obrigatória.' });
    }
    const result = await listBookBySearch(bookSearch);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nada foi encontrado.' });
}

async function postBook(req, res) {
    const { nome, descricao, autor, valor, categoria, estoque } = req.body;

    if (!nome || !descricao || !autor || !valor || !categoria || !estoque) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try{
        await addBook(nome, descricao, autor, valor, categoria, estoque);
        return res.status(201).json({ message: 'Livro adicionado com sucesso.' });
    }
    catch(error){
        if(error.message === 'Esse livro já existe! Livro adicionado ao estoque!'){
            await updateStock(nome, autor, categoria, estoque);
            return res.status(200).json({ message: 'Livro já existe! Estoque foi atualizado!' });
        }
        return res.status(500).json({ message: 'Erro ao adicionar o Livro.' });
    }
}

async function updateBook(req, res) {
    const { nome, descricao, autor, valor, categoria, estoque} = req.body;
    const { bookId } = req.params;
    
    if (!nome || !descricao || !autor || !valor || !categoria || !estoque) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    
    try {
        const existingBook = await listBookById(bookId); 
        if (!existingBook) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        
        const updatedBook = await updateBookService(bookId, nome, descricao, autor, valor, categoria, estoque); // Passando o bookId como o primeiro parâmetro
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
    getBookBySearch,
    postBook,
    updateBook,
    deleteBook
};
