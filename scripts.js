$(document).ready(function() {
	"use strict";

	var cards;
	var numberArray = Array(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10);
	var lastFlippedCard = null;

    $('#startGameButton').click(function() {
		$('#board').empty();
		shuffle(numberArray);
		createCards();
		setTimeout(flipAllCards, 1000);
		setTimeout(flipAllCards, 2000);
		setTimeout(enableAllFlipping, 3000);
		setTimeout(addGameLogic, 3000);
    });

    function addGameLogic () {
    	for (var i = 0; i < 20; i++) {
    		$("#card" + i).click(checkFlippings);
    	}
	}

	function checkFlippings() {


		if ($(this).hasClass('flipped')) {
			console.log("User is reverting his choice.");
			lastFlippedCard = null;
		} else {
			console.log("user is peeking into a card");
			if (lastFlippedCard === null) {
				lastFlippedCard = $(this);
			} else {
				console.log("users second peek. Here is potential money!");

				var temp = $(this).find("figure.front").find("img").attr("src");

				if (lastFlippedCard.find("figure.front").find("img").attr("src") === temp) {
					console.log("its a match! freeze cards");
					$(this).off('click');
					$(lastFlippedCard).off('click');
					lastFlippedCard = null;
				} else {
					$(this).addClass('flipped');
					$(lastFlippedCard).addClass('flipped');
					lastFlippedCard = null;
				}
			}

		}
	}


	function flipAllCards(){
		for (var i = 0; i < 20; i++) {
			cards[i].initialFlip();
		}
	}

	function disableAllFlipping() {
		for (var i = 0; i < 20; i++) {
			cards[i].offFlipping();
		}
	}

	function enableAllFlipping() {
		for (var i = 0; i < 20; i++) {
			cards[i].addOnClick();
		}
	}

	function createCards() {
		var counter = 0,
			tempCard = null;
			cards = [];

		for (counter = 0; counter < 20; counter++){
			tempCard = createCard(counter);
			cards.push(tempCard);
		}

		shuffle(cards);

		for (counter = 0; counter < 20; counter++){
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

});

