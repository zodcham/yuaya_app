var _WECHATSHOP_URL='https://weidian.com/item.html?itemID=2758580274&wfr=ewmdt&source=goods_add_success&ifr=itemdetail&sfr=app';

//一月
var _WECHATSHOP_URL30='https://weidian.com/item.html?itemID=2768267214&wfr=ewmdt&source=goods_add_success&ifr=itemdetail&sfr=app';

//一季度
var _WECHATSHOP_URL90='https://weidian.com/item.html?itemID=2767663451&wfr=ewmdt&source=goods_add_success&ifr=itemdetail&sfr=app';

//半年
var _WECHATSHOP_URL180='https://weidian.com/item.html?itemID=2768276904&wfr=ewmdt&source=goods_add_success&ifr=itemdetail&sfr=app';

//一年
var _WECHATSHOP_URL360='https://weidian.com/item.html?itemID=2758580274&wfr=ewmdt&source=goods_add_success&ifr=itemdetail&sfr=app';


//经验
var EXP_LOGIN = '017afb55e4d442feac823825498ed2e4';//每天登录APP
var EXP_SIGN = 'eb202e0b2e8b4102bd4ff0ce4cefc9fe';//每天签到
var EXP_SIGN_3 = 'f691308fe9994da88f07853c1ec6c1d3';//连续签到3天
var EXP_SIGN_5 = '3ea33a56d30646b08d0dcf79728a6bb8';//连续签到5天
var EXP_SIGN_10 = 'd1d2c4e11585403cba0e773aa8b13697';//连续签到10天
var EXP_SIGN_20 = 'a3b0f77f91114b5b914da309738f5ac0';//连续签到20天
var EXP_SIGN_30 = '6e82a8cb85d44dfb80a246eba4a885a5';//连续签到30天
var EXP_SIGN_SHARE = 'a5a5028238ed4d069e02da7305a3fa3d';//分享签到给好友每日上限10次
var EXP_SIGN_SHARE_QUAN = '43d09e7fc26d40639f2bb98ae724c990';//分享签到到朋友圈每日限1次
var EXP_SIGN_SHARE_CLASS = 'b1c43b55c4864fe9b171d79eee43af4e';//分享班级签到排行给好友每天限5次
var EXP_SIGN_SHARE_CLASS_QUAN = 'ae89310d3cd04be8a9dcc175b9d1866b';//提醒好友签到每天限3次
var EXP_SIGN_ASK_CLASSMATE = '3570b8b1119543eeb72ee4ac694c2fd3';//测评，取前三次成绩最高分正确率*书本的积分*10
var EXP_SHARE_RANK = '44232ba5af6c461c95969c51e1cb6f31';//分享本班测评排行每日限1次
var EXP_SHARE_TEST = '5e8a4871d86c4b46aeeffdbda9abff21';//分享本次测评结果每本限1次
var EXP_WRITE_REVIEW = 'a1d82f491b7c43c9b9965f3beb21f525';//提交不少于50字的读后感每本书限1篇
var EXP_REVIEW_LEVEL4 = '6a921ac2c67a45a4981886bcafa49de3';//读后感被教师评为 优秀每本书限1次
var EXP_REVIEW_LEVEL3 = 'fbfffed36a414102881ec2d95587cca3';//读后感被教师评为 良好每本书限1次
var EXP_REVIEW_LEVEL2 = '5c34cc58eb2d474484131a146f1bba4c';//读后感被教师评为 合格每本书限1次
var EXP_REVIEW_LEVEL1 = '6174b4c4744645baa8d1ffab164d4079';//读后感被教师评为 再接再厉每本书限1次
var EXP_REVIEW_LIKE = 'e58ab0bfbdd74422ba1356ff09a41bf3';//读后感被同学点赞每篇上限10次
var EXP_REVIEW_COMMENT = '63d417f0d86c4feca41715849c22f0fa';//给别人的读后感写评论每日上限10次
var EXP_POEM_READ = '1226faf836be4c3ea6abfb2c8340df6a';//读诗每日上限10次
var EXP_POEM_SHARE = '09cdc0c808e14c86aa47e70d83342892';//读诗分享给好友每日上限10次
var EXP_READ_VIDEO = '063fa3b80766490badab84ad66c45c65';//完整观看导读视频每日上限10次
var EXP_READ_PPT = 'f3751f5706804d34a7952ffe86873970';//观看整本书课程、PPT每日上限10次


