document.write('<script src="http://www.readseed.cn/nocache/js_student_v230/js/player/cyberplayer.js?v=' + (new Date().getTime()) + '"><\/script>');


$('audio').audioPlayer();

var dicList = {
    "grade" : [],
    "book_category" : [],
    "recommendLevel" : []
};
var g_pic = "";
var titHeight;
var isOpenComments = false;
var video_player;
var video_player_url;
var width_screen = document.body.clientWidth;
var height_screen = document.body.clientHeight;
var rem=(window.getComputedStyle(document.documentElement)["fontSize"]).replace("px","");

var timestart_video=0;
var timeend_video=0;
var timecount_video=0;


var timestart_audio=0;
var timeend_audio=0;
var timecount_audio=0;

var timestart_ppt=0;
var timeend_ppt=0;
var timecount_ppt=0;

appcan.ready(function() {
    $("#btn_info").html("图书简介");
    $("#btn_read").html("课程领读");
    $("#btn_video").html("导读视频");
    $("#btn_audio").html("听书讲解");
    //getUserInfo();
    $(".bookImg").css("max-width",(width_screen/2)+"px").css("max-height",(width_screen*1080/1920*0.95)+"px");

    isIPhoneX();
    getBookInfo();

    //安卓返回键
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            if (isOpenComments) {
                uexWindow.evaluatePopoverScript("", "book_comments", "exit();");
            } else {
                exit();
            }
        }
    }
    uexWindow.setReportKey(0, 1);

    
    var height = width_screen * 9 / 16;
    $("#header_all").css("height",height); //头部高度
    $("#header_intro").css("height",height);  //介绍高度
    $("#audio_div").css("height",height); //音频高度
    $("#pdfPathPPT").css("height",height); //领读高度

    getSysInfo();
    if (sysInfo.phoneType == "1") {
        titHeight = height+4*rem;
    }
    else{
        titHeight = height+5*rem;
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
            if (screen.height == 812 && screen.width == 375){
                //是iphoneX
                titHeight = height+6*rem;
            }
        }
    }






    InitButton();

    switch (getLocVal("bookInfo_default")) {
        case "ppt":
            loadAll('course');
            //OpenPptList();
            break;
        case "video":
            loadAll('video2');
            //loadVideo2();

            //OpenVideoList();
            break;
        case "audio":
            loadAll('audio');
            //loadVideo2();

            //OpenAudioList();
            break;
        default:
            loadIntro();
            break;
    }
    setLocVal("bookInfo_default","");
    setBookInfo2();
    AddLogContent(userInfo.id, logKeys.BookOpenDetail, {"bookId":bookInfo.id, "content":"查看图书："+bookInfo.name})
});

function InitButton(){
    //没有领读
    if(bookInfo.programId == ''){
        $("#btn_read").attr('onclick','').unbind('click');
        //$("#btn_read").css("background-color","#ccc").css("color","#999");
        $("#btn_read").addClass("uhide");
    }
    else{
        getProgramInfoById(bookInfo.programId, function(data) {
            getProgramInfo();
            programInfo = data;
            setProgramInfo();
        }, null);
    }

    if(bookInfo.audioFile == ''){
        $("#btn_audio").attr('onclick','').unbind('click');
        //$("#btn_audio").css("background-color","#ccc").css("color","#999");
        $("#btn_audio").addClass("uhide");
    }
    else {
        loadAudio();
    }

    if(bookInfo.videoFile == '' && bookInfo.videoFile2 == ''){
        $("#btn_video").attr('onclick','').unbind('click');
        //$("#btn_video").css("background-color","#ccc").css("color","#999");
        $("#btn_video").addClass("uhide");
    }
    else {
        loadVideo2();
    }


}


