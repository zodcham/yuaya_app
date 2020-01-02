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
        "finishState" : "", //commInfo.finishState
        'pageIndex' : g_PageIndex
    };
    common.ajax("/recommend/list", {
        params : JSON.stringify(params)
    }, function(data) {
        if (g_PageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (data.obj) {
            if (!data.obj.count || data.obj.count == 0) {
                myPrompt.show("暂无推荐~");
                return;
            } else if (!data.obj.list || data.obj.list.length == 0) {
                toast("没有更多推荐了~", config.toastTimeShort);
                return;
            }
        } else {
            if (g_PageIndex == 1) {
                myPrompt.show("暂无推荐~");
            }
            return;
        }
        //hideNoData();
        var arr = [];
        var list = data.obj.list;
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            var objItem = $("#item").clone();
            objItem.removeClass("uhide");
            objItem.attr("id", obj.id).attr("bookId", obj.bookId).attr("bookName", obj.bookName);
            if (obj.bookImage && obj.bookImage.length > 0) {
                objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.bookImage);
            }
            objItem.find(".bookName").html(obj.bookName);
            objItem.find(".recommendedNum").html(obj.bookRecommendTimes);
            objItem.find(".readNum").html(obj.bookReadTimes);
            if (obj.isMustReview == "1") {
                objItem.find(".isMustReview").removeClass("uhide");
            }
            objItem.find(".startDate").html(getformatDate(obj.createDate, "yyyy-MM-dd"));
            objItem.find(".endDate").html(getformatDate(obj.endDate, "yyyy-MM-dd"));

            switch(obj.type) {
            case "1":
                objItem.find(".mark").addClass("mark_integrant");
                break;
            case "2":
                objItem.find(".mark").addClass("mark_selective");
                break;
            case "3":
                objItem.find(".mark").addClass("mark_self");
                break;
            }

            $(".click2").on("touchstart", function() {
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
            objItem.find(".btnDetails").after('<div class="ub ub-ac ub-pc sc-bc-red bc-text-head ub-f1 btnModify " style="margin:0em 0.5em;height:2em;border-radius: 0.5em" onclick="task_del(\'' + obj.id + '\',\'' + getformatDate(obj.endDate, "yyyy-MM-dd") + '\')">删除推荐</div>');
            $("#listView").append(objItem);
        }
        $(".btnDetails").on("click", function() {
            getCommInfo();
            commInfo.recommendId = $(this).parents(".item").attr("id");
            commInfo.bookInfo = {
                "bookId" : $(this).parents(".item").attr("bookId"),
                "bookName" : $(this).parents(".item").attr("bookName")
            };
            setCommInfo();
            appcan.window.open("user_task_details", "user_task_details.html", 10);
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

function task_del(id, date) {
    var title = "是否确定要删除该推荐？";
    var content = "删除该推荐后，系统将同时删除已推荐给学生的任务。已完成测评的学生所得到的成绩、积分、财富不变！";
    var callback = function(err, data, dataType, optId) {
        if (Number(data) == 0) {
            return false;
        } else {
            getUserInfo();
            var url = _SERVER_ADDRESS + "/phone/recommend/delete";
            var par = {
                "teacher_id" : userInfo.id,
                "id" : id
            };
            var fok = function(data) {
                toast("删除成功~", 3000);
                reloadData();
            };
            var ferr = function(err) {
                alert("未删除成功!");
                return false;
            };
            common.ajaxPOST(url, par, fok, ferr);
        }
    }
    appcan.window.alert(title, content, ['取消', '确定'], callback);
}

function task_modify(id, date) {
    appcan.window.prompt({
        title : '修改截止日期',
        content : '请输入正确的日期格式，例如：2018-12-01。',
        defaultValue : date,
        buttons : ['确定', '取消'],
        callback : function(err, data, dataType, optId) {
            if (data.index == 0) {
                getSysInfo();
                var date_new;
                if (sysInfo.phoneType == "1") {
                    date_new = data.data;
                    //安卓
                } else {
                    //date_new = data.value; //苹果
                    date_new = data.data;
                    //苹果
                }
                date_new = date_new.replace(new RegExp(/-/gm), "/");

                if (!RQcheck(date_new)) {
                    //alert("请输入正确的日期");
                    task_modify(id, date);
                    return false;
                } else {
                    date_new = getformatDate(date_new, "yyyy-MM-dd")
                    getUserInfo();
                    var url = _SERVER_ADDRESS + "/phone/recommend/updateEndDate";

                    var par = {
                        "teacher_id" : userInfo.id,
                        "id" : id,
                        "date" : date_new
                    };

                    var fok = function(data) {
                        toast("修改成功~", 3000);
                        reloadData();
                    };
                    var ferr = function(err) {
                        alert("未修改成功!");
                        task_modify(id, date);
                        return false;
                    };
                    common.ajaxPOST(url, par, fok, ferr);

                }
            }
        }
    });
    // appcan.window.prompt({
    // title:'修改任务',
    // content:'时间',
    // defaultValue:'2018-11-30',
    // buttons:'确定',
    // callback:function(){
    // alert();
    // }
    // });
}

function RQcheck(RQ) {
    var date = RQ;
    //(-|\/)分隔符
    var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

    if (result == null)
        return false;
    var d = new Date(result[1], result[3] - 1, result[4]);
    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);

}

function CheckAdd() {
    var ret = true;
    if (!RQcheck($id("txt_LLRQ").value)) {
        alert("请输入正确的日期");
        return false;
    }
    return ret;
}