$(window).on('load', function () {
    $("#cover").hide();
});

$(document).ready(function () {
    "use strict";
    $('#startGameButton1').prop('disabled', false); //Fixes button being stuck on firefox
    var cards = null;
    var cardFileNames = Array("viha", "inho", "kateus", "ahneus", "ilo", "pelko", "kauhu", "rakkaus", "kipu", "häpeä", "ylpeys", "nautinto", "yksinäisyys", "nälkä", "paranoija", "tyytyväisyys", "hämmennys");
    var lastFlippedCard = null;
    var revealTime = 4000;
    var cardsOnTable = 20;
    var timeoutFunc = null;
    var fadeFlippedCardOutFunc = null;
    var tries = 0;
    var highScoreDisplayAmount = 10;
    var flipRevertDelay = 2500;
    var matchAudio = "mp3/match.wav";
    var incorrectMatchAudio = "mp3/missmatch.wav";
    var soundEnabled = true;
    
    var hasStorage = (function () {
        try {
            localStorage["test"] = "test";
            localStorage.removeItem("test");
            return true;
        } catch (exception) {
            return false;
        }
    }());

    displayHighScores(highScoreDisplayAmount, hasStorage);
    
    $('#soundSettings').click(function () {
       disableButton($(this), 100);
       toggleSound();
    });
    
    function toggleSound () {
        if (soundEnabled) {
            soundEnabled = false;
            $('#soundSettings').empty();
            $('#soundSettings').append("äänet: päällä / <b>pois</b>");
        } else {
            soundEnabled = true;
            $('#soundSettings').empty();
            $('#soundSettings').append("äänet: <b>päällä</b> / pois");
        }
    };
    
    $('#startGameButton1').click(function () {
        console.log("new game pressed");
        disableButton($(this), 5000);
        initGame();
    });

    $('#startGameButton2').click(function () {
        disableButton($(this), 5000);
        initGame();
    });

    $('#saveScoreButton').click(function () {
        if ($("#playerName").val().length < 3) {
            alert("Nimi on liian lyhyt.");
            return;
        }
        if ($("#playerName").val().length > 12) {
            alert("Nimi on liian pitkä.");
            return;
        }
        if ($("#tries").text() < cardsOnTable) {
            //alert ("cheater!");
            //return;
        }
        if (hasStorage) {
            var scores = localStorage["scores"];
            if (scores != null) {
                var scoreObj = JSON.parse(scores);
                var newScore = {"name": $("#playerName").val(), "score": $("#tries").text()};
                scoreObj.push(newScore);
                scoreObj = sortScores(scoreObj);
                localStorage["scores"] = JSON.stringify(scoreObj);
            } else {
                var scoreText = "[{\"name\": \"" + $("#playerName").val() + "\" , \"score\":" + $("#tries").text() + "}]";
                localStorage["scores"] = scoreText;
            }
        }
        $("#voittoBanneri").removeClass("moveDown");
        displayHighScores(highScoreDisplayAmount, hasStorage);
    });

    function initGame() {
        lastFlippedCard = null;
        tries = 0;
        $("#tries").text(tries);
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
        console.log("disabled true");
        setTimeout(function () {
            btn.prop('disabled', false);
            console.log("disabled false");
        }, time);
    };

    function checkFlippings() {
        if (lastFlippedCard === null) {
            lastFlippedCard = $(this);
        } else {
            if (lastFlippedCard.attr("id") === $(this).attr("id")) {
                return;
            }
            tries++;
            $("#tries").text(tries);
            disableAllFlipping();
            if (lastFlippedCard.find("figure.back").find("img").attr("src") === $(this).find("figure.back").find("img").attr("src")) {
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
                console.log(areAllCardsMatched());
                playAudio(matchAudio);
            } else {
                playAudio(incorrectMatchAudio);
                var temp1 = $(this);
                var temp2 = lastFlippedCard;
                timeoutFunc = setTimeout(function () {
                    temp1.removeClass('flipAndZoom').addClass('scaleDown');
                    temp2.removeClass('flipAndZoom').addClass('scaleDown');
                    enableAllFlipping();
                    addGameLogic();
                }, flipRevertDelay);
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
        $("#voittoBanneri").addClass("moveDown");
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

    function playAudio(sAudio) {
        if (soundEnabled) {
            var audioElement = document.getElementById('audioEngine');
            if (audioElement !== null) {
                audioElement.src = sAudio;
                audioElement.play();
            }
        }
    };
});

