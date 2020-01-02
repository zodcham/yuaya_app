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
var searchType = '2';

appcan.ready(function() {
    getUserInfo();
    getCommInfo();
    getSysInfo();

    sign(userInfo.id);

    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(0, 1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView("0", "rgba(0, 0, 0, 0)", 1);
    uexWindow.showBounceView("1", "rgba(0, 0, 0, 0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
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
                    getNewsinformations();
                }
                break;
        }
    };

    $("#item").css("width", $("#main").width() + "px");
    $(".swiper-wrapper").css("width", $("#main").width() + "px");
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

    $("#more").bind("click", function() {
        uexWindow.evaluateScript("", 0, "goMall();");
    });
    // $(".itembtn").on("click", function() {
    // toast("新功能即将上线~~", config.toastTimeShort);
    // });

    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    loadJson.levelText = "上次加载：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    //loadActivityList();


    getSysInfo();
    if (sysInfo.phoneType == "0") {
        $("#home_action").attr("scrollamount","5");
    }



    LoadAll();
})


appcan.button("#banner_bg", "btn-act", function() {
    appcan.window.open("pk_list", "pk/pk_list.html", 10);
});

appcan.button("#pub_task", "btn-act", function() {
    appcan.window.open("pub_task", "task/pub_task.html", 10);
});
appcan.button("#myBookList", "btn-act", function() {
    appcan.window.open("bookList", "user/user_book_list.html", 10);
});
appcan.button("#myreward", "btn-act", function() {
    appcan.window.open("user_reward_list", "user/user_reward_lists.html", 10);
});
appcan.button("#myRecommended", "btn-act", function() {
    appcan.window.open("user_recommended", "user/user_recommended.html", 10);
});
appcan.button("#myStudent", "btn-act", function() {
    appcan.window.open("user_student", "user/user_student.html", 10);
});

// 导读视频更多
appcan.button("#introduction", "btn-act", function() {
    appcan.window.open("book_introduction", "book/book_introduct.html", 10);
});
//名师课程更多
appcan.button("#Famousteache", "btn-act", function() {
    appcan.window.open("book_introduction", "book/book_Famousteache.html", 10);

});
appcan.button("#Readbut", "btn-act", function() {
    appcan.window.open("Read_content", "yueduquan/Read.html", 5);
});

