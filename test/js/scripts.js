$(document).ready(function () {
    var flipped = false;
    var card = $("#card0");
    var figureFront = $("#card0 .front");
    var figureBack = $("#card0 .back");
    card.click(function() { 
        flipFunction();});
    
    function flipFunction() {
        if (flipped) { //card flipped so front is invisible and back is visible. 
            flipped = false;
            
            figureFront.removeClass('invisible');
            figureBack.removeClass('visible');  
            card.removeClass('flip');
            
        } else {  //card not flipped so front is visible and back is invisible
            flipped = true;
            
            figureFront.removeClass('visible');
            figureFront.addClass('invisible');

            figureBack.addClass('visible');
            figureBack.removeClass('invisible');
            
            card.addClass('flip');
        }
    };
});

