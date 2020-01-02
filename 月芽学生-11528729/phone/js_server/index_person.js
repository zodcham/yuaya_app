var num1;

appcan.ready(function() {

    //uexWindow.setMultilPopoverFlippingEnbaled(1);
    $("#main").removeClass("uhide");
    appcan.window.subscribe(UPDATE_INFO, loadData);

    getUserInfo();
    //appcan.window.open("index","index.html",0);
    loadData();

    //appcan.window.subscribe('2', function(msg) {
    //    loadData();
    //});
});

function loadData() {

    var json=GetLevel("person", userInfo.expCount);
    var Person_level = json.level;

    // 等级数据开始
    $("#name").html(userInfo.name);
    $(".readLevelId").html(userInfo.readLevelId);
    $(".readLevelName").html(GetPersonLevel(Person_level));
    $("#schoolClass").html(userInfo.schoolName + "&nbsp" + userInfo.clazzName + "");
    $(".rich").html(userInfo.goldCount);
    $(".integral").html(userInfo.scoreCount);


    $(".lvtubiao").css("background-size", "100%");
    $(".lvtubiao").addClass("lv"+Person_level);

    $(".dqjf").width(Math.round(userInfo.expCount / json.next * 10000) / 100.00 + "%");

    /*
    switch (Number(Person_level)) {
        case 1:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 0;");
            break;
        case 2:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -1em;");
            break;
        case 3:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -2em;");
            break;
        case 4:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -3em;");
            break;
        case 5:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -4.2em;");
            break;
        case 6:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -5.2em;");
            break;
        case 7:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -6.2em;");
            break;
        case 8:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -7.4em;");
            break;
        case 9:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -8.4em;");
            break;
        default:
            $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 0;");
            break;
    }
    */

    /*
    num1 = userInfo.scoreCount;
    if (num1 >= 0 && num1 < 10) {
        //白身
        total = 10;
        num1 = num1;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 0;");
        $(".lvtubiao").css("background-size", "100%");
    } else if (num1 >= 10 && num1 < 20) {
        //白身
        total = 20 - 10;
        num1 = num1 - 10;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 0em;");
        $(".lvtubiao").css("background-size", "100%");
    } else if (num1 >= 20 && num1 < 40) {
        //秀才
        total = 40 - 20;
        num1 = num1 - 20;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -1em;");
        $(".lvtubiao").css("background-size", "100%");
    } else if (num1 >= 40 && num1 < 80) {
        //举人
        total = 80 - 40;
        num1 = num1 - 40;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -2em;");
        $(".lvtubiao").css("background-size", "100%");
    } else if (num1 >= 80 && num1 < 160) {
        // 贡生
        total = 160 - 80;
        num1 = num1 - 80;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -3em;");
        $(".lvtubiao").css("background-size", "100%");
    } else if (num1 >= 160 && num1 < 320) {
        //进士
        total = 320 - 160;
        num1 = num1 - 160;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -4.2em;");
        $(".lvtubiao").css("background-size", "100%");

    } else if (num1 >= 320 && num1 < 640) {
        //探花
        total = 640 - 320;
        num1 = num1 - 320;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -5.2em;");
        $(".lvtubiao").css("background-size", "100%");
    } else if (num1 >= 640 && num1 < 1280) {
        // 榜眼
        total = 1280 - 640;
        num1 = num1 - 640;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -6.2em;");
        $(".lvtubiao").css("background-size", "100%");
    } else if (num1 >= 1280 && num1 < 2560) {
        //状元
        total = 2560 - 1280;
        num1 = num1 - 1280;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -7.4em;");
        $(".lvtubiao").css("background-size", "100%");

    } else if (num1 >= 2560 && num1 < 5120) {
        //翰林
        total = 2560;
        num1 = num1 - 2560;
        $(".dqjf").width(Math.round(num1 / total * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -8.4em;");
        $(".lvtubiao").css("background-size", "100%");
    } else if (num1 >= 5120) {
        //大学仕
        $(".dqjf").width(Math.round(1 * 10000) / 100.00 + "%");
        $(".lvtubiao").css("background", "url(css/image1/Lv.png) no-repeat 0 -9.4em;");
        $(".lvtubiao").css("background-size", "100%");
    }
    // 等级数据结束
    */

    $("#headImg").attr("src", _SERVER_ADDRESS + userInfo.photo);
    /*
     getHeadImg(function(imgPath) {
     $("#headImg").attr("src", imgPath);
     }, function(msg) {
     toast(msg, config.toastTimeShort);
     });
     */
}

//个人信息
appcan.button("#btnUserInfo", "btn-act", function() {
    appcan.window.open("user_info", "user/user_info.html", 5);
})

//个人中心
appcan.button("#btnUserCenter", "btn-act", function() {
    appcan.window.open("user_center", "user/user_info.html", 5);
})

//个人空间
appcan.button("#btnSpace", "btn-act", function() {
    appcan.window.open("space_room", "space_room.html", 5);
})

// 我的徽章
appcan.button("#btnBadge", "btn-act", function() {
    appcan.window.open("Research", "user/adge.html", 5);
})
// 社区
appcan.button("#btnBBS", "btn-act", function() {
    appcan.window.open("club", "club/club.html", 5);
})
// 成语
appcan.button("#btnIdiom", "btn-act", function() {
    appcan.window.open("idiom", "game/game_index.html", 5);
})
// 调查问卷
appcan.button("#btnResearch", "btn-act", function() {
    appcan.window.open("Research", "survey.html", 5);
})
// 修改密码
appcan.button("#btnChangePwd", "btn-act", function() {
    appcan.window.open("changePwd", "changePwd.html", 5);
})
//我的好友
appcan.button("#btnFriend", "btn-act", function() {
    appcan.window.open("friend_list", "friend/friend_list.html", 5);
})
// 我的消息
appcan.button("#btnMsg", "btn-act", function() {
    appcan.window.open("message_list", "message/message_list.html", 5);
})
//关于我们
appcan.button("#btnAbout", "btn-act", function() {
    appcan.window.open("about", "about.html", 5);
})
//帮助与客服
appcan.button("#btnHelp", "btn-act", function() {
    appcan.window.open("friend_list", "help.html", 5);
})
//退出登录
appcan.button("#btnExit", "btn-act", function() {
    //alert();
    clearCommInfo();
    getDefaultUserInfo();
    setUserInfo(false);

    AddLogContent(userInfo.id, logKeys.PersonLogout,{});

    appcan.window.open("login", "login.html", 5);
    appcan.window.evaluateScript({
        name : "index", //窗口名称
        scriptContent : 'appcan.window.close(5);'
    });
    appcan.window.evaluateScript("index", "index.html", 5);
    //appcan.window.close("index", "index.html", 5);
    //appcan.window.closeMultiPopover("index");

})
appcan.button("#btnShare", "btn-act", function() {
    appcan.window.open("share", "share.html", 5);
})
function closeWin(aniId) {
    aniId = aniId || -1;
    appWin.close(aniId);
}

