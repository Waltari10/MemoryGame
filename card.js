function card(id) {
	this.id = id;
	this.flipped = false;
	this.image = null;

	this.flip = function() {

		$("#" + this.cardID).flip({
			content: this.getBackContent(),
			onEnd: this.onFlipComplete()
		});

		console.log("flipped");

		$("#" + this.id + " img").show();
		
		this.flipped = true;

	};

	this.revertFlip = function () {

		$("#" + this.id + " img").hide();
		
		$("#" + this.id).revertFlip();

		this.flipped = false;
	};

	this.getHTML = function () {
		return '<div id="' + this.id + '" class=card> <div class="back">' + "<img src='" + this.image + "'>" + '</div> <div class="front"> <img src="etu.jpg">  </div> </div>';
	};

	this.setImage = function (counter) {
		this.image = "taka" + counter + ".jpg";
	}
}