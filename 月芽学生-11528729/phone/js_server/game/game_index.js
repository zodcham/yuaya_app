

appcan.ready(function() {
	isIPhoneX();
    getUserInfo();
    //var par = {"userid" : userInfo.id, "page":g_page};

    var titHeight = $('#header').offset().height;
    appcan.frame.open("idiom_content", "game_index_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("idiom_content", 0, titHeight);
    }
});
appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})
function reload() {
    titHeight = $('#header').offset().height;
    appcan.frame.open("idiom_content", "game_index_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("idiom_content", 0, titHeight);
    }
}