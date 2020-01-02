

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
	if($("#read_header").length<=0){
		if (sysInfo.phoneType == "1") {
			var htm='<div class="ub " style="background-color: #3eb172; z-index:1000;position:fixed;width:100%;height:2.5em;opacity:9;top:0;left:0;"><div class="ub ub-pc bc-text-head" style=" width:2.5em;height:2.5em;" onclick="appcan.window.close(-1);"><div class="fa icon-back fa-lg"></div></div><h1 class="ub-f1 ulev-3 ut-s tx-c bc-text-head" tabindex="0" style="height:2.5em;line-height:2.5em;">课程领读</h1></div>';
			$(".sc-bgs").prepend(htm);
			$("#reviewList").css("margin-top","2.5em");
		}
		else{
			//var htm='<div class="ub ub-pc bc-text-head" style="position:fixed;top:0;left:0;z-index:1000;width:100%"><div class="nav-btn" id="nav-left" style="background-color: #3eb172; border-radius: 1.25em; width:2.5em;height:2.5em;opacity:9;margin-top:1.25em;margin-left:0.25em;" onclick="appcan.window.close(-1);"><div class="fa icon-back fa-lg"></div></div><h1 class="ut ub-f1 ulev-3 ut-s tx-c" tabindex="0"></h1></div>';
			//$(".sc-bgs").prepend(htm);
			var htm='<div class="ub " style="background-color: #3eb172; z-index:1000;position:fixed;width:100%;height:3.5em;opacity:9;top:0;left:0;"><div class="ub ub-pc bc-text-head" style="margin-top:1em; width:2.5em;height:2.5em;" onclick="appcan.window.close(-1);"><div class="fa icon-back fa-lg"></div></div><h1 class="ub-f1 ulev-3 ut-s tx-c bc-text-head" tabindex="0" style="margin-top:1em;height:2.5em;line-height:2.5em;">课程领读</h1></div>';
			$(".sc-bgs").prepend(htm);
			$("#reviewList").css("margin-top","3.5em");
		}
	}
	
    
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
                    appcan.window.open("Readcontents", "Readcontents.html", 5);

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