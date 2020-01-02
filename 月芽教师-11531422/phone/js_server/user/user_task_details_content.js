var listData = {};
appcan.ready(function() {
    getUserInfo();
    getCommInfo();
    getBookInfo();
    loadData();

    $("#list_class").on("change", function() {
        loadView();
    });
});
// function loadLevle(){
// var params={ "type": 'reviewLeve'};
// common.ajax("/dict/getDictList", {
// params:JSON.stringify(params)
// }, function(data) {
//
// }, function(data){
// toast(getMsgByKey(data.msg),config.toastTimeShort);
// });
// }
function loadData() {
    var params = {
        'recommendId' : commInfo.recommendId
    };
    common.ajax("/recommend/get", {
        params : JSON.stringify(params)
    }, function(data) {
        listData = data.obj.clazz;
        $.each(listData, function(id) {
            $("#list_class").append("<option value='" + id + "'>" + listData[id].name + "</option>");
        });
        loadView();

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, null);
}

function loadView() {
    var classId = $("#list_class").val();
    // var recommend=data.obj.recommend;
    // if(recommend.bookImage.length>0){
    // $(".bookImg").attr("src",_SERVER_ADDRESS+recommend.bookImage);
    // }
    // $(".startDate").html(recommend.publishDate);
    // $(".endDate").html(recommend.endDate);
    // $(".status").html(recommend.finishState=="0"?"正在进行":"已结束");   listData=data.obj.clazz;

    $("#listview").empty();
    var classData = listData[classId];
    if (!classData) {
        myPrompt.show("无数据~", "#listview");
        return;
    }
    myPrompt.hide();
    for (var i = 0; i < classData.students.length; i++) {
        var obj = classData.students[i];
        var itemObj = $("#item").clone();
        itemObj.attr("num", i);
        itemObj.attr("reviewLevel", obj.reviewLevel);
        itemObj.attr("name", obj.studentName);
        itemObj.attr("classId", classId);
        itemObj.attr("bookReviewCount", obj.bookReviewCount);
        itemObj.attr("id", obj.studentId);
        if (i > 0) {
            itemObj.addClass("ubt");
        }
        itemObj.removeClass("uhide");
        itemObj.find(".studentName").html(obj.studentName);
        itemObj.find(".reviewStatus").html(obj.exerciseAccuracy.length == 0 ? "未测评" : (obj.exerciseAccuracy * 100) + "%");

        if (obj.recommend.isMustReview == "0") {
            if (obj.bookReviewCount > 0) {
                itemObj.find(".readFeeling").html("<div class='sc-text-red'>查看</div>");
            } else {
                itemObj.find(".readFeeling").html("非必写");
            }

            //itemObj.find(".readFeeling").addClass("sc-text");
        } else {
            if (obj.bookReviewCount > 0) {
                itemObj.find(".readFeeling").html("<div class='sc-text-red'>查看</div>");
            } else {
                itemObj.find(".readFeeling").html("必写");
            }
        }
        switch (obj.reviewLevel) {
        case "0":
            itemObj.find(".level").html("<div class='sc-text-red bc-text-head' style='border-radius:0.5em;padding:0.1em 0.2em'>差</div>");
            break;
		case "4":
            itemObj.find(".level").html("<div class='sc-text-red bc-text-head' style='border-radius:0.5em;padding:0.1em 0.2em'>合格</div>");
            break;
        case "1":
            itemObj.find(".level").html("<div class='sc-text-red bc-text-head' style='border-radius:0.5em;padding:0.1em 0.2em'>良</div>");
            break;
        case "2":
            itemObj.find(".level").html("<div class='sc-bg bc-text-head sc-text-warn' style='border-radius:0.5em;padding:0.1em 0.2em'>优</div>");
            break;
        default:
            itemObj.find(".level").html("无");
            break;

        }

        switch(obj.finishState) {
        case "0":
            itemObj.find(".taskStatus").html("进行中");
            break;
        case "1":
            itemObj.find(".taskStatus").html("完成");
            break;
        case "2":
            itemObj.find(".taskStatus").html("未完成");
            break;
        }
        $("#listview").append(itemObj);
    }

    $("#listview .item").on("click", function() {
        if (parseInt($(this).attr("bookReviewCount")) > 0) {
            var userId = $(this).attr("id");
            var userName = $(this).attr("name");
            commInfo.taskData = {
                "userId" : userId,
                "userName" : userName,
                "reviewLevel" : $(this).attr("reviewLevel")
            };
            setCommInfo();
            appcan.window.open("user_task_review", "user_task_review.html", 10);
        }
    })
}


function OpenPassword(){
    layer.open({
        style: 'border:none; background-color:#fff; color:#000;font-size:1em;',
        content: '<div class="ub ub-ver" style="background-color: #fff;"><div class="ub-f1 tx-l" style="height:3em;line-height: 3em;">请输入您的教师账户密码。</div><div class="ub-f1">' +
            '<input id="password_teacher" type="password" class="ub ub-fh ulev0" style="height: 2em;overflow: auto;border:1px solid #000">' +
            '</div></div>'
        ,btn: ['确定', '取消']
        ,yes: function(index){
            var psw=$("#password_teacher").val();
            if(psw.length>0) {
                getUserInfo();
                config.currentPath = "";
                var params = {
                    'username': userInfo.loginName,
                    'password': psw
                };
                common.ajax("/teacher/login", {
                    params: JSON.stringify(params)
                }, function (data) {
                    appcan.window.open("user_task_help", "user_task_help.html", 10);
                }, function (data) {
                    toast(getMsgByKey(data.msg), config.toastTimeShort);
                }, {
                    type: 'POST'
                });
            }
            layer.close(index);
        }
        ,success: function(elem){
            $("#password_teacher").focus();
        }
    });
}