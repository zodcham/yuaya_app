appcan.ready(function() {
    getUserInfo();
    getSysInfo();
    loadData();

    AddLogContent(userInfo.id, logKeys.PersonEnter,{});

    //相片上传
    uexImage.onPickerClosed = function(info) {
        var obj = JSON.parse(info);
        if (!obj.isCancelled) {
            userInfo.headImgSrc = obj.data[0];
            setUserInfo(false);
            appcan.window.open("headCut", "headImgCut.html", 5);
        }

    }
    //公共馆读者，可以修改姓名，在姓名右边加箭头
    if(userInfo.type==3){
        $("#name .fa").addClass(" icon-angle-right fa-2x sc-text").html("");
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
    // 等级数据
    $(".readLevelName").html(userInfo.readLevelName);
    $("#headImg img").attr("src", _SERVER_ADDRESS + userInfo.photo);
    /*
     getHeadImg(
     function(imgPath)
     {
     $("#headImg img").attr("src",imgPath);
     },
     function(msg)
     {
     toast(msg,config.toastTimeShort);
     }
     );
     */
}

//头像
appcan.button("#headImg", "btn-act", function() {
    appcan.frame.open("actionSheet", "user_headImg_actionSheet.html");
})
//公共馆读者，可以修改姓名
appcan.button("#name", "btn-act", function() {
    if(userInfo.type==3){
        sysInfo.usermodifyType = -1;
        setSysInfo();
        appcan.window.open("user_modify", "user_modify.html", 5);
    }
})
//昵称
appcan.button("#nickName", "btn-act", function() {
    sysInfo.usermodifyType = 0;
    setSysInfo();
    appcan.window.open("user_modify", "user_modify.html", 5);
})
//等级
appcan.button("#grade", "btn-act", function() {

    appcan.window.open("user_grade", "user_grade.html", 5);
})
//QQ
appcan.button("#qq", "btn-act", function() {
    sysInfo.usermodifyType = 1;
    setSysInfo();
    appcan.window.open("user_modify", "user_modify.html", 5);
})
//邮箱
appcan.button("#email", "btn-act", function() {
    sysInfo.usermodifyType = 2;
    setSysInfo();
    appcan.window.open("user_modify", "user_modify.html", 5);
})
//手机号码：studetPhone
appcan.button("#mobile", "btn-act", function() {
    sysInfo.usermodifyType = 3;
    setSysInfo();
    appcan.window.open("user_modify", "user_modify.html", 5);
})
// 成就
appcan.button("#achievement", "btn-act", function() {

    appcan.window.open("user_achievement", "user_achievement.html", 5);
})
//拍照--上传摄像机拍摄图片
function openCamera() {
    uexCamera.cbOpen = function(opCode, dataType, data) {
        userInfo.headImgSrc = data;
        setUserInfo(false);
        appcan.window.open("headImgCut", "headImgCut.html", 5);
    }
    uexCamera.open();
    //关闭选择界面
    appcan.frame.close("actionSheet");
    uexWindow.evaluateScript("", 0, "isOpenSheet=false;");
}

//从相册中选择相片--上传整张图片
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
