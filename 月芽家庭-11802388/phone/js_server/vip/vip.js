

appcan.ready(function() {
	isIPhoneX();
    openContent();
    window.onorientationchange = window.onresize = function() {
		var titHeight = $('#header').offset().height;
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})

appcan.button("#nav-right", "btn-act", function() {
    appcan.window.open("help", "../help.html", 5);
})

function openContent(){
	var titHeight = $('#header').offset().height;
	appcan.frame.open("content", "vip_content.html", 0, titHeight);
}