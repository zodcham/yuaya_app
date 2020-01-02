var yearFlag;
var pageIndex = 1;
var reloadDate = "";
var loadDate = "";
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
    //{userId: '学生Id', bookId: '图书Id', isPass: '1', pageSize:'20', pageIndex:'1'}
    var params = {
        'userId' : userInfo.id,
        pageSize : '20',
        pageIndex : pageIndex
    };
    common.ajax("/exercise/getExerciseList", {
        params : JSON.stringify(params)
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无测评记录~", "#reviewList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;
            if (list) {
                /*
                 * id: 测评id,
                 bookId:图书ID
                 book.name:图书名称
                 book.image:图书图片
                 book.author:图书作者
                 book.wordCount:图书字数
                 isPass:是否通过（1=通过、2=通过）
                 createDate:测评时间
                 exerciseTimest:测评次数
                 firstPassTimes:首次通过在第几次
                 quantity:总题目数量
                 rightQuantity:正确题目数量
                 accuracy:正确率
                 */

                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    var objItem = $("#item").clone();
                    objItem.removeClass("uhide");
                    objItem.attr("id", obj.id).attr("bookId", obj.bookId);

                    if (obj.book.image && obj.book.image.length > 0) {
                        objItem.find("img").attr("src", _SERVER_ADDRESS + obj.book.image);
                    }
                    objItem.find(".name").html("《" + obj.bookName + "》");
                    var finishValue = Math.ceil(obj.accuracy * 100);
                    objItem.find(".score").html("(" + finishValue + "分)");
                    objItem.find(".accuracy").html(finishValue + "%");

                    objItem.find(".rate").css("width", finishValue + "%");
                    if (obj.isPass == "1") {
                        objItem.find(".rate").addClass("sc-bc-green");
                        objItem.find(".isOk").removeClass("uhide");
                        objItem.find(".btnReview").html("再次测评");

                    } else {
                        objItem.find(".rate").addClass("sc-bc-blue2");
                        objItem.find(".isWrong").removeClass("uhide")
                    }

                    objItem.find(".date").html(getformatDate(obj.exerciseDate, "yyyy-MM-dd HH:mm"));
                    objItem.on("click", function() {
                        var id = $(this).attr("bookId");
                        getBookInfoById(userInfo.id, id, function(data) {
                            getBookInfo();
                            bookInfo = data;
                            setBookInfo();
                            appcan.window.open("bookIndex", "../book/book_index.html", 5);
                        }, null);
                    });
                    objItem.find(".click2").on("touchstart", function() {
                        $(this).parents(".item").removeClass("click");
                    }).on("touchend", function() {
                        setTimeout(function() {
                            $(this).parents(".item").addClass("click");
                        }, 500);
                    }).on("touchcancel", function() {
                        setTimeout(function() {
                            $(this).parents(".item").addClass("click");
                        }, 500);
                    });

                    $("#reviewList").append(objItem);
                }

                $(".btnReview").on("click", function() {
                    var id = $(this).parents(".item").attr("bookId");
                    getBookInfoById(userInfo.id, id, function(data) {
                        getBookInfo();
                        bookInfo = data;
                        setBookInfo();
                        appcan.window.open("book_review", "../book/book_review.html", 5);
                    }, null);
                });
                $(".btnIntroduce").on("click", function() {
                    var id = $(this).parents(".item").attr("bookId");
                    getBookInfoById(userInfo.id, id, function(data) {
                        getBookInfo();
                        bookInfo = data;
                        setBookInfo();
                        appcan.window.open("book_introduce_add", "../book/book_introduce_add.html", 5);
                    }, null);
                });

            } else {
                pageIndex--;
                toast("没有更多记录了~", config.toastTimeShort);
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