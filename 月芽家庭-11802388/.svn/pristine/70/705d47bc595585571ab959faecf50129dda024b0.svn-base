var pageIndex = 1;
var reloadDate = "";
var reloadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期1",
    "pullToReloadText" : "拖动刷新",
    "releaseToReloadText" : "释放刷新",
    "loadingText" : "刷新中，请稍等"
};
var loadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期2",
    "pullToReloadText" : "拖动加载",
    "releaseToReloadText" : "释放加载",
    "loadingText" : "加载中，请稍等"
};

var g_page = 1;
var g_pagecount = 1;
appcan.ready(function() {
    //$("body").append('<div class="main_btn btn_back" style="z-index: 59999;font-size:1em;border-radius: 1em;width:2em;height:2em;line-height:2em; position:fixed;left:1em;background-color: black;color:#fff;opacity: 0.5; text-align: center;top:1em;" onclick="ClickBack()"><div class="fa fa-angle-left fa-2x"></div></div>');

    GetList();
    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(0, 1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView("0", "rgba(0, 0, 0, 0)", 1);
    uexWindow.showBounceView("1", "rgba(0, 0, 0, 0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
        var time1 = new Date().format("MM-dd HH:mm:ss");
        switch(type) {
            case 0:
                if (state == 2) {
                    refreshData();
                }
                break;
            case 1:
                if (state == 2) {
                    loadJson.levelText = "上次加载：" + time1;
                    uexWindow.setBounceParams(1, JSON.stringify(loadJson));
                    GetList();
                }
                break;
        }

    }
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    loadJson.levelText = "上次加载：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));


    window.onscroll = function () {
        var a = document.documentElement.scrollTop || document.body.scrollTop;//滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight;//可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight;//可视化的高度与溢出的距离（总高度）
        if(a + b == c){
            //toast('正在加载下一页', config.toastTimeShort);
            g_page++;
            GetList();
        }
    }

});

function refreshData() {
    g_page = 1;
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    //$("#reviewList .item").remove();
    $("#sign_list").html("");
    GetList();
}

function GetList() {
    if (g_page == 1) {
        uexWindow.resetBounceView("0");
    } else {
        uexWindow.resetBounceView("1");
    }
    myPrompt.hide();

    if (g_page > g_pagecount) {
        toast("没有更多。", config.toastTimeShort);
        return false;
    }

    getUserInfo();

    var url = config.serviceUrl + "/sign/rankToday";
    var par = {
        "userid" : userInfo.id,
        "page" : g_page
    };
    var fok = function(data) {

        var json = JSON.parse(data);

        g_pagecount = Number(json.pageCount);
        var arr = JSON.parse(json.RankList);

        //1-3名
        if (g_page == 1) {
            for (var i = 0; i < 3; i++) {

                if (arr[i]) {
                    var time = "85.5";
                    $("#top3_" + i).html(arr[i].name + " " + time)

                    var img = _SERVER_VIDEO_ADDRESS + arr[i].photo;
                    $("#top3_img_" + i).attr("src", img);
                }
            }

            //当前用户
/*
            var current = JSON.parse(json.CurrentUser);

            var myimg = _SERVER_VIDEO_ADDRESS + current.photo;

            var mytime = "";
            var myname = current.name;
            var myrank = current.rank;

            $("#current_photo").attr("src", myimg);
            $("#current_time").html(mytime);
            $("#current_name").html(myname);
            $("#current_rank").html(myrank);
            */
        }

        //列表
        $(arr).each(function(idx, obj) {
            if (Number(obj.rank) > 3) {
                $("#sign_list").append(GetListHtml(obj));

            }
        })
        g_page++;

    };
    var ferr = function(err) {
    };

    common.ajaxPOST(url, par, fok, ferr);

}

function GetTime(timestring) {
    timestring = timestring.replace('.0', '');
    var now = new Date(timestring.replace(/\-/g, "/"));
    var h = now.getHours();
    var m = now.getMinutes();
    var hh = h.toString();
    var mm = m.toString();
    if (h < 10)
        hh = "0" + hh;
    if (m < 10)
        mm = "0" + mm;
    var time = hh + ":" + mm;
    return time;
}

function GetListHtml(obj) {
    var time = "75"
    var img = _SERVER_VIDEO_ADDRESS + obj.photo;
    var html = "";
    html += '<div class="ub c-gra b-bla uinn sign_list_box">';
    html += ' <div class="ub-f1 ub-ver ub-pc ub-ac tx-c ub-f3" style="height:2.5em; ">';
    html += '     <div class="sign_list_num">' + obj.rank + '</div>';
    html += '     <div  class="sign_rank_img">';
    html += '     <img src="' + img + '" class="sign_list_userimg" style="float:left;">';
    html += '     </div>';
    html += '     <p class="ub-ver ub-pc ub-ac tx-c" style="float:left; line-height: 2.5em; margin-left: 1em;text-align: left;">';
    html += '         ' + obj.name;
    html += '     </p>';
    html += ' </div>';
    html += ' <div class="ub-f1 ub-ver ub-pc ub-ac tx-c ub-f1 " style="height:2.5em;line-height: 2.5em;">';
    html += time;
    html += ' </div>';
    html += '</div>';
    return html;
}

function ClickBack(){
    appcan.window.close(-1);
}
