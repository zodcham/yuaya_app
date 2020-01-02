document.write('<script src="http://www.readseed.cn/nocache/js_student_v230/js/player/cyberplayer.js?v=' + (new Date().getTime()) + '"><\/script>');


$('audio').audioPlayer();
var g_SwiperParent;
var g_SwiperItems = [];
var timestart_video=0;
var timeend_video=0;
var timecount_video=0;

appcan.ready(function() {

    loadData();

});
function loadData() {
    var width_screen = document.body.clientWidth;
    $("#pdfPathPPT").css("width", width_screen).css("height", width_screen * 9 / 16);


    {
        var url = "http://www.readseed.cn:8080/audioSave/176e73f59d094e70b75fbc4e110318b0.mp3";
        $("#audio").css("width", width_screen).css("height", width_screen * 9 / 16);
        $("#audio").removeClass("uhide");
        $("#audio").html("");


        video_player = cyberplayer("audio").setup({
            width : width_screen, // 宽度，也可以支持百分比(不过父元素宽度要有)
            height : width_screen * 9 / 16, // 高度，也可以支持百分比
            title : "", // 标题
            file:  url, // 播放地址
            //file : "http://cdn.readseed.cn/userfiles/1/files/program/HDvideo/阅读大咖秀月芽阅读-很久很久以前%20从中国神话故事谈起.mp4", // 播放地址
            image : "http://cdn.readseed.cn/static/common/images/logo.png", // 预览图
            autostart : true, // 是否自动播放
            stretching : "uniform", // 拉伸设置
            primary : "html5", // 首先使用html5
            repeat : true, // 是否重复播放
            volume : 100, // 音量
            controls : true, // controlbar是否显示
            starttime : 0, // 视频开始播放时间点(单位s)，如果不设置，则可以从上次播放时间点续播

             logo: { // logo设置
             linktarget: "_blank",
             margin: 8,
             hide: true,
             position: "top-right", // 位置
             file: "http://cdn.readseed.cn/static/common/images/logo.png" // 图片地址
             }
             ,
            skin : {
                //name: "five", // 默认皮肤-bce，其他可选项有beelden, bekle, five, glow, roundster, seven, six, stormtrooper, vapor
                //background: "#fff", // 背景色设置
                // inactive: "#FFF", // 未激活时的颜色
                // active: "red", // 悬浮或激活的严责
            },
            ak : "dfa82b1453174b50b1b0e833a1f6ff50" // 公有云平台注册即可获得accessKey
        });

        video_player.onFullscreen(function(event) {
            /*if (event.fullscreen) {
                uexWindow.setOrientation(2);
            } else {
                uexWindow.setOrientation(1);
            }*/
        });
        video_player.onPlay(function(event){
            /*if(timestart_video==0) {
                timestart_video=new Date().getTime(); //开始记录播放视频的时间
            }*/
        });
        video_player.onPause(function(event){

        });
        return;
    }

    
    
    getProgramInfo();
    
    $(".background").css("background-image", "url(" + _SERVER_ADDRESS + programInfo.image + ")");

    //视频第一个图片
    if (programInfo.chooseVideoPath) {
        $("#willesPlay").css("width", width_screen).css("height", width_screen * 9 / 16);
        $("#willesPlay").removeClass("uhide");
        $("#willesPlay").html("");

        
        video_player = cyberplayer("willesPlay").setup({
            width : width_screen, // 宽度，也可以支持百分比(不过父元素宽度要有)
            height : width_screen * 9 / 16, // 高度，也可以支持百分比
            title : "", // 标题
            file:  _SERVER_ADDRESS + programInfo.chooseVideoPath, // 播放地址
            //file : "http://cdn.readseed.cn/userfiles/1/files/program/HDvideo/阅读大咖秀月芽阅读-很久很久以前%20从中国神话故事谈起.mp4", // 播放地址
            image : _SERVER_ADDRESS + programInfo.image, // 预览图
            autostart : true, // 是否自动播放
            stretching : "uniform", // 拉伸设置
            primary : "html5", // 首先使用html5
            repeat : true, // 是否重复播放
            volume : 100, // 音量
            controls : true, // controlbar是否显示
            starttime : 0, // 视频开始播放时间点(单位s)，如果不设置，则可以从上次播放时间点续播
            /*
             logo: { // logo设置
             linktarget: "_blank",
             margin: 8,
             hide: true,
             position: "top-right", // 位置
             file: "./img/logo.png" // 图片地址
             }
             ,*/
            skin : {
                name: "five", // 默认皮肤-bce，其他可选项有beelden, bekle, five, glow, roundster, seven, six, stormtrooper, vapor
                //background: "#fff", // 背景色设置
                // inactive: "#FFF", // 未激活时的颜色
                // active: "red", // 悬浮或激活的严责
            },
            ak : "dfa82b1453174b50b1b0e833a1f6ff50" // 公有云平台注册即可获得accessKey
        });

        video_player.onFullscreen(function(event) {
            /*if (event.fullscreen) {
                uexWindow.setOrientation(2);
            } else {
                uexWindow.setOrientation(1);
            }*/
        });
        video_player.onPlay(function(event){
            /*if(timestart_video==0) {
                timestart_video=new Date().getTime(); //开始记录播放视频的时间
            }*/
        });
        video_player.onPause(function(event){

        });

        /*
        $(".video").attr("src", _SERVER_ADDRESS + programInfo.chooseVideoPath, 1);
        if (!programInfo.posterImagePath) {
            $(".videos").attr("poster", _SERVER_ADDRESS + programInfo.image);
        } else {
            $(".videos").attr("poster", _SERVER_ADDRESS + programInfo.posterImagePath);
        }
        */
    }

    $(".hits").html(programInfo.hits + "次");
    $(".evaluateTimes").html(programInfo.evaluateTimes + "次");
    // $(".videos").attr("poster",_SERVER_ADDRESS + programInfo.posterImagePath);

    $(".main_content").html(programInfo.readGuide);

    if (programInfo.audioFile.length > 0) {

        $("#audio").css("width", width_screen).css("height", width_screen * 9 / 16);
        $("#audio").removeClass("uhide");
        $("#audio").html("");


        video_player = cyberplayer("audio").setup({
            width : width_screen, // 宽度，也可以支持百分比(不过父元素宽度要有)
            height : width_screen * 9 / 16, // 高度，也可以支持百分比
            title : "", // 标题
            file:  _SERVER_VIDEO_ADDRESS + programInfo.audioFile, // 播放地址
            //file : "http://cdn.readseed.cn/userfiles/1/files/program/HDvideo/阅读大咖秀月芽阅读-很久很久以前%20从中国神话故事谈起.mp4", // 播放地址
            image : _SERVER_ADDRESS + programInfo.image, // 预览图
            autostart : true, // 是否自动播放
            stretching : "uniform", // 拉伸设置
            primary : "html5", // 首先使用html5
            repeat : true, // 是否重复播放
            volume : 100, // 音量
            controls : true, // controlbar是否显示
            starttime : 0, // 视频开始播放时间点(单位s)，如果不设置，则可以从上次播放时间点续播
            /*
             logo: { // logo设置
             linktarget: "_blank",
             margin: 8,
             hide: true,
             position: "top-right", // 位置
             file: "./img/logo.png" // 图片地址
             }
             ,*/
            skin : {
                name: "five", // 默认皮肤-bce，其他可选项有beelden, bekle, five, glow, roundster, seven, six, stormtrooper, vapor
                //background: "#fff", // 背景色设置
                // inactive: "#FFF", // 未激活时的颜色
                // active: "red", // 悬浮或激活的严责
            },
            ak : "dfa82b1453174b50b1b0e833a1f6ff50" // 公有云平台注册即可获得accessKey
        });

        video_player.onFullscreen(function(event) {
            /*if (event.fullscreen) {
                uexWindow.setOrientation(2);
            } else {
                uexWindow.setOrientation(1);
            }*/
        });
        video_player.onPlay(function(event){
            /*if(timestart_video==0) {
                timestart_video=new Date().getTime(); //开始记录播放视频的时间
            }*/
        });
        video_player.onPause(function(event){

        });

        /*
        $("#audio").removeClass("uhide");
        $(".audio").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.audioFile);
        $(".audios").css("background-image", "url(" + _SERVER_ADDRESS + programInfo.image + ")");
        */

    }

}


