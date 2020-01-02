var g_SwiperParent;
var g_SwiperItems = [];
appcan.ready(function() {
    loadData();
});
function loadData() {
    getBookInfo();
    $(".author").html(bookInfo.author);
    $(".publisher").html(bookInfo.publisher);
    $(".wordCount").html(bookInfo.wordCount + "千字");
    $(".video").attr("src", _SERVER_VIDEO_ADDRESS + bookInfo.videoFile, 1);
    $(".videos").attr("poster", _SERVER_ADDRESS + bookInfo.image);
    $(".hits").html(bookInfo.hits + "次");
    $(".recommendTimes").html(bookInfo.recommendTimes + "次");
    $("#main").html(bookInfo.readGuide);

    // //视频//初始化
    // var video = $('#video1').videoCt({
    // title: ' ', //标题
    // volume: 0.2,                //音量
    // barrage: true,              //弹幕开关
    // comment: true,              //弹幕
    // reversal: true,             //镜像翻转
    // playSpeed: true,            //播放速度
    // update: true,               //下载
    // autoplay: false,            //自动播放
    // clarity: {
    // type: [' ',' '],            //清晰度
    // src: [_SERVER_VIDEO_ADDRESS + bookInfo.chooseVideoPath,_SERVER_VIDEO_ADDRESS + bookInfo.videoFile
    // ]      //链接地址
    // },
    // commentFile: 'comment.json'           //导入弹幕json数据
    // });
    //
    // //扩展
    // video.title;                    //标题
    // video.status;                   //状态
    // video.currentTime;              //当前时长
    // video.duration;                 //总时长
    // video.volume;                   //音量
    // video.clarityType;              //清晰度
    // video.claritySrc;               //链接地址
    // video.fullScreen;               //全屏
    // video.reversal;                 //镜像翻转
    // video.playSpeed;                //播放速度
    // video.cutover;                  //切换下个视频是否自动播放
    // video.commentTitle;             //弹幕标题
    // video.commentId;                //弹幕id
    // video.commentClass;             //弹幕类型
    // video.commentSwitch;            //弹幕是否打开
    // $('#video1').bind('ended', function() {
    // console.log('弹幕json数据：\n'+ video.comment());              //获取弹幕json数据
    // });
    //
    // document.body.style.overflow='hidden';
    // zymedia('video',{autoplay: true});
    // var screenheight = window.screen.height/2;
    // $("#modelView").width(window.screen.width);
    // $("#modelView").height(window.screen.height);
    // var videoheight = $(".zy_media").height()/2;
    // var padding_top = screenheight-videoheight;
    // $(".playvideo").css({"top":padding_top});
    // $("#modelView").css({"margin-top":-1*(padding_top+$(".zy_media").height())});
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