

appcan.ready(function() {
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            uexWidgetOne.exit();
        }
    }
    uexWindow.setReportKey(0, 1);

    config.isMainWin = true;
    getSysInfo();
    getCommInfo();

    uexWidgetOne.cbGetPlatform = function(opId, dataType, data) {
        sysInfo.phoneType = data;
        setSysInfo();
    };
    if (sysInfo.phoneType.length == 0) {
        uexWidgetOne.getPlatform();
    }

    //本地调试
    if (config.serviceUrl.indexOf('192.168')>-1) {
       $("#username").val('17687576301');
       $("#password").val('123456');
    }
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
        toast("姓名不能包含特殊字符哦~", config.toastTimeShort);
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
    common.ajax("/student/login", {
        params : JSON.stringify(params)
    }, function(data) {
        userInfo = data.obj;
        setUserInfo(true);

        $("#username").val("");
        $("#password").val("");
        AddLog(userInfo.id, logKeys.LoginSuccess);
        appcan.window.open("index", "index.html", 5, 4);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
})

appcan.button("#applyPass", "btn-act", function() {
    //appcan.window.open("applyPass", "back_password.html", 5);
    appcan.window.open("forget_password", "forget_password.html", 5);
})

function open_forget_password(){
    appcan.window.open("forget_password", "forget_password.html", 5);
}

appcan.button("#register", "btn-act", function() {
    getBarCode();
})
appcan.button("#scan_login", "btn-act", function() {
    getBarCodeLogin();
})

appcan.button("#register_new", "btn-act", function() {
    appcan.window.open("register_new", "register_new.html", 5);
})
//获取二维码或条形码 登录
function getBarCodeLogin() {
    tools.getBarCode(0, function(opCode, dataType, data) {
        switch(dataType) {
        case 0:
            break;
        case 1:

            var obj = null;
            if (sysInfo.phoneType == '1') {
                obj = JSON.parse(data);
            }
            if (sysInfo.phoneType == '0') {
                obj = JSON.parse(data.toString());
            }
            var type = obj.type;
            if (null != type && $.trim(type) != '') {
                type = type.toLowerCase() + '';
            } else {
                type = '';
            }
            type = type.replace(/\s+/g, "");
            var maname = "";
            var qr_code_str = "";
            if ("qr_code" == type || "qr-code" == type || type == 'qrcode') {
                //处理二维码
                maname = "二维码";
                qr_code_str = obj.code + '';
                //alert(qr_code_str);
                LoginByBarCode(qr_code_str);
            }
            break;
        case 2:
            break;
        default:
            alert("扫描异常，请重试");
        }
    }, function(data) {
    }, '请扫描图书馆或书店提供的注册二维码');
}

//通过二维码登录
function LoginByBarCode(barcode) {
    var url = config.serviceUrl + "/student/login/qrCode";
    //var url="http://192.168.0.130:8080/yueyafront/phone"+"/student/login/qrCode";
    var par = {
        'md5' : barcode
    };
    var fok = function(data) {
        var json = JSON.parse(data);
        userInfo = json.obj;
        setUserInfo(true);
        $("#username").val("");
        $("#password").val("");
        AddLog(userInfo.id, logKeys.LoginScanSuccess);
        appcan.window.open("index", "index.html", 5, 4);
    }
    var ferr = function(data) {
        var json = JSON.parse(data);
        toast(getMsgByKey(json.msg), config.toastTimeShort);
    }
    $.ajax({
        url : url,
        type : 'POST',
        data : par,
        dataType : "html",
        success : fok,
        error : ferr
    });
}

//获取二维码或条形码
function getBarCode() {
    tools.getBarCode(0, function(opCode, dataType, data) {
        switch(dataType) {
        case 0:
            break;
        case 1:
            var obj = null;
            if (sysInfo.phoneType == '1') {
                obj = JSON.parse(data);
            }
            if (sysInfo.phoneType == '0') {
                obj = JSON.parse(data.toString());
            }
            var type = obj.type;
            if (null != type && $.trim(type) != '') {
                type = type.toLowerCase() + '';
            } else {
                type = '';
            }
            type = type.replace(/\s+/g, "");
            var maname = "";
            var qr_code_str = "";
            if ("qr_code" == type || "qr-code" == type || type == 'qrcode') {
                //处理二维码
                maname = "二维码";
                qr_code_str = obj.code + '';
                if (isURL(qr_code_str)) {
                    //http://www.readseed.cn/f/mobile/readerRegister?officeId=e03b77419ae54452813182a7f1a25b9a
                    var rootStr = "http://www.readseed.cn/f/mobile/readerRegister";
                    if (qr_code_str.indexOf(rootStr) >= 0) {
                        commInfo.qrCode = qr_code_str;
                        //qr_code_str.replace(rootStr,"");
                        setCommInfo();
                        appcan.window.open("registers", "register.html", 5);
                    } else {
                        toast("请扫描图书馆二维码~", config.toastTimeShort);
                    }
                } else {
                    toast("请扫描图书馆二维码~", config.toastTimeShort);
                }
            } else if ("ean_13" == type || "ean-13" == type || "ean13" == type) {
                //处理条形码
                maname = "条形码";
                toast("请扫描图书馆二维码~", config.toastTimeShort);
            }
            break;
        case 2:
            break;
        default:
            alert("扫描异常，请重试");
        }
    }, function(data) {
    }, '请扫描图书馆或书店提供的注册二维码');
}

function isURL(str) {
    return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
}

$("#icon_login").click(function(){
    var json={"title":"扫码登陆","content":"请向当地公共图书馆、学校图书馆或者书店获取个人账号专属二维码，可用于月芽一体触屏机扫码快速登陆。"};
    appcan.alert(json);
});
$("#icon_reg").click(function(){
    var json={"title":"扫码注册","content":"请扫描当地公共图书馆、学校图书馆或者书店特定二维码用于注册，以获得个人账号。"};
    appcan.alert(json);
});