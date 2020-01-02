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
var listData = [];
appcan.ready(function() {
    getUserInfo();
    getBookInfo();
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
                    reloadJson.levelText = "上次刷新：" + time1;
                    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
                    reloadData();
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



    window.onscroll = function () {
        var a = document.documentElement.scrollTop || document.body.scrollTop;//滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight;//可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight;//可视化的高度与溢出的距离（总高度）
        if(a + b == c){
            pageIndex++;
            loadData();
        }
    }

});

function reloadData() {
    $("#CommentsList").empty();
    pageIndex = 1;
    listData = [];
    loadData();
}

function loadData() {
	
    var params = {
        'activityId' : getLocVal("pk_id"),
        'studentId' : userInfo.id,
        'pageSize' : 20,
        'pageIndex' : pageIndex
    };

    var url="/activity/production/page?params="+encodeURI(JSON.stringify(params));
    common.ajax(url, {
        params : JSON.stringify(params)
    }, function(data) {
        //AddLogContent(userInfo.id, logKeys.BookReviewList, {"bookId":bookInfo.id});
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无作品~", "#CommentsList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;
            if (list) {
                appcan.window.evaluateScript({
                    name : "pk_detail", //窗口名称
                    scriptContent : 'removeAdd();'
                });
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    var objItem = $("#item").clone();
                    objItem.removeClass("uhide");

                    objItem.attr("id", obj.id);
                    objItem.attr("num", listData.length);

                    objItem.find(".user-Name").html(obj.studentName);
                    if (obj.studentPhoto) {
                        objItem.find(".user-Photo").attr("src", "http://www.readseed.cn" + obj.studentPhoto);
                    }

                    if (userInfo.id === obj.createBy) {
                        objItem.find(".delete").html("删除");
                    } else {
                        objItem.find(".delete").html("");
                    }

                    objItem.find(".user").attr("uid", obj.createBy);
                    objItem.find(".user").on("click", function() {
                        var userId = $(this).attr("uid");
                        getCommInfo();
                        commInfo.studentId = userId;
                        setCommInfo();
                        appcan.window.open("message_other", "../message/message_other.html", 5);
                    });

                    objItem.find(".user-Photo").attr("uid", obj.createBy);
                    objItem.find(".user-Photo").on("click", function() {
                        var userId = $(this).attr("uid");
                        getCommInfo();
                        commInfo.studentId = userId;
                        setCommInfo();
                        appcan.window.open("message_other", "../message/message_other.html", 5);
                    });

                    objItem.find(".like").html(''+obj.likeTimes);
                    objItem.find(".like").attr("value", obj.likeTimes);

                    objItem.find(".comments").html(''+obj.commentTimes);
                    objItem.find(".teacherComments").html('名师点评:'+obj.commentTopTimes);

                    var content = obj.content.replace(new RegExp("\n", "g"), "<br><br>");
                    content = content.replace(new RegExp("<br/>", "g"), "<br><br>");
                    // var result =content.split("<br>");
                    // content = "";
                    // for (var j = 0 ; j < result.length ; j ++) {
                    // content +="<p style='text-indent:2em'>"+result[j]+"</p>";
                    // }
                    objItem.find(".content").html(content);

                    var title = obj.title.replace(new RegExp("\n", "g"), "<br><br>");
                    objItem.find(".title").html(title.substr(0,16));
                    objItem.find(".date").html(getformatDate(obj.createDate, "yyyy-MM-dd HH:mm"));

                    if(obj.images){
                        var arr=obj.images.split(",");
                        for (var j = 0; j < 3; j++) {
                            if (j>=arr.length) break;
                            var divImg = "<div style='width:7.5em;height:5em;margin-right:0.3em;'><img class='click' onclick='openbrower();' src='" + "http://www.readseed.cn" + arr[j] + "' style='width:100%;height:100%'></div>";
                            objItem.find(".imgs").append(divImg);
                        }
                    }


                    objItem.find(".title").on("click", function() {
                        var id = $(this).parent().parent().parent().attr("id");
                        setLocVal("pk_article_id",id);
                        appcan.window.open("article_detail", "article_detail.html", 5);
                    });
                    objItem.find(".imgs").on("click", function() {
                        var id = $(this).parent().parent().parent().parent().attr("id");
                        setLocVal("pk_article_id",id);
                        appcan.window.open("article_detail", "article_detail.html", 5);
                    });

                    /*
                    if (obj.childList && obj.childList.length > 0) {
                        for (var j = 0; j < obj.childList.length; j++) {
                            var objChilds = obj.childList[j];

                            objItem.find(".dateTitle").html("更新于");
                            objItem.find(".date").html(getformatDate(objChilds.createDateText, "yyyy-MM-dd HH:mm"));
                        }
                    }

                    listData.push(obj);
                    */

                    /*
                    objItem.find(".contentMain").on("click", function() {
                        var num = $(this).parents(".item").attr("num");
                        bookInfo.readFeeling = listData[num];
                        setBookInfo();
                        appcan.window.open("article_detail", "article_detail.html", 5);
                    });

                    objItem.find(".btnComments").on("click", function() {
                        var num = $(this).parents(".item").attr("num");
                        bookInfo.readFeeling = listData[num];
                        setBookInfo();
                        appcan.window.open("article_detail", "article_detail.html", 5);
                    });

*/

                    objItem.find(".likeBox").on("click", function() {
                        addLike($(this).parents(".item").attr("id"));
                        event.stopPropagation();
                    });

                    objItem.find(".delete").on("click", function() {
                        //var id = $(this).parent().parent().parent().parent().parent().parent().attr("id");
                        var id = $(this).parents().find(".item").attr("id");
                        deletes(id);
                        event.stopPropagation();
                    });


                    // objItem.find(".click2").on("touchstart",function(){
                    // $(this).parents(".item").removeClass("click");
                    // }).on("touchend",function(){
                    // setTimeout(function(){
                    // $(this).parents(".item").addClass("click");
                    // },500);
                    // }).on("touchcancel",function(){
                    // setTimeout(function(){
                    // $(this).parents(".item").addClass("click");
                    // },500);
                    // });

                    $("#CommentsList").append(objItem);

                }
            } else {
                pageIndex--;
                toast("没有更多作品了~", config.toastTimeShort);
                $("#nextPage").addClass("uhide");
            }
        }
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex > 1) {
            pageIndex--;
        }
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

