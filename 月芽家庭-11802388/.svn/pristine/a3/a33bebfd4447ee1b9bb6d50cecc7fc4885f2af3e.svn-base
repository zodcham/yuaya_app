appcan.ready(function() {
    getUserInfo();
});

appcan.button("#addUser", "btn-act", function() {
    uexWindow.evaluateScript("", 0, "openAddUserView();");
});

function addUser(returnList) {
    var rStudentList = JSON.parse(returnList);
    for (var i = 0; i < rStudentList.length; i++) {
        var obj = rStudentList[i];
        if ($("#" + obj.id).length == 0) {
            var objItem = $("#item").clone();
            objItem.attr("id", obj.id);
            objItem.removeClass("uhide");
            objItem.css("cssText", "display:inline-table !important");
            objItem.find(".name").html(obj.name);
            objItem.find(".delete").on("click", function() {
                $(this).parents(".item").remove();
            })
            $("#userList").append(objItem);
        }
    }
}

function send() {
    if ($("#userList .item").length == 0) {
        toast("请选择收件人~", config.toastTimeShort);
        return;
    }
    var msg = $("#sendMsg").val();
    if (msg.length == 0) {
        toast("请输入消息内容~", config.toastTimeShort);
        return;
    } else if (msg.length > 200) {
        toast("消息内容不能过200个字~", config.toastTimeShort);
        return;
    }
    var studentIds = "";
    $.each($("#userList .item"), function(n, obj) {
        studentIds += $(obj).attr("id") + "|";
    });
    studentIds = studentIds.substring(0, studentIds.length - 1);
    var params = {
        'userId' : userInfo.id,
        'content' : msg,
        'studentIds' : studentIds
    };
    common.ajax("/message/send", {
        params : JSON.stringify(params)
    }, function(data) {
        toast("发送成功~", config.toastTimeShort);
        uexWindow.evaluateMultiPopoverScript("message_list", "content", "send", "refreshData();");
        setTimeout(function() {
            uexWindow.evaluateScript("", 0, "exit();");
        }, config.toastTimeShort - 500);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
}