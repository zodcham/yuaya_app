
appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "exchange_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    exit();
})

appcan.button("#nav-right", "btn-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "doSubmit();");
})
function exit() {
    uexWindow.evaluatePopoverScript("mall", "content", "reloadData();");
    appcan.window.close(-1);
}