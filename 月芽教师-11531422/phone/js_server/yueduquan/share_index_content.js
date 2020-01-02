$('audio').audioPlayer();
var g_SwiperParent;
var g_SwiperItems = [];
var pageIndex = 1;

var listData = [];
var heatTypes = 580;

var reloadDate = "";
var loadDate = "";
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
    getUserInfo();
    getProgramInfo();
    loadData();

    uexWeiXin.registerApp(appId);

    uexWeiXin.cbRegisterApp = function(opCode, dataType, data) {
        if (data == "1") {
            //   alert('注册失败！');
        }
        if (data == "0") {
            //  alert('注册成功！');
        }
    }
    uexWeiXin.cbShareLinkContent = function(data) {
        if (data == "0") {
            appcan.window.alert({
                title : '提示信息！',
                content : '分享成功~',
                buttons : '确定',

            });
        } else {
            appcan.window.alert({
                title : '提示信息！',
                content : '分享失败~',
                buttons : '确定',

            });
        }
    };

});

function loadData() {
    getUserInfo();
    getProgramInfo();
    getCommInfo();
    getSysInfo();
    loadDatas();

    //用户名
    $("#main .name").html(programInfo.userName);
    //用户头像
    if (programInfo.userPhoto.length == "") {
        $("#main .headImg img").attr("src", '../head.png');
    } else {
        $("#main .headImg img").attr("src", _SERVER_ADDRESS + programInfo.userPhoto);
    }
    //用户分享标题
    $(".names").html(programInfo.name);
    //用户分享时间
    $(".data").html(programInfo.createDate);
    //用户分享文字内容
    $(".main_content").html(programInfo.readGuide);

    //点赞数据    programInfo.likesName
    if (programInfo.likesName.length > 0) {
        $(".icon_dianzans").removeClass("uhide");
        $(".likesName").html(programInfo.likesName);
    }
    //用户分享视频
    if (programInfo.videoFile.length > 0) {
        $("#willesPlay").removeClass("uhide");
        $(".video").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.videoFile, 1);
    }
    //用户分享音频
    if (programInfo.audioFile.length > 0) {
        $("#audio").removeClass("uhide");
        $(".audio").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.audioFile);

        $(".audios").css("background-image", "url(" + _SERVER_ADDRESS + programInfo.image + ")");

    }
    //用户分享图片
    if (programInfo.image01.length > 0) {
        $("ul li img").css("width", "14em");
        $("ul li img").css("margin-left", "4em");
        $("ul li img").css("height", " 18em");

        $(".image01").removeClass("uhide");
        $(".image01").attr("src", _SERVER_ADDRESS + programInfo.image01);
        $(".image1").html(_SERVER_ADDRESS + programInfo.image01);
    }
    if (programInfo.image02.length > 0) {
        $("ul li img").css("width", "7em");
        $("ul li img").css("height", " 7em");
        $("ul li img").css("margin-left", "0.2em");

        $(".image02").removeClass("uhide");
        $(".image02").attr("src", _SERVER_ADDRESS + programInfo.image02);
        $(".image2").html(_SERVER_ADDRESS + programInfo.image02);
    }
    if (programInfo.image03.length > 0) {
        $("ul li img").css("width", "7em");
        $("ul li img").css("margin-left", "0.2em");
        $("ul li img").css("height", " 7em");

        $(".image03").removeClass("uhide");
        $(".image03").attr("src", _SERVER_ADDRESS + programInfo.image03);
        $(".image3").html(_SERVER_ADDRESS + programInfo.image03);
    }
    if (programInfo.image04.length > 0) {
        $("ul li img").css("width", "7em");
        $("ul li img").css("margin-left", "0.2em");
        $("ul li img").css("height", " 7em");

        $(".image04").removeClass("uhide");
        $(".image04").attr("src", _SERVER_ADDRESS + programInfo.image04);
        $(".image4").html(_SERVER_ADDRESS + programInfo.image04);
    }
    if (programInfo.image05.length > 0) {
        $("ul li img").css("width", "7em");
        $("ul li img").css("margin-left", "0.2em");
        $("ul li img").css("height", " 7em");
        $(".image05").removeClass("uhide");
        $(".image05").attr("src", _SERVER_ADDRESS + programInfo.image05);
        $(".image5").html(_SERVER_ADDRESS + programInfo.image05);
    }
    //打开相册
    appcan.button("#btn2", "btn-act", function() {
        openBrowser();
    })
    function openBrowser() {

        var image01 = $("#btn2").find("a");
        image1 = image01.html();
        var image02 = $("#btn2").find("b");
        image2 = image02.html();
        var image03 = $("#btn2").find("p");
        image3 = image03.html();

        var image04 = $("#btn2").find("h1");
        image4 = image04.html();

        var image05 = $("#btn2").find("h2");
        image5 = image05.html();

        var image06 = $("#btn2").find("h3");
        image6 = image06.html();
        var image07 = $("#btn2").find("h4");
        image7 = image07.html();
        var image08 = $("#btn2").find("h5");
        image8 = image08.html();
        var image09 = $("#btn2").find("h6");
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

    if (programInfo.hits > 20) {
        $(".hits").append(programInfo.hits + heatTypes + '次');
    } else {
        $(".hits").append(programInfo.hits + '次');
    }
    $(".reviewCount").html(programInfo.reviewCount + "次");

}

