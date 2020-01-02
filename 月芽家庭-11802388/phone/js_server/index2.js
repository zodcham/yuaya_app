


var g_state = 0;
var titHeight;

appcan.ready(function(type) {
	isIPhoneX();
	
    appcan.window.evaluateScript({
        name : "login", //窗口名称
        scriptContent : 'appcan.window.close();'
    });

    getUserInfo();
    getSysInfo();

	
    config.currentPath = "";
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            uexWidgetOne.exit();
        }
    }
    uexWindow.setReportKey(0, 1);
    if (sysInfo.isFirstInto) {
        appcan.window.open("guide", "guide.html", 5);
    } else {
        validLogin(function(msg) {
            init();
			if(userInfo.mobile=="" || !/^[1][0-9][0-9]{9}$/.test(userInfo.mobile)){
				alert("请尽快填写手机号码，以保证您的账户安全，便于找回密码。")
				sysInfo.usermodifyType = 3;
				setSysInfo();
				appcan.window.open("user_modify", "user/user_modify.html", 10);
			}
        }, function(msg) {
            appcan.window.open("login", "login.html", 5);
        });
        checkUpload(false);
    }

    //setTags();

    //以下极光监听方法如果，没有集成插件 （在线不勾选插件的话）会导致setTimeout('delayaaa()', 3000);不执行
    //uexJPush.onReceiveNotificationOpen = onReceiveNotificationOpen;
    //uexJPush.cbGetConnectionState = cbGetConnectionState;
    uexJPush.cbSetAliasAndTags = cbSetAliasAndTags;

    uexJPush.onReceiveRegistration = onReceiveRegistration;
    uexJPush.onReceiveMessage = onReceiveMessage;
    uexJPush.onReceiveNotification = onReceiveNotification;
    uexJPush.onReceiveNotificationOpen = onReceiveNotificationOpen;
    uexJPush.onReceiveConnectionChange = onReceiveConnectionChange;
	
		
	

});

//阅读圈
appcan.button("#yd", "btn-act", function() {
    appcan.window.open("yueduquan", "yueduquan/Reading_circle.html", 5);
});

/*
 //首页
 appcan.button("#home", "btn-act", function() {
 //appcan.window.open("mall", "index_mall.html", 5);
 appcan.frame.open("content", "index_home.html", 0, titHeight);
 changeTab(0);
 });

 //书城
 appcan.button("#mall", "btn-act", function() {
 //appcan.window.open("mall", "index_mall.html", 5);
 appcan.frame.open("content", "index_mall.html", 0, titHeight);
 changeTab(1);
 });

 //排行
 appcan.button("#ph", "btn-act", function() {
 //appcan.window.open("ph", "Paihang.html", 5);
 appcan.frame.open("content", "Paihang.html", 0, titHeight);
 changeTab(2);
 });

 //我的
 appcan.button("#me", "btn-act", function() {
 //appcan.window.open("person", "index_person.html", 5);
 appcan.frame.open("content", "index_person.html", 0, titHeight);
 changeTab(3);
 });

 */
/*
 function init() {
 var titHeight=$('#header')[0].offsetHeight;
 appcan.frame.open("content", "index_home.html", 0, titHeight);
 window.onorientationchange = window.onresize = function() {
 appcan.frame.resize("content", 0, titHeight);
 }

 }
 */

function init() {
    titHeight = $('#header')[0].offsetHeight;
    appcan.frame.open({
        id : "content",
        //添加阅读圈和排行
        url : [{
            'inPageName' : 'home',
            'inUrl' : 'index_home.html'
        }, {
            'inPageName' : 'mall',
            'inUrl' : 'index_mall.html'
        }, {
            'inPageName' : 'ph',
            'inUrl' : 'Paihang.html'
        }, {
            'inPageName' : 'person',
            'inUrl' : 'index_person.html'
        }],
        top : titHeight,
        left : 0,
        index : 0,
        change : function(index, res) {
            changeTab(res.multiPopSelectedIndex);
        }
    });
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    };

    //添加阅读圈和排行
    $(".tabs .tabItem").on("click", function() {
        switch($(this).attr("id")) {
        case "home":
            appcan.window.selectMultiPopover("content", 0);
            changeTab(0);
            break;
        case "mall":
            appcan.window.selectMultiPopover("content", 1);
            changeTab(1);
            break;
        // case "yd":
        // appcan.window.selectMultiPopover("content",2);
        // changeTab(2);
        // break;
        case "ph":
            appcan.window.selectMultiPopover("content", 2);
            changeTab(2);
            break;
        case "me":
            appcan.window.selectMultiPopover("content", 3);
            changeTab(3);
            break;
        }
    });
    changeTab(0);
    //Research();
}

