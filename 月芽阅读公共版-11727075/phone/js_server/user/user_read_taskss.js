

appcan.ready(function() {
	isIPhoneX();
    var titHeight = 355;
    var win_url=location.href;
    var win="";
    if(win_url.indexOf("f=root")>0){
        win="?f=root";
    }
    appcan.frame.open("content", "user_read_taskss_content.html"+win, 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});

appcan.button("#nav-left", "btn-act", function() {
    rootopenPlayer();
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {

    var json={"title":"我的任务","content":"列出老师发布给我的阅读任务。\n任务完成条件：\n1、规定时间内完成测评。\n2、测评成绩60分及以上。\n3、读后感为必写时，写读后感。\n4、要求的必写的读后感，老师给的评级为合格及以上。"};
    appcan.alert(json);
})