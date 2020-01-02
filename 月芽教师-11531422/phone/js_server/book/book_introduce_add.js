var isOpenChooseImg = false;

appcan.ready(function() {
	isIPhoneX();
	
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            if (isOpenChooseImg) {
                uexWindow.evaluatePopoverScript("", "content", "closeAddImg();");
            } else {
                appcan.window.close(-1);
            }
        }
    }
    uexWindow.setReportKey(0, 1);

    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "book_introduce_add_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})
