window.onload = renderTableFromDataIn;

function renderTableFromDataIn(event, selector="#data"){
    console.log(event);
    var theData = readdata(selector);
    console.log(theData);
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
    var rows = [{where: 'THEAD',
		 columns: lines.shift().split('\t')}];
    while(lines.length > 0){
	rows.push({where: 'TBODY',
		   columns: lines.shift().split('\t')});
    }
    return rows;
}
