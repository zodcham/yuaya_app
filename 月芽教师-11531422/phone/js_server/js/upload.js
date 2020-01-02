
var isCheck = false;
var showToast = false;
var version;

var getWidgetInfo = function(){
    getSysInfo();
    // 获取系统 应用信息 start
    uexWidgetOne.cbGetCurrentWidgetInfo = cbGetWidgetInfo;
    if (sysInfo.phoneType && sysInfo.phoneType.length > 0) {
        uexWidgetOne.getCurrentWidgetInfo();
    } else {
        uexWidgetOne.cbGetPlatform = cbGetPlatform;
        uexWidgetOne.getPlatform();
    }
};

var checkUpload = function(isShowToast) {
    showToast = isShowToast;
    if (showToast) {
        toast("检查最新版本中",config.toastTimeShort);
    }
    isCheck = true;
    if (version) {
        checkVersion();
    }else {
        getWidgetInfo();
    }
    
};

 //获取操作系统类型
var cbGetPlatform = function (opId, dataType, data) {
    sysInfo.phoneType = data;
    setSysInfo();
    uexWidgetOne.cbGetCurrentWidgetInfo = cbGetWidgetInfo;
    uexWidgetOne.getCurrentWidgetInfo();
};


// 获取当前系统版本信息
var cbGetWidgetInfo = function (opId, dataType, data) {
    var obj = null;
    if (sysInfo.phoneType == '1') {
        obj = JSON.parse(data);
    } else if (sysInfo.phoneType == '0') {
        obj = JSON.parse(data.toString());
    }
    sysInfo.appId = obj.appId;
    sysInfo.appVersion = obj.version;
    version = obj.version;
    setSysInfo();
    checkVersion();
    if (callWidgetInfo) {
        callWidgetInfo(version);
    }
};



function checkVersion() {
    if (isCheck) {
        if(sysInfo.phoneType == "1") {
            //'1':'Android', '0':'IOS'
            var params={ 'version' : version,'phoneType' : "1","userType":"teacher"};//teacher
            common.ajax("/systemCheck/checkVersion", {
               params:JSON.stringify(params)
            }, function(data) {
                isCheck = false;
                if (data.obj.isneedupdate == "Y"){
                    sysInfo.updateInfo = data.obj;
                    setSysInfo();
                    appcan.window.open("update","update.html",0,256,0,0);
                }else {
                    if (showToast) {
                        toast("已是最新版本",config.toastTimeShort);
                    }
                }
            }, function(data){
                isCheck = false;
                if (showToast) {
                    toast(getMsgByKey(data.msg),config.toastTimeShort);
                }
            });
        }
    }
}

function checkVersion_new() {
    if (isCheck) {
        if(sysInfo.phoneType == "1") {
            //'1':'Android', '0':'IOS'
            var params={ 'version' : version,'phoneType' : "1","userType":"teacher"};//teacher
            common.ajax("/systemCheck/checkVersion", {
               params:JSON.stringify(params)
            }, function(data) {
                isCheck = false;
                if (data.obj.isneedupdate == "Y"){
                    sysInfo.updateInfo = data.obj;
                    setSysInfo();
                    appcan.window.open("update","update.html",0,256,0,0);
                }else {
                    if (showToast) {
                        toast("已是最新版本",config.toastTimeShort);
                    }
                }
            }, function(data){
                isCheck = false;
                if (showToast) {
                    toast(getMsgByKey(data.msg),config.toastTimeShort);
                }
            });
        }
        // else{
            // var params={ 'version' : version,'phoneType' : "0","userType":"student"};//teacher
            // common.ajax("/systemCheck/checkVersion", {
               // params:JSON.stringify(params)
            // }, function(data) {
                // isCheck = false;
                // if (data.obj.isneedupdate == "Y"){
//                     
                    // sysInfo.updateInfo = data.obj;
                    // setSysInfo();
                    // alert("最新版本才能正常使用，谢谢。");
//                     
                    // clearCommInfo();
                    // getDefaultUserInfo();
                    // setUserInfo(false);
//                     
                    // uexWidget.loadApp("itms://itunes.apple.com/cn/app/id1178277208?mt=8");
//          
                   // /*
                   // appcan.window.open("login","login.html",10,4);
                                      // appcan.window.evaluateScript({
                                                   // name : "index", //绐楀彛鍚嶇О
                                                   // scriptContent : 'appcan.window.close(5);'
                                           // });
                                           // */
//                    
                    // //appcan.window.open("update","update.html",0,256,0,0);
                // }else {
                    // //if (showToast) {
                    // //    toast("已是最新版本",config.toastTimeShort);
                    // //}
                // }
            // }, function(data){
                // isCheck = false;
                // if (showToast) {
                    // toast(getMsgByKey(data.msg),config.toastTimeShort);
                // }
            // });
        // }
    }
}


