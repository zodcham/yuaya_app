 var _SERVER_ADDRESS="http://www.readseed.cn";
//var _SERVER_ADDRESS="http://www.readseed.cn:28080";
 // var _SERVER_ADDRESS="http://192.168.0.139:8080";
// var _SERVER_ADDRESS="http://192.168.0.128:8080/yueyafront";
// var _SERVER_ADDRESS="http://192.168.0.123:8080/yueyafront";
// var _SERVER_ADDRESS="http://lsyxp.free.ngrok.cc/yueyafront";
var _SERVER_VIDEO_ADDRESS="http://www.readseed.cn:8080";

var config={
    'serviceUrl': _SERVER_ADDRESS+"/phone",
    'currentPath':"../",
    'isMainWin':false,//当前是否为主窗口（否为浮动窗口）
    'toastTimeShort' : 1500,
    'toastTimeLong' : 3000,
    'isBack':true,/*可以返回*/
    'isNetwork':true/*是否联网*/
};
var STUDENT_SELECT = 100;
var UPDATE_INFO = 101;          //更新个人信息
/*
 * 常量
 */
var conMsg={
    "promptMsg":"暂无数据~",
    "unkownError":"发生未知错误，请重试~",
    'not_vote_self':"不能给自己点赞~",
    'old_password_wrong':"密码错误~",
    'MSG_UNKOWN_ERROR':"发生未知错误，请稍候再试！",
    'UNKOWN_ERROR': "未知错误",
    'NOT_EXISTS_LOGINNAME':"账号不存在",
    'PASSWORD_ERROR': "密码错误",
    'NO_PARAMS': "参数为空",
    'INVALID_PARAMS':"参数无效",
    'GOLD_LESS':"财富不足",
    'NOT_CHOOSE_STUDNET':"推荐任务时未选择学生",
    'NOT_EXISTS_INFO':"信息不存在",
    'FILE_UPLOAD_FAIL':"参数为空",
    'already_evaluate':"已经评价过了",
    'not_vote_self':"不能给自己点赞",
    'already_vote':"已经点过赞了",
    'exercise_over_times':"测试已超过3次",
    'student_gold_lack':"测试已超过3次, 且财富不足 ",
    'EXISTS_FAVORITE':"图书已存在收藏",
    'studentnoError':"学号不正确",
    'EXISTS_EMAIL':'邮箱已存在',
    'teacherPhoneError':"老师手机号码错误"
};

function toast(mes, t) {
    uexWindow.toast( t ? '0' : '1', '5', mes, t ? t : 0);
}
function closeToast() {
    uexWindow.closeToast();
}

var common = {
    showUnkownError : function() {
        uexWindow.toast('0', '5', conMsg.unkownError, config.toastTimeShort);
    },
    ajax : function(url, data, okFun, failFun, opt, isHideLoading) {
        var t;
        var flag = false;
        if (isHideLoading) {
            flag = true;
        }
        var option = $.extend({
            url : config.serviceUrl + url,
            type : 'GET',
            data : data,
            loadingMsg:'努力加载中...',
            dataType : 'json',
            beforeSend : function() {
                t = setTimeout(function() {
                    if (!flag) {
                      toast(option.loadingMsg, 0);
                       //myLoading.show(this.loadingMsg);
                    }
                }, 1000);
            },
            success : function(data) {
                flag = true;
                t && clearTimeout(t);
                //myLoading.close();
                  closeToast();
                if (data && data.success) {
                    okFun && okFun(data);
                } else {
                    if(failFun){
                        failFun(data);
                    }else{
                        toast(data.msg, config.toastTimeLong);
                    }
                }
            },
            error : function(e) {
                flag = true;
                t && clearTimeout(t);
                //myLoading.close();
                  closeToast();
                common.showUnkownError();
                 if(failFun){
                     failFun();
                 }
            }
        }, opt);
        uexDevice.cbGetInfo = function(opCode, dataType, data) {
            var device = eval('(' + data + ')');
            var connectStatus = device.connectStatus;
            if (connectStatus == -1) {
                config.isNetwork=false;
                toast('请检查网络', config.toastTimeLong);
                if(failFun){
                   failFun();
                }
            } else {
                config.isNetwork=true;
                appcan.ajax(option);
            }
        }
       uexDevice.getInfo('13');
      // appcan.ajax(option);
    },

    ajaxPOST: function (url, cdata, okFun, failFun) {
        $.ajax({
                url : url,
                type : 'POST',
                data : cdata,
                dataType : 'html',
                success : okFun,
                error : failFun
                //,beforeSend: LoadingOpen
                //,complete: LoadingClose
            });
        
    }

};

