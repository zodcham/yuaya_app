
appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    getCommInfo();
    if (commInfo.activityAddress.length > 0) {
        appcan.frame.open("content", commInfo.activityAddress, 1, titHeight);
    } else {
        appcan.frame.open("content", "activity_content.html", 0, titHeight);
    }
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})