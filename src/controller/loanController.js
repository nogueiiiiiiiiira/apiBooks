const {
    addLoan,
    listLoans,
    listLoanById,
    listLoanByCPF,
    listLoanByTitle,
    updateLoanService,
    deleteLoanService
} = require("../service/loanService");

async function getLoans(req, res) {
    const loans = await listLoans();
    if (loans.length > 0) {
        return res.status(200).json(loans);
    }
    return res.status(204).send();
}

async function getLoanById(req, res) {
    const { loanId } = req.params;
    if (!loanId) {
        return res.status(400).json({ message: 'ID é obrigatório' });
    }
    const result = await listLoanById(loanId);
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(204).send();
}

async function getLoanByCPF(req, res) {
    const { loanCPF } = req.params;
    if (!loanCPF) {
        return res.status(400).json({ message: 'Nenhum CPF foi encontrado' });
    }
    const result = await listLoanByCPF(loanCPF);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nenhum CPF foi encontrado' });
}

async function getLoanByTitle(req, res) {
    const { loanTitle } = req.params;
    if (!loanTitle) {
        return res.status(400).json({ message: 'Nenhum livro foi encontrado' });
    }
    const result = await listLoanByTitle(loanTitle);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nenhum livro foi encontrado' });
}

const { format } = require('date-fns');

async function postLoan(req, res) {
    const { cpf, titulo } = req.body;
    if (!cpf || !titulo) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const dataEmp = format(new Date(), 'dd/MM/yyyy');
    
    const dataDev = new Date();
    dataDev.setDate(dataDev.getDate() + 7);
    const dataDevFormatted = format(dataDev, 'dd/MM/yyyy');

    const result = await addLoan(cpf, titulo, dataEmp, dataDevFormatted);
    if (result) {
        return res.status(201).json({ message: 'Empréstimo realizado com sucesso.' });
    }
    return res.status(500).json({ message: 'Erro ao realizar o empréstimo' });
}

async function updateLoan(req, res) {
    const { cpf, titulo } = req.body;
    const { loanId } = req.params;
    
    if (!cpf || !titulo) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    
    try {
        const existingLoan = await listLoanById(loanId);
        if (!existingLoan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
        
        const updatedLoan = await updateLoanService(loanId, cpf, titulo);
        return res.status(200).json(updatedLoan);
    } catch (error) {
        console.error('Erro ao atualizar o empréstimo:', error);
        return res.status(500).json({ message: 'Erro ao atualizar o empréstimo.' });
    }
}

async function deleteLoan(req, res) {
    const { loanId } = req.params;
    try {
        const existingLoan = await listLoanById(loanId); // Corrigido para listLoanById
        if (!existingLoan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
        await deleteLoanService(loanId);
        return res.status(200).json({ message: 'Empréstimo excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao realizar o empréstimo:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}


module.exports = {
    getLoans,
    getLoanById,
    getLoanByCPF,
    getLoanByTitle,
    postLoan,
    updateLoan,
    deleteLoan
};

