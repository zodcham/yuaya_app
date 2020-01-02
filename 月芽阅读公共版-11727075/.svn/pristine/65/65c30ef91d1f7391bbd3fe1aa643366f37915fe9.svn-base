document.write("<script src='http://www.readseed.cn/nocache/js_machine_v200/json/index_home_json.js?ver=" + Math.random() + "'></script>");
//获得首页固态JSON

var swiper;
var pageIndex = 1;
var reloadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期1",
    "pullToReloadText" : "拖动刷新",
    "releaseToReloadText" : "释放刷新",
    "loadingText" : "刷新中，请稍等"
};
;
var loadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期2",
    "pullToReloadText" : "拖动加载",
    "releaseToReloadText" : "释放加载",
    "loadingText" : "加载中，请稍等"
};

appcan.ready(function() {


    getUserInfo();
    getCommInfo();

    //uexWindow.setMultilPopoverFlippingEnbaled(1);
    getSysInfo();

    sign(userInfo.id);

    //LoadCourse(userInfo.id);

    /* 固化修改
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
     reloadJson.levelText = "上次刷新：" + time1;
     uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
     $(".swiper-wrapper").empty();

     $(".recommendBook").empty();

     $(".recommendBooks").empty();

     $(".Reads").empty();

     $("#bookLists").empty();
     //loadActivityList();
     LoadAll();
     }
     break;
     case 1:
     if (state == 2) {
     pageIndex++;
     getRecommendBook();

     }
     break;
     }
     };
     */

    $("#item").css("width", $("#main").width() + "px");
    $(".swiper-wrapper").css("width", $("#main").width() + "px");
    //图片高度设置
    $(".swiper-wrapper").css("height", ($("#main").width() / 12 * 5) + "px");
    $("#banner_bg").css("width", $("#main").width() + "px").css("height", ($("#main").width() / 12 * 5) + "px");

    //滑动banner时禁止窗体滑动
    $(".swiper-container").on("touchstart", function() {
        uexWindow.setMultilPopoverFlippingEnbaled(1);
    }).on("touchend", function() {
        uexWindow.setMultilPopoverFlippingEnbaled(0);
    }).on("touchcancel", function() {
        uexWindow.setMultilPopoverFlippingEnbaled(0);
    });

    // 滑动精品资源禁止窗体滑动
    $(".slides").on("touchstart", function() {
        uexWindow.setMultilPopoverFlippingEnbaled(1);
    }).on("touchend", function() {
        uexWindow.setMultilPopoverFlippingEnbaled(0);
    }).on("touchcancel", function() {
        uexWindow.setMultilPopoverFlippingEnbaled(0);
    });

    $("#hot").bind("click", function() {
        uexWindow.evaluateScript("", 0, "goMall();");
    });

    /* 固化修改
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    loadJson.levelText = "上次加载：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));
    */

    //loadData();
    //loadActivityList();

    LoadAll();


})
var g_issign = 0;

//隐藏首页系统消息
function hide_action() {
    $("#div_action").addClass("uhide");
}

function GetNewMessage() {

    $("#home_information").html("");

    var url = _SERVER_ADDRESS + "/new/findSysMessage";
    var par = {};
    var fok = function(data) {
        var obj = JSON.parse(data);
        if ("no_msg" in obj) {//如果没消息
            $("#div_action").addClass("uhide");
            $("#action_close").addClass("uhide");
            return false;
        }
        //var yueya_title = "公告：互动分享和读后感的图片上传问题已解决，欢迎使用。";
        //yueya_title="";

        if (obj.length > 0) {
            var yueya_title = obj[0].TITLE;
            setLocVal("message_id", obj[0].ID);
            setLocVal("message_title", obj[0].TITLE);
            setLocVal("message_content", obj[0].CONTENT);
            setLocVal("message_addtime", formatDateTime(obj[0].CREATE_DATE));

            $("#home_information").html(yueya_title);
            $("#div_action").removeClass("uhide");
            $("#action_close").removeClass("uhide");
            $("#home_action").bind("click", function() {
                appcan.window.open("message", "yueduquan/message.html", 5);
            });
        } else {
            $("#home_information").html("");
            $("#div_action").addClass("uhide");
            $("#action_close").addClass("uhide");
        }

        getSysInfo();
        if (sysInfo.phoneType == "0") {
            $("#home_action").attr("scrollamount", "5");
        }

    };
    var ferr = function(err) {
        //alert(JSON.stringify(err));
    };
    $.ajax({
        url : url,
        type : 'GET',
        data : par,
        dataType : "html",
        success : fok,
        error : ferr
    });

}

