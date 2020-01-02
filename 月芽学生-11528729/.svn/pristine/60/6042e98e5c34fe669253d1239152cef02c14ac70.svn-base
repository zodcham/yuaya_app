appcan.button("#share_close", "btn-act", function() {
    closeshare();
})
var appId = "wx009651c6fd586eb2";

var pushTitle;
var pushUrl;

appcan.button("#share_weixin", "btn-act", function() {
    var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"' + pushUrl + '","scene":"0","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr0);
})

appcan.button("#share_weixinquan", "btn-act", function() {
    var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"' + pushUrl + '","scene":"1","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr1);
})
function closeshare() {
    appcan.window.close(-1);
}

appcan.ready(function() {
    pushTitle = getLocVal("pushTitle", pushTitle);
    pushUrl = getLocVal("pushUrl", pushUrl);

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