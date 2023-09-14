function editExpense(expense) {
    // Populate the form fields with the expense data
    document.querySelector('#id').value = expense.id;
    document.querySelector('#expense_name').value = expense.expense_name;
    document.querySelector('#amount').value = expense.amount;
    document.querySelector('#details').value = expense.details;

    // Add an event listener to the update button
    const updateButton = document.querySelector('#update');
    updateButton.textContent = 'Update';

    updateButton.addEventListener('click', (event) => {
    event.preventDefault();
        // Retrieve the edited values from the form fields
        const editedId = document.querySelector('#id').value;
        const editedExpenseName = document.querySelector('#expense_name').value;
        const editedAmount = document.querySelector('#amount').value;
        const editedDetails = document.querySelector('#details').value;

        const url = `app/edit.php?id=${editedId}&expense_name=${editedExpenseName}&amount=${editedAmount}&details=${editedDetails}`;
        
        updater(url);
        cleanFields();           
    });
}

async function updater(url) {
        fetch(url);
        fetchExpense('app/select.php');
}
