var g_listHeight;
var g_SwiperParent;
var isClick = false;
var isOpenImg = false;
var question_category = {};
var g_TimeCount = 0;
var g_Timer;
var timecount_test=0;
var timestart_test=0;
var test_already=0;

appcan.ready(function() {
	var htm='';
    htm+='<div class="ub ub-f1 ub-ver tx-l" id="rules" style="color:#000;">';
    htm+='        <div class="ub ub-f1" style="font-size:1em;color:#666;">积分和财富规则：</div>';
    htm+='        <div class="ub ub-f1" style="font-size:0.8em;color:#666;">';
    htm+='            1、每本书每天有3次测评机会，第4次开始每次须消耗10个财富。<br>';
    htm+='            2、首次通过测评，将获得积分和财富。公式如下：<br>';
    htm+='            　　积分 = 正确率×书本的积分<br>';
    htm+='            　　财富 = 正确率×书本的积分×10<br>';
    htm+='            3、第二次及以上通过测评且正确率比之前高，您也能获得积分，公式如下：<br>';
    htm+='            　　积分 = (新的正确率-旧的正确率）×书本的积分<br>';
    htm+='            　　财富 = (新的正确率-旧的正确率）×书本的积分×10';
    htm+='        </div>';
    htm+=' </div>';
    $("#submitItem .swiper-slide").append(htm);
	
    getUserInfo();
    getBookInfo();
    loadDic();
    //$("#item .bookName").html(bookInfo.name);
    g_listHeight = $("#list_loading").height();
    $("#main").css("height", g_listHeight + "px");
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
            uexWindow.evaluateScript("", 0, "setPageIndex('" + (swiper.activeIndex + 1) + "','" + (swiper.slides.length - 1) + "')");
        }
    });
});

