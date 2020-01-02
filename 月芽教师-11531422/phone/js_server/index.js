var g_state = 0;
var titHeight;


appcan.ready(function() {
	isIPhoneX();
	
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
        appcan.window.open("guide", "guide.html", 0);
    } else {
        validLogin(function(msg) {
            init();
			if(userInfo.mobile+""=="" || !/^[1][0-9][0-9]{9}$/.test(userInfo.mobile)){
				alert("请尽快填写手机号码，以保证您的账户安全，便于找回密码。")
				sysInfo.usermodifyType = 3;
				setSysInfo();
				appcan.window.open("user_modify", "user/user_modify.html", 10);
			}
        }, function(msg) {
            appcan.window.open("login", "login.html", 0);
        });
        checkUpload(false);
    }

    //阅读圈
    appcan.button("#yd", "btn-act", function() {
        appcan.window.open("yueduquan", "yueduquan/Reading_circle.html", 10);

    });
    uexJPush.onReceiveNotificationOpen = onReceiveNotificationOpen;
    uexJPush.cbGetConnectionState = cbGetConnectionState;
    uexJPush.cbSetAliasAndTags = cbSetAliasAndTags;

    setLocVal("bookInfo_default","");//设置图书详情页默认进入到详情
	
});
//停止推送
// function sropPush(){
// var params = {
//
// };
// var data = JSON.stringify(params);
// uexJPush.sropPush(data);
// }
//恢复推送
// function reumePush(){
// var params = {
//
// };
// var data = JSON.stringify(params);
// uexJPush.reumePush(data);
// }
function init() {
    titHeight = $('#header')[0].offsetHeight;
    appcan.frame.open({
        id : "content",
        url : [{
            'inPageName' : 'home',
            'inUrl' : 'index_home.html'
        }, {
            'inPageName' : 'mall',
            'inUrl' : 'index_mall.html'
        },
        // {'inPageName':'yd','inUrl':'yueduquan.html'},
        {
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
		appcan.frame.resizePopoverByEle("content", 0, titHeight);
    };

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
}

function goMall() {
    appcan.window.selectMultiPopover("content", 1);
    changeTab(1);
}

function changeTab(index) {
    $(".tabs .tabItem").removeClass("tab-active text-blue");
    $(".tabs .tabItem:eq(" + index + ")").addClass("tab-active text-blue");
    $("#title").text($(".tabs .tabItem:eq(" + index + ")").find(".text").text());
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
    // alert(info);
    appcan.window.open("uexJPush", "index.html", 5)
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
// function reumePush(){
// var params = {
//
// };
// var data = JSON.stringify(params);
// uexJPush.reumePush(data);
// }
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
    var tags = new Array("tag1", "tag2", "tag3");
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