function loadDatas() {

    var params = {
        'programId' : programInfo.id,
        'pageSize' : 1000,
        'pageIndex' : pageIndex
    };
    common.ajax("/programReview/listByProgram", {
        params : JSON.stringify(params)
    }, function(data) {

        if (pageIndex == 1 && data.obj.count == 0) {
            $("#CommentsList").addClass("myPromptList");
            $("#CommentsList").html("<div class='ut ub-f1 ulev-3 ut-s tx-c  uinn umar-t' style='color: #BABABA;top:2em'>还没有评论哦~,赶紧抢占沙发吧！</div>");
        } else {
            $("#CommentsList").removeClass("myPromptList");
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
                    objItem.find(".datas").html(getformatDate(obj.createDateText, "yyyy-MM-dd HH:mm"));

                    for (var j = 1; j < 4; j++) {
                        if (obj["image0" + j].length > 0) {
                            var divImg = $("<div class='umar-r ub-f1'><img class='click' src='" + _SERVER_ADDRESS + obj["image0" + j] + "' style='width:100%;height:100%'></div>");
                            objItem.find(".imgs").append(divImg);
                        }
                    }

                    listData.push(obj);

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
            }
        }
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

//对评论点赞
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

function refesh() {
    loadData();
    appcan.window.close(-1);
}

function closePlayer() {
    //uexVideo.closePlayer();
}

window.onload = window.onresize = function() {
    resizeIframe();
}
// 教师   用户分享链接
var appId = "wxdd94041dd73a8049";

appcan.button("#wedpageUrl0", "btn-act", function() {
    $("#divAddImg").addClass("uhide");
    var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/yueyatlogo2.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/yueduquan/share_index_content_teacher.html?' + programInfo.id + '?","scene":"0","title":"' + programInfo.name + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr0);
})

appcan.button("#wedpageUrl1", "btn-act", function() {
    $("#divAddImg").addClass("uhide");
    var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/yueyatlogo2.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/yueduquan/share_index_content_teacher.html?' + programInfo.id + '?","scene":"1","title":"' + programInfo.name + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr1);
})

$(".btnCancel").on("click", function() {
    closeAddImg();
});

function closeAddImg() {
    uexWindow.evaluateScript("", 0, "isOpenChooseImg=true;");
    $("#divAddImg").addClass("uhide");
}

function Forward() {
    $("#divAddImg").removeClass("uhide");
}        