var readFeeling = {};
var imageSize;

var contentHeight = 0;
var foundId;
var windowHeight = 0;
var reviewCommentId = "";
var replyId = "";
var readFeeling = {};
var g_PageIndex = 1;
var loadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期1",
    "pullToReloadText" : "下拉加载",
    "releaseToReloadText" : "释放加载",
    "loadingText" : "加载中，请稍等..."
};
var refreshJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期1",
    "pullToReloadText" : "下拉刷新",
    "releaseToReloadText" : "释放刷新",
    "loadingText" : "刷新中，请稍等..."
};
appcan.ready(function() {
    getUserInfo();
    getProgramInfo();
    readFeeling = programInfo.readFeeling;
    init();

    // $("#main img").on("click",function(){
    // var data = {
    // displayActionButton : false,
    // displayNavArrows : false,
    // enableGrid : false,
    // startIndex : 0,
    // data : [$(this).attr("src")]
    // }
    // var json = JSON.stringify(data);
    // uexImage.openBrowser(json);
    // });

    $(".likeBox").on("click", function() {
        addLike();
    })
    getUserInfo();
    getProgramInfo();
    readFeeling = programInfo.readFeeling;
    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(0, 1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView(0, "rgba(0,0,0,0)", 1);
    uexWindow.showBounceView(1, "rgba(0,0,0,0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
        switch (type) {
        case 0:
            if (state == 2) {
                reloadData();
            }
            break;
        case 1:
            if (state == 2) {
                var time1 = new Date().format("HH:mm:ss");
                loadJson.levelText = "上次加载: " + time1;
                uexWindow.setBounceParams(1, JSON.stringify(loadJson));
                loadReview();
            }
            break;
        }
    };

    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新: " + time1;
    refreshJson.levelText = "上次加载: " + time1;
    uexWindow.setBounceParams(0, JSON.stringify(refreshJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    $("#content").on("input change", function() {
        var h = $(this)[0].scrollHeight;
        if (contentHeight == 0) {
            contentHeight = h;
        } else {
            if (contentHeight < h) {
                $("#content").css("lineHeight", "");
            } else {
                $("#content").css("lineHeight", "2em");
            }
        }
    });

    $(window).resize(function() {
        if (windowHeight == $(window).height()) {
            if (replyId.length > 0) {
                replyId = "";
                $("#content").attr("placeholder", "请输入评论");
                $("#btnSubmit").html("提交");
            }
        }
    });
    windowHeight = $(window).height();

});

appcan.button("#btnSubmit", "btn-act", function() {
    doSubmit();
})
function reloadData() {
    var time1 = new Date().format("HH:mm:ss");
    refreshJson.levelText = "上次刷新: " + time1;
    uexWindow.setBounceParams(0, JSON.stringify(refreshJson));
    $("#listView").empty();
    g_PageIndex = 1;
    loadReview();
}

function addLike(reviewId) {
    var params = {
        'userId' : userInfo.id,
        'reviewId' : readFeeling.id
    };
    common.ajax("/programReview/addLikes", {
        params : JSON.stringify(params)
    }, function(data) {
        $(".likeBox").unbind("click");
        readFeeling.likes++;
        $("#main .like").html(readFeeling.likes);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
}

function init() {
    loadReview();
    if (readFeeling.studentImage.length > 0) {
        $("#main .headImg img").attr("src", _SERVER_ADDRESS + readFeeling.studentImage);
    }
    $("#main .name").html(readFeeling.studentName);
    $("#main .date").html(getformatDate(readFeeling.createDateText, "yyyy-MM-dd HH:mm"));
    var content = readFeeling.content.replace(new RegExp("\n", "g"), "<br><br>");
    content = content.replace(new RegExp("<br/>", "g"), "<br><br>");
    // var result =content.split("<br><br>");
    // content = "";
    // for (var i = 0 ; i < result.length ; i ++) {
    // content +="<p style='text-indent:2em'>"+result[i]+"</p>";
    // }
    $("#main .content").html(content);
    $("#main .like").html(readFeeling.likes);
    $("#main .comments").html("(" + readFeeling.comments + ")");

    for (var j = 1; j < 4; j++) {
        if (readFeeling["image0" + j].length > 0) {
            var divImg = $("<div class='umar-r ub-f1'><img class='click' src='" + _SERVER_ADDRESS + readFeeling["image0" + j] + "' style='width:100%;height:100%'></div>");
            $("#main .images").append(divImg);
            $("#main .images").removeClass("uhide");
        }
    }

    var childs = readFeeling.childList;
    if (childs && childs.length > 0) {
        for (var j = 0; j < childs.length; j++) {
            var objChilds = childs[j];
            var objItem = $("#item").clone();
            objItem.attr("id", objChilds.id);
            objItem.removeClass("uhide");
            var content = objChilds.content.replace(new RegExp("\n", "g"), "<br><br>");
            content = content.replace(new RegExp("<br/>", "g"), "<br><br>");
            // var result =content.split("<br><br>");
            // content = "";
            // for (var i = 0 ; i < result.length ; i ++) {
            // content +="<p style='text-indent:2em'>"+result[i]+"</p>";
            // }
            objItem.find(".content").html(content);

            $("#main .dateTitle").html("更新于");

            $("#main .date").html(getformatDate(objChilds.createDateText, "yyyy-MM-dd HH:mm"));
            //objItem.find(".date").html(getformatDate(objChilds.createDateText,"yyyy-MM-dd HH:mm") );
            for (var k = 1; k < 4; k++) {
                if (objChilds["image0" + k].length > 0) {
                    var divImg = $("<div  class='umar-r ub-f1'><img class='click' src='" + _SERVER_ADDRESS + objChilds["image0" + k] + "' style='width:100%;height:100%'></div>");
                    objItem.find(".images").append(divImg);
                    objItem.find(".images").removeClass("uhide");
                }
            }

            $("#main .other").append(objItem);

        }

    }
}

function loadReview() {
    var params = {
        'reviewId' : readFeeling.id,
        'pageSize' : 20,
        'pageIndex' : g_PageIndex
    };
    common.ajax("/programReviewComment/list", {
        params : JSON.stringify(params)
    }, function(data) {
        if (g_PageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (data.obj) {

            if (!data.obj.count || data.obj.count == 0) {
                myPrompt.show("暂无评论~", "#listView");
                return;
            } else if (!data.obj.list || data.obj.list.length == 0) {
                toast("没有更多评论了~", config.toastTimeShort);
                return;
            }
        } else {
            if (g_PageIndex == 1) {
                myPrompt.show("暂无评论~", "#listView");
            }
            return;
        }
        //hideNoData();
        var arr = [];
        for (var i = 0; i < data.obj.list.length; i++) {
            var obj = data.obj.list[i];
            var itemObj = $("#itemReview").clone();
            itemObj.attr("id", obj.id).attr("name", obj.userName);
            itemObj.removeClass("uhide");
            if (obj.userPhoto && obj.userPhoto.length > 0) {
                itemObj.find(".img").attr("src", getHeadImageUrl(obj.userPhoto));
            }

            itemObj.find(".user").attr("uid", obj.userId);
            itemObj.find("#content_btn").on("click", function() {
                replyId = $(this).parents(".item").attr("id")
                var name = $(this).parents(".item").attr("name");
                $("#content").attr("placeholder", "回复" + name);
                $("#content").focus();
                $("#btnSubmit").html("回复");
            });

            itemObj.find(".userName").html(obj.userName);
            var content = obj.content;
            if (obj.replyUserId && obj.replyUserId.length > 0) {
                content = "<div class='umar-r ";
                if (obj.replyUserId == userInfo.id) {
                    content += "sc-text-green";
                } else {
                    content += "sc-text-active";
                }
                content += "'>回复" + obj.replyUserName + ":" + "</div>" + obj.content;
            }
            itemObj.find(".content").html(content);
            itemObj.find(".date").html(getformatDate(obj.createDate, "yyyy-MM-dd HH:mm"));

            // itemObj.find(".content").on("click",function(){
            // replyId = $(this).parents(".item").attr("id")
            // var name = $(this).parents(".item").attr("name");
            // $("#content").attr("placeholder","@"+name);
            // $("#content").focus();
            // $("#btnSubmit").html("回复");
            // });
            $('#listView').append(itemObj);
        };

        $(".item .delete").on("click", function() {
            var id = $(this).parents(".item").attr("id");
            del(id);
        });

        g_PageIndex++;

    }, function(data) {
        toast(data.msg, config.toastTimeShort);
        if (g_PageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (g_PageIndex > 1) {
            g_PageIndex--;
        }
    });
}

function doSubmit() {
    var content = $("#content").val();

    if (replyId.length > 0) {
        if (content.length == 0) {
            toast("请输入您的回复~", config.toastTimeShort);
            return;
        }

        var params = {
            'programReviewCommentId' : replyId,
            'replyContent' : content,
            'userId' : userInfo.id
        };
        common.ajax("/programReviewComment/reply", {
            params : JSON.stringify(params)
        }, function(data) {
            replyId = "";
            $("#content").val("");
            toast(getMsgByKey("您的回复提交成功~"), config.toastTimeShort);
            $("#content").attr("placeholder", "请输入评论");
            $("#btnSubmit").html("提交");
            $("#content").blur();
        }, function(data) {
            toast(data.msg, config.toastTimeShort);
        }, {
            type : "POST"
        }, null);

    } else {

        if (content.length == 0) {
            toast("请输入您的评论~", config.toastTimeShort);
            return;
        }
        var params = {
            'reviewId' : readFeeling.id,
            'userId' : userInfo.id,
            'content' : content
        };
        common.ajax("/programReviewComment/save", {
            params : JSON.stringify(params)
        }, function(data) {
            $("#content").val("");
            $(".content_btn").removeClass("uhide");
            toast(getMsgByKey("您的评论已提交成功~"), config.toastTimeShort);
            reloadData();
        }, function(data) {
            toast(data.msg, config.toastTimeShort);
        }, {
            type : "POST"
        }, null);
    }
}