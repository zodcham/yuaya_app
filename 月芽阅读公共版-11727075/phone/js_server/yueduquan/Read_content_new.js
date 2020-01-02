

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
	isIPhoneX();
	
	$(".bookImage").removeAttr("style")
	$(".bookImage").css("width","100%");
	getSysInfo();	
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
        'programCategory' : '7',
        pageSize : '20',
        pageIndex : pageIndex
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
            myPrompt.show("暂无课程领读数据~", "#reviewList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;

            for (var i = 0; i < list.length; i++) {

                var obj = list[i];
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", obj.id);
                objItem.attr("grade", obj.grade);
                objItem.attr("month", obj.month);
                objItem.attr("year", obj.year);
                objItem.attr("name", obj.name);
                objItem.find(".name").html(obj.name);
                objItem.find(".hits").html(obj.exerciseTimes);

                objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);

                objItem.find(".grade").html(obj.grade);

                objItem.bind("click", function() {

                    var month = $(this).attr("month");
                    var name = $(this).attr("name");
                    var report = $(this).attr("year");

                    getSysInfo();
                    sysInfo.ranking = {
                        "grade" : month,
                        "name" : name,
                        "report" : report
                    };
                    setSysInfo();
                    appcan.window.open("readcontents", "Readcontents.html", 5);

                });

                $("#reviewList").append(objItem);
				/*
				var height_screen=document.body.clientHeight;
                var width_screen=document.body.clientWidth;
				var width=$(".bookImage").width();
                var height=width*1080/1920;
                //if(height_screen>width_screen){
                    $(".bookImage").css("height",height);
                //}
				*/
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