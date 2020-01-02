appcan.ready(function() {
    var date = new Date();
    $("#endDate").val(date.format("yyyy-MM"));
    //date.setMonth(date.getMonth() - 1);
    //$("#startDate").val(date.format("yyyy-MM"));
    $("#startDate").val("2017-01");
    getUserInfo();
    AddLogContent(userInfo.id, logKeys.HomeReadReport,{});
});
//我的任务
appcan.button(".btnTask", "btn-act", function() {
    $(".name").html('');
    $("#t3").html('<img src="../images/report/r3.png">');
    getCommInfo();
    commInfo.finishState = '';
    setCommInfo();
    appcan.window.open("user_read_taskss", "user_read_taskss.html", 5);
});

//
appcan.button(".search", "btn-act", function() {
    $(".name").html('');
    switch (Number($(this).attr("type"))) {
        case 1:
            $("#t1").html('<img src="../images/report/r1.png">');
            break;
        case 6:
            $("#t2").html('<img src="../images/report/r2.png">');
            break;
        case 4:
            $("#t4").html('<img src="../images/report/r4.png">');
            break;
        case 5:
            $("#t5").html('<img src="../images/report/r5.png">');
            break;
    }

    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    if (startDate.length == 0) {
        toast("请选择起始日期~", config.toastTimeShort);
        return;
    }
    if (endDate.length == 0) {
        toast("请选择截止日期~", config.toastTimeShort);
        return;
    }

    getSysInfo();
    sysInfo.report = {
        "type" : $(this).attr("type"),
        'startDate' : startDate,
        "endDate" : endDate,
        "name" : $(this).find(".name").text()
    };
    setSysInfo();
    appcan.window.open("user_report", "user_report.html", 5);
})