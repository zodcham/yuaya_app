
var pushTitle="";
appcan.ready(function() {
    pushTitle="我正在参加月芽阅读活动。";
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "article_detail_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
	getUserInfo();

    if(userInfo.permissions==3){
        $("#article_score").removeClass("uhide");
    }

});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})




appcan.button("#article_score", "btn-act", function() {
    var giveScore = function(content) {
        if(!content){
            alert("请输入分数");
            return false;
        };

        getUserInfo();
        if (content.length > 40)
            content = content.substring(0, 40);
        var url = config.serviceUrl + "/activity/neverCommit";
        var par = {params : JSON.stringify({
            "score" : content,
            "teacherId ": userInfo.id,
            "productionId" : getLocVal("pk_article_id")
        })};
        var fok = function(data) {
            toase("评分成功",1500);
			var titHeight = $('#header').offset().height;
			appcan.frame.open("content", "article_detail_content.html", 0, titHeight);
        };
        var ferr = function(err) {
			alert(JSON.stringify(err));
        };
        $.ajax({
            url : url,
            type : 'POST',
            data : par,
            dataType : "html",
            success : fok,
            error : ferr
        });
    }
    var title = "评分";
    var content = "100分为最高分，请输入作品的评分。";
    var callback = function(err, data, dataType, optId) {
        if (Number(data.index) == 0) {
            giveScore(data.data);
        } else {

        }
    }
    appcan.window.prompt(title, content, '60', ['确定', '取消'], callback);
})
appcan.button("#articledetail", "btn-act", function() {
    appcan.window.open("article_mylist", "article_mylist.html", 5);
})

appcan.button("#article_list", "btn-act", function() {
    appcan.window.open("article_list", "article_list.html", 5);
})

var appId = "wx009651c6fd586eb2";

appcan.button("#share_weixin", "btn-act", function() {
    var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/article_detail.html?'+getLocVal("pk_article_id")+'?","scene":"0","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr0);
})

appcan.button("#share_weixinquan", "btn-act", function() {
    var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/article_detail.html?'+getLocVal("pk_article_id")+'?","scene":"1","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr1);
})