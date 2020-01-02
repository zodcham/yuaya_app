$('audio').audioPlayer();
var g_SwiperParent;
var g_SwiperItems = [];
var listData = [];
var heatTypes = 580;
appcan.ready(function() {
    loadData();
});
function loadData() {
    getUserInfo();
    getProgramInfo();
    getCommInfo();

    // readFeeling = programInfo.readFeeling;
    //
    // if(readFeeling.studentImage.length > 0){
    // $("#main .headImg img").attr("src",_SERVER_ADDRESS+readFeeling.studentImage);
    // }
    // $("#main .name").html(readFeeling.studentName);

    // $("#main .headImg img").attr("src",_SERVER_ADDRESS+readFeeling.studentImage);

    //用户分享标题
    $(".names").html(programInfo.name);
    //用户分享时间
    $(".data").html(programInfo.createDate);
    //用户分享内容
    $(".main_content").html(programInfo.readGuide);

    //用户分享视频
    if (programInfo.videoFile.length > 0) {
        $("#willesPlay").removeClass("uhide");
        $(".video").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.videoFile, 1);
    }
    //用户分享图片
    if (programInfo.image01.length > 0) {
        $("#images").removeClass("uhide");
        $(".image01").attr("src", _SERVER_ADDRESS + programInfo.image01);
    }

    if (programInfo.audioFile.length > 0) {
        $("#audio").removeClass("uhide");
        $(".audio").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.audioFile);

        $(".audios").css("background-image", "url(" + _SERVER_ADDRESS + programInfo.image + ")");

    }

    if (programInfo.hits > 20) {
        $(".hits").append(programInfo.hits + heatTypes + '次');
    } else {
        $(".hits").append(programInfo.hits + '次');
    }
    $(".reviewCount").html(programInfo.reviewCount + "次");
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
var resizeIframess = function() {
    var bodyw = document.body.clientWidth;
    for (var ilength = 0; ilength <= document.getElementsByTagName("video").length; ilength++) {
        document.getElementsByTagName("video")[ilength].height = bodyw * 5 / 12;
    }
}           