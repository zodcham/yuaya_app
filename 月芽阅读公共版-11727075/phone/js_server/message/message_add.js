

var titHeight;
var isOpenAddUserView = false;
appcan.ready(function() {
	isIPhoneX();

    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            exit();
        }
    }
    uexWindow.setReportKey(0, 1);
    getSysInfo();
    titHeight = $('#header').offset().height;
    sysInfo.titleHeight = titHeight;
    setSysInfo();
    appcan.frame.open("content", "message_add_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    exit();
})

appcan.button("#nav-right", "btn-act", function() {
    if (!$("#btnAddUser").hasClass("uhide")) {
        uexWindow.evaluatePopoverScript("", "addUser", "getCheckedValue();");
    }
    if (!$("#btnSend").hasClass("uhide")) {
        uexWindow.evaluatePopoverScript("", "content", "send();");
    }
})
function openAddUserView() {
    $("#title").html("选择收件人");
    $("#btnAddUser").removeClass("uhide");
    $("#btnSend").addClass("uhide");
    appcan.frame.open("addUser", "message_add_user_content.html", 0, titHeight);
    isOpenAddUserView = true;
}

function closeAddUserView() {
    $("#title").html("发送消息");
    uexWindow.evaluatePopoverScript("", "addUser", "closeBar();");
    $("#btnAddUser").addClass("uhide");
    $("#btnSend").removeClass("uhide");
    isOpenAddUserView = false;
    appcan.frame.close("addUser");
}

function exit() {
    if (isOpenAddUserView) {
        closeAddUserView();
    } else {
        appcan.window.close(-1);
    }
}