//用户日志行为
var logKeys={
    "OpenApp":1, //打开APP  - 登录
    "LoginSuccess":2, //登录成功  - 登录
    "LoginFailed":3, //登录失败  - 登录
    "LoginScanSuccess":4, //扫码登录成功  - 登录
    "LoginScanFailed":5, //扫码登录失败  - 登录
    "RegScanSuccess":6, //扫描注册成功  - 注册
    "FindPasswordSuccess":7, //找回密码成功  - 找回密码
    "SignSuccess":8, //签到成功  - 签到
    "SignFailed":9, //签到失败  - 签到
    "SignReadDetail":10, //查看签到详情  - 签到
    "SignReadToday":11, //查看签到今日排行  - 签到
    "SignReadMonth":12, //查看签到月排行  - 签到
    "SignReadAll":13, //查看签到总排行  - 签到
    "SignShareToWeixin":14, //分享签到图给好友成功  - 签到
    "SignShareToWinxinQuan":15, //分享签到图给好友失败  - 签到
    "BookOpenMall":16, //浏览书城  - 图书
    "BookLibType":17, //浏览书城-选择分类  - 图书
    "BookLibGrade":18, //浏览书城-选择年级  - 图书
    "BookLibSearch":19, //搜索图书  - 图书
    "BookOpenDetail":20, //查看图书详情  - 图书
    "BookReadCover":21, //查看图书封面  - 图书
    "BookPPTStart":22, //浏览领读开始  - 图书
    "BookPPTEnd":23, //浏览领读结束  - 图书
    "BookVideoStart":24, //查看视频开始  - 图书
    "BookVideoEnd":25, //查看视频结束  - 图书
    "BookAudioStart":26, //收听音频开始  - 图书
    "BookAudioEnd":27, //收听音频结束  - 图书
    "BookAddToShelf":28, //加入书架  - 图书
    "BookReviewList":29, //查看读后感列表  - 图书
    "BookReviewDetail":30, //查看读后感详情  - 图书
    "BookReviewLike":31, //给读后感点赞  - 图书
    "BookReviewAddComment":32, //给读后感写评论  - 图书
    "BookReviewWriteSuccess":33, //写读后感成功  - 图书
    "PersonMyFriendsInfo":34, //查看同学信息  - 个人信息
    "HomeMyBookShelf":35, //查看我的书架  - 首页
    "HomeMyTask":36, //查看我的任务  - 首页
    "HomeReadNews":37, //查看新闻  - 首页
    "HomeTestList":38, //查看测评记录  - 首页
    "HomeMall":39, //查看财富商城  - 首页
    "HomeReadReport":40, //查看阅读报告  - 首页
    "MallBuyGift":41, //兑换礼品  - 商城
    "MallBuyHistory":42, //查看兑换历史  - 商城
    "TestStart":43, //测评开始  - 测评
    "TestEnd":44, //测评提交成功  - 测评
    "Report":45, //查看基本情况  - 阅读报告
    "ReportAbility":46, //查看阅读能力  - 阅读报告
    "ReportReadTasks":47, //查看阅读任务  - 阅读报告
    "ReportMyBooks":48, //查看书单  - 阅读报告
    "ReportMyReviews":49, //查看读后感  - 阅读报告
    "NewsDetail":50, //查看新闻  - 新闻
    "NewsLike":51, //给新闻点赞  - 新闻
    "PPTOpenIndex":52, //查看课程领读详情  - 课程领读
    "PPTChangeGrade":53, //查看分类  - 课程领读
    "SharingCountry":54, //查看全国  - 互动分享
    "SharingGrade":55, //查看年级  - 互动分享
    "SharingSchool":56, //查看学校  - 互动分享
    "SharingCity":57, //查看本市  - 互动分享
    "SharingSuccess":58, //分享成功  - 互动分享
    "SharingDetail":59, //查看分享内容  - 互动分享
    "SharingLike":60, //给分享内容点赞  - 互动分享
    "SharingWriteSuccess":61, //给分享写评论  - 互动分享
    "SharingToWeixinSuccess":62, //转发微信好友成功  - 互动分享
    "SharingToWeixinFailed":63, //转发微信好友失败  - 互动分享
    "SharingToWeixinQuanSuccess":64, //转发朋友圈成功  - 互动分享
    "SharingToWeixinQuanFailed":65, //转发朋友圈失败  - 互动分享
    "ClubEnter":66, //进入公会  - 社区
    "ClubThreadAddSuccess":67, //写主题成功  - 社区
    "ClubThreadReplySuccess":68, //回复主题成功  - 社区
    "ClubPostsReplySuccess":69, //回复帖子成功  - 社区
    "ClubClearThread":70, //清空自己的主题内容  - 社区
    "ClubClearReply":71, //清空自己的回复内容  - 社区
    "RankClass":72, //查看班级排行  - 排行
    "RankGrade":73, //查看年级排行  - 排行
    "RankSchool":74, //查看学校排行  - 排行
    "RankAll":75, //查看平台排行  - 排行
    "PersonEnter":76, //进入个人中心  - 个人信息
    "PersonPhotoSuccess":77, //修改头像成功  - 个人信息
    "PersonNameSuccess":78, //修改姓名成功  - 个人信息
    "PersonNicknameSuccess":79, //修改昵称成功  - 个人信息
    "PersonQQSuccess":80, //修改QQ成功  - 个人信息
    "PersonEmailSuccess":81, //修改邮箱成功  - 个人信息
    "PersonMobileSuccess":82, //修改手机号码成功  - 个人信息
    "PersonLevelDetail":83, //查看等级  - 个人信息
    "PersonMySpace":84, //进入我的空间  - 个人信息
    "PersonPasswordSuccess":85, //修改密码成功  - 个人信息
    "PersonMyFriends":86, //查看我的好友  - 个人信息
    "PersonMyMessages":87, //查看我的消息  - 个人信息
    "PersonAbout":88, //查看关于月牙  - 个人信息
    "PersonCheckVersion":89, //检查更新  - 个人信息
    "PersonHelp":90, //查看帮助与客服  - 个人信息
    "PersonLogout":91, //退出登录  - 个人信息
    "PersonUpdateApp":92, //更新系统  - 个人信息
    "MessageList":93, //进入消息列表  - 消息
    "MessageDetail":94, //查看消息  - 消息
    "MessageBox":95, //查看收件箱  - 消息
    "MessageSendSuccess":96, //发消息成功  - 消息
    "MessageNewFriends":97, //查看验证消息  - 消息
    "MessageReplySuccess":98, //回复消息成功  - 消息
    "BookCloseDetail":99, //关闭图书详情  - 图书
    "BookDelFromShelf":100, //移除书架  - 图书
    "BookReviewDelSuccess":101, //删除读后感成功  - 图书
    "TestBreak":102, //测评未提交就退出  - 测评
    "SharingReviewDel":103, //删除自己的互动分享评论  - 互动分享
    "SharingReviewLike":104, //给互动分享评论点赞
    "SharingDel":105, //删除自己的互动分享
    "ClubThreadDetail":106, //查看主题
    "PersonMyFriendsDel":107 //删除好友
}


