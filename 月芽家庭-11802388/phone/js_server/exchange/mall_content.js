var goldCount;
var pageIndex = 1;

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

var itemSize;
appcan.ready(function() {
    getUserInfo();

    var pageW = $("#page").width();
    itemSize = (pageW - 60) / 2;
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
                reloadJson.levelText = "上次刷新：" + time1;
                uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
                $("#listview").empty();
                pageIndex = 1;
                loadGlod();
                // loadData();
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

    loadGlod();
    // loadData();
})
function loadData() {
    var params = {
        'userId' : userInfo.id,
        'pageSize' : "12",
        "pageIndex" : pageIndex
    };
    common.ajax("/gift/list", {
        params : JSON.stringify(params)
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (!data.obj || !data.obj.list || data.obj.list.length == 0) {
            if (pageIndex == 1 && data.obj.list.length == 0) {
                myPrompt.show("暂无商品~~", "#listview");
            } else {
                pageIndex--;
                toast("已全部加载~", config.toastTimeShort);
            }
        } else {
            var lineObj = $('<div class="ub ub-fh umar-t" style="border-color:#DEDEDE;border-style:border-style:dashed"></div>');
            var index = 0;
            for (var i = 0; i < data.obj.list.length; i++) {
                var obj = data.obj.list[i];
                index++;
                var objItem = $("#item").clone();
                objItem.attr("id", obj.id).attr("name", obj.name);
                objItem.removeClass("uhide");
                objItem.find(".image").attr("src", _SERVER_ADDRESS + obj.image);

                objItem.find(".name").html(obj.name);
                objItem.find(".num").html("(" + obj.stock + "件)");
                objItem.find(".money").html(obj.glod);
                if (userInfo.goldCount > obj.glod) {
					if(Number(obj.stock)>0){
						objItem.find(".exchange").removeClass("sc-text-red").addClass("text-blue click").html("我要兑换");
					}
					else{
						objItem.find(".exchange").removeClass("sc-text-red").addClass("text-blue click").html("库存不足");
					}
                    objItem.find(".exchange").on("click", function() {
                        getCommInfo();
                        var id = $(this).parents(".item").attr("id");
                        commInfo.mallId = id;
                        commInfo.mallName = $(this).parents(".item").attr("name");
                        setCommInfo();
						if(Number(obj.stock)>0){
							appcan.window.open("exchange", "exchange.html", 10);
						}
						else{
							toast("库存不足，不能兑换。", config.toastTimeShort);
						}
                    });
                }

                lineObj.append(objItem);
                if (index == 2) {
                    $("#listview").append(lineObj);
                    lineObj = $('<div class="ub ub-ac ub-pc ub-fh umar-t"  style="border-color:#DEDEDE;border-style:border-style:dashed"></div>');
                    index = 0;
                }

            }
            if (index > 0) {
                for (; index < 2; index++) {
                    var objItem = $('<div class="ub ub-ac ub-pc ub-f1"><div style="width:' + itemSize + 'px"></div></div>');
                    lineObj.append(objItem);
                    $("#listview").append(lineObj);
                }
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

    }, null, false);
}

function loadGlod() {
    var params = {
        'userId' : userInfo.id
    };
    common.ajax("/student/scoreLog/getGoldScore", {
        params : JSON.stringify(params)
    }, function(data) {
        goldCount = data.obj.goldCount;
        loadData();
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}