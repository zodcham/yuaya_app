var clazzId;
appcan.ready(function() {
    getUserInfo();
    getCommInfo();
    loadClass();

    $("#list_class").on("change", function() {
        loadData();
    });
});
function loadClass() {
    var params = {
        'userId' : userInfo.id
    };
    common.ajax("/teacher/myClazz", {
        params : JSON.stringify(params)
    }, function(data) {
        for (var i = 0; i < data.obj.length; i++) {
            var obj = data.obj[i];
            if (i == 0) {
                clazzId = obj.id;
            }
            $("#list_class").append("<option value='" + obj.id + "'>" + obj.name + "</option>");
        }
        loadData();
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

function loadData() {
    $("#listview").empty();
    clazzId = $("#list_class").val();
    var params = {
        'clazzId' : clazzId
    };
    common.ajax("/clazz/getStudentList", {
        params : JSON.stringify(params)
    }, function(data) {
        if (!data.obj || data.obj.length == 0) {
            myPrompt.show("暂无学生", $("#listview"));
        } else {
            myPrompt.hide();
            for (var i = 0; i < data.obj.length; i++) {
                var obj = data.obj[i];
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", obj.id);
                if (obj.photo.length > 0) {
                    objItem.find(".userPhoto").attr("src", getHeadImageUrl(obj.photo));
                }
                objItem.find(".name").html(obj.name);
                objItem.find(".className").html("[" + obj.schoolName + "]  " + obj.clazzName);
                objItem.find(".money").html(obj.scoreCount);
                objItem.find(".integral").html(obj.goldCount);
                objItem.find(".readNum").html(obj.readBookCount);
                objItem.find(".readFeelingNum").html(obj.reviewCount);
                $("#listview").append(objItem);
            }
            $("#listview .item").on("click", function() {
                var id = $(this).attr("id");
                getCommInfo();
                commInfo.studentId = id;
                setCommInfo();
                appcan.window.open("student_info", "../student/student_info.html", 10);
            });
        }
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, null);
}