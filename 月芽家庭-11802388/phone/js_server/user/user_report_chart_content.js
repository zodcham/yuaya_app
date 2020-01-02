var queryType = "1";
appcan.ready(function() {
    getUserInfo();
    getSysInfo();
    $("#main").removeClass("uhide");
    loadChartInfo();
});

//获取阅读图表数据
function loadChartInfo() {
    $("#divChart").empty();
    //queryType 查询方式类型['1':'按月统计' , '2':'按周统计'](*)
    //dataType 图表数据类型['1':'阅读积分' , '2':'阅读图书数量'](*)
    var dataType = "1";
    if (sysInfo.report.type == "2") {
        dataType = "2";
    }
    var params = {
        'userId' : userInfo.id,
        'beginDate' : sysInfo.report.startDate,
        'endDate' : sysInfo.report.endDate,
        "queryType" : queryType,
        "dataType" : dataType
    };
    common.ajax("/readingReport/getChatInfo", {
        params : JSON.stringify(params)
    }, function(data) {
        var myChart = echarts.init(document.getElementById('divChart'));

        option = {
            color : ['#3398DB'],
            tooltip : {
                trigger : 'axis',
                axisPointer : {// 坐标轴指示器，坐标轴触发有效
                    type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid : {
                left : '3%',
                right : '4%',
                bottom : '3%',
                containLabel : true
            },
            xAxis : [{
                type : 'category',
                data : data.obj.labels,
                axisTick : {
                    alignWithLabel : true
                }
            }],
            yAxis : [{
                type : 'value'
            }],
            series : [{
                name : sysInfo.report.name,
                type : 'bar',
                barWidth : '60%',
                data : data.obj.values
            }]
        };
        myChart.setOption(option);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    });
}

//

appcan.button(".switchItem", "btn-act", function() {
    var type = $(this).attr("value");
    if (type != queryType) {
        $(".switchItem").removeClass("bc-btn bc-text-head").addClass("sc-text");
        $(this).removeClass("sc-text").addClass("bc-btn bc-text-head");
        queryType = type;
        loadChartInfo();
    }
})