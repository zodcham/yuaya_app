var g_listHeight;
var g_SwiperParent;
var isClick = false;
var isOpenImg = false;
var question_category = {};
var g_TimeCount = 0;
var g_Timer;
// var image1;
var dataArra;
appcan.ready(function() {
	$(".image").css("height","");
    getUserInfo();
    getProgramInfo();

    loadData();
    //$("#item .bookName").html(bookInfo.name);
    g_listHeight = $("#list_loading").height();
    g_SwiperParent = new Swiper('.swiper-parent', {
        autoHeight : true,
        spaceBetween : 20,
        observer : false,
        observeParents : true,
        onlyExternal : true,
        direction : 'horizontal',
        onInit : function(swiper) {

        },
        onTransitionEnd : function(swiper) {
            uexWindow.evaluateScript("", 0, "setPageIndex('" + (swiper.activeIndex + 1) + "','" + (swiper.slides.length) + "')");
        }
    });
});

function loadData() {
    var params = {
        'userId' : userInfo.id,
        'programId' : programInfo.id
    };

    common.ajax("/exercise/getProgramQuestionList", {
        params : JSON.stringify(params)
    }, function(data) {

        dataArra = data.attributes.dataArray;

        if (data.obj) {
            //bookId：图书id，
            //title：题目标题，
            //type：题目类型（1=单选题、2=多选题、3=判断题），
            //questionCategory：题目分类 (字典： question_category)，
            //questionOptionList ：[{content：选项内容， isRight：是否正确答案(1:正确,0:错误)，sort：排序}]
            createView5(data.obj);
            //先加载5条数据，提高显示速度
            createView(data.obj);
        } else {
            g_SwiperParent.removeSlide(0);
            myPrompt.show();
        }
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, null);
}

function createView5(data) {//先加载5条数据，提高显示速度

    var i = 0;
    for (; i < 5; i++) {
        if (data[i].length <= 0)
            break;
        var obj = data[i];
        var objItem = $("#item").clone();
        objItem.removeClass("uhide");
        objItem.attr("id", obj.id);
        objItem.attr("idx", i);
        objItem.attr("type", obj.type);
        objItem.addClass("ques scroll_" + i);

        //标题
        objItem.find(".titleDiv").html("<div class='ub txt-ellipsis'>" + obj.title + "</div>");
        //图片

        objItem.find(".image").attr("src", _SERVER_ADDRESS + obj.image01);
        objItem.find(".image").on("click", function() {
            openBrowser();
        });
        g_SwiperParent.appendSlide(objItem);
    }

    $.each($(".scroll"), function(idx, n) {
        var swiper = new Swiper('.scroll_' + $(n).attr("idx") + ' .swiper-container', {
            scrollbar : '.swiper-scrollbar',
            direction : 'vertical',
            slidesPerView : 'auto',
            mousewheelControl : true,
            freeMode : true
        });
    });
}

function createView(data) {

    var i = 5;
    for (; i < data.length; i++) {
        if (data[i].length <= 0)
            break;
        var obj = data[i];
        var objItem = $("#item").clone();
        objItem.removeClass("uhide");
        objItem.attr("id", obj.id);
        objItem.attr("idx", i);
        objItem.attr("type", obj.type);
        objItem.addClass("ques scroll_" + i);
        // var typeName = "<span class='ub' style='color:#ff8000'>";
        // switch(obj.type) {
        // case "1":
        // typeName += "【单】"
        // break;
        // case "2":
        // typeName += "【多】";
        // break;
        // case "3":
        // typeName += "【判】";
        // break;
        // }
        // typeName+="</span>";
        // objItem.find(".titleName").html("考查"+question_category[obj.questionCategory]+"能力");

        //  objItem.find(".typeNames").html("<div class='ub'>" +"测试题目类型:"+ typeName + "</div>");

        //标题
        objItem.find(".titleDiv").html("<div class='ub txt-ellipsis'>" + obj.title + "</div>");
        //图片

        objItem.find(".image").attr("src", _SERVER_ADDRESS + obj.image01);
        // objItem.find(".image1").html(_SERVER_ADDRESS+obj.image01);
        objItem.find(".image").on("click", function() {
            // uexWindow.setOrientation(2);
            openBrowser();
        });
        // for (var j = 0; j < obj.questionOptionList.length; j++) {
        // var item = obj.questionOptionList[j];
        // var li = $('<li id="' + item.id + '" class="ubb bc-border ' + ((obj.type == "2") ? "square" : "circular") + '"><div class="item" data-line="' + getLetterByNum(j + 1) + '" isRight="' + item.isRight + '">' + item.content + '</div></li>');
        // if (item.isRight == "1") {
        // li.addClass("selected");
        // }
        // objItem.find(".answerView").append(li);
        // }
        g_SwiperParent.appendSlide(objItem);
    }

    $.each($(".scroll"), function(idx, n) {
        var swiper = new Swiper('.scroll_' + $(n).attr("idx") + ' .swiper-container', {
            scrollbar : '.swiper-scrollbar',
            direction : 'vertical',
            slidesPerView : 'auto',
            mousewheelControl : true,
            freeMode : true
        });
    });
    g_SwiperParent.removeSlide(0);
    uexWindow.evaluateScript("", 0, "setPageIndex('" + (g_SwiperParent.activeIndex + 1) + "','" + (g_SwiperParent.slides.length ) + "')");
}

//打开图片浏览器
function openBrowser() {
    // alert(dataArra);
    var data = {
        displayActionButton : false,
        displayNavArrows : true,
        enableGrid : true,
        //startOnGrid:true,
        startIndex : 0,
        data : dataArra

    }
    // alert(data.data);
    var json = JSON.stringify(data);
    // alert(json);
    uexImage.openBrowser(json);
}

function getLetterByNum(n) {
    return String.fromCharCode(64 + parseInt(n));
}

function doPre() {
    g_SwiperParent.slidePrev();
}

function doNext() {
    g_SwiperParent.slideNext();
}

function goSheet() {
    g_SwiperParent.slideTo(g_SwiperParent.slides.length - 1, 500, false);
}
