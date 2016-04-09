
function card(id) {
	"use strict";
	this.id = id;
	this.flipped = false;
	this.image = null;

	this.flip = function() {

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

	


	this.addOnClick = function() {
		$("#" + id).click(this.flip);
	}

	this.offFlipping = function() {
		$("#" + id).off('click');
	}

	this.onFlipping = function() {
		$("#" + id).on('click');
	}

	this.getHTML = function () {
		return '<div id="' + this.id + '" class="card flipped"> <figure class="back">' + "<img src='etu.jpg'>" + '</figure> <figure class="front">' + "<img src='" + this.image + "'>" +  '</figure> </div>';
	};

	this.setImage = function (counter) {
		this.image = "taka" + counter + ".jpg";
	}
}