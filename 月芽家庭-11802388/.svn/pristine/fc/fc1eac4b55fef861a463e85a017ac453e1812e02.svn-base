var url = location.href;
var params = url.split('?');
var g_id = params[1];
var pushTitle="";
var titHeight = $('#header').offset().height;

appcan.ready(function() {
    //$("#nav-right").html("所有活动");


    pushTitle="我正在参加月芽阅读活动。";
	
    if(!g_id) {
		g_id=getLocVal("pk_id");
		setLocVal("pk_share_url",'http://www.readseed.cn/yueya_webapp/pk/pk_detail.html?'+g_id+'?');
	}

	
    isIPhoneX();


    init();


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

    uexWeiXin.cbShareImageContent = function(data) {
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
    uexWindow.evaluatePopoverScript("", "content", "refesh();");
    appcan.window.close(-1);
})

appcan.button("#nav-add", "btn-act", function() {
    appcan.window.open("pk_submit", "pk_submit.html", 5);
})


/*
appcan.button("#articledetail", "btn-act", function() {
    appcan.window.open("article_mylist", "article_mylist.html", 5);
})

appcan.button("#article_list", "btn-act", function() {
    appcan.window.open("article_list", "article_list.html", 5);
})
*/

appcan.button("#nav-right", "btn-act", function() {
    appcan.window.open("pk_list", "pk_list.html", 5);
})








function init() {
    titHeight = $('#header')[0].offsetHeight;
    appcan.frame.open({
        id : "content",
        //添加阅读圈和排行
        url : [{
            'inPageName' : 'pk_detail_content',
            'inUrl' : 'pk_detail_content.html'
        }, {
            'inPageName' : 'article_list_content',
            'inUrl' : 'article_list_content.html'
        }, {
            'inPageName' : 'article_rank',
            'inUrl' : 'article_rank.html'
        }, {
            'inPageName' : 'article_mylist_content',
            'inUrl' : 'article_mylist_content.html'
        }],
        top : titHeight,
        left : 0,
        index : 0,
        change : function(index, res) {
            //changeTab(res.multiPopSelectedIndex);
        }
    });


    //添加阅读圈和排行
    $(".tabs .tabItem").on("click", function() {
        switch($(this).attr("id")) {
            case "detail":
                appcan.window.selectMultiPopover("content", 0);
                changeTab(0);
                break;
            case "list":
                appcan.window.selectMultiPopover("content", 1);
                changeTab(1);
                break;
            case "rank":
                appcan.window.selectMultiPopover("content", 2);
                changeTab(2);
                break;
            case "my":
                appcan.window.selectMultiPopover("content", 3);
                changeTab(3);
                break;
            case "share":
                shareWeixin();
                break;
        }
    });
    changeTab(0);
    //Research();
}



function changeTab(index) {
    showPkList();
    $(".tabItem").removeClass("tab-active ");
    setIconGrey();
    switch(index) {
        case 0:
            $("#tabDetail").addClass("tab-active_tabDetail");
            $("#detail .text").addClass("tabText");
            break;
        case 1:
            $("#tabList").addClass("tab-active_tabList");
            $("#list .text").addClass("tabText");
            break;
        case 2:
            $("#tabRank").addClass("tab-active_tabRank");
            $("#rank .text").addClass("tabText");
            break;
        case 3:
            $("#tabMy").addClass("tab-active_tabMy");
            $("#my .text").addClass("tabText");
            showAdd();
            break;
        case "share":
            shareWeixin();
            break;
    }
}
function setIconGrey(){
    $(".tabItem .text").removeClass("tabText");
    $("#tabDetail").removeClass("tab-active_tabDetail");
    $("#tabList").removeClass("tab-active_tabList");
    $("#tabRank").removeClass("tab-active_tabRank");
    $("#tabMy").removeClass("tab-active_tabMy");
}


var appId = "wx009651c6fd586eb2";

function shareWeixin(){
    var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"' + getLocVal("pk_share_url") + '?","scene":"0","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr0);

}

function showAdd(){
    $("#nav-add").removeClass("uhide");
    $("#nav-list").addClass("uhide");
}
function showPkList(){
    $("#nav-add").addClass("uhide");
    $("#nav-list").removeClass("uhide");
}

function removeAdd(){
    $("#nav-add").remove();
}
