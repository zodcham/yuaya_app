

appcan.ready(function() {
    getSysInfo();
    var url="";
    switch(sysInfo.keytype) {
        case 30:
            url=_WECHATSHOP_URL30;
            break;
        case 90:
            url=_WECHATSHOP_URL90;
            break;
        case 180:
            url=_WECHATSHOP_URL180;
            break;
        default:
            url=_WECHATSHOP_URL360;
            break;
    }

	isIPhoneX();
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", url, 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})

appcan.button("#nav-right", "btn-act", function() {
    appcan.window.open("help", "../help.html", 5);
})