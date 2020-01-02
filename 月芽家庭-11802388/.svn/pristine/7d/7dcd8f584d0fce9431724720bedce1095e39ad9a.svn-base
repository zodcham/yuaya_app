var g_SwiperParent;
var g_SwiperItems = [];
appcan.ready(function() {
    // uexVideo.onPlayerClose = function(info){
    // uexWindow.evaluateScript("",0,"setOrientation(1)");
    // };
    // uexAudio.onPlayFinished = function(info){
    // uexWindow.evaluateScript("",0,"setOrientation(1)");
    // };
    $("#main").removeClass("ub");
    loadData();
});
function loadData() {
    getBookInfo();
    
    if (bookInfo.image.length > 0) {
        $(".bookImg").attr("src", _SERVER_ADDRESS + bookInfo.image);
    }
    $(".author").html(bookInfo.author);
    $(".publisher").html(bookInfo.publisher);
    $(".wordCount").html(bookInfo.wordCount + "千字");
    $("#main").html(bookInfo.readGuide);

}

function closePlayer() {
    //uexVideo.closePlayer();
}