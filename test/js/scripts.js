$(document).ready(function () {
    var flipped = false;
    var card = $("#card0");
    card.click(function() { flipFunction();});
    
    function flipFunction() {
        if (flipped) {
            flipped = false;
            card.removeClass('flipAndZoom');
            card.removeClass('flip');
        } else {
            card.addClass("flip");
    
            setTimeout(function () {
                card.addClass("flipAndZoom");
            }, 1000);
            flipped = true;
        }
    };
});

