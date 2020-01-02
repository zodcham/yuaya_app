

appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "book_Famousteache_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {
    var json={"title":"精品资源","content":"听月芽团队讲述图书相关的故事。"};
    appcan.alert(json);
})