//点赞
function addLike(reviewId) {
    var params = {
        'studentId' : userInfo.id,
        'productionId' : reviewId
    };
    common.ajax("/activity/production/like", {
        params : JSON.stringify(params)
    }, function(data) {
        var v=$("#"+reviewId+" .like").html();
        if(v)
            v=Number(v);
        else
            v=0;
        v+=1;
        var v=$("#"+reviewId+" .like").html(v);
        /*
        var position = $("#" + reviewId).attr("num");
        listData[position].likes = listData[position].likes + 1;
        $("#" + reviewId).find(".likeBox").unbind("click");
        var like = $("#" + reviewId).find(".like");
        //icon_like_pressed
        $("#" + reviewId).find(".icon_like").addClass("icon_like_pressed").removeClass("icon_like");
        like.attr("value", parseInt(like.attr("value") + 1));
        like.html(like.attr("value"));
        */

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
}

//读后感删除
function deletes(reviewIds) {
    appcan.window.alert({
        title : "提示",
        content : '确定删除读后感吗？',
        buttons : ['删除', '取消'],
        callback : function(err, data, dataType, optId) {

            if ("1" == data) {

            } else if ("0" == data) {
                var params = {
                    'studentId' : userInfo.id,
                    'productionId' : reviewIds
                };
                common.ajax("/activity/production/delete", {
                    params : JSON.stringify(params)
                }, function(data) {
                    toast("删除成功~", config.toastTimeShort);
                    $("#" + reviewIds).addClass("uhide");
                }, function(data) {
                    toast(getMsgByKey(data.msg), config.toastTimeShort);
                }, {
                    type : 'POST'
                });
            }
        }
    });
}


function AddReview(){
    getBookInfo();
    if (bookInfo.isFavorite == "1") {
        appcan.window.evaluateScript({
            name : "book_default", //窗口名称
            scriptContent : 'closeMedia();'
        });
        appcan.window.open("book_introduce_add", "book_introduce_add.html", 5);
    } else {
        toast("请先加入书架~", config.toastTimeShort);
    }
}