var isIPhoneX = function(fn){
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
        if (screen.height == 812 && screen.width == 375){
            //是iphoneX
            try{
                $(".uh").css("padding","2em 0 0");
                $("#footer").css("padding",".55em 0 1em");
            }catch(e){}
        }else{
            //不是iphoneX
        }
    }
}

var isIPhoneX2 = function(fn){
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
        if (screen.height == 812 && screen.width == 375){
            //是iphoneX
            try{
                $(".uh").css("padding","2em 0 0");
                $("#footer").css("padding",".55em 0 1em");
            }catch(e){}
        }else{
            //不是iphoneX
        }
    }
}





function open_exp_alert(v, t) {
    //询问框
    layer.open({
        title : ['获得经验值', 'background-color: #00cc33; color:#fff;'],
        content : '<div class="ub ub-ver" style="height:5em;"><div class="ub ub-f1">通过 '+ t +'</div><div class="ub ub-f1">获得 '+v+' 经验</div></div>',
        style : 'background-color:#fff; color:#666; border:none;'//自定风格
        ,
        time : 2,
        btn : ['关闭'],
        yes : function(index) {
            layer.close(index);
        }
    });

}

function AddExp(tid){
    var url = _SERVER_ADDRESS + "/phone/room/add";
    var par = {
        "userid" : userInfo.id
        ,"typeid": tid
        ,"usertype":0
    };
    var fok = function(data) {
        var json=JSON.parse(data);

        if(json.hasOwnProperty("addScore") && json.hasOwnProperty("title")){
            //open_exp_alert(json.addScore, json.title);
        }
    };
    var ferr = function(err) {
    };

    common.ajaxPOST(url, par, fok, ferr);

}






