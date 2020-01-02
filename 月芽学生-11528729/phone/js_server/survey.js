

appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "survey_content.html", 0, titHeight);
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})