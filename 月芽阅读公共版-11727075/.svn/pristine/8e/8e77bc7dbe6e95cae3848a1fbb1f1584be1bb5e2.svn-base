var g_PageIndex = 1;
var loadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期1",
    "pullToReloadText" : "下拉加载",
    "releaseToReloadText" : "释放加载",
    "loadingText" : "加载中，请稍等..."
};
var refreshJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期1",
    "pullToReloadText" : "下拉刷新",
    "releaseToReloadText" : "释放刷新",
    "loadingText" : "刷新中，请稍等..."
};

appcan.ready(function() {
    getUserInfo();
    getCommInfo();
    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(0, 1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView(0, "rgba(0,0,0,0)", 1);
    uexWindow.showBounceView(1, "rgba(0,0,0,0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
        switch (type) {
        case 0:
            if (state == 2) {
                reloadData();
            }
            break;
        case 1:
            if (state == 2) {
                var time1 = new Date().format("HH:mm:ss");
                loadJson.levelText = "上次加载: " + time1;
                uexWindow.setBounceParams(1, JSON.stringify(loadJson));
                loadReview();
            }
            break;
        }
    };

    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新: " + time1;
    refreshJson.levelText = "上次加载: " + time1;
    uexWindow.setBounceParams(0, JSON.stringify(refreshJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));
    AddLogContent(userInfo.id, logKeys.HomeMyTask,{});

    reloadData();

});

function reloadData() {
    var time1 = new Date().format("HH:mm:ss");
    refreshJson.levelText = "上次刷新: " + time1;
    uexWindow.setBounceParams(0, JSON.stringify(refreshJson));
    $("#listView").empty();
    g_PageIndex = 1;
    loadReview();
}

function loadReview() {
    var params = {
        'userId' : userInfo.id,
        'pageSize' : 20,
        "finishState" : "",
        'pageIndex' : g_PageIndex
    };
    common.ajax("/student/book/myTask", {
        params : JSON.stringify(params)
    }, function(data) {

        if (g_PageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (data.obj) {
            if (!data.obj.count || data.obj.count == 0) {
                myPrompt.show("暂无阅读任务~");
                return;
            } else if (!data.obj.list || data.obj.list.length == 0) {
                toast("没有更多数据了~", config.toastTimeShort);
                return;
            }
        } else {
            if (g_PageIndex == 1) {
                myPrompt.show("暂无阅读任务~");
            }
            return;
        }
        //hideNoData();
        var arr = [];
        for (var i = 0; i < data.obj.list.length; i++) {
            var obj = data.obj.list[i];
            var itemObj = $("#item").clone();

            var bg="#e8e0ba";
            if(i%2==0) bg="#f3efd7";
            itemObj.css("background-color",bg);

            itemObj.removeClass("uhide");
            itemObj.attr("id", obj.id).attr("bookId", obj.recommend.bookId);
            //图书图片
            if (obj.recommend.bookImage && obj.recommend.bookImage.length > 0) {
                itemObj.find(".bookImg").attr("src", getHeadImageUrl(obj.recommend.bookImage));
            }
            //图书名称
            itemObj.find(".bookName").html(obj.recommend.bookName);
            // 6分 积分 bookScore
            itemObj.find(".bookScore").html(obj.bookScore + "分");
            //   阅读 hits  obj.bookReadTimes
            itemObj.find(".hits").html(obj.hits + "人读过");
            // 出版社单位  bookPublisher
            itemObj.find(".bookPublisher").html(obj.bookPublisher);
            // 等级 recommendLevel  判断
            if (obj.recommendLevel == 1) {
                itemObj.find(".recommendLevel").html("一级");
            } else if (obj.recommendLevel == 2) {
                itemObj.find(".recommendLevel").html("二级");
            } else if (obj.recommendLevel == 3) {
                itemObj.find(".recommendLevel").html("三级");
            }
            //发布/截止日期 2017-11-01/2017-12-03
            itemObj.find(".startDateendDate").html(getformatDate(obj.createDate, "yyyy-MM-dd") + "<br>" + getformatDate(obj.recommend.endDate, "yyyy-MM-dd"));
            //测评正确率  判断
            //itemObj.find(".exerciseAccuracy").html(obj.exerciseAccuracy+"%");
            if (obj.exerciseAccuracy === '') {
                itemObj.find(".exerciseAccuracy").html("待测试").css("color", "#DD4C40");

            } else if (obj.exerciseAccuracy >= 0) {
                itemObj.find(".exerciseAccuracy").html(obj.exerciseAccuracy * 100 + "%").css("color", "#48B771");
            }
            //写读后感 是否  完成    判断
            if (obj.bookReviewCount > 0) {
                itemObj.find(".isMustReview").html("已写").css("color", "#48B771");
            } else if (obj.bookReviewCount == '') {
                itemObj.find(".isMustReview").html("未写").css("color", "#DD4C40");
            }
            //写读后感评级   reviewLevel 判断
            switch (obj.reviewLevel) {
            case "0":
                itemObj.find(".reviewLevel").html("差").css("color", "#48B771");
                break;
            case "1":
                itemObj.find(".reviewLevel").html("良").css("color", "#48B771");
                break;
            case "2":
                itemObj.find(".reviewLevel").html("优").css("color", "#48B771");
                break;
            default:
                itemObj.find(".reviewLevel").html("无").css("color", "#DD4C40");
                break;
            }
            //完成状态    判断
            
            switch(obj.finishState) {
            case "0":
                if (GetDateDiff(CurentDate(), getformatDate(obj.recommend.endDate, "yyyy-MM-dd")) <= 2) {
                    itemObj.find(".finishState").html("未完成<br>快到期").css("color", "blue");
                } else {
                    itemObj.find(".finishState").html("未完成<br>进行中").css("color", "#DD4C40");
                }
                break;
            case "1":
                itemObj.find(".finishState").html("完成").css("color", "#48B771");
                break;
            case "2":
                if (TaskDateCompare(CurentDate(), getformatDate(obj.recommend.endDate, "yyyy-MM-dd"))) {
                    itemObj.find(".finishState").html("未完成<br>已过期").css("color", "#999");
                } else {
                    itemObj.find(".finishState").html("未完成").css("color", "orange");
                }
                break;

            }

            //全部完成后     删除该数据
            if (obj.recommend.isMustReview != "1") {
                $("#btnIntroduce").addClass("uhide");
            }

            itemObj.on("click", function() {
                var recommend_id=$(this).attr("id");
                setTaskReadStatus(recommend_id);
                var id = $(this).attr("bookId");
                getBookInfoById(userInfo.id, id, function(data) {
                    getBookInfo();
                    bookInfo = data;
                    setBookInfo();
                    //setTaskReadStatus();
                    appcan.window.open("book_default", "../book/book_default.html", 5);
                }, null);
            });
            var dateDiff = DateDiff(new Date().format("yyyy/MM/dd"), getformatDate(obj.createDate, "yyyy/MM/dd"));
            if (dateDiff <= 2) {
                itemObj.find(".mark").addClass("mark_new");
            }
            if (obj.bookReviewCount > 0) {
                itemObj.find(".level").html("(" + (obj.reviewLevelName.length > 0 ? obj.reviewLevelName : "待评") + ")");
            }
            $('#listView').append(itemObj);
        };

        $(".btnReview").on("click", function() {
            var id = $(this).parents(".item").attr("id");
            getBookInfoById(userInfo.id, id, function(data) {
                getBookInfo();
                bookInfo = data;
                setBookInfo();
                appcan.window.open("book_review", "../book/book_review.html", 5);
            }, null);
        });
        $(".btnIntroduce").on("click", function() {
            var id = $(this).parents(".item").attr("id");
            getBookInfoById(userInfo.id, id, function(data) {
                getBookInfo();
                bookInfo = data;
                setBookInfo();
                appcan.window.open("book_introduce_add", "../book/book_introduce_add.html", 5);
            }, null);
        });

        g_PageIndex++;

    }, function(data) {
        toast(data.msg, config.toastTimeShort);
        if (g_PageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (g_PageIndex > 1) {
            g_PageIndex--;
        }
    });
}

function setTaskReadStatus(id){
    var par = {"studentId":userInfo.id, "recommendStudentId":id};
    var url = _SERVER_ADDRESS + "/phone/student/book/recommendRead";
    var ferr = function(err) {};
    var fok = function(data) {
    };
    common.ajaxPOST(url, par, fok, ferr);
}

function GetDateDiff(startDate,endDate) 
{ 
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();    
    var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();    
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);    
    return  dates;   
}

function TaskDateCompare(c_currenttime, c_endtime) {
    //var curTime = new Date();
    //把字符串格式转化为日期类
    var currenttime = new Date(Date.parse(c_currenttime));
    var endtime = new Date(Date.parse(c_endtime));
    //进行比较
    return (currenttime > endtime);
}

function CurentDate() {
    var now = new Date();

    var year = now.getFullYear();
    //年
    var month = now.getMonth() + 1;
    //月
    var day = now.getDate();
    //日

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day;

    return (clock);
}
