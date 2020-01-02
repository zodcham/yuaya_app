var chartWidth;
var fs = 25;
appcan.ready(function() {
    getUserInfo();
    getSysInfo();
    chartWidth = $("#main").width() * 0.8;
    $(".charts").css("width", chartWidth + "px").css("height", chartWidth + "px");
    fs = (window.screen.width / 800) * 25;
    loadInfo();
    AddLogContent(userInfo.id, logKeys.ReportAbility,{});
});

//根据查询信息获取阅读报告情况
function loadInfo() {
    var params = {
        'userId' : userInfo.id,
        'beginDate' : sysInfo.report.startDate,
        'endDate' : sysInfo.report.endDate
    };
    common.ajax("/readingReport/get", {
        params : JSON.stringify(params)
    }, function(data) {
        createChatInfo(data.obj.courseStandardChatInfo, "从小学语文课程标准维度分析", "courseStandard");
        createChatInfo(data.obj.literatureAppreciateChatInfo, "从儿童文学鉴赏维度分析", "literatureAppreciate");
        createChatInfo(data.obj.cognizeFeelChatInfo, "从儿童阅读认知心理学维度分析", "cognizeFeel");
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    });

}

//从小学语文课程标准维度分析
//从儿童文学鉴赏维度分析
//从儿童阅读认知心理学维度分析
function createChatInfo(data, name, id) {
    var myChart = echarts.init(document.getElementById(id));
    var indicator = [];
    var maxValue = 0,
        minValue = 0;
    for (var i = 0; i < data.values.length; i++) {
        var value = data.values[i];
        if (maxValue < value) {
            maxValue = value;
        }
        if (minValue > value) {
            minValue = value;
        }
    }
    for (var i = 0; i < data.labels.length; i++) {
        indicator.push({
            text : data.labels[i],
            min : minValue,
            max : maxValue
        });
    }
    var option = {
        tooltip : {
            trigger : 'axis'
        },
        radar : [{
            name : {
                show : true,
                formatter : '{value}',
                textStyle : {
                    fontSize : fs,
                    color : "#ff7f50"
                }
            },
            indicator : indicator,
            radius : chartWidth / 3,
            center : ['50%', '50%'],
        }],
        series : [{
            type : 'radar',
            tooltip : {
                trigger : 'item'
            },
            itemStyle : {
                normal : {
                    areaStyle : {
                        type : 'default'
                    }
                }
            },
            data : [{
                value : data.values,
                name : name
            }]
        }]
    };
    myChart.setOption(option);
}