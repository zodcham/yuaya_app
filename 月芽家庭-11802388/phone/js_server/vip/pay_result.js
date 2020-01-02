

appcan.ready(function() {
	isIPhoneX();

	$("#title").html("支付成功");
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "pay_result_content.html", 0, titHeight);
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