function GetNewMessage222() {

    $("#home_information").html("");
    $("#div_action").addClass("uhide");
    $("#action_close").addClass("uhide");
    return false;

    var url = _SERVER_ADDRESS + "/new/findSysMessage";
    var par = {};
    var fok = function(data) {
        var obj = JSON.parse(data);
        //var yueya_title = "公告：互动分享和读后感的图片上传问题已解决，欢迎使用。";
        //yueya_title="";

        if (obj.length > 0) {
            var yueya_title = obj[0].TITLE;
            setLocVal("message_id", obj[0].ID);
            setLocVal("message_title", obj[0].TITLE);
            setLocVal("message_content", obj[0].CONTENT);
            setLocVal("message_addtime", formatDateTime(obj[0].CREATE_DATE));

            $("#home_information").html(yueya_title);
            $("#div_action").removeClass("uhide");
            $("#action_close").removeClass("uhide");
            $("#home_action").bind("click", function() {
                appcan.window.open("message", "yueduquan/message.html", 5);
            });
        } else {
            $("#home_information").html("");
            $("#div_action").addClass("uhide");
            $("#action_close").addClass("uhide");
        }

        getSysInfo();
        if (sysInfo.phoneType == "0") {
            $("#home_action").attr("scrollamount", "5");
        }

    };
    var ferr = function(err) {
        //alert(JSON.stringify(err));
    };
    $.ajax({
        url : url,
        type : 'GET',
        data : par,
        dataType : "html",
        success : fok,
        error : ferr
    });

}

function sign(userid) {
    var url = config.serviceUrl + "/sign/query";
    var par = {
        "userid" : userid
    };
    var fok = function(data) {
        var obj = JSON.parse(data);
        if (Number(obj.result) == 1) {
            g_issign = 1;
            $("#btn_sign").css("background-color", "#21a675");
            $("#btn_sign").html('<i class="fa fa-pencil-square-o"></i>已签到');
        } else {
            g_issign = 0;
            $("#btn_sign").css("background-color", "#00CC33");
            $("#btn_sign").html('<i class="fa fa-pencil-square-o"></i>签到');
        }
    };
    var ferr = function(err) {
    };
    $.ajax({
        url : url,
        type : 'POST',
        data : par,
        dataType : "html",
        success : fok,
        error : ferr
    });
}


$(".boxs").on("click", function() {
    $(this).siblings("input").trigger("click");
    // searchType=$(this).attr("value");
    // $("#bookList").empty();
    // pageIndex=1;
    // myPrompt.hide();
    // loadData();
});
appcan.button("#myBookList", "btn-act", function() {
    appcan.window.open("user_book_list", "user/user_book_list.html", 5);
});

appcan.button("#btn_sign", "btn-act", function() {

    if (g_issign == 1) {//如果已签到
        appcan.window.open("sign", "sign.html", 5);
        setTimeout(function() {
            sign(userInfo.id);
        }, 3000);
    } else {
        var InputSignContent = function(content) {
            getUserInfo();
            if (content.length > 40)
                content = content.substring(0, 40);
            var url = config.serviceUrl + "/sign/addDictum";
            var par = {
                "dictum" : content,
                "userid" : userInfo.id
            };
            var fok = function(data) {
                appcan.window.open("sign", "sign.html", 5);
                setTimeout(function() {
                    sign(userInfo.id);
                }, 3000);
            };
            var ferr = function(err) {
            };
            $.ajax({
                url : url,
                type : 'POST',
                data : par,
                dataType : "html",
                success : fok,
                error : ferr
            });
        }
        var title = "今天想分享点什么？";
        var content = "您可在签到图上添加文字分享给朋友，内容不能超过40个字！";
        var callback = function(err, data, dataType, optId) {
            if (Number(data.index) == 0) {
                InputSignContent(data.data);
            } else {
                appcan.window.open("sign", "sign.html", 5);
                setTimeout(function() {
                    getUserInfo();
                    sign(userInfo.id);
                }, 3000);
            }
        }
        appcan.window.prompt(title, content, '', ['确定', '随缘'], callback);
    }
});


function openTask(){
    getCommInfo();
    commInfo.finishState = '0';
    setCommInfo();
    appcan.window.open("user_read_taskss", "user/user_read_taskss.html", 5);
}

appcan.button("#myreward", "btn-act", function() {
    appcan.window.open("user_reward_lists", "user/user_reward_lists.html", 5);
});
appcan.button("#myRank", "btn-act", function() {
    appcan.window.open("ranking_lists", "ranking/ranking_lists.html", 5);
});
appcan.button("#myTask", "btn-act", function() {
    openTask();
});
appcan.button("#myreview", "btn-act", function() {
    appcan.window.open("book_review_historys", "book/book_review_historys.html", 5);
});
appcan.button("#userReport", "btn-act", function() {
    appcan.window.open("user_report_search", "user/user_report_search.html", 5);
});

appcan.button("#Readbut", "btn-act", function() {
	appcan.window.evaluateScript({
        name : "tv_index", //窗口名称
        scriptContent : 'changeTab(2);'
    });
    //appcan.window.open("tv_ppt", "tv_ppt.html", 5);
});
appcan.button("#introduction", "btn-act", function() {
    appcan.window.evaluateScript({
        name : "tv_index", //窗口名称
        scriptContent : 'changeTab(3);'
    });
    //appcan.window.open("tv_video", "tv_video.html", 5);
});
//名师课程更多
appcan.button("#Famousteache", "btn-act", function() {
    appcan.window.evaluateScript({
        name : "tv_index", //窗口名称
        scriptContent : 'changeTab(4);'
    });
    //appcan.window.open("tv_audio", "tv_audio.html", 5);
});

//月芽头条
appcan.button("#news", "btn-act", function() {
    appcan.window.open("newslist", "newslist.html", 5);
});

