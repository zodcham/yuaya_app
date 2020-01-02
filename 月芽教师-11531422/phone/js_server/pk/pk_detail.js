var url = location.href;
var params = url.split('?');
var g_id = params[1];

var pushTitle="";
var titHeight = $('#header').offset().height;

appcan.ready(function() {
	$("#nav-right").html("所有活动");
	
    getUserInfo();
    if(userInfo.permissions==3){
        $("#article_list_givescore").removeClass("uhide");
    }

    pushTitle="我正在参加月芽阅读活动。";
    if(!g_id) {
		g_id=getLocVal("pk_id");
		setLocVal("pk_share_url",'http://www.readseed.cn/yueya_webapp/pk/pk_detail.html?'+g_id+'?');
	}
	
    
    
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

    var param1 = {

        index:1

    };

    var data1 = JSON.stringify(param1);
	if(userInfo.permissions==3){
		initMenu3();
	}
	else{
		initMenu();
	}
	
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


appcan.button("#nav-right", "btn-act", function() {
    appcan.window.open("pk_list", "pk_list.html", 5);
})

appcan.button("#article_submit", "btn-act", function() {
    appcan.window.open("pk_submit", "pk_submit.html", 5);
})
appcan.button("#articledetail", "btn-act", function() {
    appcan.window.open("article_mylist", "article_mylist.html", 5);
})
appcan.button("#article_rank", "btn-act", function() {
    appcan.window.open("article_rank", "article_rank.html", 5);
})

appcan.button("#article_list", "btn-act", function() {
    setLocVal("isGiveScoreAreicleList",0);
    appcan.window.open("article_list", "article_list.html", 5);
})

appcan.button("#article_list_givescore", "btn-act", function() {
    setLocVal("isGiveScoreAreicleList",1);
    appcan.window.open("article_list", "article_list.html", 5);
})


var appId = "wxdd94041dd73a8049";

// appcan.button("#share_weixin", "btn-act", function() {
//     var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/pk_detail.html?'+g_id+'?","scene":"0","title":"' + pushTitle + '","description":"分享一下"}';
//     uexWeiXin.shareLinkContent(jsonstr0);
// })

appcan.button("#share_weixinquan", "btn-act", function() {
    var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/pk/pk_detail.html?'+g_id+'?","scene":"1","title":"' + pushTitle + '","description":"分享一下"}';
    uexWeiXin.shareLinkContent(jsonstr1);
})

appcan.button("#share_weixin", "btn-act", function() {

    var titHeight = $('#header').offset().height;
    var pushUrl = "pk_share.html";

    uexWindow.openPopover({
        name : "pk_share",
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




function initMenu(){
	
    var rem_size=$("html").css('font-size');
    var rem = Number(rem_size.replace("px",""));
    var param1 = {
        statusColor:"#ffffff",
        indicatorColor:"#ffffff",
        indicatorSelectColor:"#EE0000",
        tab:{
            textSize:13,
            textNColor:"#ffffff",
            textHColor:"#ffffff",
            centerImg:"res://pk/a3.png",
            bgColor:"#666666",
            data:[
                {
                    title:"活动详情",
                    iconN:"res://pk/a1.png",
                    iconH:"res://pk/a1.png"
                },
                {
                    title:"作品",
                    iconN:"res://pk/a2.png",
                    iconH:"res://pk/a2.png"
                },
                {
                    title:"榜单",
                    iconN:"res://pk/a4.png",
                    iconH:"res://pk/a4.png"
                },
                {
                    title:"分享",
                    iconN:"res://pk/b5.png",
                    iconH:"res://pk/b5.png"
                }
            ]
        },
        popMenu:{
            textSize:12,
            textNColor:"#ffffff",
            textHColor:"#ffffff",
            bgColor:"#66000000",
            bottomDistance:200,
            data:[
                [
                    {
                        title: "分享给好友",
                        iconN:"res://pk/b5.png",
                        iconH:"res://pk/b5.png"
                    },
                    {
                        title: "分享朋友圈",
                        iconN:"res://pk/b4.png",
                        iconH:"res://pk/b4.png"
                    }
                ]
            ]
        }
    };
	
	
	
	
	
    var data1 = JSON.stringify(param1);
    uexTabBarWithPopMenu.open(data1);
	
	uexTabBarWithPopMenu.onTabItemClick = function(data){
        var index=data.index;
		var openUrl="";
		
		switch(index){
			case 0:
				openUrl="pk_detail_content.html";
			break;
			case 1:
				openUrl="article_list_content.html";
			break;
			case 2:
				openUrl="article_rank.html";
			break;
			case 3:
				shareWeixin();
			break;
			default:
				openUrl="pk_detail_content.html";
			break;
		}
		appcan.frame.open({
			id : 'content',
			url : openUrl,
			left : 0,
			top : titHeight,
			name : 'pk_detail'
		});
		
    }
	
	uexTabBarWithPopMenu.onPopMenuItemClick = function(data){
		 var index=data.index;
		var openUrl="";
		
		switch(index){
			case 0:
				shareWeixin();
			break;
			case 1:
				shareWeixinQuan();
			break;
		}
		 
    }
}

	
function shareWeixin(){
	var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"'+getLocVal("pk_share_url")+'","scene":"0","title":"' + pushTitle + '","description":"分享一下"}';
	uexWeiXin.shareLinkContent(jsonstr1);
}

function shareWeixinQuan(){
	var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"'+getLocVal("pk_share_url")+'","scene":"1","title":"' + pushTitle + '","description":"分享一下"}';
	uexWeiXin.shareLinkContent(jsonstr1);
}









function initMenu3(){

	var rem_size=$("html").css('font-size');
	var rem = Number(rem_size.replace("px",""));
	var param1 = {
		statusColor:"#ffffff",
		indicatorColor:"#ffffff",
		indicatorSelectColor:"#EE0000",
		tab:{
			textSize:13,
			textNColor:"#ffffff",
			textHColor:"#ffffff",
			centerImg:"res://pk/a3.png",
			bgColor:"#666666",
			data:[
				{
					title:"活动详情",
					iconN:"res://pk/a1.png",
					iconH:"res://pk/a1.png"
				},
				{
					title:"全部作品",
					iconN:"res://pk/a2.png",
					iconH:"res://pk/a2.png"
				},
				{
					title:"排名榜单",
					iconN:"res://pk/a4.png",
					iconH:"res://pk/a4.png"
				},
				{
					title:"决审评分",
					iconN:"res://pk/a5.png",
					iconH:"res://pk/a5.png"
				}
			]
		},
		popMenu:{
			textSize:12,
			textNColor:"#ffffff",
			textHColor:"#ffffff",
			bgColor:"#66000000",
			bottomDistance:200,
			data:[
				[
					{
						title: "分享给好友",
						iconN:"res://pk/b5.png",
						iconH:"res://pk/b5.png"
					},
					{
						title: "分享朋友圈",
						iconN:"res://pk/b4.png",
						iconH:"res://pk/b4.png"
					}
				]
			]
		}
	};

	
    var data1 = JSON.stringify(param1);
    uexTabBarWithPopMenu.open(data1);
	
	uexTabBarWithPopMenu.onTabItemClick = function(data){
        var index=data.index;
		var openUrl="";
		
		switch(index){
			case 0:
				openUrl="pk_detail_content.html";
			break;
			case 1:
				setLocVal("isGiveScoreAreicleList",0);
				openUrl="article_list_content.html";
			break;
			case 2:
				openUrl="article_rank.html";
			break;
			case 3:
				//openUrl="article_mylist_content.html";
				setLocVal("isGiveScoreAreicleList",1);
				openUrl="article_list_content.html";
			break;
			default:
				openUrl="pk_detail_content.html";
			break;
		}
		
		appcan.frame.open({
			id : 'content',
			url : openUrl,
			left : 0,
			top : titHeight,
			name : 'pk_detail'
		});
		
    }
	
	uexTabBarWithPopMenu.onPopMenuItemClick = function(data){
		 var index=data.index;
		var openUrl="";
		
		switch(index){
			case 0:
				shareWeixin();
			break;
			case 1:
				shareWeixinQuan();
			break;
		}
		 
    }
}