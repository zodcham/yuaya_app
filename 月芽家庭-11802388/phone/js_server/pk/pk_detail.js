var url = location.href;
var params = url.split('?');
var g_id = params[1];
var pushTitle=""

appcan.ready(function() {
    pushTitle="我正在参加月芽家庭活动。";
    if(!g_id) g_id=getLocVal("pk_id");


	isIPhoneX();
	
    var titHeight = $('#header').offset().height;

    appcan.frame.open({
        id : 'content',
        url : 'pk_detail_content.html',
        left : 0,
        top : titHeight,
        name : 'pk_detail'
    });

    /*
    getUserInfo();
    getProgramInfo();
    getCommInfo();

    if (programInfo.weixingLink.length > 0) {
        AddLogContent(userInfo.id, logKeys.BookLibGrade, {"programId":programInfo.id});
        appcan.frame.open("content", programInfo.weixingLink, 1, titHeight);
    } else {
        //appcan.frame.open("content", "information_content.html", 0, titHeight);
        appcan.frame.open({
            id : 'content',
            url : 'pk_detail_content.html',
            left : 0,
            top : titHeight,
            name : 'pk_detail'
        });
    }
    */

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

appcan.button(".nav-btn", "btn-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "refesh();");
    appcan.window.close(-1);
})

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
    var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/pk_detail.html?'+g_id+'","scene":"0","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr0);

})

appcan.button("#share_weixinquan", "btn-act", function() {
    var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/pk_detail.html?'+g_id+'","scene":"1","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr1);
})