var dicList = {
    "grade" : [],
    "book_category" : [],
    "recommendLevel" : []
};
var bookList = [];
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
    getCommInfo();
    config.currentPath = "";
    var pageW = $("#page").width();
    itemSize = (pageW - 60) / 3;
    if (itemSize > 0) {
        $(".book").css("width", itemSize + "px");
        //$(".book .bookBox").css("width",itemSize+"px").css("height",itemSize+"px");
        $(".book .bookImage").css("width", itemSize + "px").css("height", (itemSize) + "px");
    }

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
                $("#bookList").empty();
                pageIndex = 1;
                loadData();
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

    // $("#inputSearch").on("click",function(){
    // appcan.window.open("index_mall_search","index_mall_search.html",10);
    // })

    $(".cs-select").on("change", function() {
        search();
    });
    $(".btnSearch").on("click", function() {
        search();
    })
    loadData();
})
function loadDic() {
    $.each(dicList, function(n, obj) {
        if (!obj || obj.length == 0) {
            loadDicData(n);
            return false;
        }
    });
}

function loadDicData(name) {
    var params = {
        "type" : name
    };
    common.ajax("/dict/getDictList", {
        params : JSON.stringify(params)
    }, function(data) {
        createItem(data.obj, name);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

function createItem(list, name) {
    for (var i = 0; i < list.length; i++) {
        var obj = list[i];
        $("#" + name).append("<option value='" + obj.value + "'>" + obj.label + "</option>");
    }
    dicList[name] = list;
    loadDic();
}

appcan.button(".filter", "btn-act", function() {
    uexWindow.evaluateScript("", 0, "openFilter();");
});
function loadData() {
    var time1 = new Date().format("HH:mm:ss");
    loadJson.levelText = "上次更新：" + time1;
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    var params = {
        'userId' : userInfo.id,
        'pageSize' : 12,
        'pageIndex' : pageIndex
    };
    var searchText = $("#searchText").val();
    if (searchText.length > 0) {
        params["key"] = encodeURI(searchText);
    }
    var category = $("#book_category").val();
    if (category.length > 0) {
        params["bookCategory"] = category;
    }
    var grade = $("#grade").val();
    if (grade.length > 0) {
        params["grade"] = grade;
    }

    var recommendLevel = $("#recommendLevel").val();
    if (recommendLevel.length > 0) {
        params["recommendLevel"] = recommendLevel;
    }
    common.ajax("/student/book", {
        params : JSON.stringify(params)
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        loadDic();
        if (!data.obj || !data.obj.list || data.obj.list.length == 0) {
            if (pageIndex == 1) {
                myPrompt.show("未找到相关图书~", "#bookList");
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
                objItem.attr("id", obj.id);
                objItem.removeClass("uhide");
                objItem.find(".book").attr("num", bookList.length);
                if (obj.image.length > 0) {
                    objItem.find("img").attr("src", _SERVER_ADDRESS + obj.image);
                }
                objItem.find(".name").html(obj.name);
                objItem.find(".score").html("<div class='ico_integral' style='width:1em;height:1em'></div>" + obj.score);
                objItem.find(".evaluate").html("(" + obj.evaluateScore + ")");
                objItem.find(".readNum").html(obj.hits + "人读过");

                objItem.on("click", function() {
                    var id = $(this).attr("id");
                    getBookInfoById(userInfo.id, id, function(data) {
                        getBookInfo();
                        bookInfo = data;
                        setBookInfo();
                        appcan.window.open("book_default", "book/book_default.html", 10);
                    }, null);

                })
                // var j = 0;
                // var star=obj.evaluateScore;
                // for (; j < parseInt(star/ 2); j++) {
                // objItem.find(".info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five");
                // }
                // star =Math.round(obj.evaluateScore-star);
                // if(star==1){
                // objItem.find(".info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five-half");
                // }

                lineObj.append(objItem);
                if (index == 3) {
                    $("#bookList").append(lineObj);
                    lineObj = $('<div class="ub ub-ac ub-pc ub-fh umar-t"  style="border-color:#DEDEDE;border-style:border-style:dashed"></div>');
                    index = 0;
                }

                bookList.push(obj);
            }
            if (index > 0) {
                for (; index < 3; index++) {
                    var objItem = $('<div class="ub ub-ac ub-pc ub-f1"><div style="width:' + itemSize + 'px"></div></div>');
                    lineObj.append(objItem);
                    $("#bookList").append(lineObj);
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

function search() {
    getCommInfo();
    $("#bookList").empty();
    pageIndex = 1;
    loadData();
}