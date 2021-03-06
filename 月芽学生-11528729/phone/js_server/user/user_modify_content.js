appcan.ready(function() {
    getUserInfo();
    getSysInfo();
    switch(sysInfo.usermodifyType) {
    case -1:
        $("#itValue").attr("placeholder", "请输入您的姓名");
        $("#itValue").val(userInfo.name);
        break;
    case 0:
        $("#itValue").attr("placeholder", "请输入昵称");
        $("#itValue").val(userInfo.nickName);
        break;
    case 1:
        $("#itValue").attr("placeholder", "请输入QQ");
        $("#itValue").val(userInfo.qq);
        break;
    case 2:
        $("#itValue").attr("placeholder", "请输入邮箱");
        $("#itValue").val(userInfo.email);
        break;
    case 3:
        $("#itValue").attr("placeholder", "请输入手机号码");
        $("#itValue").val(userInfo.mobile);
        break;
    }
});

appcan.button("#btnSubmit", "btn-act", function() {
    var str = $("#itValue").val();
    var params = {
        'userId' : userInfo.id
    };
    if(userInfo.type==3){
        params = {
            'userId' : userInfo.id,"type":"updateName"
        };
    }
    switch(sysInfo.usermodifyType) {
    case -1:
        if (/['"#$%&\^*]/.test(str)) {
            toast("姓名不能包含特殊字符哦~", config.toastTimeShort);
            return;
        }
        params.name = str;
        break;
    case 0:
        if (/['"#$%&\^*]/.test(str)) {
            toast("昵称不能包含特殊字符哦~", config.toastTimeShort);
            return;
        }
        params.nickName = str;
        break;
    case 1:
        if (!/^\d{5,12}$/.test(str)) {
            toast("QQ不正确哦~", config.toastTimeShort);
            return;
        }
        params.qq = str;
        break;
    case 2:
        if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str)) {
            toast("邮箱不正确哦~", config.toastTimeShort);
            return;
        }
        params.email = str;
    case 3:
        if (str.length<11) {
            toast("手机号码不正确！", config.toastTimeShort);
            return;
        }
        if (!/^[1][0-9][0-9]{9}$/.test(str)) {
            toast("手机号码不正确！", config.toastTimeShort);
            return;
        }
        params.mobile = str;
        break;
    }
    common.ajax("/student/updateInfo", {
        params : JSON.stringify(params)
    }, function(data) {
        toast("保存成功~", config.toastTimeShort);
        setTimeout(function() {
            switch(sysInfo.usermodifyType) {
            case -1:
                AddLogContent(userInfo.id, logKeys.PersonNameSuccess,{});
                userInfo.name = str;
                break;
            case 0:
                AddLogContent(userInfo.id, logKeys.PersonNicknameSuccess,{});
                userInfo.nickName = str;
                break;
            case 1:
                AddLogContent(userInfo.id, logKeys.PersonQQSuccess,{});
                userInfo.qq = str;
                break;
            case 2:
                AddLogContent(userInfo.id, logKeys.PersonEmailSuccess,{});
                userInfo.email = str;
            case 3:
                AddLogContent(userInfo.id, logKeys.PersonMobileSuccess,{});
                userInfo.mobile = str;
                break;
            }
            setUserInfo(true);
            appcan.window.evaluateScript({
                name : "user_info", //窗口名称
                scriptContent : 'reload();'
            });
            appcan.window.evaluateScript({
                name : "user_center", //窗口名称
                scriptContent : 'reload();'
            });
            uexWindow.evaluateScript("", 0, "exit()");
        }, config.toastTimeShort - 500);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
})