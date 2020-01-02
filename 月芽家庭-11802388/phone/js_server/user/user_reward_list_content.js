var dirFlag = 0;
var monthFlag;
var isLoading = false;
var pageIndex = 1;
var loadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期2",
    "pullToReloadText" : "拖动加载",
    "releaseToReloadText" : "释放加载",
    "loadingText" : "加载中，请稍等"
};
var searchType = '0';
appcan.ready(function() {
    getUserInfo();
    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView("1", "rgba(0,0,0,0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
        switch(type) {
        case 1:
            if (state == 2) {
                pageIndex++;
                loadData();
            }
            break;
        }
    };
    $(".box").on("click", function() {
        if (!isLoading) {
            $(this).siblings("input").trigger("click");
            searchType = $(this).attr("value");
            $("#bookList").empty();
            pageIndex = 1;
            myPrompt.hide();
            setTimeout(loadData(), 200);
        } else {
            toast("休息一下~", config.toastTimeShort);
        }
    });
    loadData();
});

function loadData() {
    isLoading = true;
    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新：" + time1;
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));
    var params = {
        'userId' : userInfo.id,
        'pageSize' : 12,
        'pageIndex' : pageIndex,
        "type" : 1
    };
    common.ajax("/student/scoreLog", {
        params : JSON.stringify(params)
    }, function(data) {
        if (!data.obj || !data.obj.list || data.obj.list.length == 0) {
            if (pageIndex > 1) {
                pageIndex--;
            }
            if ($("#main .item").length > 0) {
                toast("已全部加载~", config.toastTimeShort);
            } else {
                myPrompt.show("未找到数据", "#main");
            }
        } else {
            myPrompt.hide();
            var lineObj = $('<div class="ub ub-fh umar-t"></div>');
            var index = 0;
            for (var i = 0; i < data.obj.list.length; i++) {
                var obj = data.obj.list[i];
                if ($(".myScore").html().length == 0) {
                    $(".myScore").html(parseInt(obj.preValue) + parseInt(obj.changeValue));
                }
                if (dirFlag % 2 == 0) {
                    objItem = $("#item").clone();
                } else {
                    objItem = $("#item2").clone();
                }
                objItem.removeClass("uhide");
                objItem.attr("id", "item_" + obj.id);
                objItem.find(".box").attr("id", obj.id);
                objItem.find(".score").html(obj.changeValue);
                objItem.find(".content").html(obj.contentText + ":");
                objItem.find(".time").html(getformatDate(obj.changeDate, "yyyy.MM.dd"));

                var month = getformatDate(obj.changeDate, "MM");
                if (monthFlag != month) {
                    monthFlag = month;
                    var objMonth = $("#divMonth").clone();
                    objMonth.attr("id", "month_" + obj.id);
                    objMonth.removeClass("uhide");
                    objMonth.find(".month").html(parseInt(monthFlag) + "月");
                    $("#main").append(objMonth);
                }

                $("#main").append(objItem);
                dirFlag++;
            }
        }
        isLoading = false;
        uexWindow.resetBounceView("1");

    }, function(data) {
        isLoading = false;
        if (pageIndex > 1) {
            pageIndex--;
        }
        uexWindow.resetBounceView("1");
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    }, {
        loadingMsg : '正在查询，请稍后...'
    });
}
