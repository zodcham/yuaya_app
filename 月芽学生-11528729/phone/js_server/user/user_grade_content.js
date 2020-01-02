// 我的页面中积分的获取方式
// $(".integral").html(userInfo.scoreCount);

appcan.ready(function() {
    getUserInfo();
    getSysInfo();
    getProgressBar();

    AddLogContent(userInfo.id, logKeys.PersonLevelDetail,{});

});

function getProgressBar() {

    $("#name").html(userInfo.name);
    $(".readLevelName").html(userInfo.readLevelName);
    $(".integral").html(userInfo.scoreCount);

    // getHeadImg(
    // function(imgPath){
    // $("#headImg").attr("src",imgPath);
    // },
    // function(msg){
    // toast(msg,config.toastTimeShort);
    // }
    // );

    num = userInfo.scoreCount;
    if (num > 0) {
        $(".meifen").width(Math.round(1 * 10000) / 100.00 + "%");

    }
    if (num > 10) {
        $(".baishen").width(Math.round(1 * 10000) / 100.00 + "%");
    }
    if (num > 20) {
        $(".xiucai").width(Math.round(1 * 10000) / 100.00 + "%");
    }
    if (num > 40) {
        $(".juren").width(Math.round(1 * 10000) / 100.00 + "%");
    }
    if (num > 80) {
        $(".gongsheng").width(Math.round(1 * 10000) / 100.00 + "%");
    }
    if (num > 160) {
        $(".jinshi").width(Math.round(1 * 10000) / 100.00 + "%");
    }
    if (num > 320) {
        $(".tanhua").width(Math.round(1 * 10000) / 100.00 + "%");
    }
    if (num > 640) {
        $(".bangyan").width(Math.round(1 * 10000) / 100.00 + "%");
    }
    if (num > 1280) {
        $(".zhuangyuan").width(Math.round(1 * 10000) / 100.00 + "%");
    }
    if (num > 2560) {
        $(".hanlin").width(Math.round(1 * 10000) / 100.00 + "%");
    }

    if (num >= 0 && num < 10) {
        //白身
        total = 10;
        num = num
        $(".meifen").width(Math.round(num / total * 10000) / 100.00 + "%");
    } else if (num >= 10 && num < 20) {
        //白身
        total = 20 - 10;
        num = num - 10;
        $(".baishen").width(Math.round(num / total * 10000) / 100.00 + "%");
    } else if (num >= 20 && num < 40) {
        //秀才
        total = 40 - 20;
        num = num - 20;
        $(".xiucai").width(Math.round(num / total * 10000) / 100.00 + "%");

    } else if (num >= 40 && num < 80) {
        //举人
        total = 80 - 40;
        num = num - 40;
        $(".juren").width(Math.round(num / total * 10000) / 100.00 + "%");

    } else if (num >= 80 && num < 160) {
        // 贡生
        total = 160 - 80;
        num = num - 80;
        $(".gongsheng").width(Math.round(num / total * 10000) / 100.00 + "%");

    } else if (num >= 160 && num < 320) {
        //进士
        total = 320 - 160;
        num = num - 160;
        $(".jinshi").width(Math.round(num / total * 10000) / 100.00 + "%");

    } else if (num >= 320 && num < 640) {
        //探花
        total = 640 - 320;
        num = num - 320;
        $(".tanhua").width(Math.round(num / total * 10000) / 100.00 + "%");
    } else if (num >= 640 && num < 1280) {
        // 榜眼
        total = 1280 - 640;
        num = num - 640;
        $(".bangyan").width(Math.round(num / total * 10000) / 100.00 + "%");
    } else if (num >= 1280 && num < 2560) {
        //状元
        total = 2560 - 1280;
        num = num - 1280;
        $(".zhuangyuan").width(Math.round(num / total * 10000) / 100.00 + "%");
    } else if (num >= 2560 && num < 5120) {
        //翰林
        total = 2560;
        num = num - 2560;
        $(".hanlin").width(Math.round(num / total * 10000) / 100.00 + "%");
    } else if (num >= 5120) {
        //大学仕
        $(".bg-jindutiao span").width(Math.round(1 * 10000) / 100.00 + "%");
    }
}
