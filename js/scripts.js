$(window).on('load', function () {
    $("#cover").hide();
});

var height, width;

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }

    height = $(window).height(); 
    width = $(window).width(); 
    
    if (height < 300) {
        $("body").css("width", "300px").css("height", "300px");
    } else if (width < 300) {
        $("body").css("width", "300px").css("height", "300px");
    } else if (width > height) {
        $("body").css("width", height).css("height", width);
    } else {
        $("body").css("width", width).css("height", height);
    }

};



$(document).ready(function () {
    "use strict";
    addEvent(window, "resize", addEvent);
    $('#startGameButton').prop('disabled', false); //Fixes button being stuck on firefox
    var cards = null;
    var cardFileNames = Array("hammastynyt", "ihasteleva", "inhoava", "kiukkuinen", "kyllastynyt", "masentunut", "onnellinen", "peloissaan", "perusilme", "pettynyt", "surullinen", "ujo", "vihainen");
    var lastFlippedCard = null;
    var revealTime = 4000;
    var cardsOnTable = 16;
    var timeoutFunc = null;
    var fadeFlippedCardOutFunc = null;
    var flipRevertDelay = 2500;
    var sound = false;
    var audio = new Audio('aani/complete.wav');
    audio.load(); // Needed on safari / idevice
    
    $('#speakerIcon').click(function() {
        if (!sound) {
            $('#speakerIcon').toggleClass('opacity30');
            sound = true;
            playSound();
        } else {
            $('#speakerIcon').toggleClass('opacity30');
            sound = false;
        }
    });

    $('#startGameButton').click(function () {
        disableButton($(this), 5000);
        initGame();
    });

    function initGame() {
        $('#menu').hide();
        lastFlippedCard = null;
        $('#board').empty();
        clearTimeout(timeoutFunc);
        shuffle(cardFileNames);
        createCards();
        setTimeout(flipAllCards, 500);
        setTimeout(flipAllCards, revealTime);
        setTimeout(enableAllFlipping, revealTime + 500);
        setTimeout(addGameLogic, revealTime + 500);
    };

    function disableButton(btn, time) {
        btn.prop('disabled', true);
        setTimeout(function () {
            btn.prop('disabled', false);
        }, time);
    };

    function checkFlippings() {
        if (lastFlippedCard === null) {
            lastFlippedCard = $(this);
        } else {
            if (lastFlippedCard.attr("id") === $(this).attr("id")) {
                return;
            }
            disableAllFlipping();
            if (lastFlippedCard.find(".back").find("img").attr("src") === $(this).find(".back").find("img").attr("src")) {
                playSound();
                $(this).find("img").addClass('solved');
                $(lastFlippedCard).find("img").addClass('solved');
                $(this).off('click').removeClass('clickable');
                $(lastFlippedCard).off('click').removeClass('clickable');
                var temp1 = $(this);
                var temp2 = lastFlippedCard;
                fadeFlippedCardOutFunc = setTimeout(function () {
                    temp1.removeClass('flip').addClass('scaleZeroRotate180');
                    temp2.removeClass('flip').addClass('scaleZeroRotate180');
                }, flipRevertDelay + 500);
                enableAllFlipping();
                addGameLogic();
                areAllCardsMatched();
            } else {
                var temp1 = $(this);
                var temp2 = lastFlippedCard;

                setTimeout(function () {
                    temp1.find(".back").find("img").toggleClass('scale', 300);    
                    temp2.find(".back").find("img").toggleClass('scale', 300);    
                }, 2000);

                timeoutFunc = setTimeout(function () {
                    temp1.removeClass('flip');
                    temp2.removeClass('flip');
                    temp1.find(".front").removeClass("invisible");
                    temp1.find(".back").removeClass('visible');
                    temp2.find(".front").removeClass("invisible");
                    temp2.find(".back").removeClass('visible');
                    enableAllFlipping();
                    addGameLogic();
                }, 3500);
            }
            lastFlippedCard = null;
        }
        
    };

    function areAllCardsMatched() {
        for (var i = 0; i < cardsOnTable; i++) {
            if (!$("#card" + i).find('img').hasClass('solved')) {
                return false;
            }
        }
        setTimeout(function () {
            $('#instructions').text("Onneksi olkoon! Löysit kaikki tunneparit!");
            $('#menu').show();
        }, flipRevertDelay);
        return true;
    };

    function flipAllCards() {
        for (var i = 0; i < cardsOnTable; i++) {
            cards[i].initialFlip();
        }
    };

    function disableAllFlipping() {
        for (var i = 0; i < cardsOnTable; i++) {
            cards[i].offFlipping();
        }
    };

    function enableAllFlipping() {
        for (var i = 0; i < cardsOnTable; i++) {
            if (!$("#card" + i).find('img').hasClass('solved')) {
                findCardById($("#card" + i).attr('id')).addOnClick();
            }
        }
    };
    function addGameLogic() {
        for (var i = 0; i < cardsOnTable; i++) {
            if (!$("#card" + i).find('img').hasClass('solved')) {
                $("#card" + i).click(checkFlippings);
            }
        }
    };

    function findCardById(id) {
        for (var i = 0; i < cardsOnTable; i++) {
            if (cards[i].id === id) {
                return cards[i];
            }
        }
        return false;
    };

    function createCards() {
        var counter = 0,
                tempCard1 = null;
        cards = [];
        for (counter = 0; counter < cardsOnTable - (cardsOnTable / 2); counter++) {
            tempCard1 = createCard(counter, cardFileNames[counter]);
            cards.push(tempCard1);
        }
        var pair = 0;
        for (counter = cardsOnTable - (cardsOnTable / 2); counter < cardsOnTable; counter++) {
            tempCard1 = createCard(counter, cardFileNames[pair]);
            pair++;
            cards.push(tempCard1);
        }
        shuffle(cards);
        for (counter = 0; counter < cardsOnTable; counter++) {
            var tempCardd = cards[counter];
            $('#board').append(tempCardd.getHTML());
        }
    };

    function createCard(id, cardImg) {
        var tempCard = new card("card" + id);
        tempCard.setImage(cardImg);
        return tempCard;
    };

    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    };

    function playSound() {
        if (sound) {
            audio.load(); // Needed on safari / idevice
            audio.play();
        }
    }
});

