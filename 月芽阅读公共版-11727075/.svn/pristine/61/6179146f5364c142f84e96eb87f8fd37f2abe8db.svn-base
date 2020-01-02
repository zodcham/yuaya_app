$('audio').audioPlayer();
var g_SwiperParent;
var g_SwiperItems = [];
appcan.ready(function() {

    loadData();

});
function loadData() {
    getProgramInfo();
    //视频第一个图片
    if (programInfo.videoFile.length > 0) {
        $("#willesPlay").removeClass("uhide");
        $(".video").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.videoFile, 1);
        if (!programInfo.posterImagePath) {
            $(".videos").attr("poster", _SERVER_ADDRESS + programInfo.image);
        } else {
            $(".videos").attr("poster", _SERVER_ADDRESS + programInfo.posterImagePath);
        }
    }
    $(".hits").html(programInfo.hits + "次");
    $(".evaluateTimes").html(programInfo.evaluateTimes + "次");
    // $(".videos").attr("poster",_SERVER_ADDRESS + programInfo.posterImagePath);

    $(".main_content").html(programInfo.readGuide);

    if (programInfo.audioFile.length > 0) {
        $("#div_audio").removeClass("uhide");
        $(".audio").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.audioFile);

        $(".audios").css("background-image", "url(" + _SERVER_ADDRESS + programInfo.image + ")");

    }

}

function refesh() {
    loadData();
    appcan.window.close(-1);
}

function closePlayer() {
    //uexVideo.closePlayer();
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


function closeAudio(){

    var audio = document.getElementById('audio');
    if(audio!==null){
        if(audio.paused)                     {

        }else{
            audio.pause();// 这个就是暂停
        }
    }
}