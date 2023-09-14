function deleteExpense(id) {
    console.log(id);
    if (confirm('Are you sure you want to delete this expense?')) {
        const url = `app/delete.php?id=${id}`;
        fetch(url);

        //To refresh the list
        fetchExpense('app/select.php');
    }
}