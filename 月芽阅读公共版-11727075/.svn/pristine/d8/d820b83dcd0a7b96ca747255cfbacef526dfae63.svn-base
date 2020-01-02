

appcan.ready(function() {
	isIPhoneX();

    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "newslist_content.html"+GetUrlRootPar(), 0, 382);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button(".nav-btn", "btn-act", function() {
    closeWinToHome();
})

function closeWinToHome(){
    rootopenPlayer();
    appcan.window.close(-1);
}