window.onload = function(){
    readdata(1);
};

function readdata(num){
    /*
      sticks the caged data in a string
      note this is everything in script tag
    */
    var data = document.querySelector("#data");
    /*
      breaks apart the string into an array
      new array items on line breaks
    */
    var lines = data.text.split('\n');
    lines.pop(); // remove junk from end of array
    lines.shift(); // remove junk on beginning of array
    console.log(lines)
}
