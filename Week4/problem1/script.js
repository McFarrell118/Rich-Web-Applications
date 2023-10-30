let sortOrder = true;

function addContact() {
    const name = document.getElementById('Contname').value.trim();
    const mobile = document.getElementById('Contmobile').value.trim();
    const email = document.getElementById('Contemail').value.trim();
    const errorDiv = document.getElementById('error');

    errorDiv.innerText = '';

    // Validation checks
    if (!name.match(/^[A-Za-z\s]{1,20}$/)) {
        errorDiv.innerText += 'Name should contain only alphabets and spaces, and be <= 20 characters. ';
    }

    if (!mobile.match(/^\d{10}$/)) {
        errorDiv.innerText += 'Mobile should contain only numbers and be exactly 10 characters. ';
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || email.length > 40) {
        errorDiv.innerText += 'Email is not valid or is > 40 characters. ';
    }

    // If there's any error, stop further execution
    if (errorDiv.innerText) {
        errorDiv.style.display = 'block'; // Ensure the error div is visible
        return;
    } else {
        errorDiv.style.display = 'none'; // Hide the error div if no errors
    }

    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = mobile;
    newRow.insertCell(2).innerText = email;

    document.getElementById('Contname').value = '';
    document.getElementById('Contmobile').value = '';
    document.getElementById('Contemail').value = '';
}


function sortTable() {
    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const rows = Array.from(table.rows);
    const sortedRows = rows.sort((a, b) => {
        const aValue = a.cells[0].innerText.toLowerCase();
        const bValue = b.cells[0].innerText.toLowerCase();
        return (aValue > bValue ? 1 : -1) * (sortOrder ? 1 : -1);
    });

    for (const row of sortedRows) {
        table.appendChild(row);
    }

    sortOrder = !sortOrder;
}

function filterContacts() {
    const searchValue = document.getElementById('search').value.trim();
    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const rows = table.rows;
    let noResult = true;

    for (const row of rows) {
        const mobile = row.cells[1].innerText;
        if (mobile.includes(searchValue)) {
            row.style.display = '';
            noResult = false;
        } else {
            row.style.display = 'none';
        }
    }

    document.getElementById('noResult').style.display = noResult ? 'block' : 'none';
}
