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
    getUserInfo();
    getProgramInfo();
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
        'programCategory' : '3',
        pageSize : '6',
        pageIndex : pageIndex,
        'grade' : 3
    };
    common.ajax("/program/getProgramInfoMore", {
        params : JSON.stringify(params)
    }, function(data) {
        //appcan.alert(data);
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无名师领读数据~", "#reviewList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;

            for (var i = 0; i < list.length; i++) {

                var obj = list[i];
                //appcan.alert(obj.image);
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", obj.id);
                objItem.find(".name").html(obj.name);
                objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
                objItem.find(".hits").html(obj.hits);
                objItem.find(".evaluateTimes").html(obj.evaluateTimes);
                objItem.find(".introduces").html(obj.introduce);
                objItem.bind("click", function() {
                    var id = $(this).attr("id");
                    getProgramInfoById(id, function(data) {
                        getProgramInfo();
                        programInfo = data;
                        setProgramInfo();
                        appcan.window.open("column_index", "../book/column_index.html", 5);

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