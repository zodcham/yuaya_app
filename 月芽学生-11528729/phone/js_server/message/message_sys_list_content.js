var pageIndex = 1;
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

appcan.ready(function() {
    getUserInfo();
    getBookInfo();
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
});

function refreshData() {
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    $("#messageList .item").remove();
    pageIndex = 1;
    loadData();
}

function loadData() {
    var params = {
        'userId' : userInfo.id,
        'type' : "sys",
        pageSize : '20',
        pageIndex : pageIndex
    };
    common.ajax("/message/list", {
        params : JSON.stringify(params)
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无系统消息~", "#messageList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    var objItem = $("#item").clone();
                    objItem.removeClass("uhide");
                    objItem.attr("id", obj.id).attr("link", obj.linkInfo);
                    objItem.find(".content").html(obj.content);
                    objItem.find(".date").html(obj.sendDate);

                    objItem.find(".del").on("click", function() {
                        appcan.alert("提示", "删除此条消息？", ["删除", "取消"], function(e, idx) {
                            if (idx == 1) {
                                return;
                            }
                            delMessage($(this).parents(".item").attr("id"));
                        });
                    });

                    objItem.on("click", function() {
                        var readFeeling = {};
                        readFeeling.id = getLinkInfoUrl($(this).attr("link"));
                        bookInfo.readFeeling = readFeeling;
                        setBookInfo();
                        appcan.window.open("book_read_feeling_review", "../book/book_read_feeling_review.html", 5);
                    })
                    $("#messageList").append(objItem);
                }
            } else {
                pageIndex--;
                toast("没有更多系统消息了~", config.toastTimeShort);
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

function delMessage(messageId) {
    var params = {
        'userId' : userInfo.id,
        'messageId' : messageId
    };
    common.ajax("/message/delete", {
        params : JSON.stringify(params)
    }, function(data) {
        $("#" + messageId).remove();
        toast("已删除~", config.toastTimeShort);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
}

function getLinkInfoUrl(url) {
    if (url.length == 0) {
        return "";
    }
    var flag = "#REVIEW_COMMENT#";
    if (url.indexOf(flag) == 0) {
        url = url.substring(flag.length, flag.length + 32);
    }

    return url;
}