function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}

// 添加用户行为到数据库
function AddLog(userid, key){
    var params={"userid": userid, "actionId": key} ;
    var url=_SERVER_ADDRESS + "/phone/log/add";
    var fok=function(){
        CheckLevelUp(key);
    };
    var ferr=function(){};

    $.ajax({
        url : url,
        type : 'POST',
        data : params,
        dataType : 'json',
        success : fok,
        error : ferr
        //,beforeSend: LoadingOpen
        //,complete: LoadingClose
    });

}

// 添加用户行为到数据库，含内容
function AddLogContent(userid, key, obj){

    var params={"userid": userid, "actionId": key} ;
    var url=_SERVER_ADDRESS + "/phone/log/add";
    var fok=function(){
        CheckLevelUp(key);
    };
    var ferr=function(){};

    if(obj.hasOwnProperty("content")){
        params.content=stripscript(obj.content); //内容
    }

    if(obj.hasOwnProperty("bookId")){
        params.fieldId=obj.bookId; //图书ID
        params.fieldIdTable="BK_BOOK"; //图书表
    }

    if(obj.hasOwnProperty("reviewId")){
        params.fieldId=obj.reviewId; //ID
        params.fieldIdTable="BK_BOOK_REVIEW";//图书读后感表
    }

    if(obj.hasOwnProperty("reviewCommentId")){
        params.fieldId=obj.reviewCommentId; //图书读后感评论ID
        params.fieldIdTable="BK_REVIEW_COMMENT";//图书读后感评论表
    }

    if(obj.hasOwnProperty("friendId")){
        params.fieldId=obj.friendId; //同学或好友ID
        params.fieldIdTable="SYS_STUDENT";//学生表
    }

    if(obj.hasOwnProperty("programId")){
        params.fieldId=obj.programId; //新闻或文章ID
        params.fieldIdTable="PG_PROGRAM";
    }

    if(obj.hasOwnProperty("programReviewId")){
        params.fieldId=obj.programReviewId; //新闻或文章的评论ID
        params.fieldIdTable="PG_PROGRAM_REVIEW";
    }

    if(obj.hasOwnProperty("forumId")){
        params.fieldId=obj.forumId; //社区ID
        params.fieldIdTable="GP_GROUP";
    }

    if(obj.hasOwnProperty("threadId")){
        params.fieldId=obj.threadId; //主题ID
        params.fieldIdTable="GP_THREADS";
    }

    if(obj.hasOwnProperty("postId")){
        params.fieldId=obj.postId; //回复ID
        params.fieldIdTable="GP_POSTS";
    }

    if(obj.hasOwnProperty("timecount")){
        params.timecount=obj.timecount; //用时，单位：毫秒
    }
    $.ajax({
        url : url,
        type : 'POST',
        data : params,
        dataType : 'json',
        success : fok,
        error : ferr
        //,beforeSend: LoadingOpen
        //,complete: LoadingClose
    });
}

