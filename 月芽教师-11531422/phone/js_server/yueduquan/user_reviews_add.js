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
    appcan.frame.open("content", "user_reviews_add_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})
function exit() {
    appcan.window.close(-1);
}

appcan.button("#nav-right", "btn-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "doSubmit();");
})
