
appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open({
            id : 'content',
            url : 'message_content.html',
            left : 0,
            top : titHeight,
            name : 'message_content'
        });

    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button(".nav-btn", "btn-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "refesh();");
    appcan.window.close(-1);
})