function loadAll(obj) {
    $(".btn_info").removeClass("active");

    if (obj != "audio") {
        closeAudio();
    }
    if (obj != "video2") {
        if(!(bookInfo.videoFile == '' && bookInfo.videoFile2 == '')) {
            if("playing" == video_player.getState()){
                video_player.pause();
                timecount_video=new Date().getTime() - timestart_video;
            }
        }
    }
    $(".header_all").addClass("uhide");
    switch(obj) {
    case "audio":
        $("#header_audio").removeClass("uhide");
        $("#btn_audio").addClass("active");
        var status=$(".audioplayer-playpause").attr("title");
        if("Play"==status){
            $(".audioplayer-playpause").click();
            if(timestart_audio==0) {
                AddLogContent(userInfo.id, logKeys.BookAudioStart, {"bookId":bookInfo.id});
                timestart_audio=new Date().getTime(); //开始记录播放视频的时间
            }

        }
        if(bookInfo.audioCount) {
            OpenAudioList();
        }
        break;
    case "video":
        $("#header_video").removeClass("uhide");
        $("#btn_video").addClass("active");
        loadVideo();
        if(bookInfo.videoCount) {
            OpenVideoList();
        }
        break;
    case "video2":
        $("#header_video2").removeClass("uhide");
        $("#btn_video").addClass("active");
        if("playing" != video_player.getState()){
            video_player.play();
            if(timestart_video==0) {
                timestart_video=new Date().getTime(); //开始记录播放视频的时间
                AddLogContent(userInfo.id, logKeys.BookVideoStart, {"bookId":bookInfo.id});
            }
        }
        if(bookInfo.videoCount) {
            OpenVideoList();
        }
        break;
    case "course":
        $("#pdfPathPPT").removeClass("uhide");
        $("#btn_read").addClass("active");
        loadCourse();
        if(bookInfo.pptCount) {
            OpenPptList();
        }
        break;
    case "intro":
        $("#header_intro").removeClass("uhide");
        $("#btn_info").addClass("active");
        loadIntro();
        break;
    }
}

function loadIntro() {

    getUserInfo();
    getCommInfo();
    //loadBookIntro();
    OpenIntroWindow();
    g_pic = _SERVER_ADDRESS + bookInfo.image;


//    titHeight = $('#header').offset().height;

    //$(".bookName").html(bookInfo.name);
    if (bookInfo.image.length > 0) {
        $(".bookImg").attr("src", _SERVER_ADDRESS + bookInfo.image);
    }
    $(".remark").html("被推荐" + bookInfo.recommendTimes + "次&nbsp;" + bookInfo.hits + "人读过");
    $(".score").html(bookInfo.score);

    if (bookInfo.isPass == "1") {
        $(".btnReview .ub .ub-f1").html("再次测评");
    }

    loadDic();

    var j = 0;
    var star = bookInfo.score;
    for (; j < parseInt(star / 2); j++) {
        $("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five");
    }
    star = Math.round(bookInfo.score - star);
    if (star == 1) {
        $("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five-half");
    }
    setView();
}

function OpenIntroWindow(){
    var url = "book_index_introduce_content.html";
    appcan.frame.open("openwindow", url, 0, titHeight);
}


function OpenPptList(){
    var url = "book_default_pptlist.html";
    appcan.frame.open("openwindow", url, 0, titHeight);
}


function OpenVideoList(){
    var url = "book_default_videolist.html";
    appcan.frame.open("openwindow", url, 0, titHeight);
}


function OpenAudioList(){
    var url = "book_default_audiolist.html";
    appcan.frame.open("openwindow", url, 0, titHeight);
}



function loadAudio() {
    //var audioFile = "/audioSave/1f6e7d06d2d84226868dde45c12a0564.mp3";
    //var audioImage = encodeURI("/userfiles/1/files/book/timg.jpg");
    var audioFile = bookInfo.audioFile;
    var audioImage = bookInfo.posterImagePath;
    if(audioImage=='') audioImage = bookInfo.image;


    $(".audio").attr("src", _SERVER_VIDEO_ADDRESS + audioFile);
    $(".audios").css("background-image", "url(" + _SERVER_ADDRESS + audioImage + ")");
}

