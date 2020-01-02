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

appcan.ready(function() {
    $("html").css('font-size',"24px");


    getUserInfo();
    getCommInfo();
    config.currentPath = "";

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

    // 切换排列方式
    var i = false;
    var temp1 = $(".item1");
    var temp2 = $(".item2");

    i = true;
    $(".smlb").css("background", "url(../css/icons/jgg.png)");
    $(".smlb").css("background-size", "100% 100%");
    $(".item1").remove();
    $(".body1").append(temp2);

    $('#switchMode').on('click', function() {
        if (i === false) {
            // alert('单击');
            i = true;
            $(".smlb").css("background", "url(../css/icons/jgg.png)");
            $(".smlb").css("background-size", "100% 100%");
            $(".item1").remove();
            $(".body1").append(temp2);

        } else {
            // alert('双击');nosee  .addClass
            i = false;
            $(".smlb").css("background", "url(../css/icons/lb.png)");
            $(".smlb").css("background-size", "100% 100%");
            $(".item2").remove();
            $(".body1").append(temp1);
        }
        reloadJson.levelText = "上次刷新：" + time1;
        uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
        $("#bookList").empty();
        pageIndex = 1;

        loadData();
    })


    $(".cs-select").on("change", function() {
        search();
    });
    $(".btnSearch").on("click", function() {

        search();
    })
    $(".btn_home").on("click", function() {
        rootopenPlayer();
        appcan.window.close(-1);
    })
    $("#mall").on("click", function() {
        search();
    })
    $("#yd").on("click", function() {
        appcan.window.open("yueduquan", "yueduquan/Reading_circle.html", 5);
        setTimeout(function(){ appcan.window.close(-1); }, 1000);
    })
    $("#ph").on("click", function() {
        appcan.window.open("Paihang", "Paihang.html", 5);
        setTimeout(function(){ appcan.window.close(-1); }, 1000);
    })
    $("#me").on("click", function() {
        appcan.window.open("person", "index_person.html", 5);
        setTimeout(function(){ appcan.window.close(-1); }, 1000);
    })

	$('#searchText').on('keypress',function(event){//监听sim卡回车事件
        if(event.keyCode == "13")    
        {  
            search();
        }
    });
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
        if (name == "grade") {
            if (commInfo.grade.length == 0) {
                commInfo.grade = [];

            }
            commInfo.grade[obj.value] = obj.label;
        } else if (name == "book_category") {
            if (commInfo.book_category.length == 0) {
                commInfo.book_category = [];

            }
            commInfo.book_category[obj.value] = obj.label;
        } else if (name == "recommendLevel") {
            if (commInfo.recommendLevel.length == 0) {
                commInfo.recommendLevel = [];

            }
            commInfo.recommendLevel[obj.value] = obj.label;
        }
    }
    setCommInfo();

    dicList[name] = list;
    if (name == "book_category") {
        for (var i = 0; i < $("#bookList").find(".item").length; i++) {
            var obj = $("#bookList").find(".item").eq(i);
            obj.find(".bookCategory").html(commInfo.book_category[obj.find(".bookCategory").attr("tag")]);
        }
    } else if (name == "recommendLevel") {
        for (var i = 0; i < $("#bookList").find(".item").length; i++) {
            var obj = $("#bookList").find(".item").eq(i);
            obj.find(".recommendLevel").html(commInfo.recommendLevel[obj.find(".bookCategory").attr("tag")]);
        }
    }

    loadDic();
}

