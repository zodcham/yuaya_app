var g_PageIndex = 1;
var yearFlag;
appcan.ready(function() {
    getUserInfo();
    loadData();
});
function loadData() {
    var params = {
        'userId' : userInfo.id,
        'finishState' : '',
        'pageSize' : 10,
        'pageIndex' : g_PageIndex
    };
    common.ajax("/recommend/list", {
        params : JSON.stringify(params)
    }, function(data) {
        var list = data.obj.list;
        if (list && list.length > 0) {
            list = list.sort(function(a, b) {
                return (getformatDate(a.endDate) < getformatDate(b.endDate));
            });
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", "item_" + obj.id);

                objItem.find(".box").attr("id", obj.id);
                objItem.find(".box").attr("bookId", obj.bookId);
                objItem.find(".box").attr("bookName", obj.bookName);
                objItem.find(".name").html(obj.bookName);
                if (obj.bookImage && obj.bookImage.length > 0) {
                    objItem.find("img").attr("src", _SERVER_ADDRESS + obj.bookImage);
                }
                var state = "";
                if (obj.finishState == 1) {
                    state = "<div class='sc-text-green'>已完成</div>"
                } else {

                    state = '<div class="fa icon-countdown umar-r"></div>剩余' + dateDiff(new Date().format("yyyy-MM-dd"), new Date(obj.endDate).format("yyyy-MM-dd")) + '天';
                }
                objItem.find(".state").html(state);
                var y = getformatDate(obj.endDate, "yyyy");
                if (yearFlag != y) {
                    yearFlag = y;
                    objItem.find(".year").html(yearFlag);
                } else {
                    objItem.find(".year").removeClass("year").addClass("noyear");
                }
                objItem.find(".date").html(getformatDate(obj.endDate, "MM-dd"));
                objItem.find(".type").html('<div class="fa icon-checkboxchecked umar-r"></div>必读');
                objItem.find(".isMustReview").html('<div class="fa icon-checkboxchecked umar-r"></div>读后感');
                objItem.find(".notfinishCountPer").html(Math.ceil(obj.notfinishCount / obj.studentCount * 100) + "%");
                var finishValue = Math.ceil(obj.finishCount / obj.studentCount * 100);
                objItem.find(".finishCountPer").html(finishValue + "%");
                objItem.find(".notfinishCount").html(obj.notfinishCount);
                objItem.find(".finishCount").html(obj.finishCount);
                objItem.find(".range").css("cssText", "background:-webkit-gradient(linear, left center,right center, color-stop(0%,#00cc33), color-stop(" + finishValue + "%,#00cc33), color-stop(" + finishValue + "%,#FC7800), color-stop(100%,#FC7800));");
                if ($("#main .item").length == 0) {
                    objItem.addClass("ubt");
                }
                $("#main").append(objItem);
            }
            $("#main .box").on("click", function() {
                getCommInfo();
                commInfo.recommendId = $(this).attr("id");
                commInfo.bookInfo = {
                    "bookId" : $(this).attr("bookId"),
                    "bookName" : $(this).attr("bookName")
                };
                setCommInfo();
                appcan.window.open("user_task_details", "user_task_details.html", 10);
            })
        } else {
            if (g_PageIndex == 1) {
                myPrompt.show();
            } else {
                g_PageIndex--;
            }
        }
    }, function(data) {
        if (g_PageIndex > 1) {
            g_PageIndex--;
        }
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        loadingMsg : '正在加载数据，请稍后...'
    });
}