function closeAudio() {
    if(bookInfo.audioFile != '') {
        var status = $(".audioplayer-playpause").attr("title");
        if ("Pause" == status) {
            $(".audioplayer-playpause").click();
        }
        $(".audioplayer-playing .audioplayer-playpause").click();

        //如果音频播放过，才记录时间
        if(timestart_audio>0) {
            timecount_audio = new Date().getTime() - timestart_audio;
            AddLogContent(userInfo.id, logKeys.BookAudioEnd, {
                "bookId": bookInfo.id,
                "content": "耗时：" + formatDuring(timecount_audio),
                "timecount":timecount_audio
            });
        }
    }
}

//关闭音频和视频
function closeMedia() {
    if(bookInfo.audioFile != ''){
        var status=$(".audioplayer-playpause").attr("title");
        if("Pause"==status){
            $(".audioplayer-playpause").click();

            //如果处于播放状态，才记录时间
            if(timestart_audio>0) {
                timecount_audio = new Date().getTime() - timestart_audio;
                AddLogContent(userInfo.id, logKeys.BookAudioEnd, {
                    "bookId": bookInfo.id,
                    "content": "耗时：" + formatDuring(timecount_audio),
                    "timecount":timecount_audio
                });
            }
        }

        $(".audioplayer-playing .audioplayer-playpause").click();
        //如果音频播放过，才记录时间

    }
    if(!(bookInfo.videoFile == '' && bookInfo.videoFile2 == '')){
        //如果视频播放过，才记录时间
        if("playing" == video_player.getState()){
            if(timestart_video>0) {
                timecount_video = new Date().getTime() - timestart_video;
                video_player.stop();
                AddLogContent(userInfo.id, logKeys.BookVideoEnd, {
                    "bookId": bookInfo.id,
                    "content": "耗时：" + formatDuring(timecount_video),
                    "timecount":timecount_video
                });
            }
        }
    }
    if(video_player_url) {
        if ("playing" == video_player_url.getState()) {
            if (timestart_video > 0) {
                timecount_video = new Date().getTime() - timestart_video;
                video_player_url.stop();
                AddLogContent(userInfo.id, logKeys.BookVideoEnd, {
                    "bookId": bookInfo.id,
                    "content": "耗时：" + formatDuring(timecount_video),
                    "timecount": timecount_video
                });
            }
        }
    }

}


function loadCourse() {
    $(".background").css("background-image", "url(" + _SERVER_ADDRESS + bookInfo.image + ")");

    //loadAllPicData();
}

function isLoadDic() {
    getCommInfo();
    if (commInfo.grade.length == 0) {
        return false;
    }
    if (commInfo.book_category.length == 0) {
        return false;
    }
    if (commInfo.recommendLevel.length == 0) {
        return false;
    }
    return true;
}

function loadDic() {
    if (isLoadDic()) {
        setBookInfo();
        return;
    }
    $.each(dicList, function(n, obj) {
        if (!obj || obj.length == 0) {
            loadDicData(n);
            return false;
        }
    });
}

