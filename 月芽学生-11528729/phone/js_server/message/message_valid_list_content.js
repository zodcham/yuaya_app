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
        pageSize : '20',
        pageIndex : pageIndex
    };
    common.ajax("/userFriend/verifyList", {
        params : JSON.stringify(params)
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无验证消息~", "#messageList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    var objItem = $("#item").clone();
                    objItem.removeClass("uhide");
                    objItem.attr("id", obj.id);
                    if (obj.userId == userInfo.id) {
                        objItem.attr("userId", obj.requestId);
                        objItem.find(".headImg img").attr("src", getHeadImageUrl(obj.requestPhoto));
                        objItem.find(".userName").html(obj.requestName);
                        switch(obj.status) {
                        case "1":
                            //申请
                            objItem.find(".divBtn").removeClass("uhide");
                            break;
                        case "2":
                            //同意
                            objItem.find(".msg").html("已成功添加好友");
                            break;
                        case "3":
                            //拒绝
                            objItem.find(".msg").html("已被拒绝添加好友");
                            break;
                        case "4":
                            //忽略
                            objItem.find(".msg").html("已忽略本次请求");
                            break;
                        }
                    } else {
                        objItem.attr("userId", obj.userId);
                        objItem.find(".headImg img").attr("src", getHeadImageUrl(obj.userPhoto));
                        objItem.find(".userName").html(obj.userName);
                        switch(obj.status) {
                        case "1":
                            //申请
                            objItem.find(".msg").html("加好友请求已发送");
                            break;
                        case "2":
                            //同意
                            objItem.find(".msg").html("对方已同意加好友");
                            break;
                        case "3":
                            //拒绝
                            objItem.find(".msg").html("对方已拒绝添加您为好友");
                            break;
                        case "4":
                            //忽略
                            objItem.find(".msg").html("对方已拒绝添加您为好友~");
                            break;
                        }
                    }
                    objItem.find(".date").html(getformatDate(obj.createDate, "yyyy-MM-dd HH:mm"));
                    objItem.find(".content").html(obj.remark);

                    objItem.find(".del").on("click", function() {
                        appcan.alert("提示", "删除此条消息？", ["删除", "取消"], function(e, idx) {
                            if (idx == 1) {
                                return;
                            }
                            delMessage($(this).parents(".item").attr("id"));
                        });
                    });

                    $("#messageList").append(objItem);
                }

                $("#messageList .ignore").on("click", function() {
                    var id = $(this).parents(".item").attr("id");
                    var userId = $(this).parents(".item").attr("userId");
                    ignore(id, userId);
                });

                $("#messageList .refused").on("click", function() {
                    var id = $(this).parents(".item").attr("id");
                    var userId = $(this).parents(".item").attr("userId");
                    refused(id, userId);
                });

                $("#messageList .agreed").on("click", function() {
                    var id = $(this).parents(".item").attr("id");
                    var userId = $(this).parents(".item").attr("userId");
                    agreed(id, userId);
                });
            } else {
                pageIndex--;
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

function agreed(id, userId) {
    var params = {
        'userId' : userInfo.id,
        'applyId' : id,
        'requestId' : userId
    };
    common.ajax("/userFriend/agree", {
        params : JSON.stringify(params)
    }, function(data) {
        $("#" + id).find(".msg").html("已添加");
        $("#" + id).find(".divBtn").addClass("uhide");
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        "type" : 'POST'
    });
}

function refused(id, userId) {
    var params = {
        'applyId' : id
    };
    common.ajax("/userFriend/reject", {
        params : JSON.stringify(params)
    }, function(data) {
        $("#" + id).find(".msg").html("已拒绝");
        $("#" + id).find(".divBtn").addClass("uhide");
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        "type" : 'POST'
    });
}

function ignore(id, userId) {
    var params = {
        'applyId' : id
    };
    common.ajax("/userFriend/ignor", {
        params : JSON.stringify(params)
    }, function(data) {
        $("#" + id).find(".msg").html("已忽略");
        $("#" + id).find(".divBtn").addClass("uhide");
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        "type" : 'POST'
    });
}
