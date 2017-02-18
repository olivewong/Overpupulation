function Dog(name, intro, decisions, adoptionChance, critic) {
	this.name = name;
	this.intro = intro;
	this.decisions = decisions;
	this.adoptionChance = adoptionChance;
    this.critic = critic;
}

var state = 0;
var lose = "Despite her good behavior and loving demeanor, your dog was not adopted by any of her visitors - and she’s not the only one. Each year, animal shelters in the U.S. take in 7.6 million pets, and only about a third of them get adopted out. The remainder are either put down or left in overcrowded shelters and receive insufficient care and attention due to lack of human resources. Many people looking to become dog owners look to pet shops for younger, supposedly better-behaved dogs. These pet stores, however, often purchase their pets from puppy mills, where dogs are raised in cramped, filthy conditions and shipped across the country without adequate food, water, ventilation, or shelter - far from the ideal conditions for raising a well-behaved, happy pupper. ";
var win = "Congratulations! Your dog has been adopted. Unfortunately, they are one of the lucky ones. Each year, animal shelters in the U.S. take in 7.6 million pets, and only about a third of them get adopted out. The remainder are either put down or left in overcrowded shelters and receive insufficient care and attention due to lack of human resources. Many people looking to become dog owners look to pet shops for younger, supposedly better-behaved dogs. These pet stores, however, often purchase their pets from puppy mills, where dogs are raised in cramped, filthy conditions and shipped across the country without adequate food, water, ventilation, or shelter - far from the ideal conditions for raising a well-behaved, happy pupper.";
var moreInfo = "test";
var positiveResponses = ["Awww",  "So cute!", "Wow!", "That's great!", "Good dog!", "Amazing.", "Adorable!"];
var negativeResponses = ["Bad dog!", "Ow!", "I knew sheltered dogs would be like this!", "I wouldn't want to be this dog's friend.", "It'd be hard to take care of this dog."];
var dogChances = [0.0, .6, 1.0, .3, .3];
var totalCritics = 4;
var criticIndex = 0;
var dogs = [];
var myDog;
/*
* 0: Title page
* 1: Dog Intro
* 2: Complex page.
* 3: Win page.
* 4: Lose page.
* 5: More information page.
*/

function initializeDogs() {
	dogs[0]  = new Dog("cooper", "Meet Cooper! Cooper is a four year-old female pitbull. She was purchased from a pet store as a puppy but was left behind in the city when her former owners moved. She’s been a resident of the shelter for the past six months and is looking for a new home. Cooper loves chew toys, playing fetch, and taking naps in the sun. Try to get Cooper adopted!", ["Unfortunately, Sarah decides not to adopt Cooper. Although Cooper is energetic, Sarah wants a younger dog, so she will go probably to go a pet store. This leaves many perfectly trainable and loveable dogs like Cooper stuck in shelters.", "Sadly, Terrence decides not to adopt Cooper. He doesn’t like that Cooper is a pitbull, and wants to look for a different breed, probably purebred. Like many potential adopters, Terrence has misconceptions about pitbulls in general, even though many of them don’t have behavioral problems.", "Unfortunately, Logan decides not to adopt Cooper. She is scared that Cooper will have behavioral problems after being abandoned by her previous owners, and doesn’t want to deal with re-training an adopted dog. In reality, her belief in the saying “old dogs can’t learn new tricks” is totally unfounded. Dogs never stop learning, and even if Logan were to purchase a puppy, she would still have to train that puppy."], dogChances[0], criticIndex);
	dogs[1] = new Dog("luna",  "intro", ["Sarah", "Terrence", "Logan"], dogChances[1], criticIndex);
	dogs[2] = new Dog("loki",  "intro", ["Sarah", "Terrence", "Logan"], dogChances[2], criticIndex);
	dogs[3] = new Dog("ace",  "intro", ["Sarah", "Terrence", "Logan"], dogChances[3], criticIndex);
	dogs[4] = new Dog("rufus",  "intro", ["Sarah", "Terrence", "Logan"], dogChances[4], criticIndex);
}

