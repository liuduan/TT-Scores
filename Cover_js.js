
var fileName = "";
var allText = "";
var file_location = "";
var array2D = [];
// select a file.
$('input[type="file"]').change(function(e){
    fileName = e.target.files[0].name;
	file_location = "file://C:/1-5-Files/TT-Scores/Scores/" + fileName;
    alert('file location: '  + file_location);
	$("#file_selector").hide();
	$("#show_data").show();
    });

function loadDoc() {
	// alert("2");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// document.getElementById("demo").innerHTML = this.responseText;
			allText = xhttp.responseText;
			// alert("4: " + allText);
			}
		};
	xhttp.open("GET", file_location, true);
	// alert("3");
	xhttp.send();
	
}
function showData() {
	// alert("showData");
	// $.post("file://C:/1-5-Files/TT-Scores/Scores/Score-2017-09-03.csv", 
	loadDoc();
	// alert("5, allText: " + allText);
	array2D = allText.split(/\r\n|\n/).map(function(x){return x.split(",")});
	// alert("7, array2D, 1,2: " + array2D[1][1]);
	
	// alert("8. column number: " + array2D[0].length);
	// alert("9. row number: " + row_number(array2D));
	createTable(array2D);
}


function row_number(ar){
    var row_count = ar.length;
    var row_sizes = []
    for(var i=0;i<row_count;i++){
        row_sizes.push(ar[i].length)
    }
    return row_count;
}

function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
	table.setAttribute("border", "1px solid black");
	table.setAttribute("margin-left", "50px");
	
	table.appendChild(tableBody);
	document.body.appendChild(table);
	// return table;
}


function score_calculation() {
	// alert(1);
	var selection_string = '<div style ="margin-left: 50px;">';
	selection_string += '<form action="/action_page.php"><select name="player_A">';
	// alert(1.5);
	var column_N = array2D[0].length;
	var row_N = row_number(array2D);
	
	alert(array2D[1][1]);
	
	for (i = 1; i < row_N; i++) {
		selection_string += '<option value=' + array2D[i][3] + ">" + array2D[i][1] + '</option>';
		} 
	// alert(2);
	
	selection_string += '</select>  <br><br>  <input type="submit"></form>';
	selection_string += '</div>';
	$("#Winner").replaceWith(selection_string);
}

