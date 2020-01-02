appcan.ready(function() {
    getUserInfo();
    getSysInfo();
    loadData();
    //相片上传
    uexImage.onPickerClosed = function(info) {
        var obj = JSON.parse(info);
        if (!obj.isCancelled) {
            userInfo.headImgSrc = obj.data[0];
            setUserInfo(false);
            appcan.window.open("headCut", "headImgCut.html", 10);
        }

    }
});
function loadData() {
    getUserInfo();
    $("#name .value").html(userInfo.name);
    $("#nickName .value").html(userInfo.nickName);
    $("#qq .value").html(userInfo.qq);
    $("#email .value").html(userInfo.email);
    $("#mobile .value").html(userInfo.mobile);
    $("#school .value").html(userInfo.schoolName);
    $("#class .value").html(userInfo.clazzName);
	$("#headImg img").attr("src", _SERVER_ADDRESS + userInfo.photo);
    /*
	getHeadImg(function(imgPath) {
        $("#headImg img").attr("src", imgPath);
    }, function(msg) {
        toast(msg, config.toastTimeShort);
    });
	*/
}

appcan.button("#headImg", "btn-act", function() {
    appcan.frame.open("actionSheet", "user_headImg_actionSheet.html");
})

appcan.button("#nickName", "btn-act", function() {
    sysInfo.usermodifyType = 0;
    setSysInfo();
    appcan.window.open("user_modify", "user_modify.html", 10);
})
appcan.button("#qq", "btn-act", function() {
    sysInfo.usermodifyType = 1;
    setSysInfo();
    appcan.window.open("user_modify", "user_modify.html", 10);
})
appcan.button("#email", "btn-act", function() {
    sysInfo.usermodifyType = 2;
    setSysInfo();
    appcan.window.open("user_modify", "user_modify.html", 10);
})
// mobile
appcan.button("#mobile", "btn-act", function() {
    sysInfo.usermodifyType = 3;
    setSysInfo();
    appcan.window.open("user_modify", "user_modify.html", 10);
})
//上传摄像机拍摄图片
function openCamera() {
    uexCamera.cbOpen = function(opCode, dataType, data) {
        userInfo.headImgSrc = data;
        setUserInfo(false);
        appcan.window.open("headCut", "headImgCut.html", 10);
    }
    uexCamera.open();
    //关闭选择界面
    appcan.frame.close("actionSheet");
    uexWindow.evaluateScript("", 0, "isOpenSheet=false;");
}

//上传整张图片
function openfile() {
    var data = {
        min : 1,
        max : 1,
        quality : 1
    }
    var json = JSON.stringify(data);
    uexImage.openPicker(json);
    //关闭选择界面
    appcan.frame.close("actionSheet");
    uexWindow.evaluateScript("", 0, "isOpenSheet=false;");
}