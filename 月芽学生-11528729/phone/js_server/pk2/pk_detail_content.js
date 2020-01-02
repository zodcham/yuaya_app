$('audio').audioPlayer();
var pageIndex = 1;
var g_SwiperItems = [];
var reloadDate = "";
var loadDate = "";
var reloadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期1",
    "pullToReloadText" : "拖动刷新",
    "releaseToReloadText" : "释放刷新",
    "loadingText" : "刷新中，请稍等"
};
var loadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期2",
    "pullToReloadText" : "拖动加载",
    "releaseToReloadText" : "释放加载",
    "loadingText" : "加载中，请稍等"
};
var imgScrs = "";

appcan.ready(function() {
    var id=getLocVal("pk_id");
    loadData();


    /*
    getUserInfo();
    getProgramInfo();
    getCommInfo();
    $(".Names").html(programInfo.name);
    $(".Namdata").html(programInfo.createDate);
    $(".main_content").html(programInfo.readGuide);
    //视频
    //视频第一个图片
    //appcan.alert(programInfo.videoFile);
    if (programInfo.videoFile.length > 0) {
        $("#willesPlay").removeClass("uhide");
        $(".video").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.videoFile, 1);
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

    loadData();
    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(0, 1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView("0", "rgba(0, 0, 0, 0)", 1);
    uexWindow.showBounceView("1", "rgba(0, 0, 0, 0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
        var time1 = new Date().format("MM-dd HH:mm:ss");
        switch(type) {
        case 0:
            if (state == 2) {
                refreshData();
            }
            break;
        case 1:
            if (state == 2) {
                loadJson.levelText = "上次加载：" + time1;
                uexWindow.setBounceParams(1, JSON.stringify(loadJson));
                pageIndex++;
                loadData();
            }
            break;
        }
    };
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    loadJson.levelText = "上次加载：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));
    */

});
//评论
appcan.button("#btnAdd", "btn-act", function() {
    appcan.window.open("column_comments_add", "book/column_comments_add.html", 5);
})
function refreshData() {
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    $("#CommentsList .item").remove();
    pageIndex = 1;
    loadData();
}

function loadData() {
    var params = {

    };
    common.ajax("/activity/get/"+getLocVal("pk_id"), {
        params : JSON.stringify(params)
    }, function(data) {
        var obj=data.obj;
        $(".Names").html(obj.title);
        $(".Namdata").html(obj.createDate);
        $(".main_content").html(obj.content);

        var diff=-1;
        if(obj.expirationDate){
            //今天的时间
            var day2 = new Date();
            day2.setTime(day2.getTime());
            var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();

            var diff = timeFn(s2, obj.expirationDate);
        }
        if(diff<0)
        {
            appcan.window.evaluateScript({
                name : "pk_detail", //窗口名称
                scriptContent : 'removeAdd();'
            });
        }

        //视频
        //视频第一个图片
        //appcan.alert(programInfo.videoFile);
        /*if (programInfo.videoFile.length > 0) {
            $("#willesPlay").removeClass("uhide");
            $(".video").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.videoFile, 1);
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
        */

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

function refesh() {
    loadData();
    appcan.window.close(-1);
}

function getEvaluate() {
    var params = {
        'userId' : userInfo.id,
        'programId' : programInfo.id,
    };
    common.ajax("/programEvaluate/myEvaluate", {
        params : JSON.stringify(params)
    }, function(data) {
        if (!data.obj) {
            $("#divAddComment").removeClass("uhide");
            $("#CommentsList").css("paddingBottom", "3.5em");
        }
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
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

//计算时间差
function timeFn(d1, d2) {//di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
    var dateEnd = new Date(d2.replace(/-/g, "/"));//获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    return dateDiff;
}
