
appcan.ready(function() {
	isIPhoneX();
	
    getProgramInfo();
    $("#title").html(programInfo.name);
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "column_comments_add_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function exit() {
    appcan.window.close(-1);
}