function Research() {
    getUserInfo();
    var url = config.serviceUrl + "/event/get";

    var par = {
        "userid" : userInfo.id
    };
    var fok = function(data) {
        var obj = JSON.parse(data);

        var now = new Date();
        var nowtime = timeFormatter(now);

        //对话框标题
        var r_title = obj.surveyName;
        //对话框内容
        var r_content = obj.surveyIntro;
        //打开的网址
        var r_url = obj.surveyUrl;
        var r_isalert = Number(obj.popup);
        //是否弹出
        var r_startdate = obj.startTime;
        //弹出开始时间
        var r_enddate = obj.endTime;
        //弹出结束时间

        if (r_isalert == 1 && isDateBetween(nowtime, r_startdate, r_enddate)) {
            /*用户确认提示框*/
            appcan.window.alert({
                title : r_title,
                content : r_content,
                buttons : ['接受', '不接受'],
                callback : function(err, data, dataType, optId) {
                    if (Number(data) != 1) {
                        setLocVal("survey_url", r_url);
                        setLocVal("survey_title", r_title);
                        appcan.window.open("surveydetail", "survey_detail.html", 5);
                    } else {
                    }
                }
            });
        }

    };
    var ferr = function(err) {

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

function timeFormatter(da) {
    return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
}

/**
 * 判断日期是否在区间内，在区间内返回true，否返回false
 */
function isDateBetween(dateString, startDateString, endDateString) {
    //获取时间戳
    var startTimestamp = new Date(startDateString).getTime();
    var endTimestamp = new Date(endDateString).getTime();
    var nowTimestamp = new Date(dateString).getTime();

    var flag = false;
    if (startTimestamp < nowTimestamp && nowTimestamp < endTimestamp) {
        flag = true;
    }
    return flag;
};

function changeTab(index) {
    $(".tabs .tabItem").removeClass("tab-active ");
    $(".tabs .tabItem:eq(" + index + ")").addClass("tab-active");
    $("#title").text($(".tabs .tabItem:eq(" + index + ")").find(".text").text());
}

function goMall() {
    appcan.window.selectMultiPopover("content", 1);
    changeTab(1);
}

appcan.button("#nav-right", "btn-act", function() {
    uexWindow.openPopover("filter", 0, "index_mall_filter.html", "", 0, 0, '', '', '', 0);
})
function openFilter() {
    uexWindow.openPopover("index_mall_filter", 0, "index_mall_filter.html", "", 0, 0, '', '', '', 0);
}

function closeFilter() {
    uexWindow.closePopover("index_mall_filter");

}

//极光推送接口回调测试
function cbIsPushStopped(info) {//停止推送
    // alert(info);
}

function onReceiveRegistration(info) {//应用程序注册
    //  alert(info);
}

function onReceiveMessage(info) {//收到了自定义消息
    // alert(info);
}

function onReceiveNotification(info) {//收到了通知
    // alert(info);
}

//用户点击了通知设置跳转的页面
function onReceiveNotificationOpen(info) {
    //alert(info);
    appcan.window.open("uexJPush", "push.html", 5)
}

function cbSetAliasAndTags(info) {//同时设置别名和标签的回调方法
    // alert(info);
}

function cbSetAlias(info) {//设置别名的回调方法
    // alert(info);
}

function cbSetTags(info) {//设置标签的回调方法
    //  alert(info);
}

function cbGetRegistrationID(info) {//取得应用程序对应的RegistrationID的回调方法
    //  alert(info);
}

//获取连接状态回调
function cbGetConnectionState(info) {
    // alert(info);
}

function onReceiveConnectionChange(info) {//连接状态变化
    // alert(info);
}

// 停止推送
// function sropPush(){
// var params = {
//
// };
// var data = JSON.stringify(params);
// uexJPush.sropPush(data);
// }
//恢复推送
function reumePush() {
    var params = {

    };
    var data = JSON.stringify(params);
    uexJPush.reumePush(data);
}

setTimeout('delayaaa()', 3000);
uexWindow.setSlidingWindowEnabled(1);
uexDevice.cbGetInfo = function(opCode, dataType, data) {
    //注册应用运行中Push事件通知函数
    uexWidget.setPushNotifyCallback("cbNotify");
    //绑定当前用户信息到AppCan推送服务器
    setdeviceToken();
    //注册获取Push消息内容的回调函数
    uexWidget.cbGetPushInfo = function(opCode, dataType, data) {
        if (data != 'null')
            pushOpen(data);
    }
    //获取应用由Push激活时的Push消息内容
    uexWidget.getPushInfo();
}
//获取当前应用的DeviceToken
uexDevice.getInfo('11');

//使用官方封装极光推送插件演示代码区 开始 需要注释这段避免首页无法滑动

function setAliasAndTags() {//同时设置别名和标签
    var tags = new Array("tag4", "tag5", "tag6");
    var params = {
        alias : "alias66",
        tags : tags
    };
    var data = JSON.stringify(params);
    uexJPush.setAliasAndTags(data);
}

function setAlias() {//设置别名
    var params = {
        alias : "alias22"
    };
    var data = JSON.stringify(params);
    uexJPush.setAlias(data);
}

function setTags() {//设置标签
    var tags = new Array("holidaypush", "test", "yueya");
    var params = {
        tags : tags
    };
    var data = JSON.stringify(params);
    uexJPush.setTags(data);
}

function getRegistrationID() {//取得应用程序对应的 RegistrationID
    var params = {

    };
    var data = JSON.stringify(params);
    uexJPush.getRegistrationID(data);
}

function reportNotificationOpened() {//用于上报用户的通知栏被打开，或者用于上报用户自定义消息被展示等客户端需要统计的事件。
    var params = {
        msgId : 1222
    };
    var data = JSON.stringify(params);
    uexJPush.reportNotificationOpened(data);
}

function clearAllNotifications() {//清除所有通知
    var params = {

    };
    var data = JSON.stringify(params);
    uexJPush.clearAllNotifications(data);
}

function clearNotificationById() {// 根据Id清除某条通知
    var id = document.getElementById("clearNotificationById").value;
    var params = {
        notificationId : id
    };
    var data = JSON.stringify(params);
    uexJPush.clearNotificationById(data);
}

function setPushTime() {
    var weekDays = new Array("0", "1", "2", "3", "4");
    var params = {
        weekDays : weekDays,
        startHour : 0,
        endHour : 18
    };
    var data = JSON.stringify(params);
    uexJPush.setPushTime(data);
}

function setSilenceTime() {
    var params = {
        startHour : 0,
        startMinute : 1,
        endHour : 13,
        endMinute : 0
    };
    var data = JSON.stringify(params);
    uexJPush.setSilenceTime(data);
}

function setLatestNotificationNumber() {
    var params = {
        maxNum : 4
    };
    var data = JSON.stringify(params);
    uexJPush.setLatestNotificationNumber(data);
}

function getConnectionState() {//获取推送连接状态
    var params = {

    };
    var data = JSON.stringify(params);
    uexJPush.getConnectionState(data);
}

function addLocalNotification() {//添加一个本地通知
    var params = {
        builderId : 0,
        title : "这是title",
        content : "这是内容",
        extras : {
            "key" : "value"
        },
        notificationId : 3,
        broadCastTime : 10000
    };
    var data = JSON.stringify(params);
    uexJPush.addLocalNotification(data);
}

function removeLocalNotification() {//移除一个本地通知
    var notificationId = 3;
    var params = {
        notificationId : notificationId
    };
    var data = JSON.stringify(params);
    uexJPush.removeLocalNotification(data);
}

function clearLocalNotifications() {// 移除所有的通知
    var params = {

    };
    var data = JSON.stringify(params);
    uexJPush.clearLocalNotifications(data);
}