//加载在线课堂
function LoadCourse(userid) {
    var url = "/course/";
    var par = {
        "userid" : userid
    };
    var fok = function(data) {

    };
    var ferr = function(err) {
    };
    //$.ajax({url : url, type : 'POST',  data : par,  dataType : "html", success : fok, error : ferr });

    {
        var have_course = 1;
        var img_url = "css/image1/app_open.gif";
        if (have_course == 1) {
            $("#img_course").attr("src", img_url);
            $("#course").removeClass("uhide");
        }
    }
}

function OpenCourse() {
    //appcan.window.open("course_intro","course_intro.html",5);
    appcan.window.open("course_intro", "course_intro.html", 5);
}

function LoadAll() {

    /*
     //固化JSON版本
     {
     $("#name").html(userInfo.name);
     var time1 = new Date().format("HH:mm:ss");

     var data = json_index_home;
     var height_screen=document.body.clientHeight;
     var width_screen=document.body.clientWidth;
     if(height_screen>width_screen){
     LoadSwiper(data.lbsj);
     }
     else{
     $(".swiper-wrapper").addClass("uhide");
     }
     LoadCourse(data.kcld);
     LoadVideo(data.ddsp);
     LoadResourse(data.jdzy);
     LoadNews(data.xw);

     var d = new Date();
     var h=d.getHours();
     if(h!=18 && h!=19 && h!=20 && h!=21 && h!=22)
     {
     GetNewMessage();
     }
     else{
     $("#home_information").html("");
     $("#div_action").addClass("uhide");
     $("#action_close").addClass("uhide");
     }

     }
     */

    /*读数据库版本*/
    $("#name").html(userInfo.name);
    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新：" + time1;
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    uexWindow.resetBounceView("0");

    if (pageIndex == 1) {
        uexWindow.resetBounceView("0");
    } else {
        uexWindow.resetBounceView("1");
    }

    var par = {};
    var url = _SERVER_ADDRESS + "/phone/newindex";
    var ferr = function(err) {
        alert(JSON.stringify(err));
    };

    var fok = function(data) {
        data = JSON.parse(data);
        var height_screen = document.body.clientHeight;
        var width_screen = document.body.clientWidth;
        if (height_screen > width_screen) {
            LoadSwiper(data.lbsj);
        } else {
            $(".swiper-wrapper").addClass("uhide");
        }
        LoadCourse(data.kcld);
        LoadVideo(data.ddsp);
        LoadResourse(data.jdzy);
        LoadNews(data.xw);

        GetNewMessage();
        
        
        //loadTask();

    };
    common.ajaxPOST(url, par, fok, ferr);

    /*最老版本

     common.ajax("/phone/newindex", {
     //common.ajax("/program/getProgramInfoMore", {
     params : JSON.stringify({params:{userId:"1"}})
     }, function(data) {
     alert();
     LoadNews(data.xw);

     // LoadSwiper(data.lbxj);
     // LoadNews(data.xw);
     // LoadCourse(data.kcld);
     // LoadVideo(data.ddsp);
     // LoadResourse(data.jdzy);

     }, function(data) {
     alert("b");
     toast(getMsgByKey(data.msg), config.toastTimeShort);
     //getRecommendBook();
     });*/

}


function loadTask(){

    var par = {"studentId":userInfo.id};
    var url = _SERVER_ADDRESS + "/phone/student/book/newindex";
    var ferr = function(err) {

    };

    var fok = function(data) {
        var task_json=JSON.parse(data);
        task_json=task_json.obj;
        if(task_json.NEW_TASK_COUNT>0){
            var content = '您有 '+task_json.NEW_TASK_COUNT+' 个 新的任务，是否前去查看？';
            appcan.window.alert({
                title : "提示信息",
                content : content,
                buttons : ['确定', '取消'],
                callback : function(err, data, dataType, optId) {

                    if ("1" == data) {
                        $(".badge-dot").removeClass("uhide");
                    } else if ("0" == data) {
                        openTask();
                    }
                }
            });

        }
        else if(task_json.NEAR_LIMIT_COUNT>0){
            var content = '您有 '+task_json.NEAR_LIMIT_COUNT+' 个任务 即将到期，是否前去查看？';
            appcan.window.alert({
                title : "提示信息",
                content : content,
                buttons : ['确定', '取消'],
                callback : function(err, data, dataType, optId) {

                    if ("1" == data) {
                        $(".badge-dot").removeClass("uhide");
                    } else if ("0" == data) {
                        openTask();
                    }
                }
            });

        }
        else if(task_json.OVER_LIMIT_COUNT>0){
            var content = '您有 '+task_json.OVER_LIMIT_COUNT+' 个任务 已过期，是否前去查看？';
            appcan.window.alert({
                title : "提示信息",
                content : content,
                buttons : ['确定', '取消'],
                callback : function(err, data, dataType, optId) {

                    if ("1" == data) {
                        $(".badge-dot").removeClass("uhide");
                    } else if ("0" == data) {
                        openTask();
                    }
                }
            });

        }

    };
    common.ajaxPOST(url, par, fok, ferr);

}