function loadDic() {
    var params = {
        "type" : "question_category"
    };
    common.ajax("/dict/getDictList", {
        params : JSON.stringify(params)
    }, function(data) {
        AddLogContent(userInfo.id, logKeys.TestStart,{"bookId":bookInfo.id});
        if(timestart_test==0) timestart_test=new Date().getTime();
        for (var i = 0; i < data.obj.length; i++) {
            var obj = data.obj[i];
            question_category[obj.value] = obj.label;
        }
        loadData();
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

appcan.button("#submitBtn", "btn-act", function() {
    if(userInfo.isActiveValidity==0 && userInfo.type!=2){
        appcan.alert({"title": "提示", "content": "您是普通会员，不能提交测试，请成为我们的VIP会员后再试，谢谢。"});
        return false;
    }


    var quesIds = "";
    var optionIds = "";
    var flag = false;
    $.each($(".ques"), function(i, obj) {
        quesIds += $(obj).attr("id") + "|";
        var type = $(obj).attr("type");
        var objItem = $(obj).find(".selected");
        if (objItem.length == 0) {
            optionIds += "|";
            flag = true;
        } else {
            if (type == "2") {
                $.each($(obj).find(".selected"), function(j, item) {
                    optionIds += $(item).attr("id") + ",";
                });
                optionIds = optionIds.substr(0, optionIds.length - 1);
                optionIds += "|";
            } else {
                optionIds += objItem.attr("id") + "|";
            }
        }
    });
    quesIds = quesIds.substr(0, quesIds.length - 1);
    optionIds = optionIds.substr(0, optionIds.length - 1);
    if (flag) {
        appcan.alert("提示", "还有未作答的题哦~", ["我要提交", "我在想想"], function(e, idx) {
            if (idx == 1) {
                return;
            }
            doSubmit(quesIds, optionIds);
        });

    } else {
        doSubmit(quesIds, optionIds);
    }

});
function doSubmit(quesIds, optionIds) {
    stopTimer();
    var params = {
        'userId' : userInfo.id,
        'bookId' : bookInfo.id,
        'questionIds' : quesIds,
        'optionIds' : optionIds
    };
    common.ajax("/exercise/saveExercise", {
        params : JSON.stringify(params)
    }, function(data) {
        //console.log(JSON.stringify(data));

        timecount_test = new Date().getTime() - timestart_test;
        AddLogContent(userInfo.id, logKeys.TestEnd,{"bookId":bookInfo.id, "timecount":timecount_test});
        test_already=1;
        $(".answerView li").unbind("touchstart");
        $(".answerInfo").removeClass("uhide");
        $(".t_accuracy").html(data.obj.rightQuantity);
        $(".a_accuracy").html("/" + data.obj.quantity + "道");
        $(".submitDiv").addClass("uhide");
		$("#rules").addClass("uhide");
        $(".sunmitTip").removeClass("uhide");
        //
        $("#submitItem .lbl[idx]").removeClass("done").addClass("right");
        $("#main .analyzeDiv").html("回答正确！");
        for (var i = 0; i < data.obj.errorQuestions.length; i++) {
            var obj = data.obj.errorQuestions[i];
            $("#lbl_" + obj.id).removeClass("right").addClass("wrong");
            $("#" + obj.id + " .analyzeDiv").html("回答错误！");
            // for(var j = 0 ; j < obj.questionOptionList.length ; j ++)
            // {
            // var option = obj.questionOptionList[j];
            // if($("#"+option.id).hasClass("square"))
            // {
            // //多选
            // if(option.isRight=="1")
            // {
            // if(option.isChoose=="1")
            // {
            // $("#"+option.id).find(".item").addClass("gree-item");
            // }
            // else
            // {
            // $("#"+option.id).find(".item").addClass("gree-red-item");
            // }
            // }
            // else
            // {
            // if(option.isChoose=="1")
            // {
            // $("#"+option.id).find(".item").addClass("red-item");
            // }
            // }
            // }
            // else{
            // if(option.isRight =="1"){
            // $("#"+option.id).removeClass("selected").find(".item").addClass("gree-item");
            // }else{
            // if(option.isChoose =="1"){
            // $("#"+option.id).removeClass("selected").find(".item").addClass("red-item");
            // }
            // }
            // }
            // }
        }
        $(".score").html((data.obj.rightQuantity / data.obj.quantity * 100).toFixed(0));
        $(".answerView .selected").removeClass("selected").find(".item").addClass("gree-item");
		
        var test_count=Number(data.obj.exerciseTimes); //测试的次数
        var add_gold=Number(data.obj.addGlod);  //获得财富
        var add_score=Number(data.obj.addScore); //获得积分
        var html='';
        if(test_count<=3){
            html='<div class="ub ub-ac ub-pc umar-t " style="color:#666666;font-size:0.9em;">通过这次测评，您获得 '+ add_gold +' 财富 和 '+ add_score +' 积分。</div>;';
        }
        else{
            html='<div class="ub ub-ac ub-pc umar-t " style="color:#666666;font-size:0.9em;">您此次测评是第 '+ test_count +'次，已扣除 10 财富。<br>说明: 如果测评超过3次，每次将扣除10财富。</div>;';
        }
        $(".accuracy-box").append(html);
		
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
}

function loadData() {
    var params = {
        'userId' : userInfo.id,
        'bookId' : bookInfo.id
    };
    common.ajax("/exercise/getExerciseQuestionList", {
        params : JSON.stringify(params)
    }, function(data) {

        if(data.attributes.isTodayOverrun){
            //toast("您每天的3次测评机会已用完，第4次开始将扣除10财富值。", config.toastTimeShort);
            alert("每天3次免费的测评次数已用完，第4次开始将扣除10点财富值。次日恢复3次免费测评次数。");
        }
        
        if (data.obj) {
            //bookId：图书id，
            //title：题目标题，
            //type：题目类型（1=单选题、2=多选题、3=判断题），
            //questionCategory：题目分类 (字典： question_category)，
            //questionOptionList ：[{content：选项内容， isRight：是否正确答案(1:正确,0:错误)，sort：排序}]
            createView(data.obj);
        } else {
            g_SwiperParent.removeSlide(0);
            myPrompt.show();
        }
        
    }, function(data) {
        alert("您每天的3次测评机会已用完，您的财富值不足以继续测评。");
        appcan.window.evaluateScript({
            name : "book_review", //窗口名称
            scriptContent : 'appcan.window.close(5);'
        });

    }, null);
}

function createView(data) {
    var i = 0;
    var divSubmit = '<div class=" ub ub-ac tx-c">';
    for (; i < data.length; i++) {
        var obj = data[i];
        var objItem = $("#item").clone();
        objItem.removeClass("uhide");
        objItem.attr("id", obj.id);
        objItem.attr("idx", i);
        objItem.attr("type", obj.type);
        objItem.addClass("ques scroll_" + i);
        var typeName = "<span class='ub' style='color:#ff8000'>";
        switch(obj.type) {
        case "1":
            typeName += "【单】"
            break;
        case "2":
            typeName += "【多】";
            break;
        case "3":
            typeName += "【判】";
            break;
        }
        typeName += "</span>";
        objItem.find(".pageNum").html((i + 1) + "/" + data.length);
        objItem.find(".titleName").html("考查" + question_category[obj.questionCategory] + "能力");
        objItem.find(".typeNamess").html("<div class='ub'>" + "测试题目类型:" + typeName + "</div>");
        objItem.find(".titleDiv").html("<div class='ub'>" + obj.title + "</div>");
        for (var j = 0; j < obj.questionOptionList.length; j++) {
            var item = obj.questionOptionList[j];
            var li = $('<li id="' + item.id + '" class="ubb bc-border ' + ((obj.type == "2") ? "square" : "circular") + '"><div class="item" data-line="' + getLetterByNum(j + 1) + '" isRight="' + item.isRight + '">' + item.content + '</div></li>');
            objItem.find(".answerView").append(li);

        }
        g_SwiperParent.appendSlide(objItem);

        //交卷列表
        if (i != 0 && i % 5 == 0) {
            divSubmit += '</div>';
            divSubmit += '<div class=" ub ub-ac tx-c" >';
        }
        divSubmit += '<span id="lbl_' + obj.id + '" class="lbl umar-a" idx="' + i + '">' + (i + 1) + '</span>';

    }
    //交卷列表最后一行不满5个补全
    while (i % 5 != 0) {
        divSubmit += '<span class="lbl umar-a" style="border:0.1em solid rgba(0,0,0,0)">&nbsp;</span>';
        i++;
    }
    //添加提交页面

    g_SwiperParent.appendSlide($("#submitItem"));
    $("#submitItem").removeClass("uhide");
    $("#submitItem .sheet").append($(divSubmit));
    $("#submitItem .lbl").bind("click", function() {
        g_SwiperParent.slideTo(Number($(this).attr("idx")), 500, false);
        setTimeout(function() {
            uexWindow.evaluateScript("", 0, "setPageIndex('" + (g_SwiperParent.activeIndex + 1) + "','" + (g_SwiperParent.slides.length - 1 ) + "')");
        }, 500);
    });

    $(".answerView li").bind("touchstart", function() {
        isClick = true;
    }).bind("touchmove", function() {
        isClick = false;
    }).bind("touchend", function() {
        if (!isOpenImg && isClick) {
            if ($(this).hasClass("circular")) {
                $(this).siblings(".selected").removeClass("selected");
                $(this).addClass("selected");
                $("#submitItem #lbl_" + $(this).parents(".ques").attr("id")).addClass("done");
                //下一题
                // setTimeout(function() {
                // g_SwiperParent.slideNext();
                // }, 200);
            } else {
                $(this).toggleClass("selected");
                if ($(this).parent().find(".selected").length > 0) {
                    $("#submitItem #lbl_" + $(this).parents(".ques").attr("id")).addClass("done");
                } else {
                    $("#submitItem #lbl_" + $(this).parents(".ques").attr("id")).removeClass("done");
                }
            }
        }
        isClick = false;
    });

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
    uexWindow.evaluateScript("", 0, "setPageIndex('" + (g_SwiperParent.activeIndex + 1) + "','" + (g_SwiperParent.slides.length - 1 ) + "')");
    startTime();
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

function startTime() {
    g_TimeCount = 0;
    g_Timer = setInterval("setTime()", 1000);
}

function stopTimer() {
    clearInterval(g_Timer);
}

function setTime() {
    g_TimeCount++;
    $(".time").html(formatSeconds(g_TimeCount));
}

function goSheet() {
    g_SwiperParent.slideTo(g_SwiperParent.slides.length - 1, 500, false);
}