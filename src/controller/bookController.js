//bookController

const {
    addBook,
    listBooks,
    listBookById,
    listBookByName,
    updateBookService,
    deleteBookService,

    addLibrarian,
    listLibrarians,
    listLibrarianById,
    listLibrarianByName,
    updateLibrarianService,
    deleteLibrarianService,


} = require("../service/bookService");

//Books
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
    const { nome } = req.params; // Alterado de bookName para nome
    if (!nome) {
        return res.status(400).json({ message: 'Nome do livro é obrigatório.' });
    }
    const result = await listBookByName(nome);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nenhum livro encontrado com este nome.' });
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
        // Verifique se o livro existe
        const existingBook = await listBookById(bookId); // Corrigido para listBookById
        if (!existingBook) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        // Exclua o livro
        await deleteBookService(bookId);
        return res.status(200).json({ message: 'Livro excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir o livro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

//Librarians
async function getLibrarians(req, res) {
    const librarians = await listLibrarians();
    if (librarians.length > 0) {
        return res.status(200).json(librarians);
    }
    return res.status(204).send();
}

async function getLibrarianById(req, res) {
    const { librarianId } = req.params;
    if (!librarianId) {
        return res.status(400).json({ message: 'ID é obrigatório' });
    }
    const result = await listLibrarianById(librarianId);
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(204).send();
}

async function getLibrarianByName(req, res) {
    const { nome } = req.params;
    if (!nome) {
        return res.status(400).json({ message: 'Nome do bibliotecário é obrigatório.' });
    }
    const result = await listLibrarianByName(nome);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nenhum bibliotecário encontrado com este nome.' });
}

async function postLibrarian(req, res) {
    const { nome, cpf, email, telefone, dataNasc } = req.body;
    if (!nome || !cpf || !email || !telefone || !dataNasc) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const result = await addLibrarian(nome, cpf, email, telefone, dataNasc);
    if (result) {
        return res.status(201).json({ message: 'Bibliotecário adicionado com sucesso.' });
    }
    return res.status(500).json({ message: 'Erro ao adicionar o Bibliotecário.' });
}

async function updateLibrarian(req, res) {
    const { nome, cpf, email, telefone, dataNasc } = req.body;
    const { librarianId } = req.params;
    
    if (!nome || !cpf || !email || !telefone || !dataNasc) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    
    try {
        const existingLibrarian = await listLibrarianById(librarianId);
        if (!existingLibrarian) {
            return res.status(404).json({ message: 'Bibliotecário não encontrado.' });
        }
        
        const updatedLibrarian = await updateBookService(bookId, nome, descricao, autor, valor, categoria); // Passando o bookId como o primeiro parâmetro
        return res.status(200).json(updatedLibrarian);
    } catch (error) {
        console.error('Erro ao atualizar o livro:', error);
        return res.status(500).json({ message: 'Erro ao atualizar o livro.' });
    }
}

async function deleteBook(req, res) {
    const { bookId } = req.params;
    try {
        // Verifique se o livro existe
        const existingBook = await listBookById(bookId); // Corrigido para listBookById
        if (!existingBook) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        // Exclua o livro
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
