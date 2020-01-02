var yearFlag;
var pageIndex = 1;
var reloadDate = "";
var isbnType = '1';
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
var gradeType = '0';
var content1 = '0';
var content2 = '0';

appcan.ready(function() {


	var width_screen=document.body.clientWidth;
    var height_screen=document.body.clientHeight;

	
    getSysInfo();
    config.isMainWin = true;
    getUserInfo();
    getProgramInfo();

    var url= getLocVal("read_img_url");
    //$("#main_pic").attr("src",url);
    //$("#content1").append('<img src="'+url+'" style="100%;">');

    //loadData();
    AddLogContent(userInfo.id, logKeys.PPTOpenIndex,{});

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
    $(".box").on("click", function() {
        $(this).siblings("input").trigger("click");
        gradeType = $(this).attr("value");
        content1 = $(this).attr("value");
        // alert(gradeType);
        $("#reviewList1").empty();
        $("#reviewList2").empty();
        pageIndex = 1;
        myPrompt.hide();
        loadData();

        var content="选择"+gradeType+"年级";
        if(gradeType==0) content="选择全部";

        AddLogContent(userInfo.id, logKeys.PPTOpenIndex,{"content": content});

    });

    var swiper1 = new Swiper('.swiper1', {
        slidesPerView : 5.5,
        paginationClickable : false,
        spaceBetween : 13,
        freeMode : true,
        loop : false,
        onTab : function(swiper) {
            var n = swiper1.clickedIndex;
        }
    });
    swiper1.slides.each(function(index, val) {
        var ele = $(this);

        ele.on("click", function() {

            setCurrentSlide(ele, index);
            gradeType = index;
            content2 = index;
            $("#reviewList2").empty();
            pageIndex = 1;
            myPrompt.hide();
            loadData();
            swiper2.slideTo(index, 500, false);

            //mySwiper.initialSlide=index;
        });
    });
    function setCurrentSlide(ele, index) {
        $(".swiper1 .swiper-slide").removeClass("selected");
        ele.addClass("selected");
    }

    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    loadJson.levelText = "上次加载：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));

    switchs();
});

function refreshData() {
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));

    $("#reviewList1 .item").remove();
    $("#reviewList2 .item2").remove();

    pageIndex = 1;
    loadData();

}

