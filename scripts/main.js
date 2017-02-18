var state = 0;
var dogIntro = "Meet Ruby! Ruby is a four year-old female pitbull. She was purchased from a pet store as a puppy but was left behind in the city when her former owners moved. She’s been a resident of the shelter for the past six months and is looking for a new home. Ruby loves chew toys, playing fetch, and taking naps in the sun. Try to get Ruby adopted!";
var lose = "Despite her good behavior and loving demeanor, Ruby was not adopted by any of her visitors - and she’s not the only one. Each year, animal shelters in the U.S. take in 7.6 million pets, and only about a third of them get adopted out. The remainder are either put down or left in overcrowded shelters and receive insufficient care and attention due to lack of human resources. Many people looking to become dog owners look to pet shops for younger, supposedly better-behaved dogs. These pet stores, however, often purchase their pets from puppy mills, where dogs are raised in cramped, filthy conditions and shipped across the country without adequate food, water, ventilation, or shelter - far from the ideal conditions for raising a well-behaved, happy pupper. ";
var win = "Unfortunately, Ruby is one of the lucky ones. Each year, animal shelters in the U.S. take in 7.6 million pets, and only about a third of them get adopted out. The remainder are either put down or left in overcrowded shelters and receive insufficient care and attention due to lack of human resources. Many people looking to become dog owners look to pet shops for younger, supposedly better-behaved dogs. These pet stores, however, often purchase their pets from puppy mills, where dogs are raised in cramped, filthy conditions and shipped across the country without adequate food, water, ventilation, or shelter - far from the ideal conditions for raising a well-behaved, happy pupper.";
var moreInfo = "test";
/*
* 0: Title page
* 1: Dog Intro
* 2: Complex page.
* 3: Win page.
* 4: Lose page.
* 5: More information page.
*/

$(document).ready(function() {
	initializeTitle(); //Initialize title.
});

function initializeTitle() {
	state = 0;
	//Title image is already set, intro text is already set, and play button is showing.
	
	$('#continue-button').click(function(){
		$('#continue-button').prop('disabled',true);
    	setTimeout(function(){
       		$('#continue-button').prop('disabled',false);
    	},1000); //Delaying click by one second because clicks carry through methods. 
		initializeDogIntro();
	});
}

function initializeDogIntro() {
	state = 1;
	$('#title-and-dog img').attr('src', "images/doggo.png"); //Set dog image.
	$('#text p').text(dogIntro); //Set dog intro text.
	//Play button is already showing.
	
	$('#continue-button').unbind(); //We need to unbind previous handlers, or else all handlers will be called.
	$('#continue-button').click(function(){
		initializeComplex();
	});
}

function initializeComplex() {
	state = 2;
	$('#title-and-dog').hide(); //Don't show icon.
	$('#continue-button').hide(); 
	$('#visitors').width(400); //Show visitor sidebar.
	$('#visitors').text(dogIntro); //Temporary placeholder text.
	
	/*Experimental countdown timer*/
	var time = 2;
	$('#text p').text(time);
	var timer = setInterval(function(){
		time--;
		//If timer runs out, then initialize win page. 
		if (time <= 0) {
			clearInterval(timer);
			initializeWinPage();
		} else {
			$('#text p').text(time);
		}
	},1000);
}

function initializeWinPage() {
	state = 3;
	//Icon isn't shown.
	$('#text p').text(win); //Change text to win text.
	$('#text').show(); 
	$('#visitors').hide();
	$('#continue-button').show();
	$('#continue-button').text("Get more information");
	$('#continue-button').unbind();
	$('#continue-button').click(function(){
		initializeMoreInfo();
	});
}

function initializeLosePage() {
	state = 4;
	//Icon isn't shown.
	$('#text p').text(lose); //Change text to lose text.
	$('#text').show();
	$('#visitors').hide();
	$('#continue-button').show();
	$('#continue-button').text("Get more information");
	$('#continue-button').unbind();
	$('#continue-button').click(function(){
		initializeMoreInfo();
	});
}

function initializeMoreInfo() {
	state = 5;
	//Icon isn't shown.
	$('#text p').text("More info.");
	$('#continue-button').hide();
}
