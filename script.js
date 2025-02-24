const expenseForm = document.getElementById('expense-form');
const expensesSelect = document.getElementById('expenses');
const otherExpenseInput = document.getElementById('other-expense');
const valueInput = expenseForm.querySelector('input[type="number"]');
const saveButton = expenseForm.querySelector('button');
const viewExpense = document.querySelector('.view-expense');
const totalDisplay = document.getElementById('total');

let expenses = [];
let total = 0;

// Função para atualizar a tabela de despesas
function updateExpenseTable() {
    // Limpar a tabela antes de adicionar as novas despesas
    viewExpense.innerHTML = '';

    // Adicionar cada despesa à tabela
    expenses.forEach(expense => {
        const row = `
            <tr>
                <td>${expense.name}</td>
                <td>R$ ${expense.value.toFixed(2)}</td>
            </tr>
        `;
        viewExpense.insertAdjacentHTML('beforeend', row);
    });

    // Atualizar o total
    totalDisplay.textContent = total.toFixed(2);
}

// Função para adicionar a despesa
function addExpense() {
    const expenseName = expensesSelect.value === 'other' ? otherExpenseInput.value : expensesSelect.options[expensesSelect.selectedIndex].text;
    const expenseValue = parseFloat(valueInput.value);

    if (expenseName && !isNaN(expenseValue) && expenseValue > 0) {
        // Adiciona a despesa ao array
        expenses.push({ name: expenseName, value: expenseValue });
        total += expenseValue;

        // Limpar os campos
        valueInput.value = '';
        if (expensesSelect.value === 'other') {
            otherExpenseInput.value = '';
        }

        // Atualizar a tabela e o total
        updateExpenseTable();
    } else {
        alert('Por favor, preencha os campos corretamente!');
    }
}

// Evento de clique no botão "Salvar Despesa"
saveButton.addEventListener('click', addExpense);

// Mostrar o campo "Outro" quando a opção "Outro" for selecionada
expensesSelect.addEventListener('change', function () {
    if (expensesSelect.value === 'other') {
        otherExpenseInput.style.display = 'block';
    } else {
        otherExpenseInput.style.display = 'none';
    }
});