//月芽头条
appcan.button("#news", "btn-act", function() {
    appcan.window.open("newslist", "newslist.html", 5);
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


//隐藏首页系统消息
function hide_action(){
    $("#div_action").addClass("uhide");
}






function LoadAll() {

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

    };
    var fok = function(data) {
        LoadBooks();

        data = JSON.parse(data);
        loadBanner(data.lbsj);
        LoadCourse(data.kcld);
        LoadVideo(data.ddsp);
        LoadResourse(data.jdzy);
        LoadNews(data.xw);
        GetNewMessage();

    };
    common.ajaxPOST(url, par, fok, ferr);
    /*

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



//活动海报轮播
function loadBanner(lbsj){

    var params = {
        pageSize : '20',
        pageIndex : pageIndex,
        schoolId: userInfo.schoolId
    };
    common.ajax("/activity/page", {
        params : JSON.stringify(params)
    }, function(data) {
        var pkList=[];
        if(data.obj.hasOwnProperty("schoolList")){
            list = data.obj.schoolList.list;
            if(list){
                for(var i=0;i<list.length;i++){
                    var obj=list[i];
                    var beginDate=obj.beginDate;
                    var endDate=obj.endDate;
                    var bd = new Date(Date.parse(beginDate.replace(/-/g,"/")));
                    var ed = new Date(Date.parse(endDate.replace(/-/g,"/")));
                    var curDate=new Date();
                    if(curDate>=bd && curDate<=ed){
                        var img= obj.images;
                        var title=obj.title;
                        var pk_id=obj.id;
                        pkList.push({"image":img, "address":"", "is_link":"0","id":pk_id});
                    }
                }
            }
        }
        if(data.obj.hasOwnProperty("sysList")) {
            list = data.obj.sysList.list;
            if(list){
                for(var i=0;i<list.length;i++) {
                    var obj = list[i];
                    var beginDate = obj.beginDate;
                    var endDate = obj.endDate;
                    var bd = new Date(Date.parse(beginDate.replace(/-/g, "/")));
                    var ed = new Date(Date.parse(endDate.replace(/-/g, "/")));
                    var curDate = new Date();
                    if (curDate >= bd && curDate <= ed) {
                        var img = obj.images;
                        var title = obj.title;
                        var pk_id = obj.id;
                        //setPK(pk_id, img);
                        pkList.push({"image": img, "address": "", "is_link": "0", "id": pk_id});
                    }
                }
            }
        }
        var gameList=pkList.concat(lbsj)

        var height_screen = document.body.clientHeight;
        var width_screen = document.body.clientWidth;
        if (height_screen > width_screen) {
            $("#item").css("width", $("#main").width() + "px");
            $(".swiper-wrapper").css("width", $("#main").width() + "px");
            //图片高度设置
            $(".swiper-wrapper").css("height", ($("#main").width() / 12 * 5) + "px");
            $("#banner_bg").css("width", $("#main").width() + "px").css("height", ($("#main").width() / 12 * 5) + "px");
            LoadSwiper(gameList);
        } else {
            $(".swiper-wrapper").addClass("uhide");
        }

    }, function(data) {

    });

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
            if ($(this).attr("isLink") != "0") {
				var id = $(this).attr("id");
				commInfo.activityAddress = "";
                commInfo.activityAddress = $(this).attr("address");
				commInfo.activityId = id;
                setCommInfo();
                appcan.window.open("activity", "activity.html", 10);
            }
            else{
                var id = $(this).attr("id");
                setLocVal("pk_id",id);
                setLocVal("pk_student_id","");
                appcan.window.open("pk_detail", "pk2/pk_detail.html", 5);

                
            }
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



//课程领读
function LoadCourse(data) {
    var height_screen=document.body.clientHeight;
    var width_screen=document.body.clientWidth;
    if(height_screen>width_screen){
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
    }
    else{
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
    $(".Reads").html('');
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

            appcan.window.open("Readcontent", "yueduquan/Readcontents.html", 5);

        });

        $(".Reads").append(ReadItem);
    }

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


//导读视频
function LoadVideo(data) {
    var height_screen=document.body.clientHeight;
    var width_screen=document.body.clientWidth;
    if(height_screen>width_screen){
        if(width_screen<=1080){
            var len = data.length > 6 ? 6 : data.length;
            if (len >= 4) {
                $(".recommendBook").css("width", "146%");
            } else {
                $(".recommendBook").width(Math.round((data.length * 0.25) * 10000) / 100.00 + "%");
            }
            $(".recommendBook").html('');
        }
        else{

            var len = data.length > 6 ? 6 : data.length;
            if (len >= 4) {
                $(".recommendBook").css("width", "99%");
            } else {
                $(".recommendBook").width(Math.round((data.length * 0.166) * 10000) / 100.00 + "%");
            }
            $(".recommendBook").html('');
        }
    }
    else{
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
                //uexVideo.open(_SERVER_VIDEO_ADDRESS + obj.videoFile,0);
                //appcan.window.open("yueduIndex", "yuedu_index.html", 5);
                setLocVal("bookInfo_default","video");
                appcan.window.open("book_default", "book/book_default.html", 5);
                //appcan.alert(1);
                //toast(getMsgByKey(obj.name),config.toastTimeShort);
            }, null);
        });

        $(".recommendBook").append(bookItem);
    }
}

//精读资源
function LoadResourse(data) {
    var height_screen=document.body.clientHeight;
    var width_screen=document.body.clientWidth;
    if(height_screen>width_screen){
        if(width_screen<=1080){
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
        }
        else{
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
    }
    else{
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
                appcan.window.open("column_index", "book/column_index.html", 5);
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
        var list = data.obj;
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
                //appcan.window.open("activity", "activity.html", 10);
                appcan.window.open("pk_list", "pk/pk_list.html", 10);
            });

            $(".swiper-wrapper").append(objItem);
        }
        swiper = new Swiper('.swiper-container', {
            pagination : '.swiper-pagination',
            autoplay : 5000,
            autoplayDisableOnInteraction : false,
            loop : false
        });
        Reads();
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
        //getRecommendBook();
    });
}

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
            $(".Reads").css("width", "140%");
        } else if (len == 4) {
            $(".Reads").css("width", "180%");
        } else {
            $(".Reads").width(Math.round((data.obj.length * 0.25) * 10000) / 100.00 + "%");
        }
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
                appcan.window.open("Readcontents", "yueduquan/Readcontents.html", 10);

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
        var len = data.obj.length > 6 ? 6 : data.obj.length;
        if (len >= 4) {
            $(".recommendBook").css("width", "146%");
        } else {
            $(".recommendBook").width(Math.round((data.obj.length * 0.25) * 10000) / 100.00 + "%");
        }
        for (var i = 0; i < len; i++) {
            var obj = data.obj[i];
            var bookItem = $("#bookItem").clone();
            bookItem.attr("id", obj.id).attr("bookId", obj.bookId);
            bookItem.removeClass("uhide");
            //图片

            bookItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
            bookItem.find(".bookName").html('《' + obj.name + '》');

            //bookItem.find(".bookName").attr("src",_SERVER_VIDEO_ADDRESS + obj.chooseVideoPath);

            bookItem.bind("click", function() {
                var id = $(this).attr("id");
                getBookInfoById(userInfo.id, id, function(data) {
                    getBookInfo();
                    bookInfo = data;
                    setBookInfo();
                    $(this).attr("id");
                    //uexVideo.open(_SERVER_VIDEO_ADDRESS + obj.chooseVideoPath,0);
                    //appcan.window.open("yueduIndex", "yuedu_index.html", 10);
                    //appcan.alert(1);
                    //toast(getMsgByKey(obj.name),config.toastTimeShort);
                    setLocVal("bookInfo_default","video");
                    appcan.window.open("book_default", "book/book_default.html", 5);
                }, null);
            });

            $(".recommendBook").append(bookItem);
        }
        getProgramInfos();
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
        for (var i = 0; i < len; i++) {

            var obj = data.obj[i];
            var bookItems = $("#bookItems").clone();
            bookItems.attr("id", obj.id);
            bookItems.removeClass("uhide");
            //图片
            bookItems.find(".bookImages").attr("src", _SERVER_ADDRESS + obj.image);
            bookItems.find(".bookNames").html(obj.name);

            bookItems.bind("click", function() {
                var id = $(this).attr("id");
                //appcan.alert(id);
                getProgramInfoById(id, function(data) {
                    getProgramInfo();
                    programInfo = data;
                    setProgramInfo();
                    appcan.window.open("column_index", "book/column_index.html", 10);
                }, null);
            });

            $(".recommendBooks").append(bookItems);
        }

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    });
}

//新闻资讯
function getNewsinformations() {

    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新：" + time1;
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    var params = {
        'userId' : userInfo.id,
        'pageSize' : 3,
        'pageIndex' : pageIndex,
        'programCategory' : searchType
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
                objNews.find(".abc").attr("id", obj.id);
                objNews.find(".abc").on("click", function() {
                    var id = $(this).attr("id");
                    // appcan.alert(id);
                    getProgramInfoById(id, function(data) {
                        getProgramInfo();
                        programInfo = data;
                        setProgramInfo();
                        appcan.window.open("information", "information.html", 10);

                    }, null);
                });
                //视频
                objNews.find(".video").on("touchstart", function() {
                    $(this).parents(".items").removeClass("click");
                })
                objNews.find(".NewName").html(obj.name);

                objNews.find(".evaluateTimes").html(obj.evaluateTimes);
                objNews.find(".hits").html(obj.hits);
                objNews.find(".Namdata").html(obj.createDate);

                objNews.bind("click", function() {

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




//最新活动
function LoadPK() {
    var params = {
        pageSize : '9',
        pageIndex : pageIndex,
        schoolId: userInfo.schoolId
    };
    common.ajax("/activity/page", {
        params : JSON.stringify(params)
    }, function(data) {
        if(data.obj.hasOwnProperty("schoolList")){
            list = data.obj.schoolList.list;
            if(list){
                var obj=list[0];
            }
        }
        else{
            if(data.obj.hasOwnProperty("sysList")) {
                list = data.obj.sysList.list;
                if(list){
                    var obj=list[0];
                    var beginDate=obj.beginDate;
                    var endDate=obj.endDate;
                    var bd = new Date(Date.parse(beginDate.replace(/-/g,"/")));
                    var ed = new Date(Date.parse(endDate.replace(/-/g,"/")));
                    var curDate=new Date();
                    if(curDate>=bd && curDate<=ed){
                        var img= _SERVER_ADDRESS + obj.images;
                        var title=obj.title;
                        var pk_id=obj.id;
                        setPK(pk_id, img);
                    }
                }
            }
        }

    }, function(data) {

    });
}
function setPK(id, img){
    $(".swiper-container").addClass("uhide");
    $("#banner_bg").removeClass("uhide");
    $("#pk_bg").css("height", (document.body.clientWidth*5/12)+"px");
    $("#pk_bg").attr("src",img);

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



function GetNewMessage(){
    $("#home_information").html("");
    $("#div_action").addClass("uhide");
    $("#action_close").addClass("uhide");
    return false;

    var url = _SERVER_ADDRESS + "/new/findSysMessage";
    var par = {};
    var fok = function(data) {
        var obj=JSON.parse(data);
        //var yueya_title = "公告：互动分享和读后感的图片上传问题已解决，欢迎使用。";
        //yueya_title="";

        if (obj.length > 0) {
            var yueya_title = obj[0].TITLE;
            setLocVal("message_id",obj[0].ID);
            setLocVal("message_title",obj[0].TITLE);
            setLocVal("message_content",obj[0].CONTENT);
            setLocVal("message_addtime",formatDateTime(obj[0].CREATE_DATE));


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



appcan.button("#goodBook", "btn-act", function() {
    appcan.window.open("good_book", "book/good_book.html", 5);
});




//好书推荐
function LoadBooks() {
    getUserInfo();

    var par={"params" : JSON.stringify({"schoolId":userInfo.schoolId,"pageIndex":1, "pageSize":10})};
    var url = _SERVER_ADDRESS + "/phone/student/book/getRecommendBookBySchoolId";
    var ferr = function(err) {
    };

    var fok = function(data) {

        var objBook=JSON.parse(data).obj.list;
        var height_screen = document.body.clientHeight;
        var width_screen = document.body.clientWidth;
        if (height_screen > width_screen) {
            if (width_screen <= 1080) {
                var len = objBook.length > 6 ? 6 : objBook.length;
                if (len >= 4) {
                    $(".goodBook").css("width", "146%");
                } else {
                    $(".goodBook").width(Math.round((objBook.length * 0.25) * 10000) / 100.00 + "%");
                }
                $(".goodBook").html('');
            } else {

                var len = objBook.length > 6 ? 6 : objBook.length;
                if (len >= 4) {
                    $(".goodBook").css("width", "99%");
                } else {
                    $(".goodBook").width(Math.round((objBook.length * 0.166) * 10000) / 100.00 + "%");
                }
                $(".goodBook").html('');
            }
        } else {
            var len = objBook.length > 6 ? 6 : objBook.length;
            if (len >= 4) {
                $(".goodBook").css("width", "99%");
            } else {
                $(".goodBook").width(Math.round((objBook.length * 0.166) * 10000) / 100.00 + "%");
            }
            $(".goodBook").html('');
        }

        if(len>0){
            $("#divGoodBook").removeClass("uhide");
        }

        for (var i = 0; i < len; i++) {
            var obj = objBook[i];
            var bookItem = $("#bookItem").clone();
            bookItem.attr("id", obj.bookId);
            bookItem.removeClass("uhide");
            //图片

            bookItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.bookPhoto);
            bookItem.find(".bookName").html('《' + obj.bookName + '》');


            bookItem.bind("click", function () {
                var id = $(this).attr("id");
                getBookInfoById(userInfo.id, id, function(data) {
                    getBookInfo();
                    bookInfo = data;
                    setBookInfo();
                    appcan.window.open("book_default", "book/book_default.html", 5);
                }, null);
            });

            $(".goodBook").append(bookItem);
        }
    }
    common.ajaxPOST(url, par, fok, ferr);
}


