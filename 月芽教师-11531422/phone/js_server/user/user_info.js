var isOpenSheet = false;

appcan.ready(function() {
	isIPhoneX();
	
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            if (isOpenSheet) {
                //关闭选择界面
                appcan.frame.close("actionSheet");
                isOpenSheet = false;
            } else {
                appcan.window.close(-1);
            }
        }
    }
    uexWindow.setReportKey(0, 1);
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "user_info_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})

function reload() {
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "user_info_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
}