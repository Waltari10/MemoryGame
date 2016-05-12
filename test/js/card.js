function card(id) {
    "use strict";
    this.id = id;
    this.flipped = false;
    this.image = null;

    this.flip = function () {
        if (!$("#" + id).hasClass("flip")) {

            $("#" + id).addClass("flip"); 
            $("#" + id + " .front").removeClass('visible');
            $("#" + id + " .front").addClass('invisible');
            $("#" + id + " .back").addClass('visible');
            $("#" + id + " .back").removeClass('invisible');

            /*setTimeout(function () {
                $("#" + id).find(".back").find("img").toggleClass('scale', 300);
            }, 500);*/
        }
    };

    this.initialFlip = function () {
        if ($("#" + id).hasClass("flip")) {
            $("#" + id + " .front").removeClass('invisible');
            $("#" + id + " .back").removeClass('visible');
            $("#" + id).removeClass("flip");
        } else {
            $("#" + id + " .front").removeClass('visible');
            $("#" + id + " .front").addClass('invisible');
            $("#" + id + " .back").addClass('visible');
            $("#" + id + " .back").removeClass('invisible');
            $("#" + id).addClass("flip");
        }
    };

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
        return '<div id="' + this.id + '" class="card"> <div class="front">' + "<img src='png/etu.png'>" + '</div> <div class="back">' + "<img src='png/" + this.image + "'></div> </div>";
    };

    this.setImage = function (name) {
        this.image = name + ".png";
    }
}