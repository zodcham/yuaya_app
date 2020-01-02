$('audio').audioPlayer();
var g_SwiperParent;
var g_SwiperItems = [];
appcan.ready(function() {

    loadData();
    uexWindow.setMultilPopoverFlippingEnbaled(1);
});
function loadData() {
    getProgramInfo();

    $(".hits").html(programInfo.hits + "次");
    $(".evaluateTimes").html(programInfo.evaluateTimes + "次");
    // $(".videos").attr("poster",_SERVER_ADDRESS + programInfo.posterImagePath);

    $(".main_content").html(programInfo.readGuide);

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