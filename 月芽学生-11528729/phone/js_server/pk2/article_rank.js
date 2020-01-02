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
    $("body").append('<div class="main_btn btn_back" style="z-index: 59999;font-size:0.9em;border-radius: 1em;width:2em;height:2em;line-height:2em; position:fixed;right:0.3em;background-color: black;color:#fff;opacity: 0.5; text-align: center;top:0.3em;" onclick="refreshData()">刷新</div>');

    //setLocVal("pk_id","f9e1351ac57e4d2dbb2b3cc4e34e40fd");
    //setLocVal("pk_id","f9e1351ac57e4d2dbb2b3cc4e34e40fd");
    $(".detailbox").css("width","98%");
    $(".detailbox div:eq(0)").addClass("uhide");


    refreshData();
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
    $("#tbodyList").html("");


    getUserInfo();


    var fok = function(data) {
        var json = data;
        g_pagecount = json.obj.count;
        var arr = json.obj;
        //列表
        $(arr).each(function(idx, obj) {
            $("#tbodyList").append(GetListHtml(obj,idx));
        })
        g_page++;
    };

    g_page=1;
    var params={"id":getLocVal("pk_id"),"pageSize":20,pageNo:g_page};
    common.ajax("/activity/phoneRanking", params, fok, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'GET'
    });
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


    var fok = function(data) {
        var json = data;

        g_pagecount = json.obj.count;

        var arr = json.obj.list;

        //列表
        $(arr).each(function(idx, obj) {
            $("#sign_list").append(GetListHtml(obj,idx));
        })
        g_page++;
    };


    var params={"id":getLocVal("pk_id"),"pageSize":20,pageNo:g_page};
    common.ajax("/activity/phoneRanking", params, fok, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'GET'
    });

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

function GetListHtml(obj,idx) {
    var rank=idx+1;
    var score1 = obj.firstTotal;
    var score2 = obj.neverTotal;
    if(score1) score1=Number(score1).toFixed(2);
    if(score2) score1=Number(score2).toFixed(2);
    var img = _SERVER_ADDRESS + obj.studentPhoto;

    if(obj.firstTotal==0) score1="";
    if(obj.neverTotal==0) score2="";



    var html = '';
    var htmlUser='';
    htmlUser += '     <div  class="sign_rank_img">';
    htmlUser += '     <img src="' + img + '" class="sign_list_userimg" style="float:left;">';
    htmlUser += '     </div>';
    htmlUser += '     <p class="ub-ver ub-pc ub-ac tx-c" style="float:left; line-height: 2.5em; margin-left: 1em;text-align: left;">';
    htmlUser += '         ' + GetName(obj);
    htmlUser += '     </p>';

    html += '<tr onclick="openArticle(\''+ obj.id +'\');">';
    html += '<td>' + rank + '</td>';
    html += '<td>'+ htmlUser +'</td>';
    html += '<td>'+ score1 +'</td>';
    html += '<td>'+ score2 +'</td>';
    html += '</tr>';

    /*
    html += '<div class="ub c-gra b-bla uinn sign_list_box" onclick="openArticle(\''+ obj.id +'\');">';
    html += ' <div class="ub-f1 ub-ver ub-pc ub-ac tx-c ub-f3" style="height:2.5em; ">';
    html += '     <div class="sign_list_num">' + rank	 + '</div>';
    html += '     <div  class="sign_rank_img">';
    html += '     <img src="' + img + '" class="sign_list_userimg" style="float:left;">';
    html += '     </div>';
    html += '     <p class="ub-ver ub-pc ub-ac tx-c" style="float:left; line-height: 2.5em; margin-left: 1em;text-align: left;">';
    html += '         ' + GetName(obj);
    html += '     </p>';
    html += ' </div>';
    html += ' <div class="ub-f1 ub-ver ub-pc ub-ac tx-c ub-f1 " style="height:2.5em;line-height: 2.5em;">';
    html += score1;
    html += ' </div>';
    html += ' <div class="ub-f1 ub-ver ub-pc ub-ac tx-c ub-f1 " style="height:2.5em;line-height: 2.5em;">';
    html += score2;
    html += ' </div>';
    html += '</div>';
    */

    return html;
}

function openArticle(id){
    setLocVal("pk_article_id",id);
    appcan.window.open("article_detail", "article_detail.html", 5);
}

function GetName(obj){
    var name='';
    if(obj.participantPen!=""){
        name=obj.participantPen;
    }
    else{
        name=obj.studentName;
    }
    return name;
}

function ClickBack(){
    appcan.window.close(-1);
}


function reloadPage(){
    window.location.reload();
}