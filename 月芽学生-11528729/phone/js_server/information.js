

appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    getUserInfo();
    getProgramInfo();
    getCommInfo();

    if (programInfo.weixingLink.length > 0) {
        AddLogContent(userInfo.id, logKeys.BookLibGrade, {"programId":programInfo.id});
        appcan.frame.open("content", programInfo.weixingLink, 1, titHeight);
    } else {
        //appcan.frame.open("content", "information_content.html", 0, titHeight);
        appcan.frame.open({
            id : 'content',
            url : 'information_content.html',
            left : 0,
            top : titHeight,
            name : 'newscontent'
        });
    }

    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button(".nav-btn", "btn-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "refesh();");
    appcan.window.close(-1);
})