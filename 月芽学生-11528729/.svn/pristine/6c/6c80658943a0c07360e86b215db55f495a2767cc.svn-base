var isSubmiting = false;
appcan.ready(function() {
    getCommInfo();
});

appcan.button("#submit", "ani-act", function() {
    var username = $.trim($('#username').val());
    var password = $.trim($('#password').val());
    var confirm_password = $.trim($('#confirm_password').val());
    var emailAddress = $.trim($('#emailAddress').val());
    if (username.length == 0) {
        uexWindow.toast('0', '5', "请输入账号~", config.toastTimeShort);
        return;
    }
    if (fucCheckLength(username) < 3) {
        uexWindow.toast('0', '5', "账号不能少于3位~", config.toastTimeShort);
        return;
    }
    var pattern = /^[A-Za-z0-9_]+$/;
    if (!pattern.test(username)) {
        uexWindow.toast('0', '5', "账号只能是字母、数字和下划线组成~", config.toastTimeShort);
        return;
    }
    if (password == '') {
        uexWindow.toast('0', '5', "请输入密码~", config.toastTimeShort);
        return;
    }
    if (fucCheckLength(password) < 6) {
        uexWindow.toast('0', '5', "密码不能少于6位~", config.toastTimeShort);
        return;
    }
    if (confirm_password == '') {
        uexWindow.toast('0', '5', "请输入确认密码~", config.toastTimeShort);
        return;
    }
    if (password != confirm_password) {
        uexWindow.toast('0', '5', "密码与确认密码不一致~", config.toastTimeShort);
        return;
    }
    if ('' == emailAddress) {
        uexWindow.toast('0', '5', "请输入邮箱地址~", config.toastTimeShort);
        return;
    }
    pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!pattern.test(emailAddress)) {
        uexWindow.toast('0', '5', "邮箱地址格式不正确~", config.toastTimeShort);
        return;
    }
    var _username = encodeURIComponent(username);
    var _password = encodeURIComponent(password);
    var _confirm_password = encodeURIComponent(confirm_password);
    var _emailAddress = encodeURIComponent(emailAddress);

    var MyRequest = new UrlSearch(commInfo.qrCode);
    //实例化
    var params = {
        'officeId' : MyRequest.officeId,
        'username' : _username,
        'password' : _password,
        'email' : _emailAddress
    };

    common.ajax("/register", {
        params : JSON.stringify(params)
    }, function(data) {
        AddLog(data.obj.id, logKeys.RegScanSuccess);
        toast("注册成功", config.toastTimeShort);
        setTimeout(function() {
            uexWindow.evaluateScript("", 0, "exit();");
        }, config.toastTimeShort - 500);
    }, function(data) {
        var msg_text=getMsgByKey(data.msg);
        if(data.msg=="EXISTS_LOGINNAME") msg_text="账号已存在，请尝试其他账号名。";
        toast(msg_text, config.toastTimeShort);
    }, {
        type : 'POST',
        beforeSend : function() {
            toast("正在注册...", 0);
        }
    });
});

function fucCheckLength(strTemp) {
    var i,
        sum;
    sum = 0;
    for ( i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255))
            sum = sum + 1;
        else
            sum = sum + 2;
    }
    return sum;
}

function UrlSearch(str) {
    var name,
        value;
    var num = str.indexOf("?");
    str = str.substr(num + 1);
    //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&");
    //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
} 