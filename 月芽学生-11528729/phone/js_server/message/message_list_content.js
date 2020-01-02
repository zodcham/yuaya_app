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

    AddLogContent(userInfo.id, logKeys.PersonMyMessages,{});

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
        'type' : "received",
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
            myPrompt.show("暂无消息~", "#messageList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    var objItem = $("#item").clone();
                    objItem.removeClass("uhide");
                    objItem.attr("id", obj.id);
                    if (obj.senderImage.length > 0) {
                        objItem.find(".headImg img").attr("src", getHeadImageUrl(obj.senderImage));
                    }
                    objItem.find(".name").html(obj.senderName);
                    objItem.find(".content").html(obj.content);
                    objItem.find(".date").html(getformatDate(obj.sendDate, "yyyy-MM-dd HH:mm"));
                    if (obj.reply && obj.reply != "") {
                        objItem.find(".replyContent").html(obj.reply.content);
                        objItem.find(".replyDate").html(getformatDate(obj.reply.sendDate, "yyyy-MM-dd HH:mm"));
                    } else {
                        objItem.find(".divReply").removeClass("uhide");
                    }
                    objItem.find(".del").on("click", function() {
                        var id = $(this).parents(".item").attr("id");
                        appcan.alert("提示", "删除此条消息？", ["删除", "取消"], function(e, idx) {
                            if (idx == 1) {
                                return;
                            }
                            delMessage(id);
                        });
                    });
                    objItem.find(".btnReply").on("click", function() {
                        var msg = $(this).parents(".item").find(".replyMsg").val();
                        if (msg.length == 0) {
                            toast("请输入回复信息~", config.toastTimeShort);
                        } else {
                            replyMessage($(this).parents(".item").attr("id"), msg);
                        }
                    });
                    $("#messageList").append(objItem);
                }
            } else {
                if (pageIndex > 1) {
                    pageIndex--;
                }
                toast("没有更多消息了~", config.toastTimeShort);
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

function replyMessage(messageId, msg) {
    var params = {
        'userId' : userInfo.id,
        'content' : msg,
        'sourceMessageId' : messageId
    };
    common.ajax("/message/reply", {
        params : JSON.stringify(params)
    }, function(data) {
        $("#" + messageId).find(".divReply").addClass("uhide");
        $("#" + messageId).find(".replyContent").html(msg);
        $("#" + messageId).find(".replyDate").html(new Date().format("yyyy-MM-dd HH:mm:ss"));
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
}