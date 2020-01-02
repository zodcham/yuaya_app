var titHeight;

var pushTitle="";
appcan.ready(function() {
    pushTitle="我正在参加月芽阅读活动。";
    
	isIPhoneX();
    titHeight = $('#header').offset().height;
    appcan.frame.open("content", "article_list_content.html", 0, titHeight);


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

var appId = "wxdd94041dd73a8049";

appcan.button("#share_weixin", "btn-act", function() {
    var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/article_list.html?'+getLocVal("pk_id")+'?","scene":"0","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr0);
})

appcan.button("#share_weixinquan", "btn-act", function() {
    var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/article_list.html?'+getLocVal("pk_id")+'?","scene":"1","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr1);
})