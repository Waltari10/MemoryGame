$(document).ready(function() {
	"use strict";

	var cards;
	var numberArray = Array(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10);
	var lastFlippedCard = null; //This is made null when it should not be sometimes.
	var revealTime = 4000;
	var cardAmount = 20;
	var timeoutFunc = null;
	var flips = 0;

    $('#startGameButton1').click(function() {
    	disableButton($(this), 5000);
    	initGame();
    });

    $('#startGameButton2').click(function() {
    	disableButton($(this), 5000);
    	initGame();
    });

    $('#highScoreButton').click(function() {
    	disableButton($(this), 5000);
    	
    });

    $('#saveScoreButton').click(function() {
    	//localStorage.clear();
    	var scores = localStorage["scores"];
    	if (scores != null ) {
    		var scoreObj = JSON.parse(scores);
    		scoreObj['scores'].push({"name" : $("#playerName").val(), "score" : $("#flips").text()});
    		localStorage["scores"] = JSON.stringify(scoreObj)
    	} else {
    		var scoreText = "{\"scores\":[{\"name\": \"" + $("#playerName").val() + "\" , \"score\":" + $("#flips").text() + "}]}";
    		localStorage["scores"] = scoreText;
    	}

    	console.log(localStorage["scores"]);
    });

    function addscores() {
    	localstorage[high]
    }

    function initGame(){
    	flips = 0;
		$("#flips").text(flips);
		$("#voittoBanneri").hide();
    	$('#board').empty();
    	clearTimeout(timeoutFunc);
		shuffle(numberArray);
		createCards();
		setTimeout(flipAllCards, 500);
		setTimeout(flipAllCards, revealTime);
		setTimeout(enableAllFlipping, revealTime + 500);
		setTimeout(addGameLogic, revealTime + 500);
    }

    function disableButton(btn, time) {
    	btn.prop('disabled', true);
    	setTimeout(function() {
    		btn.prop('disabled', false);
    	}, time);
    }

	function checkFlippings() {
		flips++;
		$("#flips").text(flips);


		if (!$(this).hasClass('flipped')) {
			console.log("User is reverting his choice.");
			lastFlippedCard = null;
		} else {
			console.log("user is peeking into a card");
			if (lastFlippedCard === null) {
				lastFlippedCard = $(this);
			} else {
				disableAllFlipping();

				if (lastFlippedCard.find("figure.back").find("img").attr("src") === $(this).find("figure.back").find("img").attr("src")) {
					console.log("its a match! freeze cards");
					$(this).off('click').addClass('solved').removeClass('clickable');
					$(lastFlippedCard).off('click').addClass('solved').removeClass('clickable');
					enableAllFlipping();
					addGameLogic();
					//Check if player won!
					console.log(areAllCardsMatched());
					playAudio("mp3/applause.mp3");

				} else {
					playAudio("mp3/no.mp3");
					var temp1 = $(this);
					var temp2 = lastFlippedCard;
					timeoutFunc = setTimeout(function () {
						temp1.removeClass('flipped');
						temp2.removeClass('flipped');
						enableAllFlipping();
						addGameLogic();
					}, 2000);
				}
				lastFlippedCard = null;
			}

		}
	}

	function areAllCardsMatched() {
		for (var i = 0; i < cardAmount; i++) {
			if (!$("#card" + i).hasClass('solved')) {

				return false;
			}
		}
		console.log("victuaa");
		$("#voittoBanneri").show();
		return true;
	}

	function flipAllCards(){
		for (var i = 0; i < cardAmount; i++) {
			cards[i].initialFlip();
		}
	}

	function disableAllFlipping() {
		for (var i = 0; i < cardAmount; i++) {
			cards[i].offFlipping();
		}
	}

	function enableAllFlipping() {
		for (var i = 0; i < cardAmount; i++) {
			if (!$("#card" + i).hasClass('solved')) { 
				findCardById($("#card" + i).attr('id')).addOnClick();
			}
		}
	}

	 function addGameLogic () {
    	for (var i = 0; i < cardAmount; i++) {
    		if (!$("#card" + i).hasClass('solved')) {
    			$("#card" + i).click(checkFlippings);
    		}
    	}
	}

	function findCardById(id) {
		for (var i = 0; i < cardAmount; i++) {
			if (cards[i].id === id) {
				return cards[i];
			}
		}
		return false;
	}

	function createCards() {
		var counter = 0,
			tempCard = null;
			cards = [];

		for (counter = 0; counter < cardAmount; counter++){
			tempCard = createCard(counter);
			cards.push(tempCard);
		}

		shuffle(cards);

		for (counter = 0; counter < cardAmount; counter++){
			$('#board').append(cards[counter].getHTML());
		}
	}

	function createCard(counter) {
		var tempCard = new card("card" + counter);
		tempCard.setImage(numberArray[counter]);
		return tempCard;
	}

	function shuffle(a) {
	    var j, x, i;
	    for (i = a.length; i; i -= 1) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	}

	function playAudio(sAudio) {
		var audioElement = document.getElementById('audioEngine');
				
		if(audioElement !== null) {

			audioElement.src = sAudio;
			audioElement.play();
		}	
	}

});

