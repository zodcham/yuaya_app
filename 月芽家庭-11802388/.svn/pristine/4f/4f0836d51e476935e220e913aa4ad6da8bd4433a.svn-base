var isSubmiting = false;
appcan.ready(function() {
    isIPhoneX();
    getCommInfo();
});
appcan.button("#agreement", "ani-act", function() {
    appcan.window.open("agreement", "register_agreement.html", 10, 4);
})
appcan.button("#submit", "ani-act", function() {
    var password = $.trim($('#password').val());
    var confirm_password = $.trim($('#confirm_password').val());



    if (password == '') {
        toast("请输入密码！", config.toastTimeShort);
        $('#password').focus();
        return;
    }
    if (fucCheckLength(password) < 6) {
        toast("密码不能少于6位！", config.toastTimeShort);
        $('#password').focus();
        return;
    }
    if (/['"#$%&\^*]/.test(password)) {
        toast("密码不能包含特殊字符哦~", config.toastTimeShort);
        $('#password').focus();
        return;
    }
    if (confirm_password == '') {
        toast("请输入确认密码！", config.toastTimeShort);
        $('#password').focus();
        return;
    }
    if (password != confirm_password) {
        toast("密码与确认密码不一致！", config.toastTimeShort);
        $('#confirm_password').focus();
        return;
    }

    var _password = encodeURIComponent(password);
    var _confirm_password = encodeURIComponent(confirm_password);

    //var MyRequest = new UrlSearch(commInfo.qrCode); //实例化

    Register(getLocVal("reg_phone"), _password);
    //检查验证码是否正确
});



function Register(phone, psw) {
    var params = {
        'phone' : phone,
        'password' : psw,
        'type' : 4
    };
    var url = config.serviceUrl + "/register/registerByPhone";
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
        toast(data.msg, config.toastTimeShort);
    };

    common.ajaxPOST(url, params, funOK, funErr);
}

function login(user, pwd) {
    config.currentPath = "";
    var params = {
        'username' : user,
        'password' : pwd
    };
    common.ajax("/student/login", {
        params : JSON.stringify(params)
    }, function(data) {
        userInfo = data.obj;
        setUserInfo(true);

        AddLog(userInfo.id, logKeys.LoginSuccess);
        appcan.window.open("index.html", "index.html", 5, 4);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });


    /*
    var url =  config.serviceUrl + "/student/login";
    var funOK = function(data) {
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

    */

}

function funCheckCellphone(cellphone) {
    //手机号正则
    var phoneReg = /(^1[2|3|4|5|7|6|8|9]\d{9}$)|(^09\d{8}$)/;
    return phoneReg.test(cellphone);
}

//倒计时
var countdown = 5;
function reg_settime() {
    if (countdown == 0) {
        //$("button").click(GetVerification);
        $("#btn_getverification").attr("disabled", false);
        $("#btn_getverification").val("获取验证码");
        countdown = 5;
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