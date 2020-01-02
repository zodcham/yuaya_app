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
appcan.ready(function() {
    getUserInfo();
    getSysInfo();
    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView("1", "rgba(0,0,0,0)", 1);
    uexWindow.notifyBounceEvent(0, 1);
    uexWindow.showBounceView("0", "rgba(0,0,0,0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
        if (isLoading) {
            return;
        }
        switch(type) {
        case 0:
            if (state == 2) {
                reloadData();
            }
            break;
        case 1:
            if (state == 2) {
                pageIndex++;
                loadData();
            }
            break;
        }
    };
    reloadData();
});

function reloadData() {
    $("#bookList").empty();
    pageIndex = 1;
    loadData();
}

function loadData() {
    isLoading = true;
    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新：" + time1;
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));
    //isPass 是否认证通过 ('0':未认证, '1':已认证)
    //type0=全部、1=必读、2=选读、3=自选

    var params = {
        'userId' : userInfo.id,
        'beginDate' : sysInfo.report.startDate,
        'endDate' : sysInfo.report.endDate,
        pageSize : '20',
        pageIndex : pageIndex
    };
    common.ajax("/readingReport/exerciseBookList", {
        params : JSON.stringify(params)
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (!data.obj || !data.obj.list || data.obj.list.length == 0) {
            if (pageIndex > 1) {
                pageIndex--;
            }
            if ($("#bookList .item").length > 0) {
                toast("已全部加载~", config.toastTimeShort);
            } else {
                myPrompt.show("未找到数据", "#bookList");
            }
        } else {
            myPrompt.hide();
            var index = 0;
            for (var i = 0; i < data.obj.list.length; i++) {
                var obj = data.obj.list[i];
                var objItem = $("#item").clone();
                objItem.attr("id", obj.bookId);
                objItem.removeClass("uhide");
                if (obj.book.image.length > 0) {
                    objItem.find(".bookImg").attr("src", _SERVER_ADDRESS + obj.book.image);
                }
                objItem.find(".bookName").html(obj.book.name);
                objItem.find(".author").html(obj.book.author);
                objItem.find(".wordCount").html(obj.book.wordCount + "(千字)");
                objItem.find(".accuracy").html(obj.accuracy * 100 + "%");
                objItem.find(".createDate").html(getformatDate(obj.createDate, "yyyy-MM-dd HH:mm"));
                $("#bookList").append(objItem);
            }
        }
        isLoading = false;

    }, function(data) {
        isLoading = false;
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex > 1) {
            pageIndex--;
        }
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    }, {
        loadingMsg : '正在查询，请稍后...'
    });
}
