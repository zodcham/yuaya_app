appcan.ready(function() {
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            exit();
        }
    }
    uexWindow.setReportKey(0, 1);
    getBookInfo();
    uexWindow.setOrientation(2);
    var param = {
        src : _SERVER_ADDRESS + bookInfo.videoFile,
        startTime : 0,
        autoStart : true,
        forceFullScreen : false,
        showCloseButton : false,
        showScaleButton : false,
        scrollWithWeb : true
    };
    setTimeout(function() {
        uexVideo.openPlayer(JSON.stringify(param));
    }, 500);
});

appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function exit() {
    uexVideo.closePlayer();
    uexWindow.setOrientation(1);
    appcan.window.close(-1);
}
