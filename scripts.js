var cards = new Array();

$(document).ready(function() {
     
    $('#startGameButton').click(function() {
     
        initTiles();
         
       // setTimeout("revealTiles(function() { onPeekStart(); })",iInterval);
 
    });
});

function initTiles() {
	var counter = 0,
		card = null;

	for (counter = 0; counter < 20; counter++){
		card = createCard(counter);
		$('#board').append(card.getHTML());
		tiles.push(card);
	}
}

function createCard(counter) {

	var card = new card("card" + counter);

	

	return card;
}

function revealTiles() {


}