$(".preview").on("click", function() {
    loadAllPicData();
});

function loadAllPicData() {
    //uexWindow.setOrientation(2);

    getUserInfo();
    getProgramInfo();
    var params = {
        'userId' : userInfo.id,
        //'programId' : programInfo.id
        'programId' : '585bc2fd6e144d7ca93af497d30734f7'
    };
    common.ajax("/exercise/getProgramQuestionList", {
        params : JSON.stringify(params)
    }, function(data) {
        dataArra = data.attributes.dataArray;
        openBrowser(dataArra);

    }, function(data) {
        uexWindow.setOrientation(1);
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, null);
}


//打开图片浏览器
function openBrowser(dataArrax) {
    var width = screen.width;
    var height = screen.height;
    var data = {
        displayActionButton : true,
        displayNavArrows : true,
        enableGrid : true,
        //startOnGrid:true,
        startIndex : 0,
        style:1,
        viewFramePicPreview:{
            x:0, y:0,w:width, h:height
        },
        data : dataArrax

    };

    var json = JSON.stringify(data);

    var callback= function(){
        uexWindow.setOrientation(1);
    };


    uexImage.openBrowser(json,callback);
}


function refesh() {
    loadData();
    appcan.window.close(-1);
}

function closePlayer() {
    //uexVideo.closePlayer();
}

window.onload = window.onresize = function() {
    //resizeIframe();
}
var resizeIframe = function() {
    var bodyw = document.body.clientWidth;
    for (var ilength = 0; ilength <= document.getElementsByTagName("iframe").length; ilength++) {
        //设定高度
        document.getElementsByTagName("iframe")[ilength].height = bodyw * 9 / 16;
    }
}  