function CheckLevelUp(key) {
    var json_before={
        "read_lv" : 0,
        "word_lv" : 0,
        "review_lv" : 0,
        "sign_lv" : 0,
        "test_lv" : 0,
        "game_lv" : 0,
        "exp_lv":0,
        "exp_star":0
    };



    getUserInfo();

    var json_after = {
        "read_lv" : GetLevel("read",userInfo.readBookCount).level,
        "word_lv" : GetLevel("word",userInfo.readWordCount).level,
        "review_lv" : GetLevel("review",userInfo.expCountReview).level,
        "sign_lv" : GetLevel("sign",userInfo.signCount).level,
        "test_lv" : GetLevel("test",userInfo.scoreCount).level,
        "game_lv" : 0,
        "exp_lv":GetLevel("person", userInfo.expCount).level,
        "exp_lv":GetLevel("person", userInfo.expCount).star
        //"exp_lv":2,
        //"exp_star":3
    };


    if(getLocVal("jsonUserLevel")){
        json_before=JSON.parse(getLocVal("jsonUserLevel"));
        if(Number(json_after.read_lv) > Number(json_before.read_lv)){
            var js=GetLevel("read",userInfo.readBookCount);
            var htm="学富五车"+js.level+"级 "+ GetMetelStar(js.metel_type,js.star);
            //toast("您获得新徽章："+htm,1500);
            ShowBadgeUp(js, "read");
        }
        if(Number(json_after.word_lv) > Number(json_before.word_lv)){
            var js=GetLevel("word",userInfo.readWordCount);
            var htm="博览群书"+js.level+"级 "+ GetMetelStar(js.metel_type,js.star);
            //toast("您获得新徽章："+htm,1500);
            ShowBadgeUp(js, "word");
        }
        if(Number(json_after.review_lv) > Number(json_before.review_lv)){
            var js=GetLevel("review",userInfo.expCountReview);
            var htm="妙笔生花"+js.level+"级 "+ GetMetelStar(js.metel_type,js.star);
            //toast("您获得新徽章："+htm,1500);
            ShowBadgeUp(js, "review");
        }
        if(Number(json_after.sign_lv) > Number(json_before.sign_lv)){
            var js=GetLevel("sign",userInfo.expCountReview);
            var htm="持之以恒"+js.level+"级 "+ GetMetelStar(js.metel_type,js.star);
            //toast("您获得新徽章："+htm,1500);
            ShowBadgeUp(js, "sign");
        }
        if(Number(json_after.test_lv) > Number(json_before.test_lv)){
            var js=GetLevel("test",userInfo.expCountReview);
            var htm="金榜题名"+js.level+"级 "+ GetMetelStar(js.metel_type,js.star);
            //toast("您获得新徽章："+htm,1500);
            ShowBadgeUp(js, "test");
        }
        if(Number(json_after.game_lv) > Number(json_before.game_lv)){
            var js=GetLevel("game",userInfo.expCountReview);
            var htm="才高八斗"+js.level+"级 "+ GetMetelStar(js.metel_type,js.star);
            //toast("您获得新徽章："+htm,1500);
            ShowBadgeUp(js, "game");
        }
        if(Number(json_after.exp_lv)*10+Number(json_after.exp_star) > Number(json_before.exp_lv)*10+Number(json_before.exp_star)){
            var js=GetLevel("person", userInfo.expCount);
            var htm=GetPersonLevel(Number(js.level))+js.level+"级 "+ js.star+"星";
            //toast("您获得新的功名："+htm,1500);
            ShowBadgeUp(js, "person");
        }
    }

    var js=GetLevel("word",userInfo.expCount);
    ShowBadgeUp(js, "word");
    setLocVal("jsonUserLevel",JSON.stringify(json_after));

}


function GetMetelStar(t, star){
    var r="";
    switch (t) {
        case 1:
            r="铜榜"+star+"星";
            break;
        case 2:
            r="银榜"+star+"星";
            break;
        case 3:
            r="金榜"+star+"星";
            break;
    }
    return r;
}





function GetPersonLevel(t) {
    var level = 0;
    var r = '';

    switch (Number(t)) {
        case 1:
            r = '白身';
            break;
        case 2:
            r = '书童';
            break;
        case 3:
            r = '秀才';
            break;
        case 4:
            r = '举人';
            break;
        case 5:
            r = '进士';
            break;
        case 6:
            r = '状元';
            break;
        case 7:
            r = '翰林';
            break;
        case 8:
            r = '太傅';
            break;
        case 9:
            r = '圣贤';
            break;
    }

    return r;
}




