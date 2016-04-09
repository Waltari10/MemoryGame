var cards = new Array();
var numberArray = new Array(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10);

$(document).ready(function() {
     
    $('#startGameButton').click(function() {
    	 $('#board').empty();
         shuffle(numberArray);
         initcards();

         $("#card0").flip();
         $("#card2").flip();
         $("#card3").flip();
         $("#card4").flip();
         $("#card5").flip();
         $("#card6").flip();
         $("#card7").flip();
         $("#card8").flip();
         $("#card9").flip();
         $("#card10").flip();
         $("#card11").flip();
         $("#card12").flip();
         $("#card13").flip();
         $("#card14").flip();
         $("#card15").flip();
         $("#card16").flip();
         $("#card17").flip();
         $("#card18").flip();
         $("#card19").flip();
         $("#card1").flip();

 
    });
});

function initcards() {
	var counter = 0,
		tempCard = null;

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
	tempCard = new card("card" + counter);
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