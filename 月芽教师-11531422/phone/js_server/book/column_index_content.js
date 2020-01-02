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
    getProgramInfo();
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
});

function reloadData() {
    $("#CommentsList").empty();
    pageIndex = 1;
    listData = [];
    loadData();
}

function loadData() {
    var params = {
        'programId' : programInfo.id,
        'pageSize' : 20,
        'pageIndex' : pageIndex
    };
    common.ajax("/programReview/listByProgram", {
        params : JSON.stringify(params)
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无读后感~", "#CommentsList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    var objItem = $("#item").clone();
                    objItem.removeClass("uhide");
                    objItem.attr("id", obj.id);
                    objItem.attr("num", listData.length);
                    objItem.find(".user-Name").html(obj.studentName);
                    if (obj.studentImage.length > 0) {
                        objItem.find(".user-Photo").attr("src", _SERVER_ADDRESS + obj.studentImage);
                    }

                    objItem.find(".user").attr("uid", obj.studentId);
                    objItem.find(".user").on("click", function() {
                        var userId = $(this).attr("uid");
                        getCommInfo();
                        commInfo.studentId = userId;
                        setCommInfo();
                        appcan.window.open("message_other", "../message/message_other.html", 10);
                    });

                    objItem.find(".user-Photo").attr("uid", obj.studentId);
                    objItem.find(".user-Photo").on("click", function() {
                        var userId = $(this).attr("uid");
                        getCommInfo();
                        commInfo.studentId = userId;
                        setCommInfo();
                        appcan.window.open("message_other", "../message/message_other.html", 10);
                    });

                    objItem.find(".like").html(obj.likes);
                    objItem.find(".like").attr("value", obj.likes);

                    objItem.find(".comments").html(obj.comments);
                    var content = obj.content.replace(new RegExp("\n", "g"), "<br><br>");
                    content = content.replace(new RegExp("<br/>", "g"), "<br><br>");
                    // var result =content.split("<br>");
                    // content = "";
                    // for (var j = 0 ; j < result.length ; j ++) {
                    // content +="<p style='text-indent:2em'>"+result[j]+"</p>";
                    // }
                    objItem.find(".content").html(content);
                    objItem.find(".date").html(getformatDate(obj.createDateText, "yyyy-MM-dd HH:mm"));

                    for (var j = 1; j < 4; j++) {
                        if (obj["image0" + j].length > 0) {
                            var divImg = $("<div class='umar-r ub-f1'><img class='click' src='" + _SERVER_ADDRESS + obj["image0" + j] + "' style='width:100%;height:100%'></div>");
                            objItem.find(".imgs").append(divImg);
                        }
                    }
                    if (obj.childList && obj.childList.length > 0) {
                        for (var j = 0; j < obj.childList.length; j++) {
                            var objChilds = obj.childList[j];
                            objItem.find(".dateTitle").html("更新于");
                            objItem.find(".date").html(getformatDate(objChilds.createDateText, "yyyy-MM-dd HH:mm"));
                        }
                    }

                    listData.push(obj);
                    objItem.find(".contentMain").on("click", function() {
                        var num = $(this).parents(".item").attr("num");
                        programInfo.readFeeling = listData[num];
                        setProgramInfo();
                        appcan.window.open("column_read_feeling", "column_read_feeling.html", 10);
                    });

                    objItem.find(".btnComments").on("click", function() {
                        var num = $(this).parents(".item").attr("num");
                        programInfo.readFeeling = listData[num];
                        setProgramInfo();
                        appcan.window.open("column_read_feeling", "column_read_feeling.html", 10);
                    });

                    objItem.find(".likeBox").on("click", function() {
                        addLike($(this).parents(".item").attr("id"));
                        event.stopPropagation();
                    });

                    objItem.find(".click2").on("touchstart", function() {
                        $(this).parents(".item").removeClass("click");
                    }).on("touchend", function() {
                        setTimeout(function() {
                            $(this).parents(".item").addClass("click");
                        }, 500);
                    }).on("touchcancel", function() {
                        setTimeout(function() {
                            $(this).parents(".item").addClass("click");
                        }, 500);
                    });

                    $("#CommentsList").append(objItem);
                }
            } else {
                pageIndex--;
                toast("没有更多读后感了~", config.toastTimeShort);
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

function addLike(reviewId) {
    var params = {
        'userId' : userInfo.id,
        'reviewId' : reviewId
    };
    common.ajax("/programReview/addLikes", {
        params : JSON.stringify(params)
    }, function(data) {
        var position = $("#" + reviewId).attr("num");
        listData[position].likes = listData[position].likes + 1;
        $("#" + reviewId).find(".likeBox").unbind("click");
        var like = $("#" + reviewId).find(".like");
        //icon_like_pressed
        $("#" + reviewId).find(".icon_like").addClass("icon_like_pressed").removeClass("icon_like");
        like.attr("value", parseInt(like.attr("value") + 1));
        like.html(like.attr("value"));
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
}