function loadData() {

    if(CONNECTSTATUS_FLAG) {
        var params = {
            'programCategory' : '4',
            pageSize : '10',
            pageIndex : pageIndex,
            'grade' : gradeType,
            'month' : sysInfo.ranking.grade,
            'year' : sysInfo.ranking.report
        };
        common.ajax("/program/getProgramInfoMore", {
            params : JSON.stringify(params)
        }, function(data) {
            if (pageIndex == 1) {
                uexWindow.resetBounceView("0");
            } else {
                uexWindow.resetBounceView("1");
            }
            if (pageIndex == 1 && data.obj.count == 0) {
                myPrompt.show("内容将按时发布，敬请期待~~", "#reviewList1");
                $("#reviewList2").addClass("myPromptList");
            } else {
                $("#reviewList2").removeClass("myPromptList");
                myPrompt.hide();
                loadTypeList(data.obj.list);
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
    else {
        var data=readMonths;
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("内容将按时发布，敬请期待~~", "#reviewList1");
            $("#reviewList2").addClass("myPromptList");
        } else {
            $("#reviewList2").removeClass("myPromptList");
            myPrompt.hide();
            loadTypeList_offline(readMonths);
        }

    }

}


function loadTypeList_offline(data){
    var data=readMonths.obj;
    loadTypeList(data);
}


function loadTypeList(data){
    var list = data;
    for (var i = 0; i < list.length; i++) {

        var obj = list[i];
        //appcan.alert(obj.image);
        var objItem = $("#item").clone();
        objItem.removeClass("uhide");
        objItem.attr("id", obj.id);
        objItem.attr("bookId", obj.bookId);
        // 视频
        if (obj.videoFile.length > 0) {
            objItem.find("#videoFile").removeClass("uhide");
        }
        objItem.find(".ImagePoster").attr("src", _SERVER_ADDRESS + obj.posterImagePath);
        if (obj.remarks.length > 0) {
            objItem.find("#videoFile").removeClass("uhide");
        }

        // 音频
        if (obj.audioFile.length > 0) {
            // choose_audio_path

            objItem.find("#audioplay").removeClass("uhide");
        }
        //PPT
        objItem.attr("pptPath", obj.pptPath);
        if (obj.pptPath.length > 0) {
            objItem.find("#SlidePPT").removeClass("uhide");
        }
        objItem.find(".bookImage01").attr("src", _SERVER_ADDRESS + obj.image01);
        objItem.find(".bookImage02").attr("src", _SERVER_ADDRESS + obj.image02);

        objItem.find(".name").html(obj.name);
        objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
        objItem.find(".hits").html(obj.hits);
        objItem.find(".evaluateTimes").html(obj.evaluateTimes);
        objItem.find(".introduces").html(obj.introduce);

        //1精读，2泛读，3选读
        switch(obj.readType) {
            case "1":
                objItem.find(".mark").addClass("mark_essence");
                break;
            case "2":
                objItem.find(".mark").addClass("mark_extensive");
                break;
            case "3":
                objItem.find(".mark").addClass("mark_choose");
                break;
        }

        objItem.bind("click", function() {
            /*var id = $(this).attr("id");

            getProgramInfoById(id, function(data) {
                getProgramInfo();
                programInfo = data;
                setProgramInfo();
                appcan.window.open("Read_index", "Read_index.html", 5);

            }, null);*/


            var id = $(this).attr("id");
            var bookId = $(this).attr("bookId");
            getProgramInfoById(id, function(data) {
                getProgramInfo();
                programInfo = data;
                setProgramInfo();

                getBookInfoById(userInfo.id, bookId, function(bookdata) {
                    getBookInfo();
                    bookInfo = bookdata;
                    setBookInfo();
                    setLocVal("bookInfo_default","ppt")
                    appcan.window.open("book_default", "../tv/book_default.html", 5);
                }, null);

            }, null);

        });

        $("#reviewList1").append(objItem);

    }
    var list2 = data.obj.list;
    for (var j = 0; j < list.length; j++) {

        var obj2 = list2[j];
        var objItem2 = $("#item2").clone();
        objItem2.removeClass("uhide");
        objItem2.attr("id", obj2.id);
        // 视频
        if (obj2.videoFile.length > 0) {
            objItem2.find("#videoFile").removeClass("uhide");
        }
        objItem2.find(".ImagePoster").attr("src", _SERVER_ADDRESS + obj2.posterImagePath);
        if (obj2.remarks.length > 0) {
            objItem2.find("#videoFile").removeClass("uhide");
        }

        // 音频
        if (obj2.audioFile.length > 0) {
            // choose_audio_path

            objItem2.find("#audioplay").removeClass("uhide");
        }
        //PPT
        objItem2.attr("pptPath", obj2.pptPath);
        if (obj2.pptPath.length > 0) {
            objItem2.find("#SlidePPT").removeClass("uhide");
        }
        objItem2.find(".bookImage01").attr("src", _SERVER_ADDRESS + obj2.image01);
        objItem2.find(".bookImage02").attr("src", _SERVER_ADDRESS + obj2.image02);

        objItem2.find(".name").html(obj2.name);
        objItem2.find(".bookImage").attr("src", _SERVER_ADDRESS + obj2.image);
        objItem2.find(".hits").html(obj.hits);
        objItem2.find(".evaluateTimes").html(obj2.evaluateTimes);
        objItem2.find(".introduces").html(obj2.introduce);

        //1精读，2泛读，3选读
        switch(obj2.readType) {
            case "1":
                objItem2.find(".mark").addClass("mark_essence");
                break;
            case "2":
                objItem2.find(".mark").addClass("mark_extensive");
                break;
            case "3":
                objItem2.find(".mark").addClass("mark_choose");
                break;
        }

        objItem2.bind("click", function() {
            var id = $(this).attr("id");

            getProgramInfoById(id, function(data) {
                getProgramInfo();
                programInfo = data;
                setProgramInfo();
                appcan.window.open("read_index", "Read_index.html", 5);

            }, null);

        });

        $("#reviewList2").append(objItem2);
    }
}





//模式切换
var i = false;
function switchs() {
    if (i === false) {
        i = true;
        $("#content1").removeClass("uhide");
        $("#content2").addClass("uhide");
        $("#reviewList2 .item2").remove();
        gradeType = content1;

        $("#reviewList1").empty();
        $("#reviewList2").empty();
        pageIndex = 1;
        myPrompt.hide();
        loadData();
    } else {
        i = false;
        $("#content2").removeClass("uhide");
        $("#content1").addClass("uhide");
        $("#reviewList1 .item").remove();
        gradeType = content2;

        $("#reviewList1").empty();
        $("#reviewList2").empty();
        pageIndex = 1;
        myPrompt.hide();
        loadData();
    }
};