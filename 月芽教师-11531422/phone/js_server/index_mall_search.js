appcan.ready(function() {
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            exit();
        }
    }
    uexWindow.setReportKey(0, 1);

    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "index_mall_search_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function exit() {
    uexWindow.evaluatePopoverScript("", "content", "exit();");
}

function close() {
    appcan.window.close(-1);
}
