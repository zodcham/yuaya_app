

var g_WeiXinSharePicPath = "";
var g_sign_title = "";
var g_sign_url = "";
var g_sharetype="winxin";

appcan.ready(function() {
	isIPhoneX();

    getUserInfo();

    //var titHeight = $('#header').height;
    //var titHeight = $('#header').offset().height + 16;
    var titHeight = $('#header').offset().height;
    var url = config.serviceUrl + "/sign/signIn";
    var par = {
        "userid" : userInfo.id
    };

    var fok = function(data) {

        $("#share_weixin").removeClass("uhide");
        $("#share_weixinquan").removeClass("uhide");
        $("#footer").removeClass("uhide");
        var obj = JSON.parse(data);
        var signTitle = obj.sign_title;
        var signImgurl = _SERVER_ADDRESS + "/" + unescape(obj.sign_imgurl);
        g_sign_title = signTitle;
        g_sign_url = signImgurl;

        window.localStorage["signTitle"] = signTitle;
        window.localStorage["signImgurl"] = signImgurl;
        $("#HeaderTitle").html(signTitle);
        $("#content").html("");
        AddLog(userInfo.id, logKeys.SignSuccess);
        //appcan.frame.open("content", "sign_img.html", 0, titHeight, 'signimg', 95);
        appcan.frame.open("content", "sign_img.html", 0, titHeight, 'signimg', 95);
    };
    var ferr = function(err) {

        LoadingClose();
        $("#share_weixin").addClass("uhide");
        $("#share_weixinquan").addClass("uhide");
        $("#HeaderTitle").html("未签到成功！");
        $("#content").html("未签到成功！");
        AddLog(userInfo.id, logKeys.SignFailed);
    };

    common.ajaxPOST(url, par, fok, ferr);

    uexWeiXin.registerApp(appId);

    uexWeiXin.cbRegisterApp = function(opCode, dataType, data) {
        LoadingClose();
        if (data == "1") {
            //   alert('注册失败！');
        }
        if (data == "0") {
            //  alert('注册成功！');
        }
    }
    uexWeiXin.cbShareLinkContent = function(data) {
        LoadingClose();
        if (data == "0") {
            if(g_sharetype=="winxin") {
                AddLog(userInfo.id, logKeys.SignShareToWeixin);
            }
            else{
                AddLog(userInfo.id, logKeys.SignShareToWinxinQuan);
            }
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

    uexWeiXin.cbShareImageContent = function(data) {
        LoadingClose();
        if (data == "0") {
            if(g_sharetype=="winxin") {
                AddLog(userInfo.id, logKeys.SignShareToWeixin);
            }
            else{
                AddLog(userInfo.id, logKeys.SignShareToWinxinQuan);
            }
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

appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})

appcan.button("#nav-right", "btn-act", function() {
    var json={"title":"签到","content":"早起读书，可以写下每天的心语。"};
    appcan.alert(json);
})

// appcan.button("#nav-right", "btn-act", function() {
//     var titHeight = $('#header').offset().height;
//     var pushUrl = "sign_share.html";
//     uexWindow.openPopover({
//         name : "signshare",
//         url : pushUrl,
//         x : 0,
//         y : 0,
//         w : document.body.clientWidth,
//         h : document.body.clientHeight,
//         bottomMargin : 0,
//         extraInfo : {
//             opaque : true
//         }
//     });
// })
var appId = "wx009651c6fd586eb2";

appcan.button("#sign_detail", "btn-act", function() {
    appcan.window.open("sign_detail", "sign_detail.html", 5);
})

appcan.button("#sign_rank", "btn-act", function() {
    appcan.window.open("sign_rank", "sign_rank.html", 5);
})

appcan.button("#share_weixin", "btn-act", function() {
    LoadingOpen();
    g_sharetype="winxin";
    if (Number(uexWidgetOne.getPlatform()) == 0) {//ios
        var JsonData = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","image":"' + g_sign_url + '","scene":0}';
        uexWeiXin.shareImageContent(JsonData);
    } else {//android
        //var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"'+g_sign_url+'","scene":"0","title":"我的月芽签到排行","description":"分享一下"}';
        //uexWeiXin.shareLinkContent(jsonstr0);
        SetSaveFileName();
        //保存图片路径的和文件名
        downloadFile(g_sign_url, 0);
    }

})

appcan.button("#share_weixinquan", "btn-act", function() {
    LoadingOpen();
    g_sharetype="quan"
    if (Number(uexWidgetOne.getPlatform()) == 0) {//ios
        var JsonData = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","image":"' + g_sign_url + '","scene":1}';
        uexWeiXin.shareImageContent(JsonData);
    } else {//android
        //var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"'+g_sign_url+'","scene":"1","title":"我的月芽签到排行","description":"分享一下"}';
        //uexWeiXin.shareLinkContent(jsonstr0);
        SetSaveFileName();
        downloadFile(g_sign_url, 1);
        //保存图片路径的和文件名
    }
})
function closeshare() {
    appcan.window.close(-1);
}

//文件的保存位置
function SetSaveFileName() {
    getUserInfo();
    var userid = userInfo.id;

    var time = new Date();
    // 程序计时的月从0开始取值后+1
    var m = time.getMonth() + 1;
    var y = time.getFullYear();
    var d = time.getDate();
    //var h = time.getHours();
    //var mm = time.getMinutes();
    //var s = time.getSeconds();

    var filename = "sign_" + userid.toString() + "_" + y + m + d + ".png";
    g_WeiXinSharePicPath = "wgt://data/download/" + filename;
}

//下载文件
function downloadFile(img_url, type) {

    uexDownloaderMgr.cbCreateDownloader = function(opCode, dataType, data) {
        switch(dataType) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            if (data == 0) {
                uexDownloaderMgr.download(1, img_url, g_WeiXinSharePicPath, 0);
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
            var JsonData = '{"thumbImg":"' + g_WeiXinSharePicPath + '","image":"' + g_WeiXinSharePicPath + '","scene":' + type + '}';
            //alert(JsonData);
            uexWeiXin.shareImageContent(JsonData);
            break;
        case 2:
            uexDownloaderMgr.closeDownloader(1);

            var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"' + img_url + '","scene":"' + type + '","title":"我的月芽签到排行","description":"分享一下"}';
            //alert(jsonstr0);
            uexWeiXin.shareLinkContent(jsonstr0);

            break;
        case 3:
            break;
        }
    }
    uexDownloaderMgr.createDownloader(1);
}
