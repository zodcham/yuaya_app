var reviewLevel;

appcan.ready(function() {
	isIPhoneX();
	
    getCommInfo();
    $("#title").html(commInfo.taskData.userName);
    reviewLevel = commInfo.taskData.reviewLevel;
    if (reviewLevel.length > 0) {
        //$("#btnSubmit").addClass("uhide");
        //$("#footer .score").eq(parseInt(reviewLevel)).addClass("bc-btn bc-text-head selected");
        $(".score").removeClass("bc-btn bc-text-head selected");
        $("#footer .score").each(function(idx, obj) {
            var value = $(obj).attr("value");
            if (Number(reviewLevel) == value) {
                //alert($(obj).attr("id"));
                $(obj).addClass("bc-btn bc-text-head selected");
            };
        })
    }
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "user_task_review_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})

appcan.button(".score", "btn-act", function() {
    //if (reviewLevel.length == 0) {
        $(".score").removeClass("bc-btn bc-text-head selected");
        $(this).addClass("bc-btn bc-text-head selected");
    //}
})

appcan.button("#btnSubmit", "btn-act", function() {
    if ($(".selected").length == 0) {
        toast("请选择评分", config.toastTimeShort);
        return;
    }
    var reviewLevel = $(".selected").attr("value");
    var params = {
        'recommendId' : commInfo.recommendId,
        'studentId' : commInfo.taskData.userId,
        'reviewLevel' : reviewLevel
    };
    alert(JSON.stringify(params));
    common.ajax("/bookReview/updateLevel", {
        params : JSON.stringify(params)
    }, function(data) {
		appcan.window.evaluateScript({
            name : "user_task_details", //窗口名称
            scriptContent : 'LoadPage();'
        });
        uexWindow.evaluatePopoverScript("user_task_student", "content", "updateData('" + reviewLevel + "');");
        appcan.window.close(-1);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
})