$(document).ready(function () {
    "use strict";
    
    var card = $("#card0");
    
    card.click(function() { flipFunction();});
    
    function flipFunction() {
        card.addClass("flipAndZoom");
        setTimeout(function () {
            card.removeClass('flipAndZoom');
        }, 3500);
    };
    
});

