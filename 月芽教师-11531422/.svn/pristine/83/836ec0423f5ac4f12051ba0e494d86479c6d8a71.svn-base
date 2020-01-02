$('audio').audioPlayer();
var g_SwiperParent;
var g_SwiperItems = [];

appcan.ready(function() {

    loadData();

});
function loadData() {

    getProgramInfo();
    $(".hits").html(programInfo.hits + "次");
    $(".evaluateTimes").html(programInfo.evaluateTimes + "次");
    // $(".videos").attr("poster",_SERVER_ADDRESS + programInfo.posterImagePath);
    $(".main_content").html(programInfo.readGuide);

    //视频第一个图片
    if (programInfo.videoFile.length > 0) {
        $("#willesPlay").removeClass("uhide");
        $(".video").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.videoFile);
        if (!programInfo.posterImagePath) {
            $(".videos").attr("poster", _SERVER_ADDRESS + programInfo.image);
        } else {
            $(".videos").attr("poster", _SERVER_ADDRESS + programInfo.posterImagePath);

        }
    }

    if (programInfo.audioFile.length > 0) {
        $("#audio").removeClass("uhide");
        $(".audio").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.audioFile);

        $(".audios").css("background-image", "url(" + _SERVER_ADDRESS + programInfo.image + ")");

    }

}

function refesh() {
    loadData();
    appcan.window.close(-1);
}

window.onload = window.onresize = function() {
    resizeIframe();
}
var resizeIframe = function() {
    var bodyw = document.body.clientWidth;
    for (var ilength = 0; ilength <= document.getElementsByTagName("iframe").length; ilength++) {
        //设定高度
        document.getElementsByTagName("iframe")[ilength].height = bodyw * 9 / 16;
    }
}   