$(document).ready(function () {
    initializeDogs();
	initializeTitle(); //Initialize title.
});

function findDogGivenName(name) {
	for (var i = 0; i < dogs.length; i++) {
		if (dogs[i].name == name) {
			return dogs[i];
		}
	}
}

function initializeTitle() {
	state = 0;
	//Title image is already set, intro text is already set, and play button is showing.
	$('#continue-button').hide();
	$('#dog').hide();
	$("#pick-a-pupper").hide();
	$('#dog-pic').hide();
	$('.selection').click(function(){
	   	myDog = findDogGivenName($(this).attr('id'));
		$('#continue-button').prop('disabled',true);
    	setTimeout(function(){
       		$('#continue-button').prop('disabled',false);
    	},1000); //Delaying click by one second because clicks carry through methods. 
		initializeDogIntro();
	});
}

function initializeDogIntro() {
	state = 1;
	$('#dog-selection-panel').hide();
	$('#continue-button').show();
	$('#dog-pic img').attr('src', "images/doggo.png"); //Set dog image.
	$('#dog-pic').show();
	$('#text p').text(myDog.intro); //Set dog intro text.
	//Play button is already showing.
	
	$('#continue-button').unbind(); //We need to unbind previous handlers, or else all handlers will be called.
	$('#continue-button').click(function(){
		initializeComplex();
	});
}

function initializeComplex() {
	state = 2;
	$('#dog-pic').hide(); //Don't show icon.
	$('#continue-button').hide(); 
	$('#visitors').width(400); //Show visitor sidebar.
	$('#text').hide();
	$('#dog').show(); //Show dog interface now. 
	/*
	* 0 is Sarah
	* 1 is Terrence
	* 2 is Logan
	* 3 is Tony
	*/
	$('#picture').text(myDog.critic);
	$('#fetch').click(function() {
		$('#comments p').html("<q>" + positiveResponses[parseInt((Math.random() * positiveResponses.length), 10)] + "</q>"
							 + "<br>" + myDog.decisions[myDog.critic]);
        updateDogOptions();
	});
	$('#roll').click(function() {
		$('#comments p').html("<q>" + positiveResponses[parseInt((Math.random() * positiveResponses.length), 10)] + "</q>"
			+ "<br>" + myDog.decisions[myDog.critic]);
         updateDogOptions();
	});
	$('#wag').click(function() {
		$('#comments p').html("<q>" + positiveResponses[parseInt((Math.random() * positiveResponses.length), 10)] + "</q>"
							   + "<br>" + myDog.decisions[myDog.critic]);
         updateDogOptions();
	});
	$('#bite').click(function() {
		$('#comments p').html("<q>" + negativeResponses[parseInt((Math.random() * negativeResponses.length), 10)] + "</q>"
							   + "<br>" + myDog.decisions[myDog.critic]);
         updateDogOptions();
	});
}

function updateDogOptions() {
	if (myDog.critic + 1 >= totalCritics) {
		prepareResultPages();
	}
	myDog.critic++;
    $('#picture').text(myDog.critic);
}
function prepareResultPages() {
	$('#visitors').hide();
	$('#dog').hide();
	$('#continue-button').show();
	$('#continue-button').text("Take action");
	$('#continue-button').unbind();
	$('#continue-button').click(function(){
		initializeMoreInfo();
	});
	console.log(myDog.adoptionChance);
	if (Math.random() <= myDog.adoptionChance)
		initializeWinPage();
	else
		initializeLosePage();
}

function initializeWinPage() {
	state = 3;
	//Icon isn't shown.
	$('#text p').text(win); //Change text to win text.
	$('#text').show();
}

function initializeLosePage() {
	state = 4;
	//Icon isn't shown.
	$('#text p').text(lose); //Change text to lose text.
	$('#text').show();
}

function initializeMoreInfo() {
	state = 5;
	$('#text p').text("More info.");
	$('#continue-button').text("Play again.");
	$('#continue-button').click(function() {
		location.reload();
	});
}