function loadTask_pic(){
    
    var par = {"studentId":userInfo.id};
    var url = _SERVER_ADDRESS + "/phone/student/book/newindex";
    var ferr = function(err) {
        
    };

    var fok = function(data) {
        var task_json=JSON.parse(data);
        task_json=task_json.obj;
        if(task_json.NEW_TASK_COUNT>0){
            layer.open({
                content: '<div class="alert_content">您有<span style="color:orange">'+task_json.NEW_TASK_COUNT+'</span>个<span style="color:orange">新的任务</span><br>是否前去查看？</div>'
                ,btn: ['', '']
                ,yes: function(index){
                  openTask();
                  layer.close(index);
                }
                ,no:function(index){
                  $(".badge-dot").removeClass("uhide");
                  layer.close(index);
                }
                ,skin: 'teststatus'
              });
        }
        else if(task_json.NEAR_LIMIT_COUNT>0){
            layer.open({
                content: '<div class="alert_content">您有<span style="color:orange">'+task_json.NEAR_LIMIT_COUNT+'</span>个任务<span style="color:orange">即将到期</span><br>是否前去查看？</div>'
                ,btn: ['', '']
                ,yes: function(index){
                  openTask();
                  layer.close(index);
                }
                ,no:function(index){
                  $(".badge-dot").removeClass("uhide");
                  layer.close(index);
                }
                ,skin: 'teststatus'
              });
        }
        else if(task_json.OVER_LIMIT_COUNT>0){
            layer.open({
                content: '<div class="alert_content">您有<span style="color:orange">'+task_json.OVER_LIMIT_COUNT+'</span>个任务<span style="color:orange">已过期</span><br>是否前去查看？</div>'
                ,btn: ['', '']
                ,yes: function(index){
                  openTask();
                  layer.close(index);
                }
                ,no:function(index){
                  $(".badge-dot").removeClass("uhide");
                  layer.close(index);
                }
                ,skin: 'teststatus'
              });
        }

    };
    common.ajaxPOST(url, par, fok, ferr);
    
}


//轮播数据
function LoadSwiper(data) {
    var list = data;
    $(".swiper-wrapper").html('');
    for (var i = 0; i < list.length; i++) {
        var objItem = $("#item").clone();
        var item = list[i];

        objItem.attr("id", item.id).attr("isLink", item.is_link).attr("address", item.address);
        objItem.removeClass("uhide");
        //轮播图片-
        objItem.find(".bookImg").attr("src", _SERVER_ADDRESS + item.image);

        objItem.bind("click", function() {
            var id = $(this).attr("id");
            commInfo.activityAddress = "";
            if ($(this).attr("isLink") != "0") {
                commInfo.activityAddress = $(this).attr("address");
            }
            commInfo.activityId = id;
            setCommInfo();
            appcan.window.open("activity", "activity.html", 10);
        });

        $(".swiper-wrapper").append(objItem);
    }
    swiper = new Swiper('.swiper-container', {
        pagination : '.swiper-pagination',
        autoplay : 5000,
        autoplayDisableOnInteraction : false,
        loop : false
    });
}

//新闻
function LoadNews(data) {

    var index = 0;
    var shtml = '';
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var objNews = $("#item_news").clone();
        objNews.attr("id", obj.id);
        objNews.removeClass("uhide");
        objNews.find("li").html(obj.name);
        var newstitle = obj.name.substring(0, 18);
        shtml += '<li>' + newstitle + '</li>';
    }
    $("#news_list").html(shtml);

}

//课程领读
function LoadCourse(data) {
    var height_screen = document.body.clientHeight;
    var width_screen = document.body.clientWidth;
    if (height_screen > width_screen) {
        var len = data.length > 4 ? 4 : data.length;

        if (len == 2) {
            $(".Reads").css("width", "100%");
        } else if (len == 3) {
            $(".Reads").css("width", "150%");
        } else if (len == 4) {
            $(".Reads").css("width", "200%");
        } else {
            //$(".Reads").width(Math.round((data.obj.length * 0.25) * 10000) / 100.00 + "%");
            $(".Reads").width((50 * len) + "%");
        }
        $(".Reads").html('');
    } else {
        var len = data.length > 4 ? 4 : data.length;

        if (len == 2) {
            $(".Reads").css("width", "99%");
        } else if (len == 3) {
            $(".Reads").css("width", "99%");
        } else if (len == 4) {
            $(".Reads").css("width", "99%");
        } else {
            //$(".Reads").width(Math.round((data.obj.length * 0.25) * 10000) / 100.00 + "%");
            $(".Reads").width((24 * len) + "%");
        }
        $(".Reads").html('');
    }

    for (var i = 0; i < len; i++) {

        var obj = data[i];
        var ReadItem = $("#ReadItems").clone();
        ReadItem.attr("id", obj.id);
        ReadItem.attr("grade", obj.grade);
        ReadItem.attr("month", obj.month);
        ReadItem.attr("year", obj.year);
        ReadItem.attr("name", obj.name);

        ReadItem.removeClass("uhide");
        //图片
        ReadItem.find(".ReadImages").attr("src", _SERVER_ADDRESS + obj.image);

        /*
         var g_wgt_url = "wgt://data/download" + (obj.image);
         var g_img_url = _SERVER_ADDRESS + obj.image;

         if (uexFileMgr.isFileExistByPath(g_wgt_url)) {
         //本地有图片
         g_img_url = "file:/" + uexFileMgr.getFileRealPath(g_wgt_url);
         }
         ReadItem.find(".ReadImages").attr("src", g_img_url);
         */

        ReadItem.find(".ReadNames").html(obj.name);

        ReadItem.bind("click", function() {
            var month = $(this).attr("month");
            var name = $(this).attr("name");
            var report = $(this).attr("year");

            getSysInfo();
            sysInfo.ranking = {
                "grade" : month,
                "name" : name,
                "report" : report
            };
            setSysInfo();

            appcan.window.open("ppt_list", "ppt_list.html", 5);

        });

        $(".Reads").append(ReadItem);
    }

}

