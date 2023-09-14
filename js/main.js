
async function fetchExpense(url){
  const response = await fetch(url);
  const data = await response.json();
  displayData(data);
  //console.log(data);
}

//call function to fetch data
fetchExpense('app/select.php');

function displayData(data){
    //select element from HTML where we'll show our list
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    

    data.forEach((expense) => {
        // Create a new table row
        const row = document.createElement('tr');

        row.classList.add('table-success', 'table-striped');

        // Create table cells for each piece of data
        const dateCell = document.createElement('td');
        dateCell.textContent = expense.added_on;

        const nameCell = document.createElement('td');
        nameCell.textContent = expense.expense_name;

        const amountCell = document.createElement('td');
        amountCell.textContent = `$${expense.amount}`;

        const detailsCell = document.createElement('td');
        detailsCell.textContent = expense.details;
      
        // Create a button to edit the expense
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-primary', 'edit-button');
        editButton.addEventListener('click', () => editExpense(expense));//calling from edit.js
      
        // Create a button to delete the expense
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'delete-button');
        deleteButton.addEventListener('click', () => deleteExpense(expense.id));//calling from delete.js
        
        //Button for inserting data
        const submitButton = document.querySelector('#submit');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', getFormData);

        //Cancel and clear field
        const cancelButton = document.querySelector('#cancel');
        cancelButton.textContent = 'cancel';
        cancelButton.addEventListener('click', cleanFields);

        // Append the cells to the row
        row.appendChild(dateCell);
        row.appendChild(nameCell);
        row.appendChild(amountCell);
        row.appendChild(detailsCell);
        row.appendChild(editButton);
        row.appendChild(deleteButton);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
  
    // Append the table to the display element
    let total = document.querySelector('#total');
    total.innerHTML = `Total = $${calculateTotal(data)}`;
}


function getFormData(event){
  event.preventDefault();

  //get the form data & call an async function
  const insertFormData = new FormData(document.querySelector('#insert-form'));
  let url = 'app/insert.php';
  inserter(insertFormData, url);
  //Clearing the form fields
  cleanFields();
}

async function inserter(data, url){
  const response = await fetch(url, {
    method: "POST",
    body: data
  });
  const confirmation = await response.json();

  console.log(confirmation);
  //call function again to refresh the page
  fetchExpense('app/select.php');
}

//Function to calculate total
function calculateTotal(data) {
  let totalAmount = 0;
  
    data.forEach((expense) => {
        totalAmount = totalAmount + expense.amount;
    });
    return totalAmount;   
}

function cleanFields() {
  //For clearing the input field after pressing button
  document.querySelector('#expense_name').value = '';
  document.querySelector('#amount').value = '';
  document.querySelector('#details').value = '';
}