//person=人物等级，read=图书的数量, word=字数 ,review=读后感评分, sign=连续签到, test=测评积分, game=阅读计划（活动）的次数 [等级, 金银铜, 最小值，下一等级值]
var jsonLevel= {
    //person=人物等级 [等级, 星星数, 最小值，下一等级值]
    "person" : [
        [1,1,0,10,1],
        [1,1,10,30,2],
        [1,1,30,60,3],
        [2,2,60,100,1],
        [2,2,100,200,2],
        [2,2,200,300,3],
        [3,3,300,600,1],
        [3,3,600,1000,2],
        [3,3,1000,1500,3],
        [4,4,1500,2000,1],
        [4,4,2000,4000,2],
        [4,4,4000,6000,3],
        [5,5,6000,8000,1],
        [5,5,8000,10000,2],
        [5,5,10000,12000,3],
        [6,6,12000,15000,1],
        [6,6,15000,18000,2],
        [6,6,18000,21000,3],
        [7,7,21000,24000,1],
        [7,7,24000,28000,2],
        [7,7,28000,33000,3],
        [8,8,33000,38000,1],
        [8,8,38000,43000,2],
        [8,8,43000,50000,3],
        [9,9,50000,60000,1],
        [9,9,60000,70000,2],
        [9,9,70000,70000,3]
    ],

    //read=图书的数量 [等级, 金银铜, 最小值，下一等级值，星级]
    "read" : [
        [0,0,0,10,0],
        [1,1,10,50,1],
        [2,1,50,150,2],
        [3,1,150,300,3],
        [4,2,300,500,1],
        [5,2,500,600,2],
        [6,2,600,700,3],
        [7,3,700,800,1],
        [8,3,800,1000,2],
        [9,3,1000,1000,3]
    ],

    //read=字数（千字） [等级, 金银铜, 最小值，下一等级值，星级]
    "word" : [
        [0,0,0,1,0],
        [1,1,1,50,1],
        [2,1,50,100,2],
        [3,1,100,500,3],
        [4,2,500,1000,1],
        [5,2,1000,1500,2],
        [6,2,1500,2000,3],
        [7,3,2000,2500,1],
        [8,3,2500,3000,2],
        [9,3,3000,3000,3]
    ],

    //review=读后感评分
    "review" : [
        [0,0,0,10,0],
        [1,1,10,30,1],
        [2,1,30,50,2],
        [3,1,50,80,3],
        [4,2,80,100,1],
        [5,2,100,150,2],
        [6,2,150,200,3],
        [7,3,200,300,1],
        [8,3,300,1000,2],
        [9,3,1000,1000,3]
    ],
    //连续签到天数
    "sign" : [
        [0,0,0,12,0],
        [1,1,12,40,1],
        [2,1,40,120,2],
        [3,1,120,240,3],
        [4,2,240,400,1],
        [5,2,400,640,2],
        [6,2,640,920,3],
        [7,3,920,1200,1],
        [8,3,1200,1500,2],
        [9,3,1500,0,3]
    ],
    //测评积分
    "test" : [
        [0,0,0,10,0],
        [1,1,10,50,1],
        [2,1,50,200,2],
        [3,1,200,500,3],
        [4,2,500,1000,1],
        [5,2,1000,2000,2],
        [6,2,2000,4000,3],
        [7,3,4000,7000,1],
        [8,3,7000,10000,2],
        [9,3,10000,10000,3]
    ],

    //活动
    "game" : [
        [0,0,1,5,0],
        [1,1,5,20,1],
        [2,1,20,30,2],
        [3,1,30,50,3],
        [4,2,50,80,1],
        [5,2,80,100,2],
        [6,2,100,150,3],
        [7,3,150,200,1],
        [8,3,200,500,2],
        [9,3,500,500,3]
    ]
};

function GetLevel(type,count) {
    var arr;
    switch (type) {
        case "person":
            arr=jsonLevel.person;
            break;
        case "read":
            arr=jsonLevel.read;
            break;
        case "word":
            arr=jsonLevel.word;
            break;
        case "review":
            arr=jsonLevel.review;
            break;
        case "sign":
            arr=jsonLevel.sign;
            break;
        case "test":
            arr=jsonLevel.test;
            break;
        case "game":
            arr=jsonLevel.game;
            break;
    }

    var level = 0;
    var metel_type = 0;
    var next_level_exp = 0;
    var star = 0;

    for(var i=0;i<arr.length;i++){
        var obj=arr[i];
        if (count >= obj[2]){
            level = obj[0];
            metel_type = obj[1];
            next_level_exp = obj[3];
            star = obj[4];
        }
    }
    return {
        "level" : level,
        "metel_type" : metel_type,
        "next" : next_level_exp,
        "star" : star
    };
}







