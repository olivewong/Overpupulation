function updateDogOptions() {
    myDog.actionsLeft--;
    console.log("actions left: " + myDog.actionsLeft + " critics left: " + myDog.numCritics);
	if (myDog.actionsLeft < 0) {
		if (myDog.critic + 1 >= myDog.numCritics) {
	       prepareResultPages();
		}
		myDog.actionsLeft = 3;
		myDog.critic++;
        $('#picture').text(myDog.critic);
	}
}
function prepareResultPages() {
	$('#visitors').hide();
	$('#dog').hide();
	$('#continue-button').show();
	$('#continue-button').text("Get more information");
	$('#continue-button').unbind();
	$('#continue-button').click(function(){
		initializeMoreInfo();
	});
	if (dog.adoptionChance)
		initializeWinPage();
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