

appcan.ready(function() {
	isIPhoneX();
	
    getBookInfo();
    $("#title").html(bookInfo.name);
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "book_comments_add_content.html", 0, titHeight);
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