

appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "book_review_historys_content.html"+GetUrlRootPar(), 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});


appcan.button("#nav-left", "btn-act", function() {
    rootopenPlayer();
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {
    var json={"title":"测评记录","content":"列出我所有的图书测评记录。\n为提高阅读质量，每本书每天可免费测评3次，第4次起消耗财富值。测评通过条件：60分以上。"};
    appcan.alert(json);
})