appcan.button(".filter", "btn-act", function() {
    uexWindow.evaluateScript("", 0, "openFilter();");
});
function loadData() {
    if(CONNECTSTATUS_FLAG) {
        var time1 = new Date().format("HH:mm:ss");
        loadJson.levelText = "上次更新：" + time1;
        uexWindow.setBounceParams(1, JSON.stringify(loadJson));

        var params = {
            'userId' : userInfo.id,
            'pageSize' : 16,
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

        //var recommendLevel = $("#recommendLevel").val();
        var recommendLevel = "";
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
                for (var i = 0; i < data.obj.list.length; i++) {
                    var obj = data.obj.list[i];
                    var objItem = $("#item").clone();
                    objItem.attr("id", obj.id);
                    objItem.removeClass("uhide");
                    objItem.find(".book").attr("num", bookList.length);
                    if (obj.image.length > 0) {
                        objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
                    }
                    objItem.find(".name").html(obj.name);
                    objItem.find(".score").html(obj.score);
                    objItem.find(".readNum").html(obj.hits + "人读过");
                    objItem.find(".recommendTimes").html("推荐" + obj.recommendTimes + "次");
                    //objItem.find(".author").html("作者：" + obj.author);

                    objItem.find(".introduce").html(obj.remarks);

                    if (obj.programId.length > 0) {
                        objItem.find(".tag_read").removeClass("uhide");
                    }
                    if (obj.audioFile.length > 0) {
                        objItem.find(".tag_audio").removeClass("uhide");
                    }
                    if (obj.videoFile.length > 0 || obj.videoFile2.length > 0) {
                        objItem.find(".tag_video").removeClass("uhide");
                    }
                    if(obj.programId.length == 0 && obj.audioFile.length == 0 && obj.videoFile.length == 0 && obj.videoFile2.length == 0){
                        objItem.find(".introduce").removeClass("uhide");
                        objItem.find(".info_tag").addClass("uhide");
                    }
                    else{
                        objItem.find(".introduce").addClass("uhide");
                        objItem.find(".info_tag").removeClass("uhide");
                    }



                    objItem.find(".recommendLevel").attr("tag", obj.recommendLevel);
                    objItem.find(".bookCategory").attr("tag", obj.bookCategory);
                    if (obj.grade.length == 0) {
                        objItem.find(".grade").addClass("uhide");
                    } else {
                        objItem.find(".grade").html(commInfo.grade[Number(obj.grade)]);
                    }

                    if (obj.recommendLevel.length == 0) {
                        objItem.find(".recommendLevel").addClass("uhide");
                    } else {
                        objItem.find(".recommendLevel").html(commInfo.recommendLevel[obj.recommendLevel]);
                    }
                    if (obj.bookCategory.length == 0) {
                        objItem.find(".bookCategory").addClass("uhide");
                    } else {
                        objItem.find(".bookCategory").html(commInfo.book_category[obj.bookCategory]);
                    }

                    var j = 0;
                    var star = obj.score;
                    for (; j < parseInt(star / 2); j++) {
                        objItem.find("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five");
                    }
                    star = Math.round(obj.score - star);
                    if (star == 1) {
                        objItem.find("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five-half");
                    }

                    objItem.on("click", function() {
                        var id = $(this).attr("id");
                        getBookInfoById(userInfo.id, id, function(data) {
                            getBookInfo();
                            bookInfo = data;
                            setBookInfo();
                            appcan.window.open("book_default", "book_default.html", 5);
                        }, null);

                    })

                    $("#bookList").append(objItem);
                    bookList.push(obj);
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
    else{
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        loadDic();
        var start=16*(pageIndex-1);
        var end=16*(pageIndex-1)+16;
        newBookData=bookData.obj;

        var bookCategory=0;
        var bookGrade=0;
        var keywords='';
        var searchText = $("#searchText").val();
        if (searchText.length > 0) {
            keywords=searchText;
        }
        var category = $("#book_category").val();
        if (category.length > 0) {
            bookCategory = category;
        }
        var grade = $("#grade").val();
        if (grade.length > 0) {
            bookGrade = grade;
        }
        if(bookCategory>0 || bookGrade>0 || keywords.length>0) {
            newBookData = bookSearch(searchText, bookCategory, bookGrade);
        }
        for (var i = start; i < end; i++) {
            var obj = newBookData[i];

            var objItem = $("#item").clone();
            objItem.attr("id", obj.id);
            objItem.removeClass("uhide");
            objItem.find(".book").attr("num", bookList.length);
            if (obj.image.length > 0) {
                objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
            }
            objItem.find(".name").html(obj.name);
            objItem.find(".score").html(obj.score);
            objItem.find(".readNum").html(obj.hits + "人读过");
            objItem.find(".recommendTimes").html("推荐" + obj.recommendTimes + "次");
            //objItem.find(".author").html("作者：" + obj.author);

            objItem.find(".introduce").html(obj.remarks);
            objItem.find(".recommendLevel").attr("tag", obj.recommendLevel);
            objItem.find(".bookCategory").attr("tag", obj.bookCategory);
            if (obj.grade.length == 0) {
                objItem.find(".grade").addClass("uhide");
            } else {
                objItem.find(".grade").html(commInfo.grade[Number(obj.grade)]);
            }

            if (obj.recommendLevel.length == 0) {
                objItem.find(".recommendLevel").addClass("uhide");
            } else {
                objItem.find(".recommendLevel").html(commInfo.recommendLevel[obj.recommendLevel]);
            }
            if (obj.bookCategory.length == 0) {
                objItem.find(".bookCategory").addClass("uhide");
            } else {
                objItem.find(".bookCategory").html(commInfo.book_category[obj.bookCategory]);
            }

            var j = 0;
            var star = obj.score;
            for (; j < parseInt(star / 2); j++) {
                objItem.find("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five");
            }
            star = Math.round(obj.score - star);
            if (star == 1) {
                objItem.find("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five-half");
            }

            objItem.on("click", function() {
                var id = $(this).attr("id");
                if(CONNECTSTATUS_FLAG) {
                    getBookInfoById(userInfo.id, id, function (data) {
                        getBookInfo();
                        bookInfo = data;
                        setBookInfo();
                        appcan.window.open("book_default", "tv/book_default.html", 5);
                    }, null);
                }
                else{
                    getOfflineBookInfoById(id);
                }

            })

            $("#bookList").append(objItem);
            bookList.push(obj);
        }
    }

}

function search() {
    getCommInfo();
    $("#bookList").empty();
    pageIndex = 1;
    loadData();
}

function getOfflineBookInfoById(id){
    var list=bookData.obj;
    for(var i=0; i<list.length; i++)
    {
        if (list[i].id == id) {
            getBookInfo();
            bookInfo = data;
            setBookInfo();
            break;
        }
    }
    appcan.window.open("book_default", "tv/book_default.html", 5);
}

var newBookData = [];
function bookSearch(keyword,catalog, grade){
    var list=bookData.obj;
    var newJson=[];
    for(var i=0; i<list.length; i++)
    {
        var flag=1;
        if(keyword.length>0) {
            if ((list[i].name).indexOf(keyword) < 0) {
                flag=0;
            }
        }
        if(catalog>0){
            if ((list[i].bookCategory) != catalog) {
                flag=0;
            }
        }
        if(grade>0){
            if ((list[i].grade) != grade) {
                flag=0;
            }
        }
        if(flag==1){
            newJson.push(list[i]);
        }
    }
    return newJson;

}