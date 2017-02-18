
var state = 0;
/*
* 0: Title page
* 1: Complex page.
* 2: Win page.
* 3: Lose page.
* 4: More information page.
*/

$(document).ready(function() {
    alert("hello");
	initializeTitle(); //Initialize page.
    
    $('#play-button').click(function(){
    alert('play button has been clicked'); //Change this to move into next slide
});
});

function initializeTitle() {
	state++; //Progress onto next page once title is finished. This belogns in another function. 
}

