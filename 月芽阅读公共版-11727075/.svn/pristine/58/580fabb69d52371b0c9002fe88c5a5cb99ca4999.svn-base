

appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "good_book_content.html"+GetUrlRootPar(), 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});

appcan.button("#nav-left", "btn-act", function() {
    rootopenPlayer();
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {
    var json={"title":"好书推荐","content":"为您推荐各类优质图书。"};
    appcan.alert(json);
})