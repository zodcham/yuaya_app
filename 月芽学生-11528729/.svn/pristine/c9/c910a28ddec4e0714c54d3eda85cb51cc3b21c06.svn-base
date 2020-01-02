var titHeight;

var pushTitle="";
appcan.ready(function() {
    pushTitle="我正在参加月芽阅读活动。";
    isIPhoneX();
    titHeight = $('#header').offset().height;
    appcan.frame.open("content", "article_list_content.html", 0, titHeight);

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


appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function exit() {
    appcan.window.close(-1);
}



appcan.button("#article_submit", "btn-act", function() {
    appcan.window.open("pk_submit", "pk_submit.html", 5);
})
appcan.button("#articledetail", "btn-act", function() {
    appcan.window.open("article_mylist", "article_mylist.html", 5);
})

appcan.button("#article_list", "btn-act", function() {
    appcan.window.open("article_list", "article_list.html", 5);
})

var appId = "wx009651c6fd586eb2";

appcan.button("#share_weixin", "btn-act", function() {
    var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/article_list.html?'+getLocVal("pk_id")+'?","scene":"0","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr0);
})

appcan.button("#share_weixinquan", "btn-act", function() {
    var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/article_list.html?'+getLocVal("pk_id")+'?","scene":"1","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr1);
})