function LoadingOpen(){
    uexLoadingView.openCircleLoading();
    setTimeout(function(){ 
        LoadingClose();
     }, 10000);
}
function LoadingClose(){
    uexLoadingView.close();
}

var getMsgByKey=function(key){
        if (!conMsg[key]) {
            return key;
        }
        return conMsg[key];
};

/*
 * 在元素中显示提示消息
 */
var myPrompt=(function(){
    var prompt={
        'id':"public_PromptInfo",
        show:function(value,el,icon){
                if ($("#"+prompt.id).length) {
                    return;
                }
                var div_box = $("<div id='"+prompt.id+"' class='ub ub-ver ub-ac ub-pc' style='position: absolute;width:100%;height:100%;left:0;top:0;z-index:9999999'></div>");
                var icon_box = $("<div class='ub ub-ac ub-pc'></div>")
                var icon = $("<div id='info_Icon' class='ub' style='background:url(../css/image1/ico_wuhaoyou@2x_03-03.png) no-repeat;background-size:100% 100%;width:6em;height:6em'></div>");
                icon.css("background");
                var msg = $("<div class='ub ub-ac ub-pc umar-t umar-l' ><span id='info_Msg' class='sc-text'>" + (value || conMsg.promptMsg) + "</span></div>");
                var line = $("<div class='ub' style='min-height: 4em;'></div>");
                icon_box.append(icon);
                div_box.append(icon_box);
                div_box.append(msg);
                div_box.append(line);
                // var con = "<div id='"+prompt.id+"' class='ub ub-ver ub-ac ub-pc' style='position: absolute;width:100%;height:100%;left:0;top:0;z-index:9999999'>";
                    // con += "<div class='ub ub-ac ub-pc'><div id='info_Icon' class='ub' style='background:url(../css/image1/ico_wuhaoyou@2x_03-03.png) no-repeat;background-size:100% 100%;width:6em;height:6em'></div></div>";
                    // con += "<div class='ub ub-ac ub-pc umar-t umar-l' ><span id='info_Msg' class='sc-text'>" + (value || conMsg.promptMsg) + "</span></div>";
                    // con += "<div class='ub' style='min-height: 4em;'></div>";
                    // con += "</div>";
                $( el ? el : "body").prepend(div_box);
        },
        hide:function(){
            if ($("#"+prompt.id).length) {
                $("#"+prompt.id).remove();
            }
        }   
    }
    return prompt;
})();

var myLoading=(function(){
    var loading={
        'winName':'myLoading',
        show:function(title){
            if(config.isMainWin){
                config.isBack=false;
                uexWindow.openPopover(loading.winName,0,config.currentPath+"loading.html","",0,0,'','','',0);
                setTimeout(function(){
                    uexWindow.bringPopoverToFront(loading.winName);
                    if(title&&title.length>0){
                        uexWindow.evaluatePopoverScript("",loading.winName,"setTitle('"+title+"');");
                    }
                },200);
            }else{
                uexWindow.evaluateScript("", 0, "config.isMainWin=true;myLoading.show();");
            }
           
        },
        setTitle:function(title){
             if(config.isMainWin){
                  uexWindow.evaluatePopoverScript("",loading.winName,"setTitle('"+title+"');");
             }else{
                 uexWindow.evaluateScript("", 0, "config.isMainWin=true;myLoading.setTitle('"+title+"');");
             }
        },
        close:function(){
            if(config.isMainWin){
                config.isBack=true;
                uexWindow.closePopover(loading.winName);
            }else{
                uexWindow.evaluateScript("", 0, "config.isMainWin=true;myLoading.close();");
            }
        }
    }
    return loading;
})();

var getDic=function(){
    // grade：年级，  book_category：图书分类， language：语言
    var params={"type": "grade"} ;
    common.ajax("/common/dict/getDictList", {
       params:JSON.stringify(params)
    }, function(data) {
        //[{value:数据值, label;标签名, type:类型},..]
    }, function(data){
        toast(getMsgByKey(data.msg),config.toastTimeShort);
    });
};

