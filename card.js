function card(id) {
	this.id = id;
	this.flipped = false;
	this.image = null;

	this.flip = function() {

		$("#" + this.cardID).flip({
			content: this.getBackContent(),
			onEnd: this.onFlipComplete()
		});

		$("#" + this.id + " img").show();
		
		this.flipped = true;

	};

	this.revertFlip = function () {

		$("#" + this.id + " img").hide();
		
		$("#" + this.id).revertFlip();

		this.flipped = false;
	};

	this.getBackContent  function () {
		return 'img src="' + this.backContentImage + '"/>';
	};
}