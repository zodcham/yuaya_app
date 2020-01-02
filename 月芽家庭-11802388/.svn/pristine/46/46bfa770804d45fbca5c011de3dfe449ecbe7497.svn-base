var isSubmiting = false;
appcan.ready(function() {
    isIPhoneX();
    getCommInfo();

});
appcan.button("#agreement", "ani-act", function() {
    appcan.window.open("agreement", "register_agreement.html", 10, 4);
})

appcan.button("#agreement", "ani-act", function() {
    appcan.window.open("agreement", "register_agreement.html", 10, 4);
})

appcan.button("#submit", "ani-act", function() {
    var username = $.trim($('#username').val());
    var password = $.trim($('#password').val());
    var code = $.trim($('#verificationcode').val());
    var confirm_password = $.trim($('#confirm_password').val());

    if (username.length == 0) {
        toast("请输入手机号！", config.toastTimeShort);
        $('#username').focus();
        return;
    } else {
        if (!funCheckCellphone(username)) {
            toast("请输入有效的手机号码！", config.toastTimeShort);
            $('#username').focus();
            return false;
        }
    }

    var _username = encodeURIComponent(username);
    var _code = encodeURIComponent(code);

    //var MyRequest = new UrlSearch(commInfo.qrCode); //实例化

    checkRegisterCode(_username, _code);
    //检查验证码是否正确
});

//获得手机验证码
function GetVerification() {
    var username = $.trim($('#username').val());
    if (!funCheckCellphone(username)) {
        toast("请输入正确的手机号！", config.toastTimeShort);
        return false;
    }

    reg_settime();
    var url = _SERVER_ADDRESS + "/phone/register/getRegisterCode";
    var par = {
        'phone' : username
    };

    var funOK = function(data) {
        data=JSON.parse(data);
        if (data.success) {
            $("#verificationcode").focus();
            toast("验证码已发送！", config.toastTimeShort);
        } else {
            toast(data.msg, config.toastTimeShort);
        }

    }
    var funErr = function(data) {
        data=JSON.parse(data);
        toast(data.msg, config.toastTimeShort);
    }
    var postType = {
        type : 'POST'
    };
    common.ajaxPOST(url, par, funOK, funErr);

}

//获得手机验证码
function GetVerification111() {
    var username = $.trim($('#username').val());
    if (!funCheckCellphone(username)) {
        toast('0', '5', "请输入正确的手机号！", config.toastTimeShort);
        return false;
    }

    $("#verificationcode").focus();

    reg_settime();
    //60秒倒计时

    var url = _SERVER_ADDRESS + "/phone/register/getRegisterCode";
    var par = {
        'phone' : username
    };

    var funOK = function(data) {
        data=JSON.parse(data);
        toast("验证码已发送", config.toastTimeShort);
    }
    var funErr = function(data) {
        data=JSON.parse(data);
        toast(data.msg, config.toastTimeShort);
    }
    var postType = {
        type : 'POST'
    };
    common.ajaxPOST(url, par, funOK, funErr);

}

function checkRegisterCode(phone, code) {

    var url = _SERVER_ADDRESS + "/phone/register/validRegisterCode";
    var params = {
        'phone' : phone,
        'code' : code
    };

    var funOK = function(data) {
        data=JSON.parse(data);
        if (data.success) {
            setLocVal("reg_phone", phone);
            appcan.window.open("RegisterSetPassword", "register_password.html", 10, 4);
        } else {
            toast(data.msg, config.toastTimeShort);
        }
    }
    var funErr = function(data) {
        data=JSON.parse(data);
        toast(data.msg, config.toastTimeShort);
    }

    common.ajaxPOST(url, params, funOK, funErr);

}

function Register(phone, psw) {
    var params = {
        'phone' : phone,
        'password' : psw
    };
    var url = _SERVER_ADDRESS + "/phone/register/registerByPhone";
    var funOK = function(data) {
        data=JSON.parse(data);
        if (data.success) {
            toast("注册成功，自动登录中...", config.toastTimeShort);
            login(phone, psw);
        } else {
            toast(data.msg, config.toastTimeShort);
        }

    };
    var funErr = function(data) {
        data=JSON.parse(data);
        toast(data.msg, config.toastTimeShort);
    };

    common.ajaxPOST(url, params, funOK, funErr);
}

function login(user, pwd) {
    var params = {
        'username' : user,
        'password' : pwd
    };
    params = {
        "params" : JSON.stringify(params)
    };
    var url = "/student/login";
    var funOK = function(data) {
        data=JSON.parse(data);
        userInfo = data.obj;
        setUserInfo(true);
        $("#username").val("");
        $("#password").val("");
        appcan.window.open("index", "index.html", 10, 4);

    };
    var funErr = function(data) {
        data=JSON.parse(data);
        toast("连接错误，请重试！", config.toastTimeShort);
    };
    var postType = {
        type : 'POST'
    };

    common.ajax(url, params, funOK, funErr, postType);
}

function funCheckCellphone(cellphone) {
    //手机号正则
    var phoneReg = /(^1[1|2|3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
    return phoneReg.test(cellphone);
}

//倒计时
var countdown = 60;
function reg_settime() {
    if (countdown == 0) {
        //$("button").click(GetVerification);
        $("#btn_getverification").attr("disabled", false);
        $("#btn_getverification").val("获取验证码");
        countdown = 60;
        return false;
    } else {
        $("#btn_getverification").attr("disabled", "disabled");
        $("#btn_getverification").val("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function() {
        reg_settime();
    }, 1000);
}

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