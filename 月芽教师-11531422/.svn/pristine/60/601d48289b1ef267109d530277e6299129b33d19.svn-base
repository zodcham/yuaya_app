var readFeeling = {};
var pic_arr=[];
appcan.ready(function() {
    $("#item").addClass("item").addClass("ub-ver").attr("style","width:95%; border-radius:0.3em;border:0.06em solid #ccc;margin:0.5em auto 0 auto;background-color:#fff;")
    $("#item .ub-ver .ub-fh .ub-f1").html('<div class="ub ub-ac ub-pc bc-btn bc-text-head addcomment" style="width:5em; height:2em;font-size:0.8em; border-radius:0.2em;">添加点评</div>');



    loadData();
});
function loadData() {
    getUserInfo();
    getBookInfo();
    getCommInfo();
    $("#divIntroduceBox").empty();

    readFeeling = commInfo.bookInfo.readFeeling;
    var params = {
        'bookId' : commInfo.bookInfo.bookId,
        "studentId" : commInfo.taskData.userId
    };
    common.ajax("/bookReview/list", {
        params : JSON.stringify(params)
    }, function(data) {
        for (var i = 0; i < data.obj.length; i++) {
            var obj = data.obj[i];
            var objItem = $("#item").clone();
            objItem.attr("id", obj.id);
            objItem.removeClass("uhide");
            objItem.find(".time").html("发表于：" + obj.createDateText);
            objItem.find(".content").html(obj.content);
            objItem.find(".addcomment").on("click", function() {
                var id = $(this).parents(".item").attr("id");
                var title = "点评读后感";
                var content = $(this).parents(".item").attr("content");
                var callback = function(err, data, dataType, optId) {
                    if (Number(data.index) == 0) {
                        if (data.data.length == 0) {
                            toast("请输入您的点评。", config.toastTimeShort);
                            return;
                        }
                        var params = {
                            'reviewId' : id,
                            'userId' : userInfo.id,
                            'content' : data.data,
                            'isTeacher':1
                        };
                        common.ajax("/reviewComment/save", {
                            params : JSON.stringify(params)
                        }, function(data) {
                            toast(getMsgByKey("您的点评已提交成功。"), config.toastTimeShort);
                            loadData();
                        }, function(data) {
                            toast(data.msg, config.toastTimeShort);
                        }, {
                            type : "POST"
                        }, null);

                    }
                }
                appcan.window.prompt(title, content, '', ['确定', '取消'], callback);

            })

            for (var j = 1; j < 4; j++) {
                if (obj["image0" + j].length > 0) {
                    pic_arr.push(_SERVER_ADDRESS + obj["image0" + j]);
                }
            }

            for (var j = 1; j < 4; j++) {
                if (obj["image0" + j].length > 0) {
                    var divImg = $("<div style='width:5em;height:5em' class='umar-r' onclick='OpenOneImages()'><img src='" + _SERVER_ADDRESS + obj["image0" + j] + "' style='width:100%;height:100%'></div>");
                    objItem.find(".imgs").append(divImg);
                }
            }

            //教师点评或同学回复
            if(obj.replyList.length>0){
                var htm='<div class="ub ub-f1 ub-ver ub-fh commentlist " style="">';
                $.each(obj.replyList, function(idx, obj1) {
                    htm+='<div class="ub ub-f1 ub-ver uinn ub-fh" style="border-top:0.06em solid #ccc;width:90%;margin:0em auto 0 auto;">';
                    if(obj1.isTeacher==1)
                        htm+='<div class="ub ub-fh ub-ver comment ulev-1"><span class="teacher_name" style="color:blue;">'+obj1.userName+'(老师)点评：</span></div>';
                    else
                        htm+='<div class="ub ub-fh ub-ver comment ulev-2" style="color:#999;"><span class="teacher_name">'+obj1.userName+'</span>：</div>';
                    htm+='<div class="ub ub-fh imgs umar-t ulev-1 sc-text" style="color:#000;">'+obj1.content+'</div>';
                    htm+='<div class="ub ub-fh imgs umar-t ulev-2 sc-text" style="color:#999;">'+obj1.createDate+'</div>';
                    htm+='</div>';
                });
                htm+='</div>';
                objItem.append(htm);
            }


            //var html='<div class="ub ub-ac ub-pc bc-btn bc-text-head addcomment" style="width:5em; height:2em;font-size:0.8em; border-radius:0.2em;">添加点评</div>';

            //objItem.find(".time").before(htm);

            $("#divIntroduceBox").append(objItem);
        }

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}


function OpenOneImages(){
    var data = {
        displayActionButton : true,
        displayNavArrows : true,
        enableGrid : true,
        startIndex : 0,
        data : pic_arr
    }
    var json = JSON.stringify(data);

    var callback= function(){
        uexWindow.setOrientation(1);
    };


    uexImage.openBrowser(json,callback);

}
