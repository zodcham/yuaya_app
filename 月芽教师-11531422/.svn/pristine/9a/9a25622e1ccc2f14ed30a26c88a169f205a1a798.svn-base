var userPhoneNo;
//userPhoneNo手机号
var usernames;
//usernames登录账号

appcan.ready(function() {
    getUserInfo();

});
//发送验证
appcan.button("#btnVerification", "ani-act", function() {
    usernames = $("#username").val();
    userPhoneNo = $("#userPhoneNo").val();

    if (usernames.length == 0) {
        toast("登录账号不能为空~", config.toastTimeShort);
        return;
    }
    if (userPhoneNo.length == 0) {
        toast("手机号不能为空~", config.toastTimeShort);
        return;
    }
    common.ajax("/user/teacherresetPasswordByPhone", {
        phone : userPhoneNo,
        username : usernames
    }, function(data) {
        $("#userPhoneNo").val("");
        $("#username").val("");
        appcan.window.alert({
            title : '提示操作成功！',
            content : '验证码5秒后,发送至手机请查收并进行下步操作~',
            buttons : '确定'
        });

        $("#content1").addClass("uhide");
        $("#content2").removeClass("uhide");
    }, function(data) {
        var msg = data.msg.code;
        if (msg.indexOf('BUSINESS_LIMIT_CONTROL') > -1) {
            toast(getMsgByKey("手机号码不能连续发送短信验证码，请5分钟后重试~"), config.toastTimeShort);
        } else {
            toast(getMsgByKey("手机号码不存在或手机号码不正确哦~"), config.toastTimeShort);
        }
    }, {
        "type" : "POST"
    });
});
//重置密码
appcan.button("#applyReset", "ani-act", function() {

    var Verification = $("#Verification").val();
    //验证码
    var Pass1 = $("#Pass1").val();
    //密码1
    var Pass2 = $("#Pass2").val();
    //密码2

    if (Verification.length == 0) {
        toast("验证码不能为空~", config.toastTimeShort);
        return;
    }
    if (Pass1.length == 0 && Pass2.length == 0) {
        toast("两次密码不能想同,请重试~", config.toastTimeShort);
        return;
    }

    common.ajax("/user/teacherresetPasswordByCode", {
        phone : userPhoneNo,
        code : Verification,
        password : Pass1
    }, function(data) {
        $("#userPhoneNo").val("");
        $("#Verification").val("");
        // toast("成功...",config.toastTimeShort);
        appcan.window.alert({
            title : '提示信息！',
            content : '密码已重置成功~',
            buttons : ['确定', '取消'],
            callback : function(err, data, dataType, optId) {

                if ("1" == data) {

                } else if ("0" == data) {
                    appcan.window.open("login", "login.html", 5, 4);
                }
            }
        });

        $("#content1").removeClass("uhide");
        $("#content2").addClass("uhide");

    }, function(data) {
        toast(getMsgByKey("重置密码失败,请检查验证码是否有误~"), config.toastTimeShort);
    }, {
        "type" : "POST"
    });
});
