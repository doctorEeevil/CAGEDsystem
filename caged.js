window.onload = renderTableFromDataIn;

function renderTableFromDataIn(event, selector="#data"){
    var theData = readdata(selector);
    console.log({theData});
    drawTable(theData);
}

function drawTable(theData){
    /*inserts a table in the document and inserts thead and tbody
      into the table
    */
    var table = document.createElement('table');
    document.body.insertAdjacentElement('beforeEnd', table);
    var thead = document.createElement('thead');
    table.insertAdjacentElement('afterBegin', thead);
    var tbody = document.createElement('tbody');
    table.insertAdjacentElement('beforeEnd', tbody);
    //this loop puts all the contents of theData into the table
    while (theData.length > 0){
	/*
	  we use currentRow to iterate through the items in theData
	  array one at a time
	 */
	var currentRow = theData.shift();
	var headOrBody; // where the row will go (thead or tbody)
	var cellTag; // whether each cell is in a th or a td tag
	var cells = currentRow.columns;
	if (currentRow.where == 'thead'){
	    headOrBody = thead;
	    cellTag = 'th';
	} else {
	    headOrBody = tbody;
	    cellTag = 'td';
	}
	// builds rows
	var tr = document.createElement('tr');
	// insert row into headOrBody
	headOrBody.insertAdjacentElement('beforeEnd', tr);
	// shift each cell off currentRow and into th or td tags
	while (cells.length > 0){
	    var cell = document.createElement(cellTag);
	    cell.innerText = cells.shift();
	    tr.insertAdjacentElement('beforeEnd', cell);
	}
    }
}

function readdata(selector){
    /*
      We're gonna try to return an array 
    [
	{where: 'thead', columns: ['', 'C shape', 'A shape']},
	{where: 'tbody', columns: ['1st fret', 'C#', 'A#', 'G#']}
	{where: 'tbody', columns: ['2nd fret', 'D', 'B', 'A']}
    ];

     */
    /*
      sticks the caged data in a string
      note this is everything in script tag
    */
    var dataElement = document.querySelector(selector);
    /*
      breaks apart the string into an array
      new array items on line breaks
    */
    var theText = dataElement.text;  // the text content of script#data
    var lines = theText.split('\n'); // \n is a new line
    lines.shift(); // remove junk on beginning of array
    lines.pop(); // remove junk from end of array
    /*
     make an array (rows) containing an object with properties
     where, and columns
     columns takes the first item from the array lines using
     lines.shift and splits it into cells by the tab symbol
     */
    var rows = [{where: 'thead',
		 columns: lines.shift().split('\t')}];
    while(lines.length > 0){
	rows.push({where: 'tbody',
		   columns: lines.shift().split('\t')});
    }
    return rows;
}
