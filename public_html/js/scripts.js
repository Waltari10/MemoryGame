$(window).on('load', function () {
    $("#cover").hide();
});

$(document).ready(function () {
    "use strict";
    $('#startGameButton1').prop('disabled', false); //Fixes button being stuck on firefox
    var cards = null;
    var cardFileNames = Array("hammastynyt", "ihasteleva", "inhoava", "kiukkuinen", "kyllastynyt", "masentunut", "onnellinen", "peloissaan", "perusilme", "pettynyt", "surullinen", "ujo", "vihainen");
    var lastFlippedCard = null;
    var revealTime = 4000;
    var cardsOnTable = 16;
    var timeoutFunc = null;
    var fadeFlippedCardOutFunc = null;
    var flipRevertDelay = 2500;
    var audioMatch = "mp3/Oikein.wav";
    var audioMissMatch = "mp3/Vaarin.wav";
    
    $('#startGameButton1').click(function () {
        disableButton($(this), 5000);
        initGame();
    });

    function initGame() {
        playAudio("init");
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
                playAudio(audioMatch);
                $(this).off('click').addClass('solved').removeClass('clickable');
                $(lastFlippedCard).off('click').addClass('solved').removeClass('clickable');
                var temp1 = $(this);
                var temp2 = lastFlippedCard;
                fadeFlippedCardOutFunc = setTimeout(function () {
                    temp1.removeClass('flipAndZoom').addClass('scaleZeroRotate180');
                    temp2.removeClass('flipAndZoom').addClass('scaleZeroRotate180');
                }, flipRevertDelay + 500);
                enableAllFlipping();
                addGameLogic();
                areAllCardsMatched();
            } else {
                playAudio(audioMissMatch);
                var temp1 = $(this);
                var temp2 = lastFlippedCard;
                timeoutFunc = setTimeout(function () {
                    temp1.removeClass('flipAndZoom').addClass('scaleDown');
                    temp2.removeClass('flipAndZoom').addClass('scaleDown');
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
            if (!$("#card" + i).hasClass('solved')) {
                return false;
            }
        }
        setTimeout(function () {
            $('#instructions').text("Onneksi olkoon! Löysit kaikki parit!");
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
            if (!$("#card" + i).hasClass('solved')) {
                findCardById($("#card" + i).attr('id')).addOnClick();
            }
        }
    };
    function addGameLogic() {
        for (var i = 0; i < cardsOnTable; i++) {
            if (!$("#card" + i).hasClass('solved')) {
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
            
           
           if (counter < 4) {$('#' + tempCardd.id).css("top", "-40px");} else
           if (counter > 3 && counter < 8) {$('#' + tempCardd.id).css("top", "-80px");} else
           if (counter > 6 && counter < 12) {$('#' + tempCardd.id).css("top", "-120px");} else
           if (counter > 9) {$('#' + tempCardd.id).css("top", "-160px");}
   
           if (counter%4 === 0) {$('#' + tempCardd.id).css("-webkit-box-shadow", "0px 0px 10px 5px #7CFC00");}
           if (counter%4 === 1) {$('#' + tempCardd.id).css("-webkit-box-shadow", "0px 0px 10px 5px red");}
           if (counter%4 === 2) {$('#' + tempCardd.id).css("-webkit-box-shadow", "0px 0px 10px 5px blue");}
           if (counter%4 === 3) {$('#' + tempCardd.id).css("-webkit-box-shadow", "0px 0px 10px 5px brown");}
          
            
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
    
    function playAudio(source) {
        var audio = new Audio(source);
        audio.play();
    }
});

