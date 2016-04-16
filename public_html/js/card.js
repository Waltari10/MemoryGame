function card(id) {
    "use strict";
    this.id = id;
    this.flipped = false;
    this.image = null;

    this.flip = function () {

        if ($("#" + id).hasClass("flipped")) {
            $("#" + id).removeClass("flipped");
        } else {
            $("#" + id).addClass("flipped");
        }
    };

    this.initialFlip = function () {
        if ($("#" + id).hasClass("flipped")) {
            $("#" + id).removeClass("flipped");
        } else {
            $("#" + id).addClass("flipped");
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
        return '<div id="' + this.id + '" class="card"> <figure class="front">' + "<img src='jpg/etu.jpg'>" + '</figure> <figure class="back">' + "<img src='jpg/" + this.image + "'>" + '</figure> </div>';
    };

    this.setImage = function (name) {
        this.image = name + ".jpg";
    }
}