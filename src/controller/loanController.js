//loanControler

const {
    addLoan,
    listLoans,
    listLoanBySearch,
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

async function getLoanBySearch(req, res) {
    const { loanSearch } = req.params;
    if (!loanSearch) {
        return res.status(400).json({ message: 'Inserção é obrigatório.' });
    }
    const result = await listLoanBySearch(loanSearch);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nada foi encontrado.' });
}

async function postLoan(req, res) {
    const { cpf, title } = req.body;
    if (!cpf || !title) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const dateEmp = new Date();
    const dateDev = new Date();
    dateDev.setDate(dateDev.getDate() + 7);

    const isoDateEmp = dateEmp.toISOString();
    const isoDateDev = dateDev.toISOString();

    try {
        const result = await addLoan(cpf, title, isoDateEmp, isoDateDev);
        return res.status(201).json({ message: 'Empréstimo realizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao realizar o empréstimo:', error);
        return res.status(500).json({ message: 'Erro ao realizar o empréstimo.' });
    }
}

async function updateLoan(req, res) {
    const { cpf, title } = req.body;
    const { loanId } = req.params;
    
    if (!cpf || !title) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    
    try {
        const existingLoan = await listLoanById(loanId);
        if (!existingLoan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
        
        const updatedLoan = await updateLoanService(loanId, cpf, title);
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
    getLoanBySearch,
    postLoan,
    updateLoan,
    deleteLoan
};

