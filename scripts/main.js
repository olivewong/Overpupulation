function Dog(name, intro, decisions, adoptionChance, critic) {
	this.name = name;
	this.intro = intro;
	this.decisions = decisions;
	this.adoptionChance = adoptionChance;
    this.critic = critic;
}

var lose = "Despite her good behavior and loving demeanor, your dog was not adopted by any of her visitors - and she’s not the only one. Each year, animal shelters in the U.S. take in 7.6 million pets, and only about a third of them get adopted out. The remainder are either put down or left in overcrowded shelters and receive insufficient care and attention due to lack of human resources. Many people looking to become dog owners look to pet shops for younger, supposedly better-behaved dogs. These pet stores, however, often purchase their pets from puppy mills, where dogs are raised in cramped, filthy conditions and shipped across the country without adequate food, water, ventilation, or shelter - far from the ideal conditions for raising a well-behaved, happy pupper. ";
var win = "Congratulations! Your dog has been adopted. Unfortunately, they are one of the lucky ones. Each year, animal shelters in the U.S. take in 7.6 million pets, and only about a third of them get adopted out. The remainder are either put down or left in overcrowded shelters and receive insufficient care and attention due to lack of human resources. Many people looking to become dog owners look to pet shops for younger, supposedly better-behaved dogs. These pet stores, however, often purchase their pets from puppy mills, where dogs are raised in cramped, filthy conditions and shipped across the country without adequate food, water, ventilation, or shelter - far from the ideal conditions for raising a well-behaved, happy pupper.";
var moreInfo = "test";
var positiveResponses = ["Awww",  "So cute!", "Wow!", "That's great!", "Good dog!", "Amazing.", "Adorable!"];
var negativeResponses = ["Bad dog!", "Ow!", "I knew sheltered dogs would be like this!", "I wouldn't want to be this dog's friend.", "It'd be hard to take care of this dog."];
var criticNames = ["Olivia", "Vanessa", "Heidi", "Daniel"];
var instructions = [" is visiting the shelter today. Try to impress! Choose an action to the left."]; 
var dogChances = [0.0, .6, 1.0, .3];
var totalCritics = 4;
var criticIndex = 0;
var actionOk = true;
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
	dogs[0]  = new Dog("cooper", "Meet Cooper! Cooper is a four year-old female pitbull. She was purchased from a pet store as a puppy but was left behind in the city when her former owners moved. She’s been a resident of the shelter for the past six months and is looking for a new home. Cooper loves chew toys, playing fetch, and taking naps in the sun. Try to get Cooper adopted!", ["Unfortunately, Olivia decides not to adopt Cooper. Although Cooper is energetic, Olivia wants a younger dog, so she will go probably to go a pet store. This leaves many perfectly trainable and loveable dogs like Cooper stuck in shelters.", "Sadly, Vanessa decides not to adopt Cooper. She doesn’t like that Cooper is a pitbull, and wants to look for a different breed, probably purebred. Like many potential adopters, Vanessa has misconceptions about pitbulls in general, even though many of them don’t have behavioral problems.", "Unfortunately, Heidi also decides not to adopt Cooper. She is scared that Cooper will have behavioral problems after being abandoned by her previous owners, and doesn’t want to deal with re-training an adopted dog. In reality, her belief in the saying “old dogs can’t learn new tricks” is totally unfounded. Dogs never stop learning, and even if Heidi were to purchase a puppy, she would still have to train it."], dogChances[0], criticIndex);
	dogs[1] = new Dog("luna",  "intro", ["Olivia", "Vanessa", "Heidi", "Daniel"], dogChances[1], criticIndex);
	dogs[2] = new Dog("loki",  "intro", ["Olivia", "Vanessa", "Heidi", "Daniel"], dogChances[2], criticIndex);
	dogs[3] = new Dog("ace",  "intro", ["Olivia", "Vanessa", "Heidi", "Daniel"], dogChances[3], criticIndex);
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
	//Title image is already set, intro text is already set, and play button is showing.
	$('#complexscene').hide();
	$('#continue-button').hide();
    $('#visitors').hide();
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
	$('#dog-selection-panel').hide();
	$('#continue-button').show();
	$('#dog-pic img').attr('src', "images/still-pup.gif"); //Set dog image.
	$('#dog-pic').show();
	$('#text p').text(myDog.intro); //Set dog intro text.
	//Play button is already showing.
	
	$('#continue-button').unbind(); //We need to unbind previous handlers, or else all handlers will be called.
	$('#continue-button').click(function(){
		initializeComplex();
	});
}

function initializeComplex() {

	$('#dog-pic').hide(); //Don't show icon.
	$('#continue-button').hide(); 
    $('#title').hide();
	$('#text').hide();
	$('#dog').show(); //Show dog interface now. 
    $('#visitors').show(); //Show visitors now.
    $('#next-button').hide();
	/*
	* 0 is Sarah
	* 1 is Terrence
	* 2 is Logan
	* 3 is Tony
	*/
    
    $('#instructions p').html("<br>" + criticNames[myDog.critic] + instructions);
	$('#picture').text(myDog.critic);
	$('#fetch').click(function() {
		$('#comments p').html("<q>" + positiveResponses[parseInt((Math.random() * positiveResponses.length), 10)] + "</q>"
							 + "<br>" + myDog.decisions[myDog.critic]);
        updateDogOptions();
	});
	$('#roll-over').click(function() {
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
    $('#next-button').click(function() {
        //update text
        myDog.critic++;
        $('#comments').hide();
        actionOk = true;
        $('#next-button').hide();
        $('#instructions p').html("<br>" + criticNames[myDog.critic] + instructions);
        //update animations
    });
}

function updateDogOptions() {
    $('#next-button').show();
    $('#comments').show();
	if (actionOk) {
        if (myDog.critic + 1 >= totalCritics) {
            prepareResultPages();
        }
        $('#picture').text(myDog.critic);
    }
    actionOk = false;
    
    
    //insert animations here
}
function prepareResultPages() {
	$('#dog').hide();
    $('#visitors').hide();
    $('#title').show();
	$('#continue-button').show();
	$('#continue-button').text("Take action");
	$('#continue-button').unbind();
	$('#continue-button').click(function(){
		initializeMoreInfo();
	});
	if (Math.random() <= myDog.adoptionChance)
		initializeWinPage();
	else
		initializeLosePage();
}

function initializeWinPage() {
	//Icon isn't shown.
	$('#text p').text(win); //Change text to win text.
	$('#text').show();
}

function initializeLosePage() {
	//Icon isn't shown.
	$('#text p').text(lose); //Change text to lose text.
	$('#text').show();
}

function initializeMoreInfo() {
	$('#text p').text("More info.");
	$('#continue-button').text("Play again.");
	$('#continue-button').click(function() {
		location.reload();
	});
}