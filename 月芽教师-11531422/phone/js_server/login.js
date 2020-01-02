
appcan.ready(function() {
	isIPhoneX();
	
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            uexWidgetOne.exit();
        }
    }
    uexWindow.setReportKey(0, 1);

    config.isMainWin = true;
    // var titHeight = $('#header').offset().height;
    // appcan.frame.open("content", "login_content.html", 0, titHeight);
    // window.onorientationchange = window.onresize = function() {
    // appcan.frame.resize("content", 0, titHeight);
    // }
});
appcan.button(".login_submit", "btn-act", function() {
    var user = $("#username").val();
    var pwd = $("#password").val();

    if (user.length == 0) {
        toast("用户名不能为空哦~", config.toastTimeShort);
        return;
    }
    if (pwd.length == 0) {
        toast("密码不能为空哦~", config.toastTimeShort);
        return;
    }

    if (/['"#$%&\^*]/.test(user)) {
        toast("用户名不能包含特殊字符哦~", config.toastTimeShort);
        return;
    }
    if (/['"#$%&\^*]/.test(pwd)) {
        toast("密码不能包含特殊字符哦~", config.toastTimeShort); 
        return;
    }

    config.currentPath = "";

    var params = {
        'username' : user,
        'password' : pwd
    };
    common.ajax("/teacher/login", {
        params : JSON.stringify(params)
    }, function(data) {
        userInfo = data.obj;
        setUserInfo(true);
        appcan.window.open("index", "index.html", 10, 4);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
})

appcan.button("#applyPass", "btn-act", function() {
    appcan.window.open("forget_password", "forget_password.html", 10);
})