//导读视频
function LoadVideo(data) {
    var height_screen = document.body.clientHeight;
    var width_screen = document.body.clientWidth;
    if (height_screen > width_screen) {
        if (width_screen <= 1080) {
            var len = data.length > 6 ? 6 : data.length;
            if (len >= 4) {
                $(".recommendBook").css("width", "146%");
            } else {
                $(".recommendBook").width(Math.round((data.length * 0.25) * 10000) / 100.00 + "%");
            }
            $(".recommendBook").html('');
        } else {

            var len = data.length > 6 ? 6 : data.length;
            if (len >= 4) {
                $(".recommendBook").css("width", "99%");
            } else {
                $(".recommendBook").width(Math.round((data.length * 0.166) * 10000) / 100.00 + "%");
            }
            $(".recommendBook").html('');
        }
    } else {
        var len = data.length > 6 ? 6 : data.length;
        if (len >= 4) {
            $(".recommendBook").css("width", "99%");
        } else {
            $(".recommendBook").width(Math.round((data.length * 0.166) * 10000) / 100.00 + "%");
        }
        $(".recommendBook").html('');
    }
    for (var i = 0; i < len; i++) {
        var obj = data[i];
        var bookItem = $("#bookItem").clone();
        bookItem.attr("id", obj.id).attr("bookId", obj.bookId);
        bookItem.removeClass("uhide");
        //图片

        bookItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
        bookItem.find(".bookName").html('《' + obj.name + '》');
        /*

         var g_wgt_url = "wgt://data/download" + (obj.image);
         var g_img_url = _SERVER_ADDRESS + obj.image;
         g_download_list.push((obj.image));
         if (uexFileMgr.isFileExistByPath(g_wgt_url)) {
         //本地有图片
         var real_url = "file:/" + uexFileMgr.getFileRealPath(g_wgt_url);
         bookItem.find(".bookImage").attr("src", real_url);

         } else {
         //本地没图片
         bookItem.find(".bookImage").attr("src", g_img_url);
         }

         //bookItem.find(".bookName").attr("src",_SERVER_VIDEO_ADDRESS + obj.videoFile);
         */

        bookItem.bind("click", function() {
            var id = $(this).attr("id");
            getBookInfoById(userInfo.id, id, function(data) {
                getBookInfo();
                bookInfo = data;
                setBookInfo();
                $(this).attr("id");
                setLocVal("bookInfo_default","video");
                //uexVideo.open(_SERVER_VIDEO_ADDRESS + obj.videoFile,0);
                appcan.window.open("book_default", "book_default.html", 5);
                //appcan.alert(1);
                //toast(getMsgByKey(obj.name),config.toastTimeShort);
            }, null);
        });

        $(".recommendBook").append(bookItem);
    }
}

//精读资源
function LoadResourse(data) {
    var height_screen = document.body.clientHeight;
    var width_screen = document.body.clientWidth;
    if (height_screen > width_screen) {
        if (width_screen <= 1080) {
            var len = data.length > 5 ? 5 : data.length;
            if (len == 3) {
                $(".recommendBooks").css("width", "100%");
            } else if (len == 4) {
                $(".recommendBooks").css("width", "110%");
            } else if (len == 5) {
                $(".recommendBooks").css("width", "140%");
            } else {
                $(".recommendBooks").width(Math.round((data.obj.length * 0.25) * 10000) / 100.00 + "%");
            }
            $(".recommendBooks").html('');
        } else {
            var len = data.length > 5 ? 5 : data.length;
            if (len == 3) {
                $(".recommendBooks").css("width", "99%");
            } else if (len == 4) {
                $(".recommendBooks").css("width", "99%");
            } else if (len == 5) {
                $(".recommendBooks").css("width", "99%");
            } else {
                $(".recommendBooks").width(Math.round((data.obj.length * 0.166) * 10000) / 100.00 + "%");
            }
            $(".recommendBooks").html('');
        }
    } else {
        var len = data.length > 5 ? 5 : data.length;
        if (len == 3) {
            $(".recommendBooks").css("width", "99%");
        } else if (len == 4) {
            $(".recommendBooks").css("width", "99%");
        } else if (len == 5) {
            $(".recommendBooks").css("width", "99%");
        } else {
            $(".recommendBooks").width(Math.round((data.obj.length * 0.166) * 10000) / 100.00 + "%");
        }
        $(".recommendBooks").html('');
    }
    for (var i = 0; i < len; i++) {

        var obj = data[i];
        var bookItems = $("#bookItems").clone();
        bookItems.attr("id", obj.id);
        bookItems.removeClass("uhide");
        //图片
        bookItems.find(".bookImages").attr("src", _SERVER_ADDRESS + obj.image);
        bookItems.find(".bookNames").html(obj.name);

        /*
         var g_wgt_url = "wgt://data/download" + (obj.image);
         var g_img_url = _SERVER_ADDRESS + obj.image;
         g_download_list.push((obj.image));
         if (uexFileMgr.isFileExistByPath(g_wgt_url)) {
         //本地有图片
         var real_url = "file:/" + uexFileMgr.getFileRealPath(g_wgt_url);
         bookItems.find(".bookImages").attr("src", real_url);
         } else {
         //本地没图片
         bookItems.find(".bookImages").attr("src", g_img_url);
         }
         */

        bookItems.bind("click", function() {
            var id = $(this).attr("id");
            //appcan.alert(id);
            getProgramInfoById(id, function(data) {
                getProgramInfo();
                programInfo = data;
                setProgramInfo();
                appcan.window.open("column_index", "column_index.html", 5);
            }, null);
        });

        $(".recommendBooks").append(bookItems);
    }
}