//过滤特殊字符
function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}



//js获得Request
function GetRequest() {
    var url = location.search; //获取url中含"?"符后的字串
    alert(url);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function ShowInfo(obj){
    appcan.alert(json);
}
function ShowInfo_pic(obj){
    var htm='<div class="alert_content">';
    htm+='<div class="ub ub-f1 ub-pc">'+ obj.title +'</div>';
    htm+='<div class="ub ub-f1 ulev-1 tx-l" style="color:#666;">'+ obj.content +'</div>';
    htm+='</div>';
    layer.open({
        content: htm
        ,skin: 'showbadge'
    });
}


function ShowBadgeUp(obj,helptype){
    var src="";
    var title="";
    var remark="";
    switch (helptype) {
        case "person":
            src=_SERVER_ADDRESS + "/static/space/"+obj.metel_type+".png";
            title="您获得新功名<br>" + GetPersonLevel(Number(obj.level))+" "+ obj.star+"星";
            break;
        case "read":
            src=_SERVER_ADDRESS + "/static/space/xue"+obj.metel_type+".png";
            title="您获得新徽章<br>学富五车"+obj.level+"级 "+ GetMetelStar(obj.metel_type,obj.star) +"";
            break;
        case "word":
            src=_SERVER_ADDRESS + "/static/space/bo"+obj.metel_type+".png";
            title="您获得新徽章<br>博览群书"+obj.level+"级 "+ GetMetelStar(obj.metel_type,obj.star);
            break;
        case "review":
            src=_SERVER_ADDRESS + "/static/space/miao"+obj.metel_type+".png";
            title="您获得新徽章<br>妙笔生花"+obj.level+"级 "+ GetMetelStar(obj.metel_type,obj.star);
            break;
        case "sign":
            src=_SERVER_ADDRESS + "/static/space/chi"+obj.metel_type+".png";
            title="您获得新徽章<br>持之以恒"+obj.level+"级 "+ GetMetelStar(obj.metel_type,obj.star);
            break;
        case "test":
            src=_SERVER_ADDRESS + "/static/space/jin"+obj.metel_type+".png";
            title="您获得新徽章<br>金榜题名"+obj.level+"级 "+ GetMetelStar(obj.metel_type,obj.star);
            break;
        case "game":
            src=_SERVER_ADDRESS + "/static/space/cai"+obj.metel_type+".png";
            title="您获得新徽章<br>才高八斗"+obj.level+"级 "+ GetMetelStar(obj.metel_type,obj.star);
            break;
    }

    var htm='<div class="ub-f1" style="height:2em; line-height: 2em;text-align: right;"><div style="width:2em;height:2em;float: right;margin-right:1em;" onclick="closeLayer();"></div></div>';
    htm+='<div class="alert_content" style="height:15em; width:70%;margin:8em auto;">';
    // htm+='<div class="ub ub-f1 ub-pc" style="height:3em; ><i class="fa fa-question-circle-o" aria-hidden="true" onclick="ShowHelp(\''+ $(obj).attr("helptype") +'\')"></i></div>';
    htm+='<div class="ub ub-f1 ub-pc" style="height:4em;"><img src="'+ src +'" style="height:4em;"></div>';
    htm+='<div class="ub ub-f1 ub-pc" style="height:3em;padding-top:1em;">'+GetStrHtmlAlert(Number(obj.star))+'</div>';
    htm+='<div class="ub ub-f1 ub-pc" style="height:5em;color:#fff; padding-top:1em;">'+ title +'</div>';
    htm+='</div>';
    layer.open({
        content: htm
        ,skin: 'showLevelUp'
    });
}

function closeLayer(){
    layer.closeAll();
}

function GetStrHtmlAlert(star){
    var htm='';
    for(var i=1;i<=Number(star);i++){
        htm+='<img src="'+_SERVER_ADDRESS + '/static/space/star.png" style="width:2em;">';
    }

    for(var i=Number(star)+1;i<=3;i++){
        htm+='<img src="'+_SERVER_ADDRESS + '/static/space/star2.png" style="width:2em;">';
    }
    return htm;
}