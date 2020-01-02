appcan.ready(function() {
    getUserInfo();
    if(Number("0"+userInfo.permissions)=="1"){
        $(".school_analysis").removeClass("uhide");
    }
    if(Number("0"+userInfo.permissions)=="2"){
        $(".all_school").removeClass("uhide");
    }
    
    loadClass();
    $(".item").on("click", function() {
        if (userInfo.clazzIds == "") {
            toast("正在加载数据，请稍后...", config.toastTimeShort);
            return;
        }
        var rankingType = $(this).attr("rankingType");
        var rankingName = $(this).find(".name").html();
        getSysInfo();
        sysInfo.ranking = {
            "rankingType" : rankingType,
            "rankingName" : rankingName
        };
        setSysInfo();
        appcan.window.open("ranking_details", "ranking/ranking_details.html", 10);
    });
    $(".student_analysis").on("click", function() {
        appcan.window.open("class_analysis", "ranking/student_analysis.html", 10);
    });
    $(".teacher_analysis").on("click", function() {
        appcan.window.open("class_analysis", "ranking/teacher_analysis.html", 10);
    });
    $(".class_analysis").on("click", function() {
        appcan.window.open("class_analysis", "ranking/class_analysis.html", 10);
    });
    $(".school_analysis").on("click", function() {
        setLocVal("charts_school_id",userInfo.schoolId);
        appcan.window.open("school_analysis", "ranking/school_analysis.html", 10);
    });
    $(".all_school").on("click", function() {
        appcan.window.open("all_school_list", "ranking/all_school_list.html", 10);
    });
    $(".itembtn").on("click", function() {
        toast("新功能即将上线~~", config.toastTimeShort);
    });
});
function loadClass() {
    var params = {
        'userId' : userInfo.id
    };
    common.ajax("/teacher/myClazz", {
        params : JSON.stringify(params)
    }, function(data) {
        var classList = [];
        for (var i = 0; i < data.obj.length; i++) {
            var obj = data.obj[i];
            classList.push({
                'id' : obj.id,
                'name' : obj.name
            });
        }
        userInfo.clazzIds = classList;
        setUserInfo(false);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}