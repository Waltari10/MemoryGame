function card(id) {
    "use strict";
    this.id = id;
    this.flipped = false;
    this.image = null;

    this.flip = function () {
        $("#" + id).removeClass('scaleDown').addClass("flipAndZoom"); 
        $("#" + id + " .front").removeClass('visible');
        $("#" + id + " .front").addClass('invisible');
        $("#" + id + " .back").addClass('visible');
        $("#" + id + " .back").removeClass('invisible');
        
    };

    this.initialFlip = function () {
        if ($("#" + id).hasClass("flip")) {
            $("#" + id + " .front").removeClass('invisible');
            $("#" + id + " .back").removeClass('visible');
            $("#" + id).removeClass("flip").addClass('scaleDown');
        } else {
            $("#" + id + " .front").removeClass('visible');
            $("#" + id + " .front").addClass('invisible');
            $("#" + id + " .back").addClass('visible');
            $("#" + id + " .back").removeClass('invisible');
            $("#" + id).removeClass("scaleDown").addClass("flip");
        }
    }

    this.addOnClick = function () {
        $("#" + id).click(this.flip).addClass('clickable');
    }

    this.offFlipping = function () {
        $("#" + id).off('click').removeClass('clickable');
    }

    this.onFlipping = function () {
        $("#" + id).on('click');
    }

    this.getHTML = function () {
        return '<div id="' + this.id + '" class="card scaleDown"> <div class="front">' + "<img src='jpg/etu.jpg'>" + '</div> <div class="back">' + "<img src='jpg/" + this.image + "'></div> </div>";
    };

    this.setImage = function (name) {
        this.image = name + ".jpg";
    }
}