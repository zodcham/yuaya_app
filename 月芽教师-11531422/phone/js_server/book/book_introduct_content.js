var yearFlag;
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

appcan.ready(function() {
    var html_search='<div id="position"  style="position: fixed;z-index: 999;width: 100%;left: 0;top: 0;overflow: hidden;">\n' +
        '            <div id="box" class="ub ub-ver ub-ac ub-pc bc-head uinn">\n' +
        '                <div class="ub ub-fh bc-border uba bc-white" style="height:2em;border-radius: 2em">\n' +
        '                    <div class="ub ub-f1 ">\n' +
        '                        <input id="searchText" type="text" class="ub ub-f1 ulev0" placeholder="书名/作者/关键字" style="padding:0.5em 1em;border:0;background: rgba(0,0,0,0)" />\n' +
        '                    </div>\n' +
        '                    <div class="ub uinn btnSearch ">\n' +
        '                        <div class="ico_search" style="width: 0.7em;height: 0.7em;background: url(../css/icons/ico_search.png);background-size: 100% 100%;"></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="ub-f1"></div>\n' +
        '            </div>\n' +
        '        </div>';
    $("body").prepend(html_search);
    $("#reviewList").css("width","100%").css("margin-top","3em");

    getUserInfo();
    getBookInfo();
    loadData();
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
                    pageIndex++;
                    loadData();
                }
                break;
        }
    };
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    loadJson.levelText = "上次加载：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    $(".btnSearch").on("click", function() {
        search();
    })
    $('#searchText').on('keypress',function(event){//监听sim卡回车事件
        if(event.keyCode == "13")
        {
            search();
        }
    });

});

function refreshData() {
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    $("#reviewList .item").remove();
    pageIndex = 1;
    loadData();
}

function loadData() {

    var params = {
        'userId' : userInfo.id,
        'bookId' : bookInfo.id,
        pageSize : '8',
        pageIndex : pageIndex
    };
    var searchText = $("#searchText").val();
    if (searchText.length > 0) {
        params["key"] = encodeURI(searchText);
        AddLogContent(userInfo.id, logKeys.BookLibSearch, {"content":"搜索："+searchText});
    }
    common.ajax("/student/book/getVideoBookMore", {
        params : JSON.stringify(params)
    }, function(data) {
        //appcan.alert(data);
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无导读视频数据~", "#reviewList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;

            for (var i = 0; i < list.length; i++) {

                var obj = list[i];
                //appcan.alert(obj.image);
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", obj.id).attr("bookId", obj.bookId);

                objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
                objItem.find(".name").html(obj.name);
                objItem.find(".score").html(obj.score);
                objItem.find(".readNum").html(obj.hits + "人读过");
                objItem.find(".recommendTimes").html("推荐" + obj.recommendTimes + "次");
                //objItem.find(".author").html("作者：" + obj.author);

                objItem.find(".introduce").html(obj.remarks);
                // objItem.find(".recommendLevel").html(obj.recommendLevelDescr);
                // objItem.find(".bookCategory").html(obj.bookCategoryDescr);

                var j = 0;
                var star = obj.score;
                for (; j < parseInt(star / 2); j++) {
                    objItem.find("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five");
                }
                star = Math.round(obj.score - star);
                if (star == 1) {
                    objItem.find("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five-half");
                }
                objItem.bind("click", function() {
                    var id = $(this).attr("id");
                    getBookInfoById(userInfo.id, id, function(data) {
                        getBookInfo();
                        bookInfo = data;
                        setBookInfo();
                        $(this).attr("id");
                        setLocVal("bookInfo_default","video");
                        appcan.window.open("book_default", "book_default.html", 5);
                    }, null);
                });
                $("#reviewList").append(objItem);

            }

        }
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex > 1) {
            pageIndex--;
        }
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

window.onload = window.onresize = function() {
    resizeIframe();
}
var resizeIframe = function() {
    var bodyw = document.body.clientWidth;
    for (var ilength = 0; ilength <= document.getElementsByTagName("iframe").length; ilength++) {
        //设定高度
        document.getElementsByTagName("iframe")[ilength].height = bodyw * 9 / 16;
    }
}

function search() {
    getCommInfo();
    $("#reviewList").empty();
    pageIndex = 1;
    loadData();

}