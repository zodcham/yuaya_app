appcan.ready(function() {
    getUserInfo();

});
appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})
appcan.button("#applyReset", "ani-act", function() {

    var Pass1 = $("#Pass1").val();
    var Pass2 = $("#Pass2").val();
    if ('' == Pass1) {
        uexWindow.toast('0', '5', "请输入新密码~", config.toastTimeShort);
        return;
    }
    if (Pass2 != Pass1) {
        uexWindow.toast('0', '5', "两次密码不一致~", config.toastTimeShort);
        return;
    }
    var params = {
        'userId' : userInfo.id,
        'userPhoneNo' : Pass1
    };
    common.ajax("/user/sendResetPasswordEmail", {
        'email' : emailAddress
    }, function(data) {
        toast("", config.toastTimeLong);
        appcan.window.alert({
            title : "操作成功",
            content : "完成重置密码~",
            buttons : ['确定', '取消'],
        });
        openLogin();
        setTimeout(function() {
            appcan.window.close(-1);
        }, config.toastTimeLong);
        // toast("密码已修改，请重新登录~",config.toastTimeShort);
        // setTimeout(function(){
        // clearCommInfo();
        // getDefaultUserInfo();
        // setUserInfo(false);
        // appcan.window.open("login","login.html",10);
        // },config.toastTimeShort-500);
    }, null, {
        type : 'GET',
        async : true,
        beforeSend : function() {
            toast("正在提交...", 0);
        }
    });

});

function openLogin() {
    appcan.window.open({
        name : 'login',
        data : 'login.html',
    });
}
