/**
 * localStorage保存数据
 * @param String key  保存数据的key值
 * @param String value  保存的数据
 */
function setLocVal(key, value) {
    window.localStorage[key] = value;
}

/**
 * 根据key取localStorage的值
 * @param Stirng key 保存的key值
 */
function getLocVal(key) {
    if (window.localStorage[key])
        return window.localStorage[key];
    else
        return "";
}

/**
 * 清除缓存
 * @param Striong key  保存数据的key，如果不传清空所有缓存数据
 */
function clearLocVal(key) {
    if (key)
        window.localStorage.removeItem(key);
    else
        window.localStorage.clear();
}

var locKey={
    'sysInfo':"sysInfo",
    'userInfo':'userInfo',
    'bookInfo':'bookInfo',
    'programIn':'programInfo',
    'commInfo':'commInfo'
}

//系统属性
var sysInfo={};
function getDefaultSysInfo(){
    sysInfo={
        //是否第一次进入
        'isFirstInto':true,
        'phoneType':"",
        'type':'',
        //是否添加分布
        'isAddDistribute':false,
        //APP版本
        'appVersion':'',
        'appId':'',
        'noUpdateVersion':'',
        'updateInfo':'',
        'titleHeight':'',
        'ranking':'',
        'report':'',
        //推荐序号
        'recommendNO':0,
        //推荐时间
        'recommendDate':''
    };
}
getDefaultSysInfo();
function getSysInfo()
{
     var locData=getLocVal(locKey.sysInfo);
     if(locData.length>0){
        sysInfo=$.extend(sysInfo,JSON.parse(locData));
     }else{
        getDefaultSysInfo();
     }
}

function setSysInfo(){
     setLocVal(locKey.sysInfo,JSON.stringify(sysInfo));
}
function clearSysInfo(){
     clearLocVal(locKey.sysInfo);
}

//用户属性
var userInfo={};
function getDefaultUserInfo(){
    userInfo={
        'clazzId': "",
        'clazzIds': "",
        'clazzName': "",
        'email': "",
        'goldCount': 0,
        'grade': "",
        'gradeName': "",
        'id': "",
        'loginDate': "",
        'loginFlag': "",
        'loginIp': "",
        'loginName': "",
        'mobile': "",
        'name': "",
        'nickName': "",
        'oldLoginDate': "",
        'oldLoginIp': "",
        'password': "",
        'phone': "",
        'photo': "",
        'qq': "",
        'readBookCount': 0,
        'readLevelId': "",
        'readLevelName': "",
        'readWordCount': 0,
        'remarks': "",
        'schoolId': "",
        'schoolName': "",
        'scoreCount': 0,
        'sex': "",
        'studentNo': "",
        'teacher': false,
        'headImgSrc':""             
    };
}
getDefaultUserInfo();
function getUserInfo(){
     var locData = getLocVal(locKey.userInfo);
     if(locData.length > 0){
        userInfo = $.extend(userInfo,JSON.parse(locData));
     }else{
       getDefaultUserInfo();
     }
}

function setUserInfo(isRefreshPerson){
     var locData=getLocVal(locKey.userInfo);
     if(locData.length > 0){
        var oldUserInfo = JSON.parse(locData);
        if (oldUserInfo.phone != userInfo.phone) {
            clearHeadImg(function(msg){
                
            },function(msg){
                
            });
        }
     }
     setLocVal(locKey.userInfo,JSON.stringify(userInfo));
     //广播
     if (isRefreshPerson) {
        appcan.window.publish(UPDATE_INFO, "0");
     }
}


function clearUserInfo(){
     clearLocVal(locKey.userInfo);
}

var bookInfo={};
function getDefaultBookInfo(){
    bookInfo={
        'id':'',
        'isNewRecord':false,
        'createDate':'',
        'updateDate':'',
        'name':'',
        'author':'',
        'score':'',
        'bookCategory':'',
        'grade':'',
        'wordCount':'',
        'publisher':'',
        'pageCount':'',
        'isbn':'',
        'image':'',
        'price':'',
        'language':'',
        'readGuide':'',
        'hits':'',//点击数
        'favTimes':'',
        'recommendTimes':'',
        'evaluateTimes':'',
        'exerciseTimes':'',
        'evaluateScore':'',
        'evaluateAvgScore':'',
        'exercisePassTimes':'',
        'bookCategoryName':'',
        'languageName':'',
        'gradeName':'',
        'isFavorite':'0',//(0:未收藏, 1:已收藏)，
        'isPass':'0',//(0:未认证, 1:已认证)
        'chooseStudent':'' ,
        'readFeeling':'',
        'programId':'', //领读ID
        'audioFile':'', //音频文件url
        'posterImagePath':'', //音频图片url
        'videoFile':'', //导读视频文件url
        'videoFile2':'' //导读高清视频文件url
    }
}
getDefaultBookInfo();
function getBookInfo(){
     var locData=getLocVal(locKey.bookInfo);
     if(locData.length>0){
        bookInfo=$.extend(bookInfo,JSON.parse(locData));
     }else{
       getDefaultBookInfo();
     }
}

function setBookInfo(){
     setLocVal(locKey.bookInfo,JSON.stringify(bookInfo));
}

//栏目
var programInfo={};
function getDefaultProgramInfo(){
    programInfo={
        'id':'',
        'isNewRecord':false,
        'createDate':'',
        'updateDate':'',
        'name':'',
        'author':'',
        'score':'',
        'bookCategory':'',
        'grade':'',
        'wordCount':'',
        'publisher':'',
        'pageCount':'',
        'isbn':'',
        'createBy':'',        
        'image':'',
        'price':'',
        'language':'',
        'chooseVideoPath':'',
        'chooseAudioPath':'',
        'readGuide':'',//阅读指导
        'introduce':'',//外链视频
        'hits':'',//点击数
        'favTimes':'',
        'recommendTimes':'',
        'evaluateTimes':'',
        'exerciseTimes':'',
        'evaluateScore':'',
        'evaluateAvgScore':'',
        'exercisePassTimes':'',
        'bookCategoryName':'',
        'languageName':'',
        'gradeName':'',
        'isFavorite':'0',//(0:未收藏, 1:已收藏)，
        'isPass':'0',//(0:未认证, 1:已认证) 
        'readFeeling':'',
        'studentChecked':{}
    }
}
getDefaultProgramInfo();
function getProgramInfo(){
     var locData=getLocVal(locKey.programInfo);
     if(locData.length>0){
        programInfo=$.extend(programInfo,JSON.parse(locData));
     }else{
       getDefaultProgramInfo();
     }
}

function setProgramInfo(){
     setLocVal(locKey.programInfo,JSON.stringify(programInfo));
}

function clearProgramInfo(){
     clearLocVal(locKey.programInfo);
}

//公共参数
var commInfo={};
function getDefaultCommInfo(){
    commInfo={
       'recommendId':'',//推荐Id
       'mallSearch':'',//查询参数
       'usermodifyType':'',//修改个人信息类型
       'grade':'',
       'book_category':'',
       'recommendLevel':'',
       'finishState':'',
       'studentId':'',
       'mallId':'',
       'mallName':'',
       'activityId':'',
       'activityAddress':''
    }
}
getDefaultCommInfo();
function getCommInfo(){
     var locData=getLocVal(locKey.commInfo);
     if(locData.length>0){
        commInfo = $.extend(commInfo,JSON.parse(locData));
     }else{
       getDefaultCommInfo();
     }
}

function setCommInfo(){
     setLocVal(locKey.commInfo,JSON.stringify(commInfo));
}

function clearCommInfo(){
     clearLocVal(locKey.commInfo);
}