//轮播数据
function loadActivityList() {

    $("#name").html(userInfo.name);
    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新：" + time1;
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    uexWindow.resetBounceView("0");

    if (pageIndex == 1) {
        uexWindow.resetBounceView("0");
    } else {
        uexWindow.resetBounceView("1");
    }

    var params = {
        'userId' : userInfo.id
    };
    common.ajax("/system/getActivityList", {
        params : JSON.stringify(params)
    }, function(data) {

        getNewsinformations();
        var list = data.obj;
        var objs;
        $(".swiper-wrapper").html('');
        for (var i = 0; i < list.length; i++) {
            var objItem = $("#item").clone();
            var item = list[i];
            objItem.attr("id", item.id).attr("isLink", item.isLink).attr("address", item.address);
            objItem.removeClass("uhide");
            //轮播图片-
            objItem.find(".bookImg").attr("src", _SERVER_ADDRESS + item.image);

            objItem.bind("click", function() {
                var id = $(this).attr("id");
                commInfo.activityAddress = "";
                if ($(this).attr("isLink") != "0") {
                    commInfo.activityAddress = $(this).attr("address");
                }
                commInfo.activityId = id;
                setCommInfo();
                appcan.window.open("activity", "activity.html", 10);
            });

            $(".swiper-wrapper").append(objItem);
        }
        swiper = new Swiper('.swiper-container', {
            pagination : '.swiper-pagination',
            autoplay : 5000,
            autoplayDisableOnInteraction : false,
            loop : false
        });

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
        //getRecommendBook();
    });
}

var g_download_list = [];
//课程领读
function Reads() {
    var params = {
        'programCategory' : '7'
    };
    common.ajax("/program/getProgramInfo", {
        params : JSON.stringify(params)
    }, function(data) {
        var len = data.obj.length > 4 ? 4 : data.obj.length;

        if (len == 2) {
            $(".Reads").css("width", "100%");
        } else if (len == 3) {
            $(".Reads").css("width", "150%");
        } else if (len == 4) {
            $(".Reads").css("width", "200%");
        } else {
            //$(".Reads").width(Math.round((data.obj.length * 0.25) * 10000) / 100.00 + "%");
            $(".Reads").width((50 * len) + "%");
        }
        $(".Reads").html('');
        for (var i = 0; i < len; i++) {

            var obj = data.obj[i];
            var ReadItem = $("#ReadItems").clone();
            ReadItem.attr("id", obj.id);
            ReadItem.attr("grade", obj.grade);
            ReadItem.attr("month", obj.month);
            ReadItem.attr("year", obj.year);
            ReadItem.attr("name", obj.name);

            ReadItem.removeClass("uhide");
            //图片
            ReadItem.find(".ReadImages").attr("src", _SERVER_ADDRESS + obj.image);

            /*
             var g_wgt_url = "wgt://data/download" + (obj.image);
             var g_img_url = _SERVER_ADDRESS + obj.image;

             if (uexFileMgr.isFileExistByPath(g_wgt_url)) {
             //本地有图片
             g_img_url = "file:/" + uexFileMgr.getFileRealPath(g_wgt_url);
             }
             ReadItem.find(".ReadImages").attr("src", g_img_url);
             */

            ReadItem.find(".ReadNames").html(obj.name);

            ReadItem.bind("click", function() {
                var month = $(this).attr("month");
                var name = $(this).attr("name");
                var report = $(this).attr("year");

                getSysInfo();
                sysInfo.ranking = {
                    "grade" : month,
                    "name" : name,
                    "report" : report
                };
                setSysInfo();

                appcan.window.open("readcontents", "yueduquan/Readcontents.html", 5);

            });

            $(".Reads").append(ReadItem);
        }

        getRecommendBook();
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    });
}

