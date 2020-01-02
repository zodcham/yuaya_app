var nowDate;
var pageIndex = 1;
var reloadDate = "";
var loadDate = "";
scrollFcn();

appcan.ready(function() {
    getSysInfo();
    getUserInfo();
    loadData();
    nowDate = new Date();
    $(".beginDate").html((nowDate.getFullYear() - 1) + "-" + 1 + "-" + 1);
    $(".endDate").html(nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate());

    $("#beginDate").on("click", function() {
        var nDate = getformatDate($("#beginDate .beginDate").html());
        initCalendar(nDate, function(dateStr) {
            var date = getDateByStr(dateStr);

            $("#beginDate .beginDate").html(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            $("#divCalender").addClass("uhide");
        });

        $("#divCalender").removeClass("uhide");

    });
    $("#endDate").on("click", function() {
        var nDate = getformatDate($("#endDate .endDate").html());
        initCalendar(nDate, function(dateStr) {
            var date = getDateByStr(dateStr);
            $("#endDate .endDate").html(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            $("#divCalender").addClass("uhide");
        });

        $("#divCalender").removeClass("uhide");

    });
});

function loadData() {
    var params = {
        'userId' : userInfo.id,
        'schoolId' : userInfo.schoolId,
        dataType : '1',
        pageSize : '20',
        pageIndex : pageIndex,
        'beginDate' : $("#beginDate .beginDate").html(),
        'endDate' : $("#endDate .endDate").html()
    };
    common.ajax("/ranking/listClassAnalyse", {
        params : JSON.stringify(params)
    }, function(data) {
        pageIndex = 1;
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无分析~", "#dataContent");
            $(".rank-no-data").css("margin-top", "100px");
        } else {
            myPrompt.hide();
            var list = data.obj.list;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];

                    // 人均阅读字数(千)
                    var readWordCounts = obj.readWordCount / obj.studentCount;
                    var strContent1 = '<tr>' + '<th>' + obj.gradeName + '</th>' + '</tr>';
                    var strContent2 = '<tr>' + '<td>' + obj.clazzName + '</td>' + '<td>' + obj.studentCount + '</td>' + '<td>' + obj.readBookCount + '</td>' + '<td>' + obj.readBookCountAvg.toFixed(2) + '</td>' + '<td>' + obj.readWordCount + '</td>' + '<td>' + readWordCounts.toFixed(2) + '</td>' + '<td>' + obj.readStudentRate + '</td>' + '</tr>';
                    $("#class_left_table2").append(strContent1);
                    //添加左边固定列内容
                    $("#class_right_table2").append(strContent2);
                    //添加右边滚动内容
                }
            } else {
                toast("没有更多分析了~", config.toastTimeShort);
            }
        }
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

function scrollFcn() {
    //固定和滚动
    var right_div2 = document.getElementById("class_right_div2");
    right_div2.onscroll = function() {
        var right_div2_top = this.scrollTop;
        var right_div2_left = this.scrollLeft;
        document.getElementById("class_left_div2").scrollTop = right_div2_top;
        document.getElementById("class_right_div1").scrollLeft = right_div2_left;
    }
    //设置右边div宽度
    document.getElementById("class_right_div").style.width = "" + document.documentElement.clientWidth - 130 + "px";
    setInterval(function() {
        document.getElementById("class_right_div").style.width = "" + document.documentElement.clientWidth - 130 + "px";
    }, 0);
}

appcan.button("#btnSubmit", "btn-act", function() {
    //清除原来数据
    $("#class_right_table2,#class_left_table2").empty();
    loadData();
}); 