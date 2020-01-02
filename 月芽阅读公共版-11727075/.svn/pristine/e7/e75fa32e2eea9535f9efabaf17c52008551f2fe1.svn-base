

appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "book_introduct_content.html"+GetUrlRootPar(), 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});

appcan.button("#nav-left", "btn-act", function() {
    rootopenPlayer();
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {
    var json={"title":"导读视频","content":"月芽团队为推荐书单的图书持续研发导读视频，通过平台播放，达到吸引阅读，梳理文本，提炼书本核心，引导阅读的作用。"};
    appcan.alert(json);
})