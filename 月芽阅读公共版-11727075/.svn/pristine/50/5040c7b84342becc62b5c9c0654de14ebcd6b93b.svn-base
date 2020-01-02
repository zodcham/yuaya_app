

appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "user_report_search_content.html"+GetUrlRootPar(), 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    rootopenPlayer();
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {

    var json={"title":"阅读报告","content":"收集我的阅读数据，记录我的阅读轨迹，生成我的阅读报告。"};
    appcan.alert(json);
})