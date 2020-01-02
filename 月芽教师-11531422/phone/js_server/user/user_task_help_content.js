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
        var imgUrl=_SERVER_ADDRESS+obj.studentPhoto;
        itemObj.find(".studentPhoto").html('<img src="'+imgUrl+'" style="width:2.5em;border-radius:1.25em;">');
        itemObj.find(".reviewStatus").html(obj.exerciseAccuracy.length == 0 ? "未测评" : (obj.exerciseAccuracy * 100) + "%");

        //itemObj.find(".readFeeling").html("<div class='sc-text-red'>查看</div>");

        $("#listview").append(itemObj);
    }

    $("#listview .item").on("click", function() {
            var userId = $(this).attr("id");
            var userName = $(this).attr("name");
            var bookId=commInfo.bookInfo.bookId;
            var recommendId=commInfo.recommendId;

            
            var title = "身份确定";
            var content = "你是 "+userName+" 同学吗？";
            var callback = function(err, data, dataType, optId) {
                if (Number(data) == 0) {
                    return false;
                } else {
                    commInfo.taskData = {
                        "userId" : userId,
                        "userName" : userName,
                        "bookId":bookId,
                        "recommendId":recommendId,
                        "reviewLevel" : $(this).attr("reviewLevel")
                    };
                    setCommInfo();
                    appcan.window.open("user_task_help_review", "user_task_help_review.html", 10);
                }
            }
            appcan.window.alert(title, content, ['不是，取消测评', '是的，开始测评'], callback);
            
    })
}


function task_del(id, date) {
    
}



function OpenPassword(){
    layer.open({
        style: 'border:none; background-color:#fff; color:#000;font-size:1em;',
        content: '<div class="ub ub-ver" style="background-color: #fff;"><div class="ub-f1 tx-l" style="height:3em;line-height: 3em;">请输入您的教师账户密码。</div><div class="ub-f1">' +
            '<input id="password" type="password" class="ub ub-fh ulev0" style="height: 2em;overflow: auto;border:1px solid #000">' +
            '</div></div>'
        ,btn: ['确定', '取消']
        ,yes: function(index){
            var psw=$("#password").val();
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
                    appcan.window.evaluateScript({
                        name:'user_task_help',
                        scriptContent:'appcan.window.close(-1);'
                    });
                }, function (data) {
                    toast(getMsgByKey(data.msg), config.toastTimeShort);
                }, {
                    type: 'POST'
                });
            }
            layer.close(index);
        }
        ,success: function(elem){
            setTimeout(function(){
                $("#password").focus();
            }, 100);
        }

    });
}