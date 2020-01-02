
appcan.ready(function() {
	isIPhoneX();
	
});
appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})

appcan.button("#feedback", "btn-act", function() {
    appcan.window.open("feedback", "feedback.html", 5);
})
appcan.button("#apphelp", "btn-act", function() {
    appcan.window.open("help_app", "help_app.html", 5);
})
appcan.button("#appqa", "btn-act", function() {
    appcan.window.open("help_qa", "help_qa.html", 5);
})