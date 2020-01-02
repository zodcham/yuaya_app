appcan.ready(function() {
    getUserInfo();
    var userEmail = $.trim(userInfo.userEmail);
    $("#emailAddress").val(userEmail);

    $("#btnCancel").bind("click", function(obj) {
        appcan.window.close(-1);
    });
});

appcan.button("#applyReset", "ani-act", function() {
    //var mydate = new Date();
    //var todayStr = mydate.getFullYear() + "-" + getTwoStrByNum(mydate.getMonth() + 1) + "-" + getTwoStrByNum(mydate.getDate());
    //if(applyDate == todayStr){
    //    uexWindow.toast('0', '5', "您今天已提交过了，请进入邮箱进行操作~", config.toastTimeShort);
    //}else{
    var emailAddress = $("#emailAddress").val();
    if ('' == emailAddress) {
        uexWindow.toast('0', '5', "请输入邮箱地址~", config.toastTimeShort);
        return;
    }
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!pattern.test(emailAddress)) {
        uexWindow.toast('0', '5', "邮箱地址格式不正确~", config.toastTimeShort);
        return;
    }
    common.ajax("/user/sendResetPasswordEmail", {
        'email' : emailAddress
    }, function(data) {
        toast("邮件发送成功，请登录邮箱完成重置密码~", config.toastTimeLong);
        setTimeout(function() {
            appcan.window.close(-1);
        }, config.toastTimeLong);
    }, null, {
        type : 'GET',
        async : true,
        beforeSend : function() {
            toast("正在提交...", 0);
        }
    });
    //}
});

function getTwoStrByNum(num) {
    if (num >= 10) {
        return '' + num;
    }
    return '0' + num;
}

appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})