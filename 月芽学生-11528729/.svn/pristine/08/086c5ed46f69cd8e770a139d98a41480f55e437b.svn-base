//var isLoading=false;
var pageIndex = 1;
var reloadDate = "";
clearOne();

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
var a = false;
var b = false;
var c = false;
var searchType = 'plate';
var orderByTypes = '1';
var heatTypes = 580;
var listData = [];

var text;
var image1;
var image2;
var image3;
var image4;
var image5;
var image6;
var image7;
var image8;
var image9;

appcan.ready(function() {
    uexWindow.setMultilPopoverFlippingEnbaled(1);
    getUserInfo();

    getProgramInfo();

    loadData();

    AddLogContent(userInfo.id, logKeys.SharingCountry, {});

    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(0, 1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView("0", "rgba(0, 0, 0, 0)", 1);
    uexWindow.showBounceView("1", "rgba(0, 0, 0, 0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
        switch(type) {
        case 0:
            if (state == 2) {
                refreshData();
            }
            break;
        case 1:
            if (state == 2) {
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

    $(".box").on("click", function() {
        $(this).siblings("input").trigger("click");
        searchType = $(this).attr("value");
        $("#bookList").empty();
        pageIndex = 1;
        myPrompt.hide();
        loadData();

        switch (searchType){
            case "plate":
                AddLogContent(userInfo.id, logKeys.SharingCountry, {});
                break;
            case "area":
                AddLogContent(userInfo.id, logKeys.SharingCity, {});
                break;
            case "school":
                AddLogContent(userInfo.id, logKeys.SharingSchool, {});
                break;
            case "grade":
                AddLogContent(userInfo.id, logKeys.SharingGrade, {});
                break;
        }
    });
    appcan.select(".select", function(ele, value) {
        orderByTypes = value;
        $("#bookList").empty();
        pageIndex = 1;
        myPrompt.hide();
        loadData();

    });

});

function refreshData() {
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    $("#bookList .item").remove();
    pageIndex = 1;
    listData = [];
    loadData();
}

appcan.button(".shares", "btn-act", function() {
    appcan.window.open("share_introduce", "share_introduce_add.html", 5);
})
function loadData() {

    var params = {
        'userId' : userInfo.id,
        'pageSize' : 3,
        'pageIndex' : pageIndex,
        'serachType' : searchType,
        'orderByType' : orderByTypes,
        userType : 'student'
    };
    common.ajax("/interactionshare/getInteractionShare", {
        params : JSON.stringify(params)
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("未找到数据", "#bookList");
        } else {
            myPrompt.hide();
            var lineObj = $('<div class="ub ub-fh umar-t"></div>');
            var index = 0;
            for (var i = 0; i < data.obj.list.length; i++) {

                var obj = data.obj.list[i];

                var objItem = $("#item").clone();
                objItem.attr("id", obj.id);
                objItem.attr("num", listData.length);

                objItem.removeClass("uhide");

                objItem.find(".userName").html(obj.userName);
                if (obj.userPhoto.length == "") {
                    objItem.find(".userPhoto").attr("src", '../head.png');
                } else {
                    objItem.find(".userPhoto").attr("src", _SERVER_ADDRESS + obj.userPhoto);
                }
                //删除 createBy
                if (userInfo.id === obj.createBy) {
                    objItem.find(".delete").html("删除");
                } else {
                    objItem.find(".delete").html(" ");
                }

                objItem.find(".data").html(obj.createDate);

                if (obj.hits > 20) {
                    objItem.find(".hits").html(obj.hits + heatTypes + '次');
                } else {
                    objItem.find(".hits").html(obj.hits + '次');
                }
                objItem.find(".reviewCount").html(obj.reviewCount);
                objItem.find(".remarks").html(obj.remarks);
                objItem.find(".shareName").html(obj.name);
                //用户分享内容
                if (obj.readGuide.length > 0) {
                    objItem.find(".main_content").html(obj.readGuide);
                    if (obj.readGuide.length > 55) {
                        objItem.find(".contentquanwen").removeClass("uhide");
                    }
                }

                listData.push(obj);
                objItem.find(".like").html(obj.likes);
                // alert(obj.likes);
                objItem.find(".like").attr("value", obj.likes);

                if (obj.image01.length > 0) {
                    objItem.find("ul li img").css("width", "9em");
                    objItem.find("ul li img").css("height", " 12em");

                    objItem.find("ul li .image01").removeClass("uhide");
                    objItem.find(".image01").attr("src", _SERVER_ADDRESS + obj.image01);
                    objItem.find(".image1").html(_SERVER_ADDRESS + obj.image01);
                }
                if (obj.image02.length > 0) {
                    objItem.find("ul li img").css("width", "8em");
                    objItem.find("ul li img").css("height", " 9em");

                    objItem.find("ul li .image02").removeClass("uhide");
                    objItem.find(".image02").attr("src", _SERVER_ADDRESS + obj.image02);
                    objItem.find(".image2").html(_SERVER_ADDRESS + obj.image02);
                }
                if (obj.image03.length > 0) {
                    objItem.find("ul li img").css("width", "5.8em");
                    objItem.find("ul li img").css("height", "6.1em");
                    objItem.find("ul li .image03").removeClass("uhide");
                    objItem.find(".image03").attr("src", _SERVER_ADDRESS + obj.image03);
                    objItem.find(".image3").html(_SERVER_ADDRESS + obj.image03);
                }
                if (obj.image04.length > 0) {
                    objItem.find("ul li img").css("width", "5.8em");
                    objItem.find("ul li img").css("height", "6.1em");
                    objItem.find("ul li .image04").removeClass("uhide");
                    objItem.find(".image04").attr("src", _SERVER_ADDRESS + obj.image04);
                    objItem.find(".image4").html(_SERVER_ADDRESS + obj.image04);
                }
                if (obj.image05.length > 0) {
                    objItem.find("ul li img").css("width", "5.8em");
                    objItem.find("ul li img").css("height", "6.1em");
                    objItem.find("ul li .image05").removeClass("uhide");
                    objItem.find(".image05").attr("src", _SERVER_ADDRESS + obj.image05);
                    objItem.find(".image5").html(_SERVER_ADDRESS + obj.image05);
                }
                // if(obj.image06.length > 0){
                // objItem.find("ul li img").css("width","6em");
                // objItem.find("ul li img").css("height","6.3em");
                // objItem.find("ul li .image06").removeClass("uhide");
                // objItem.find(".image06").attr("src",_SERVER_ADDRESS+obj.image06);
                // objItem.find(".image6").html(_SERVER_ADDRESS+obj.image06);
                // }
                // if(obj.image07.length > 0){
                // objItem.find("ul li img").css("width","6em");
                // objItem.find("ul li img").css("height","6.3em");
                // objItem.find("ul li .image07").removeClass("uhide");
                // objItem.find(".image07").attr("src",_SERVER_ADDRESS+obj.image07);
                // objItem.find(".image7").html(_SERVER_ADDRESS+obj.image07);
                // }
                // if(obj.image08.length > 0){
                // objItem.find("ul li img").css("width","6em");
                // objItem.find("ul li img").css("height","6.3em");
                // objItem.find("ul li .image08").removeClass("uhide");
                // objItem.find(".image08").attr("src",_SERVER_ADDRESS+obj.image08);
                // objItem.find(".image8").html(_SERVER_ADDRESS+obj.image08);
                // }
                // if(obj.image09.length > 0){
                // objItem.find("ul li img").css("width","6em");
                // objItem.find("ul li img").css("height","6.3em");
                // objItem.find("ul li .image09").removeClass("uhide");
                // objItem.find(".image09").attr("src",_SERVER_ADDRESS+obj.image09);
                // objItem.find(".image9").html(_SERVER_ADDRESS+obj.image09);
                // }
                //视频
                if (obj.videoFile.length > 0) {

                    objItem.find(".willesPlay").removeClass("uhide");
                    objItem.find(".video").removeClass("uhide");
                    objItem.find(".video").attr("src", _SERVER_VIDEO_ADDRESS + obj.videoFile);
                }
                //音频
                if (obj.audioFile.length > 0) {
                    objItem.find(".audio").removeClass("uhide");
                    objItem.find(".audio").attr("src", _SERVER_VIDEO_ADDRESS + obj.audioFile);
                }

                //评论数据
                //prLists.studentName  评论学生名称
                //prLists.studentImage 评论学生头像
                //prLists.content 评论内容
                objItem.find(".prLists").html(obj.prList.length);
                if (obj.prList.length > 0) {
                    for (var j = 0; j < obj.prList.length; j++) {
                        var prLists = obj.prList[j];
                        // objItem.find(".prListsstudentName").prepend(prLists.studentName+':'+'<br>');
                        // objItem.find(".prListscontent").prepend(prLists.content+'<br>');
                        objItem.find(".prList").append("<div>" + "<a style='color:#2c62ab;'> " + prLists.studentName + ":" + " </a>" + prLists.content + "</div>");
                    }
                }
                //点赞数据
                alert(JSON.stringify(obj));
                if (obj.likesName.length > 0) {
                    objItem.find(".icon_dianzans").removeClass("uhide");
                    objItem.find(".likesName").html(obj.likesName);
                }
                objItem.find(".abc").attr("id", obj.id);
                objItem.find(".abc").on("click", function() {

                    var id = $(this).attr("id");
                    getProgramInfoById(id, function(data) {
                        getProgramInfo();
                        programInfo = data;
                        setProgramInfo();
                        appcan.window.open("share", "share_index.html", 5);
                    }, null);
                });

                objItem.find(".userPhoto").attr("uid", obj.createBy);
                objItem.find(".userPhoto").on("click", function() {
                    var userId = $(this).attr("uid");
                    getCommInfo();
                    commInfo.studentId = userId;
                    setCommInfo();
                    appcan.window.open("message_other", "../message/message_other.html", 5);
                });

                // //图片
                objItem.find(".image01").on("click", function() {
                    openBrowser($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                objItem.find(".image02").on("click", function() {
                    openBrowser($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                objItem.find(".image03").on("click", function() {
                    openBrowser($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                objItem.find(".image04").on("click", function() {
                    openBrowser($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                objItem.find(".image05").on("click", function() {
                    openBrowser($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                objItem.find(".image06").on("click", function() {
                    openBrowser($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                objItem.find(".image07").on("click", function() {
                    openBrowser($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                objItem.find(".image08").on("click", function() {
                    openBrowser($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                objItem.find(".image09").on("click", function() {
                    openBrowser($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                //菜单
                objItem.find(".menucai").on("click", function() {
                    menu($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                //点击查看全文
                objItem.find(".contentquanwen").on("click", function() {
                    contentquanwen($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                //点赞
                objItem.find(".likeBox").on("click", function() {
                    addLike($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                //评论
                objItem.find(".btnSubmit").on("click", function() {
                    doSubmit($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                //评论按钮
                objItem.find(".menuBox").on("click", function() {
                    menuBox($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                //提交评论
                objItem.find(".btnSubmit").on("click", function() {
                    $(this).parents(".item").removeClass("click");
                });
                //视频
                objItem.find(".video").on("touchstart", function() {
                    $(this).parents(".item").removeClass("click");
                })
                //删除
                objItem.find(".deletes").on("click", function() {
                    deletes($(this).parents(".item").attr("id"));
                    event.stopPropagation();
                });
                objItem.find(".deletes").on("touchstart", function() {
                    $(this).parents(".item").removeClass("click");
                })
                objItem.find(".menuBox").on("click", function() {
                    $(this).parents(".item").removeClass("click");
                });
                objItem.find(".menucai").on("click", function() {
                    $(this).parents(".item").removeClass("click");
                });
                objItem.find(".contentquanwen").on("touchstart", function() {
                    $(this).parents(".item").removeClass("click");
                })
                objItem.find(".click2").on("touchstart", function() {
                    $(this).parents(".item").removeClass("click");
                })
                $("#bookList").append(objItem);

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
        'userId' : userInfo.id,
        'programId' : reviewId
    };
    common.ajax("/interactionshare/addLikes", {
        params : JSON.stringify(params)
    }, function(data) {
        AddLogContent(userInfo.id, logKeys.SharingLike, {"programId":reviewId});
        toast("点赞成功~", config.toastTimeShort);
        var position = $("#" + reviewId).attr("num");
        var positions = $("#" + reviewId).attr("num");
        listData[position].likes = listData[position].likes + 1;
        $("#" + reviewId).find(".likeBox").unbind("click");
        var like = $("#" + reviewId).find(".like");

        like.attr("value", parseInt(like.attr("value") + 1));
        like.html(like.attr("value"));

        var likesName1 = $("#" + reviewId).find(".icon_dianzans");
        var likesName2 = $("#" + reviewId).find(".likesName");

        likesName1.removeClass("uhide");
        likesName2.prepend(userInfo.name + ",");

        var menus = $("#" + reviewId).find(".menu");
        setInterval(3000, menus.css("background-color", "#fff"));

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
        var menus = $("#" + reviewId).find(".menu");
        setInterval(3000, menus.css("background-color", "#fff"));
    }, {
        type : 'POST'
    });
}

//菜单
function menu(menuId) {
    var menus = $("#" + menuId).find(".menu");
    if (b === false) {
        menus.css("background-color", "#5B5D5C");
        b = true;
    } else if (b === true) {
        menus.css("background-color", "#ffffff");
        b = false;
    }
};
//评论按钮
function menuBox(menuBoxId) {
    var Comment = $("#" + menuBoxId).find(".Commenttxt");
    var menus = $("#" + menuBoxId).find(".menu");
    menus.css("background-color", "#fff");
    var Comment = $("#" + menuBoxId).find(".Commenttxt");

    if (c === false) {
        Comment.removeClass("uhide");
        b = true;
    } else {
        Comment.addClass("uhide");
        b = false;
    }
};

//点击查看全文contentquanwen
function contentquanwen(contentId) {
    var content1 = $("#" + contentId).find(".main_content");
    var content2 = $("#" + contentId).find(".contentquanwen");

    if (a === false) {
        content1.removeClass("txt-ellipsis");
        content2.html("收起");
        a = true;
    } else {
        content1.addClass("txt-ellipsis");
        content2.html("查看全文");
        a = false;
    }
};
//评论
function doSubmit(theoryId) {
    var content;
    var theoryId;
    $("textarea").each(function() {
        var contents = $(this).val();
        if (contents.length > 0) {
            content = contents;
        }
    });

    var params = {
        'userId' : userInfo.id,
        'programId' : theoryId,
        'content' : content
    };
    common.ajax("/programReview/save", {
        params : JSON.stringify(params)
    }, function(data) {

        AddLogContent(userInfo.id, logKeys.SharingWriteSuccess, {"programReviewId":data.obj});

        var like = $("#" + theoryId).find(".prList");

        like.append("<div>" + "<a style='color:#2c62ab;'> " + userInfo.name + ":" + " </a>" + content + "</div>");
        clearOne();

        toast("评论成功~", config.toastTimeShort);
        var Comment = $("#" + theoryId).find(".Commenttxt");
        Comment.addClass("uhide");
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
        clearOne();
        var Comment = $("#" + theoryId).find(".Commenttxt");
        Comment.addClass("uhide");
    }, {
        type : 'POST'
    });
};
//清空遍历所有textarea文本
function clearOne() {
    $("textarea").each(function() {
        $(this).val("");
    });
}

//删除
function deletes(theoryIds) {
    appcan.window.alert({
        title : "提示",
        content : '确定删除吗？',
        buttons : ['删除', '取消'],
        callback : function(err, data, dataType, optId) {

            if ("1" == data) {

            } else if ("0" == data) {
                var params = {
                    'userId' : userInfo.id,
                    'programId' : theoryIds
                };
                common.ajax("/interactionshare/delete", {
                    params : JSON.stringify(params)
                }, function(data) {
                    AddLogContent(userInfo.id, logKeys.SharingDel, {"programId":reviewId});
                    toast("删除成功~", config.toastTimeShort);
                    $("#" + theoryIds).addClass("uhide");
                }, function(data) {
                    toast(getMsgByKey(data.msg), config.toastTimeShort);
                }, {
                    type : 'POST'
                });
            }
        }
    });
}

//打开图片浏览器
function openBrowser(imageId) {

    var image01 = $("#" + imageId).find("a");
    image1 = image01.html();
    var image02 = $("#" + imageId).find("b");
    image2 = image02.html();
    var image03 = $("#" + imageId).find("p");
    image3 = image03.html();

    var image04 = $("#" + imageId).find("h1");
    image4 = image04.html();

    var image05 = $("#" + imageId).find("h2");
    image5 = image05.html();

    var image06 = $("#" + imageId).find("h3");
    image6 = image06.html();
    var image07 = $("#" + imageId).find("h4");
    image7 = image07.html();
    var image08 = $("#" + imageId).find("h5");
    image8 = image08.html();
    var image09 = $("#" + imageId).find("h6");
    image9 = image09.html();

    if (image9.length > 0) {
        var data = {
            displayActionButton : false,
            displayNavArrows : true,
            enableGrid : true,
            //startOnGrid:true,
            startIndex : 0,
            data : [{
                src : image1,
                thumb : image1,
            }, {
                src : image2,
                thumb : image2,
            }, {
                src : image3,
                thumb : image3,
            }, {
                src : image4,
                thumb : image4,
            }, {
                src : image5,
                thumb : image5,
            }, {
                src : image6,
                thumb : image6,
            }, {
                src : image7,
                thumb : image7,
            }, {
                src : image8,
                thumb : image8,
            }, {
                src : image9,
                thumb : image9,
            }]
        }
    } else if (image8.length > 0) {
        var data = {
            displayActionButton : false,
            displayNavArrows : true,
            enableGrid : true,
            //startOnGrid:true,
            startIndex : 0,
            data : [{
                src : image1,
                thumb : image1,
            }, {
                src : image2,
                thumb : image2,
            }, {
                src : image3,
                thumb : image3,
            }, {
                src : image4,
                thumb : image4,
            }, {
                src : image5,
                thumb : image5,
            }, {
                src : image6,
                thumb : image6,
            }, {
                src : image7,
                thumb : image7,
            }, {
                src : image8,
                thumb : image8,
            }]
        }
    } else if (image7.length > 0) {
        var data = {
            displayActionButton : false,
            displayNavArrows : true,
            enableGrid : true,
            //startOnGrid:true,
            startIndex : 0,
            data : [{
                src : image1,
                thumb : image1,
            }, {
                src : image2,
                thumb : image2,
            }, {
                src : image3,
                thumb : image3,
            }, {
                src : image4,
                thumb : image4,
            }, {
                src : image5,
                thumb : image5,
            }, {
                src : image6,
                thumb : image6,
            }, {
                src : image7,
                thumb : image7,
            }]
        }
    } else if (image6.length > 0) {
        var data = {
            displayActionButton : false,
            displayNavArrows : true,
            enableGrid : true,
            //startOnGrid:true,
            startIndex : 0,
            data : [{
                src : image1,
                thumb : image1,
            }, {
                src : image2,
                thumb : image2,
            }, {
                src : image3,
                thumb : image3,
            }, {
                src : image4,
                thumb : image4,
            }, {
                src : image5,
                thumb : image5,
            }, {
                src : image6,
                thumb : image6,
            }]
        }
    } else if (image5.length > 0) {
        var data = {
            displayActionButton : false,
            displayNavArrows : true,
            enableGrid : true,
            //startOnGrid:true,
            startIndex : 0,
            data : [{
                src : image1,
                thumb : image1,
            }, {
                src : image2,
                thumb : image2,
            }, {
                src : image3,
                thumb : image3,
            }, {
                src : image4,
                thumb : image4,
            }, {
                src : image5,
                thumb : image5,
            }]
        }
    } else if (image4.length > 0) {
        var data = {
            displayActionButton : false,
            displayNavArrows : true,
            enableGrid : true,
            //startOnGrid:true,
            startIndex : 0,
            data : [{
                src : image1,
                thumb : image1,
            }, {
                src : image2,
                thumb : image2,
            }, {
                src : image3,
                thumb : image3,
            }, {
                src : image4,
                thumb : image4,
            }]
        }
    } else if (image3.length > 0) {
        var data = {
            displayActionButton : false,
            displayNavArrows : true,
            enableGrid : true,
            //startOnGrid:true,
            startIndex : 0,
            data : [{
                src : image1,
                thumb : image1,
            }, {
                src : image2,
                thumb : image2,
            }, {
                src : image3,
                thumb : image3,
            }]
        }
    } else if (image2.length > 0) {
        var data = {
            displayActionButton : false,
            displayNavArrows : true,
            enableGrid : true,
            //startOnGrid:true,
            startIndex : 0,
            data : [{
                src : image1,
                thumb : image1,
            }, {
                src : image2,
                thumb : image2,
            }]
        }
    } else if (image1.length > 0) {

        var data = {
            displayActionButton : false,
            displayNavArrows : true,
            enableGrid : true,
            //startOnGrid:true,
            startIndex : 0,
            data : [{
                src : image1,
                thumb : image1,
            }]
        }
    }
    // alert(data.data[0].src);
    var json = JSON.stringify(data);

    uexImage.openBrowser(json);
}

appcan.button(".nav-btn", "btn-act", function() {
    this.id == "nav-left" && appcan.window.close(-1);
})

window.onload = window.onresize = function() {
    resizeIframe();
}
window.onload = window.onresize = function() {
    resizeIframess();
}
var resizeIframess = function() {
    var bodyw = document.body.clientWidth;
    for (var ilength = 0; ilength <= document.getElementsByTagName("video").length; ilength++) {
        document.getElementsByTagName("video")[ilength].height = bodyw * 5 / 12;
    }
}   