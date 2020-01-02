

appcan.ready(function() {
	isIPhoneX();

	var titHeight = $('#header').offset().height;
	appcan.frame.open("content", "protocol_content.html", 0, titHeight);

});
appcan.button("#nav-left", "btn-act", function() {
	appcan.window.close(-1);
})

appcan.button("#nav-right", "btn-act", function() {
    appcan.window.open("privacy","privacy.html",10);
})