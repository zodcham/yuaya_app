appcan.ready(function() {
    getUserInfo();
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
        appcan.window.open("ranking_details", "ranking_details.html", 10);
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