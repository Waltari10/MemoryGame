$(document).ready(function () {
    var flipped = false;
    var card = $("#card0");
    card.click(function() { flipFunction();});
    
    function flipFunction() {
        if (flipped) {
            flipped = false;
            card.removeClass('flip');
        } else {
            card.addClass("flip");
            flipped = true;
        }
    };
});

