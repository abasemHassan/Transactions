//Displaying not implemented when buttons are clicked
var buttons = document.querySelectorAll('.btn');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        alert("Not implemented");
    });
});

//Displaying not implemented to side pages when they are clicked
var listOptions = document.querySelectorAll('.notImplemented');

listOptions.forEach(function(option) {
    option.addEventListener('click', function() {
        alert("Not implemented");
    });
});
//Function to append rows to the table
function appendRow(date, atmID, customerPAN, description, code, search) {

    var table = document.querySelector('table');

    var newRow = table.insertRow();

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    cell1.textContent = date;
    cell2.textContent = atmID;
    cell3.textContent = customerPAN;
    cell4.textContent = description;
    cell5.textContent = code;
    cell6.textContent = search;
}
//Converting unix time stamp to date time
function convertUnixTimestampToDateTime(timestamp) {
    var date = new Date(timestamp);

    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);

    var dateTimeString = year + '-' + month + '-' + day;

    return dateTimeString;
}

// selecting based on dropdown
document.querySelector('.atmId').addEventListener('change', function() {

    var selectedValue = this.value;
    var table = document.getElementById('myTable');
    var rows = table.getElementsByTagName('tr');

    // Loop through all rows except the header
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.getElementsByTagName('td');
        var matchFound = false;

        if (selectedValue === 'All ATMs') {
            row.style.display = '';
            continue;
        }

        // Loop through each cell in the row
        for (var j = 0; j < cells.length; j++) {
            var cell = cells[j];
            if (cell.textContent.trim() === selectedValue || selectedValue === 'all') {
                matchFound = true;
                break;
            }
        }
        
        // Show or hide the row based on the match
        row.style.display = matchFound ? '' : 'none';
    }
});

document.querySelector('.date').addEventListener('change', function() {

    var selectedDate = this.value;
    var table = document.getElementById('myTable');
    var rows = table.getElementsByTagName('tr');

    // Loop through all rows except the header
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.getElementsByTagName('td');
        var dateCell = cells[0];

        // If 'All' option is selected in selectedDate is empty, show all rows
        if (!selectedDate) {
            row.style.display = '';
            continue;
        }

        // Check if the date in the row matches the selected date
        if (dateCell.textContent.trim() === selectedDate) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
});




















//----------------------------------get and post requests

//Get ATM list get request
var dropdown = document.querySelector('.atmId');
fetch('https://dev.smartjournal.net:443/um/test/api/jr/txn/atmlist/v1')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  })
  .then(data => {

    console.log(data);
    data.forEach(item => {
       appendRow(convertUnixTimestampToDateTime(item.ts), item.name, item.customerPAN, item.description, item.code, item.search);

        var option = document.createElement('option');
        
        option.value = item.name;

        option.textContent = item.name; 

        dropdown.appendChild(option);
    });
  })
  .catch(error => {

    console.error('There was a problem with the fetch operation:', error);
  });