function loadDicData(name) {
    var params = {
        "type" : name
    };
    common.ajax("/dict/getDictList", {
        params : JSON.stringify(params)
    }, function(data) {
        var dicObj = {};
        for (var i = 0; i < data.obj.length; i++) {
            var obj = data.obj[i];
            dicObj[obj.value] = obj.label;
        }

        dicList[name] = dicObj;
        commInfo[name] = dicObj;
        setCommInfo();
        loadDic();
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

appcan.button(".btnReview", "btn-act", function() {
    if (bookInfo.isFavorite == "1") {
        closeMedia();
        appcan.window.open("book_review", "book_review.html", 5);
    } else {
        toast("请先加入书架~", config.toastTimeShort);
    }
});

appcan.button(".btnIntroduce", "btn-act", function() {
    if (bookInfo.isFavorite == "1") {
        appcan.window.open("book_introduce_add", "book_introduce_add.html", 5);
    } else {
        toast("请先加入书架~", config.toastTimeShort);
    }
});
function setBookInfo2() {
    if (bookInfo.recommendLevel.length == 0) {
        $(".recommendLevel").addClass("uhide");
    } else {
        $(".recommendLevel").html(commInfo.recommendLevel[bookInfo.recommendLevel]);
    }
    if (bookInfo.bookCategory.length == 0) {
        $(".bookCategory").addClass("uhide");
    } else {
        $(".bookCategory").html(commInfo.book_category[bookInfo.bookCategory]);
    }
    $(".grade").html(commInfo.grade[bookInfo.grade]);
}

function setView() {
    if (bookInfo.isFavorite == "1") {
        //$(".favorite").removeClass("icon_into").addClass("icon_remove");
        $(".txt_shelf").html("移出书架");
    } else {
        //$(".favorite").removeClass("icon_remove").addClass("icon_into");
        $(".txt_shelf").html("加入书架");
    }
}


appcan.button("#nav-left", "btn-act", function() {
    exit();
})

appcan.button(".favorite", "btn-act", function() {
    getUserInfo();
    getBookInfo();
    if (bookInfo.isFavorite == "1") {
        var params = {
            'userId' : userInfo.id,
            'bookId' : bookInfo.id
        };
        common.ajax("/favorite/remove", {
            params : JSON.stringify(params)
        }, function(data) {
            bookInfo.isFavorite = "0";
            setBookInfo();
            setView();
            AddLogContent(userInfo.id, logKeys.BookDelFromShelf, {"bookId":bookInfo.id, "content":bookInfo.name+" 移出书架"});
            toast("已移出书架~", config.toastTimeShort);
        }, function(data) {
            toast(getMsgByKey(data.msg), config.toastTimeShort);
        }, {
            type : 'POST'
        });
    } else {
        var params = {
            'userId' : userInfo.id,
            'bookId' : bookInfo.id
        };
        common.ajax("/favorite/add", {
            params : JSON.stringify(params)
        }, function(data) {
            bookInfo.isFavorite = "1";
            setBookInfo();
            setView();
            AddLogContent(userInfo.id, logKeys.BookAddToShelf, {"bookId":bookInfo.id, "content":bookInfo.name+" 加入书架"});
            toast("已加入书架~", config.toastTimeShort);
        }, function(data) {
            toast(getMsgByKey(data.msg), config.toastTimeShort);
        }, {
            type : 'POST'
        });
    }
});

function OpenWin(t) {
    //var titHeight = $('#header').height();
    var url = "book_index_introduce_content.html";
    switch(t) {
    case "review":
        url = "book_index_content.html";
        appcan.frame.open("openwindow", url, 0, titHeight);
        break;
    case "read":
        url = "";
        break;
    case "video":
        url = "";
        break;
    case "audio":
        url = "";
        break;
    case "write":
        url = "";
        break;
    case "test":
        url = "";
        break;
    case "write":
        url = "";
        break;
    default:
        url = "book_index_introduce_content.html";
        appcan.frame.open("openwindow", url, 0, titHeight);
        break;
    }
}

function OpenReview() {
    appcan.frame.open("content_review", "book_index_content.html", 0, titHeight);
}

function exit() {
    uexWindow.setOrientation(1);
    //setOrientation(0);
    closeMedia();
    AddLogContent(userInfo.id, logKeys.BookCloseDetail, {"bookId":bookInfo.id,"content":"关闭图书："+bookInfo.name})
    appcan.window.close(-1);
    //uexWindow.evaluatePopoverScript("","introduce","closePlayer();");
}


function setOrientation(type) {
    uexWindow.setOrientation(type);
}


function loadVideo() {
    $(".video").src = _SERVER_VIDEO_ADDRESS + bookInfo.videoFile;
    $(".video").attr("src", _SERVER_VIDEO_ADDRESS + bookInfo.videoFile, 1);
    $(".videos").attr("poster", _SERVER_ADDRESS + bookInfo.image);
}


$(".preview").on("click", function() {
    loadAllPicData();
});

function loadAllPicData() {


    uexWindow.setOrientation(2);
    getUserInfo();
    getBookInfo();
    var params = {
        'userId' : userInfo.id,
        'programId' : bookInfo.programId
    };
    common.ajax("/exercise/getProgramQuestionList", {
        params : JSON.stringify(params)
    }, function(data) {
        dataArra = data.attributes.dataArray;
        if(timestart_ppt==0) {
            timestart_ppt = new Date().getTime();
            AddLogContent(userInfo.id, logKeys.BookPPTStart, {"bookId":bookInfo.id})
        }
        openBrowser(dataArra);

    }, function(data) {
        uexWindow.setOrientation(1);
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, null);
}

//打开图片浏览器
function openBrowser(dataArrax) {
alert(JSON.stringify(dataArrax));
    var data = {
        displayActionButton : true,
        displayNavArrows : true,
        enableGrid : true,
        //startOnGrid:true,
        startIndex : 0,
        data : dataArrax

    }

    var json = JSON.stringify(data);
    
    var callback= function(){
        uexWindow.setOrientation(1);
        if(timestart_ppt>0) {
            timeend_ppt = new Date().getTime();
            timecount_ppt = timeend_ppt - timestart_ppt; //看PPT花了多少时间
            AddLogContent(userInfo.id, logKeys.BookPPTEnd, {
                "bookId": bookInfo.id,
                "content": "耗时：" + formatDuring(timecount_ppt)
            });
        }
    };
    
    
    uexImage.openBrowser(json,callback);
}

function loadVideo2() {
    getSysInfo();
    if (sysInfo.phoneType == "0") {
        uexWindow.setInlineMediaPlaybackEnable(true); //IOS初始播放不全屏
    }
    //var obj = JSON.parse(getLocVal("course_json"));

     /*
     $(".video").src=_SERVER_VIDEO_ADDRESS + bookInfo.videoFile;
     $(".video").attr("src",_SERVER_VIDEO_ADDRESS + bookInfo.videoFile,1);
     $(".videos").attr("poster",_SERVER_ADDRESS + bookInfo.image);
     */
    var width_screen = document.body.clientWidth;
    var height_screen = document.body.clientHeight;
    $("#header_video2").css("width", width_screen).css("height", width_screen * 9 / 16);
    $("#video_container").css("width", width_screen).css("height", width_screen * 9 / 16);
    video_player = cyberplayer("video_container").setup({
        width : width_screen, // 宽度，也可以支持百分比(不过父元素宽度要有)
        height : width_screen * 9 / 16, // 高度，也可以支持百分比
        title : bookInfo.name, // 标题
        file:  _SERVER_VIDEO_ADDRESS + bookInfo.videoFile, // 播放地址
        //file : "http://cdn.readseed.cn/videoSave/BOOK201612060343.mp4", // 播放地址
        image : _SERVER_ADDRESS + bookInfo.image, // 预览图
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
        if (event.fullscreen) {
            uexWindow.setOrientation(2);
        } else {
            uexWindow.setOrientation(1);
        }
    });
    video_player.onPlay(function(event){
        if(timestart_video==0) {
            timestart_video=new Date().getTime(); //开始记录播放视频的时间
        }
    });
    video_player.onPause(function(event){
        if(timestart_ppt>0) {
            timecount_video = new Date().getTime() - timestart_video;
            AddLogContent(userInfo.id, logKeys.BookVideoEnd, {
                "bookId": bookInfo.id,
                "content": "耗时：" + formatDuring(timecount_video)
            });
        }
    });

}


function OpenOneImages(obj){
    var data = {
        displayActionButton : true,
        displayNavArrows : true,
        enableGrid : true,
        startIndex : 0,
        data : [obj.src]
    }
    var json = JSON.stringify(data);
    
    var callback= function(){
        uexWindow.setOrientation(1);
    };
    
    
    uexImage.openBrowser(json,callback);

    AddLogContent(userInfo.id, logKeys.BookReadCover, {"bookId":bookInfo.id})
}



function formatDuring(mss) {
    var seconds = Math.round(mss/1000);
    var minutes = parseInt(seconds/60);
    seconds=seconds % 60;
    return minutes + "分" + seconds + "秒";

}




function loadVideoUrl() {
    if(video_player) video_player.remove();
    if(video_player_url) video_player_url.remove();

    getSysInfo();
    if (sysInfo.phoneType == "0") {
        uexWindow.setInlineMediaPlaybackEnable(true); //IOS初始播放不全屏
    }

    var width_screen = document.body.clientWidth;
    var height_screen = document.body.clientHeight;

    var v_title=getLocVal("v_title");
    var v_url=getLocVal("v_url");
    var v_image=getLocVal("v_image");


    $("#header_video2").css("width", width_screen).css("height", width_screen * 9 / 16);
    $("#video_container").css("width", width_screen).css("height", width_screen * 9 / 16);
    video_player_url = cyberplayer("video_container").setup({
        width : width_screen, // 宽度，也可以支持百分比(不过父元素宽度要有)
        height : width_screen * 9 / 16, // 高度，也可以支持百分比
        title : v_title, // 标题
        file:  _SERVER_VIDEO_ADDRESS + v_url, // 播放地址
        //file : "http://cdn.readseed.cn/videoSave/BOOK201612060343.mp4", // 播放地址
        //image : _SERVER_ADDRESS + v_image, // 预览图
        image : "http://www.readseed.cn" + v_image, // 预览图
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
    video_player_url.onFullscreen(function(event) {
        if (event.fullscreen) {
            uexWindow.setOrientation(2);
        } else {
            uexWindow.setOrientation(1);
        }
    });
    video_player_url.onPlay(function(event){
        if(timestart_video==0) {
            timestart_video=new Date().getTime(); //开始记录播放视频的时间
        }
    });
    video_player_url.onPause(function(event){
        if(timestart_ppt>0) {
            timecount_video = new Date().getTime() - timestart_video;
            AddLogContent(userInfo.id, logKeys.BookVideoEnd, {
                "bookId": bookInfo.id,
                "content": "耗时：" + formatDuring(timecount_video)
            });
        }
    });

    video_player_url.onReady(function(event){
        video_player_url.play();
    });


}


function loadAudioUrl() {
    var v_title=getLocVal("v_title");
    var v_url=getLocVal("v_url");
    var v_image=getLocVal("v_image");


    // var audioFile = bookInfo.audioFile;
    // var audioImage = bookInfo.posterImagePath;
    // if(audioImage=='') audioImage = bookInfo.image;


    $(".audio").attr("src", _SERVER_VIDEO_ADDRESS + v_url);
    $(".audios").css("background-image", "url(" + _SERVER_ADDRESS + v_image + ")");


    var status=$(".audioplayer-playpause").attr("title");
    $(".audioplayer-playpause").click();
}

function loadPptUrl(){
    var v_title=getLocVal("v_title");
    var v_url=getLocVal("v_url");
    var v_image=getLocVal("v_image");


    uexWindow.setOrientation(2);
    getUserInfo();
    getBookInfo();
    var params = {
        'userId' : userInfo.id,
        'programId' : v_url
    };
    common.ajax("/exercise/getProgramQuestionList", {
        params : JSON.stringify(params)
    }, function(data) {
        dataArra = data.attributes.dataArray;
        if(timestart_ppt==0) {
            timestart_ppt = new Date().getTime();
            AddLogContent(userInfo.id, logKeys.BookPPTStart, {"bookId":bookInfo.id})
        }
        openBrowser(dataArra);

    }, function(data) {
        uexWindow.setOrientation(1);
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, null);

}