

appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "share_index_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})

appcan.button("#Forward", "btn-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "Forward();");
})
// uinputs
appcan.button("#uinputs", "btn-act", function() {
    appcan.window.open("user_reviews_add", "user_reviews_add.html", 5);
})