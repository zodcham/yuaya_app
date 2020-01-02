appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').height();
    appcan.frame.open("content", "Read_content.html"+GetUrlRootPar(), 0, titHeight);

    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    rootopenPlayer();
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {
    //uexWindow.evaluatePopoverScript("", "content", "switchs();");
    var json={"title":"课程领读","content":"提供精品图书领读PPT。"};
    appcan.alert(json);
})