//导读视频
function getRecommendBook() {

    var params = {
        'userId' : userInfo.id
    };
    common.ajax("/student/book/getVideoBook", {
        params : JSON.stringify(params)
    }, function(data) {

        uexWindow.resetBounceView("1");

        var height_screen = document.body.clientHeight;
        var width_screen = document.body.clientWidth;
        if (height_screen > width_screen) {
            if (width_screen <= 1080) {
                var len = data.obj.length > 6 ? 6 : data.obj.length;
                if (len >= 4) {
                    $(".recommendBook").css("width", "146%");
                } else {
                    $(".recommendBook").width(Math.round((data.obj.length * 0.25) * 10000) / 100.00 + "%");
                }
                $(".recommendBook").html('');
            } else {

                var len = data.obj.length > 6 ? 6 : data.obj.length;
                if (len >= 4) {
                    $(".recommendBook").css("width", "99%");
                } else {
                    $(".recommendBook").width(Math.round((data.obj.length * 0.166) * 10000) / 100.00 + "%");
                }
                $(".recommendBook").html('');
            }
        } else {
            var len = data.obj.length > 6 ? 6 : data.obj.length;
            if (len >= 4) {
                $(".recommendBook").css("width", "99%");
            } else {
                $(".recommendBook").width(Math.round((data.obj.length * 0.166) * 10000) / 100.00 + "%");
            }
            $(".recommendBook").html('');
        }

        for (var i = 0; i < len; i++) {
            var obj = data.obj[i];
            var bookItem = $("#bookItem").clone();
            bookItem.attr("id", obj.id).attr("bookId", obj.bookId);
            bookItem.removeClass("uhide");
            //图片

            bookItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
            bookItem.find(".bookName").html('《' + obj.name + '》');
            /*

             var g_wgt_url = "wgt://data/download" + (obj.image);
             var g_img_url = _SERVER_ADDRESS + obj.image;
             g_download_list.push((obj.image));
             if (uexFileMgr.isFileExistByPath(g_wgt_url)) {
             //本地有图片
             var real_url = "file:/" + uexFileMgr.getFileRealPath(g_wgt_url);
             bookItem.find(".bookImage").attr("src", real_url);

             } else {
             //本地没图片
             bookItem.find(".bookImage").attr("src", g_img_url);
             }

             //bookItem.find(".bookName").attr("src",_SERVER_VIDEO_ADDRESS + obj.videoFile);
             */

            bookItem.bind("click", function() {
                var id = $(this).attr("id");
                getBookInfoById(userInfo.id, id, function(data) {
                    getBookInfo();
                    bookInfo = data;
                    setBookInfo();
                    $(this).attr("id");
                    //uexVideo.open(_SERVER_VIDEO_ADDRESS + obj.videoFile,0);
                    appcan.window.open("yuedu_index", "yuedu_index.html", 5);
                    //appcan.alert(1);
                    //toast(getMsgByKey(obj.name),config.toastTimeShort);
                }, null);
            });

            $(".recommendBook").append(bookItem);
        }
        //getProgramInfos();
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    });
}

//精读资源
function getProgramInfos() {
    var params = {
        'programCategory' : '1'
    };
    common.ajax("/program/getProgramInfo", {
        params : JSON.stringify(params)
    }, function(data) {
        var len = data.obj.length > 5 ? 5 : data.obj.length;
        if (len == 3) {
            $(".recommendBooks").css("width", "100%");
        } else if (len == 4) {
            $(".recommendBooks").css("width", "110%");
        } else if (len == 5) {
            $(".recommendBooks").css("width", "140%");
        } else {
            $(".recommendBooks").width(Math.round((data.obj.length * 0.25) * 10000) / 100.00 + "%");
        }
        $(".recommendBooks").html('');
        for (var i = 0; i < len; i++) {

            var obj = data.obj[i];
            var bookItems = $("#bookItems").clone();
            bookItems.attr("id", obj.id);
            bookItems.removeClass("uhide");
            //图片
            bookItems.find(".bookImages").attr("src", _SERVER_ADDRESS + obj.image);
            bookItems.find(".bookNames").html(obj.name);

            /*
             var g_wgt_url = "wgt://data/download" + (obj.image);
             var g_img_url = _SERVER_ADDRESS + obj.image;
             g_download_list.push((obj.image));
             if (uexFileMgr.isFileExistByPath(g_wgt_url)) {
             //本地有图片
             var real_url = "file:/" + uexFileMgr.getFileRealPath(g_wgt_url);
             bookItems.find(".bookImages").attr("src", real_url);
             } else {
             //本地没图片
             bookItems.find(".bookImages").attr("src", g_img_url);
             }
             */

            bookItems.bind("click", function() {
                var id = $(this).attr("id");
                //appcan.alert(id);
                getProgramInfoById(id, function(data) {
                    getProgramInfo();
                    programInfo = data;
                    setProgramInfo();
                    appcan.window.open("column_index", "column_index.html", 5);
                }, null);
            });

            $(".recommendBooks").append(bookItems);

            download_piclist();
        }

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    });
}

//新闻
function getNewsinformations() {

    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新：" + time1;
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    var params = {
        'userId' : userInfo.id,
        'pageSize' : 3,
        'pageIndex' : pageIndex,
        'programCategory' : '2'
    };
    common.ajax("/program/getProgramInfoMore", {
        params : JSON.stringify(params)
    }, function(data) {

        Reads();
        if (!data.obj || !data.obj.list || data.obj.list.length == 0) {
            if (pageIndex > 1) {
                pageIndex--;
            }
            if ($("#bookLists .items").length > 0) {
                toast("已全部加载~", config.toastTimeShort);
            } else {
                myPrompt.show("未找到数据", "#bookList");
            }
        } else {
            myPrompt.hide();
            var index = 0;
            var shtml = '';
            for (var i = 0; i < data.obj.list.length - 1; i++) {
                var obj = data.obj.list[i];
                var objNews = $("#item_news").clone();
                objNews.attr("id", obj.id);
                objNews.removeClass("uhide");
                objNews.find("li").html(obj.name);
                var newstitle = obj.name.substring(0, 18);
                shtml += '<li>' + newstitle + '</li>';
            }
            $("#news_list").html(shtml);
        }

        uexWindow.resetBounceView("1");
    }, function(data) {
        isLoading = false;
        if (pageIndex > 1) {
            pageIndex--;
        }
        uexWindow.resetBounceView("1");
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    }, {
        loadingMsg : '正在查询，请稍后...'
    });
}

