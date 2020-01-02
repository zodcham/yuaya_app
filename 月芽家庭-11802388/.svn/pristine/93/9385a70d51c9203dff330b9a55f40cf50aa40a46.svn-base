

appcan.ready(function() {
	isIPhoneX();

	var titHeight = $('#header').offset().height;
	//appcan.frame.open("content", "http://www.readseed.cn/static/handbook/app_help_h5.html", 0, titHeight);
	appcan.frame.open("content", "help_app_content.html", 0, titHeight);
	window.onorientationchange = window.onresize = function() {
		appcan.frame.resize("content", 0, titHeight);
	}
});
appcan.button(".nav-btn", "btn-act", function() {
	appcan.window.close(-1);
})