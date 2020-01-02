

appcan.ready(function() {
    var json=getLocVal("pushinfo");
    var id=JSON.parse(json).id;
    var type=JSON.parse(json).type;
    var titHeight = $('#header').offset().height+20;

    if(type=="message"){//message 	系统消息

        var url = _SERVER_ADDRESS + "/new/findSysMessages";
        var par = {};
        var fok = function(data) {
            var list = JSON.parse(data);
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                if(id==obj.ID) {
                    setLocVal("message_id", obj.ID);
                    setLocVal("message_title", obj.TITLE);
                    setLocVal("message_addtime", formatDateTime(obj.CREATE_DATE));
                    setLocVal("message_content", obj.CONTENT);
                }
            }
            $("#HeaderTitle").html(obj.TITLE);
            appcan.frame.open({
                id : 'content',
                url : 'yueduquan/message_content.html',
                left : 0,
                top : titHeight,
                name : 'message_content'
            });

        };
        var ferr = function(err) {
            alert(JSON.stringify(err));
        };
        $.ajax({
            url : url,
            type : 'GET',
            data : par,
            dataType : "html",
            success : fok,
            error : ferr
        });


    }
    else{ //information 活动资讯
        getProgramInfoById(id, function(data) {
            getProgramInfo();
            programInfo = data;
            setProgramInfo();
            $("#HeaderTitle").html(programInfo.name);
            if (programInfo.weixingLink.length > 0) {
                appcan.frame.open("content", programInfo.weixingLink, 1, titHeight);
            } else {
                appcan.frame.open({
                    id : 'content',
                    url : 'information_content.html',
                    left : 0,
                    top : titHeight,
                    name : 'newscontent'
                });
            }
        }, null);
    }


    /*
	var titHeight = $('#header').offset().height + 20;
    //var url = config.serviceUrl+"/event/newest";
    var url = "http://www.readseed.cn/phone/event/newest";
    //var url = "http://192.168.0.134/push.php";
    //var url="http://www.readseed.cn/survey/query";
    var par = {};
    var fok = function(data) {
        var obj = eval("(" + data + ")");
        var pushTitle = obj.PUSH_TITLE;
        var pushUrl = unescape(obj.PUSH_URL);
        alert(pushTitle);
        //pushUrl="https://wenjuan.readseed.cn/response!answerMobile.action?surveyId=0b449bcc641b3e0e01641c47e14f0005";
        setLocVal("pushTitle", pushTitle);
        setLocVal("pushUrl", pushUrl);

        $("#HeaderTitle").html(pushTitle);
        uexWindow.openPopover("content", 0, pushUrl, '', 0, titHeight, document.body.clientWidth, '', 0, 512, 0);

    };
    var ferr = function(err) {
        $("#HeaderTitle").html("月芽当前无活动");
        $("#content").html("月芽当前无活动！");
    };

    $.ajax({
        url : url,
        type : 'POST',
        data : par,
        dataType : "html",
        success : fok,
        error : ferr
    });
    */
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {
    var titHeight = $('#header').offset().height;
    var pushUrl = "push_share.html";
    uexWindow.openPopover({
        name : "pushshare",
        url : pushUrl,
        x : 0,
        y : 0,
        w : document.body.clientWidth,
        h : document.body.clientHeight,
        bottomMargin : 0,
        extraInfo : {
            opaque : true
        }
    });
})