var getBookInfoById=function(userId,bookId,okFun,failFun){
    var params={ 'userId' : userId,'bookId' : bookId};
        common.ajax("/student/book/get", {
           params:JSON.stringify(params)
        }, function(data) {
             okFun && okFun(data.obj);
        }, function(data){
            if(failFun){
               failFun(data);
            }else{
                toast(getMsgByKey(data.msg),config.toastTimeShort);
            }
        },null);
};
var getProgramInfoById=function(programId,okFun,failFun){
    var params={ 'programId' : programId};
        common.ajax("/program/get", {
           params:JSON.stringify(params)
        }, function(data) {
             okFun && okFun(data.obj);
        }, function(data){
            if(failFun){
               failFun(data);
            }else{
                toast(getMsgByKey(data.msg),config.toastTimeShort);
            }
        },null);
};
//下载头像
function downloadHeadImg(okFun, failFun)
{
    if(userInfo.photo.length > 0){
        var imgSavePath = "wgt://headImg/"+userInfo.id+"/";
        var downloadPath = getHeadImageUrl(userInfo.photo);
        var imgName = getFileName(downloadPath);
        imgSavePath += (new Date().getTime() + "-" + imgName);
        var downloader = uexDownloaderMgr.create();
        if(!downloader){
            failFun.call(this, "获取头像失败~");
            return;
        }
        uexDownloaderMgr.download(downloader,downloadPath, imgSavePath,0, 
             function(fileSize, percent, status){
                  switch (status) {
                      case 0:
                          //document.getElementById('percentage').innerHTML = "文件大小:" + fileSize + "字节<br>下载进度:" + percent;
                          return;
                      break;
                      case 1:
                          getHeadImg(okFun, failFun);
                      break;
                      case 2:
                         failFun.call(this, "获取头像失败~");
                      break;
                  }                  
        });
    }
}

//获取文件名
function getFileName(filePath){
    var pos=filePath.lastIndexOf("/");
    return filePath.substring(pos + 1);  
}

//获取头像
function getHeadImg(okFun, failFun) 
{
    var imgSavePath = "wgt://headImg/"+userInfo.id+"/";
    var downloadPath = getHeadImageUrl(userInfo.photo);
    var imgName = getFileName(downloadPath);
    
    var ret = uexFileMgr.getFileListByPath(imgSavePath);
     if (ret && ret.values && ret.values.length > 0) {
         var isDownloadImg = true;
        for (var i = 0 ; i < ret.values.length ; i ++) {
            var obj = ret.values[i].nameValuePairs;
            if (obj.fileType == "0") {
                isDownloadImg = false;
                okFun.call(this,obj.filePath);
            }
        }
        
        if (isDownloadImg) {
            downloadHeadImg(okFun, failFun);
        }
    }else {
         //下载头像
         downloadHeadImg(okFun, failFun);
    }
}

/**
 *清除头像图片文件
 * callBack：清除头像成功后的回调方法
 * */
function clearHeadImg(okFun, failFun) 
{
    var imgSavePath = "wgt://headImg/"+userInfo.id+"/";
    var ret = uexFileMgr.getFileListByPath(imgSavePath);
    if (ret) {
        for (var i = 0 ; i < ret.values.length ; i ++) {
            var obj = ret.values[i].nameValuePairs;
            if (obj.fileType == 0) {
                var result = uexFileMgr.deleteFileByPath(obj.filePath);
            }
        }
    }
   
    okFun.call(this,"成功"); 
}

//获取头像地址
function getHeadImageUrl(url)
{
    if (url && url.length > 0){
         if (url.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i) == null) {
            return  _SERVER_ADDRESS + url;
         }
         else
         {
             return url;
         }
    }else {
        return "../head.png";
    }
}

//加载积分和财富值
function loadGlod(userId,callBack){
   var params = {
            'userId':userId
    };
    common.ajax("/student/scoreLog/getGoldScore", {
           params:JSON.stringify(params)
        }, function(data) { 
            if (userInfo != null) {
                userInfo.goldCount = data.obj.goldCount;
                userInfo.scoreCount = data.obj.scoreCount;
                setUserInfo(true);
            }
            if (callBack != null) {
                callBack.call(this,data.obj.goldCount,data.obj.scoreCount);
            }
        },function(data){
        toast(getMsgByKey(data.msg),config.toastTimeShort);
    });
}

//验证登录
var validLogin = function(okFun,failFun) {
    if (!userInfo || userInfo.loginName.length == 0 || userInfo.password.length == 0) {
        if (failFun) {
            failFun.call(this,"登录失败");
        }
    }else {
        var params = {
                'username':userInfo.loginName,
                'mpassword':userInfo.password
        };
        common.ajax("/student/login", {
               params:JSON.stringify(params)
            }, function(data) {
                userInfo=data.obj;
                setUserInfo(true);
                if (okFun) {
                    okFun.call(this,"登录成功");
                }
            },function(data){
                if (failFun) {
                    failFun.call(this,"登录失败");
                }
            },{"type":"POST"});
    }
    
};

//获取字典
var getDic = function(type,okFun,failFun) {
    // grade：年级，  book_category：图书分类， language：语言
    var params={"type": "grade"} ;
    common.ajax("/common/dict/getDictList", {
       params:JSON.stringify(params)
    }, function(data) {
        okFun.call(this,data);
        
    }, function(data){
        failFun.call(this,data);
        toast(getMsgByKey(data.msg),config.toastTimeShort);
    });
};