//新闻资讯
function getNewsinformations_old() {
    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新：" + time1;
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    var params = {
        'userId' : userInfo.id,
        'pageSize' : 3,
        'pageIndex' : pageIndex,
        'programCategory' : '2'
    };
    common.ajax("/program/getProgramInfoMore", {
        params : JSON.stringify(params)
    }, function(data) {
        if (!data.obj || !data.obj.list || data.obj.list.length == 0) {
            if (pageIndex > 1) {
                pageIndex--;
            }
            if ($("#bookLists .items").length > 0) {
                toast("已全部加载~", config.toastTimeShort);
            } else {
                myPrompt.show("未找到数据", "#bookList");
            }
        } else {
            myPrompt.hide();
            var index = 0;
            for (var i = 0; i < data.obj.list.length; i++) {
                var obj = data.obj.list[i];
                var objNews = $("#items").clone();
                objNews.attr("id", obj.id);
                objNews.removeClass("uhide");
                if (obj.image.length > 0) {
                    objNews.find(".NewImage").removeClass("uhide");
                    objNews.find(".NewImages").removeClass("uhide");
                    objNews.find(".NewImage").attr("src", _SERVER_ADDRESS + obj.image);
                }
                //三张图
                if (obj.image01.length > 0) {
                    objNews.find(".Image01").removeClass("uhide");
                    objNews.find(".Image01").attr("src", _SERVER_ADDRESS + obj.image01);
                }
                if (obj.image02.length > 0) {
                    objNews.find(".Image02").removeClass("uhide");
                    objNews.find(".Image02").attr("src", _SERVER_ADDRESS + obj.image02);
                }
                if (obj.image03.length > 0) {
                    objNews.find(".Image03").removeClass("uhide");
                    objNews.find(".Image03").attr("src", _SERVER_ADDRESS + obj.image03);
                }

                //video
                if (obj.videoFile.length > 0) {
                    objNews.find(".video").removeClass("uhide");
                    objNews.find(".videos").attr("poster", _SERVER_ADDRESS + obj.posterImagePath);
                    objNews.find(".video").attr("src", _SERVER_VIDEO_ADDRESS + obj.videoFile);

                }
                //视频
                objNews.find(".video").on("touchstart", function() {
                    $(this).parents(".item").removeClass("click");
                })

                objNews.find(".NewName").html(obj.name);
                objNews.find(".Newremarks").html(obj.remarks);
                objNews.find(".evaluateTimes").html(obj.evaluateTimes);
                objNews.find(".hits").html(obj.hits);
                objNews.find(".Namdata").html(obj.createDate);
                objNews.find(".abc").attr("id", obj.id);
                objNews.find(".abc").on("click", function() {
                    var id = $(this).attr("id");
                    // appcan.alert(id);
                    getProgramInfoById(id, function(data) {
                        getProgramInfo();
                        programInfo = data;
                        setProgramInfo();
                        appcan.window.open("information", "information.html", 5);

                    }, null);
                });

                $("#bookLists").append(objNews);
            }
        }

        uexWindow.resetBounceView("1");
    }, function(data) {
        isLoading = false;
        if (pageIndex > 1) {
            pageIndex--;
        }
        uexWindow.resetBounceView("1");
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    }, {
        loadingMsg : '正在查询，请稍后...'
    });
}

//下载文件
function downloadFile() {
    uexDownloaderMgr.cbCreateDownloader = function(opCode, dataType, data) {
        switch(dataType) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            if (data == 0) {
                uexDownloaderMgr.download(1, g_img_url, g_wgt_url, 0);
            }
            break;
        default:
            break;
        }
    }
    uexDownloaderMgr.onStatus = function(opCode, fileSize, percent, status) {
        switch (status) {
        case 0:
            break;
        case 1:
            uexDownloaderMgr.closeDownloader(1);
            break;
        case 2:
            uexDownloaderMgr.closeDownloader(1);
            break;
        case 3:
            break;
        }
    }
    uexDownloaderMgr.createDownloader(1);
}

function download_piclist() {
    for (var i = 0; i < g_download_list.length; i++) {
        dow_pic(i);
    }
}

function dow_pic(i) {
    var m_wgt_url = "wgt://data/download" + (g_download_list[i]);
    var m_img_url = _SERVER_ADDRESS + (g_download_list[i]);
    if (!uexFileMgr.isFileExistByPath(m_wgt_url)) {
        var downloader = uexDownloaderMgr.create();
        uexDownloaderMgr.download(downloader, m_img_url, m_wgt_url, 1, function(fileSize, percent, status) {
            switch (status) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            }
        });
    }

}
