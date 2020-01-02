var g_SwiperParent;
var g_SwiperItems = [];
appcan.ready(function() {
    // uexVideo.onPlayerClose = function(info){
    // uexWindow.evaluateScript("",0,"setOrientation(1)");
    // };
    // uexAudio.onPlayFinished = function(info){
    // uexWindow.evaluateScript("",0,"setOrientation(1)");
    // };
    loadData();
});
function loadData() {
    getBookInfo();
    if (bookInfo.videoFile && bookInfo.videoFile.length > 0) {
        $(".video").removeClass("uhide");
        $(".video").on("click", function() {
            //uexWindow.evaluateScript("",0,"setOrientation(2)");
            uexVideo.open(_SERVER_VIDEO_ADDRESS + bookInfo.videoFile, 0);
            // var param = {
            // src:_SERVER_ADDRESS + bookInfo.videoFile,
            // startTime:0,
            // autoStart:true,
            // forceFullScreen:true
            // };
            //
            // setTimeout(function(){
            // uexVideo.openPlayer(JSON.stringify(param));
            // },500)
        });

    }
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