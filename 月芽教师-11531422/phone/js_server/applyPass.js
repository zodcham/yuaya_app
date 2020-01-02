appcan.ready(function() {

});

appcan.button("#applyReset", "ani-act", function() {

    var no = $("#loginName").val();
    var userPhoneNo = $("#userPhoneNo").val();

    if (no.length == 0) {
        toast("用户名不能为空哦~", config.toastTimeShort);
        return;
    }
    if (userPhoneNo.length == 0) {
        toast("你的手机号不能为空哦~", config.toastTimeShort);
        return;
    }
    //userPhoneNo手机号
    //loginName用户名
    var params = {
        'userPhoneNo' : userPhoneNo,
        'loginName' : no
    };
    common.ajax("/teacher/resetPasswordNew", {
        params : JSON.stringify(params)
    }, function(data) {
        $("#userPhoneNo").val("");
        $("#loginName").val("");
        toast("成功...", config.toastTimeShort);

        appcan.window.alert({
            title : data.msg,
            content : data.obj,
            buttons : ['确定', '取消'],
        });
        openLogin();
    }, function(data) {
        toast(getMsgByKey("您的用户名或手机号码输入不正确哦~"), config.toastTimeShort);
    }, {
        "type" : "POST"
    });
});

function openLogin() {
    appcan.window.open({
        name : 'login',
        data : 'login.html',
    });
}

appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})    