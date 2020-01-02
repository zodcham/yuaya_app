

appcan.ready(function() {
    isIPhoneX();

    var titHeight = $('#header').offset().height;

    appcan.frame.open("content", "Readcontents_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
    getSysInfo();
    config.isMainWin = true;
    $("#title").html(sysInfo.ranking.name);

});

appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "switchs();");
})