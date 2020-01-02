var chartWidth;
var fs = 30;
appcan.ready(function() {
    getUserInfo();
    getSysInfo();
    chartWidth = $("#main").width() * 0.8;
    $(".charts").css("width", chartWidth + "px").css("height", chartWidth + "px");
    fs = (window.screen.width / 800) * 30;
    loadInfo();
    AddLogContent(userInfo.id, logKeys.Report,{});
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
        createReadQuality(data.obj.exerciseChatInfo);
        createReadContent(data.obj.categoryReadChatInfo);

        $(".bookCount").html(data.obj.bookCount + "本");
        $(".wordCount").html(data.obj.wordCount + "千字");
        $(".reviewCount").html(data.obj.reviewCount + "篇");
        $(".score").html(data.obj.score + "分");
        $(".bookCountRateName1").html(data.obj.taskFinishBookCount + "本");
        $(".bookCountRateName2").html(data.obj.taskBookCount + "本");
        $(".bookCountRateName1").html(data.obj.taskFinishBookCount + "本");
        $(".bookCountRateName2").html(data.obj.taskBookCount + "本");
        $(".wordCountRateName1").html(data.obj.taskFinishWordCount + "千字");
        $(".wordCountRateName2").html(data.obj.taskWordCount + "千字");
        $(".reviewRateName1").html(data.obj.taskFinishReviewCount + "篇");
        $(".reviewRateName2").html(data.obj.taskReviewCount + "篇");
        var bookCountRate = data.obj.taskFinishBookCount / data.obj.taskBookCount * 100;
        var wordCountRate = data.obj.taskFinishWordCount / data.obj.taskWordCount * 100;
        var reviewRate = data.obj.taskFinishReviewCount / data.obj.taskReviewCount * 100;
        $(".bookCountRate").css("width", bookCountRate + "%");
        $(".wordCountRate").css("width", wordCountRate + "%");
        $(".reviewRate").css("width", reviewRate + "%");
        /*
         * obj : {
         student :  : '学生信息'
         monthCount : '查询间隔月份的数量'

         taskBookCount : '本时段阅读任务书本数量'
         taskFinishBookCount : '本时段阅读任务书本完成数量'
         taskWordCount : '本时段阅读任务书本字数'
         taskFinishWordCount : '本时段阅读任务已读书本字数'

         taskReviewCount : '本时段阅读任务读后感数量'
         taskFinishReviewCount : '本时段阅读任务读后感数量'

         bookCount : '本时段阅读书本数量'
         wordCount : '本时段阅读书本字数'

         reviewCount : '本时段读后感数量'
         reviewLikes : '本时段读后感点赞数'
         score : '本时段获得积分数'

         }
         */

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);

    });

}

//创建阅读质量分析报表
function createReadQuality(data) {
    var myChart = echarts.init(document.getElementById('readQuality'));
    var labels = data.labels;
    var values = data.values;
    var dataValue = [];
    for (var i = 0; i < values.length; i++) {
        var color = getRandomColor();
        var obj = {
            value : values[i],
            name : labels[i]
        };
        dataValue.push(obj);
    }
    var myLabels = [];
    for (var i = 0; i < labels.length; i++) {
        var obj = {
            "name" : labels[i],
            "textStyle" : {
                color : '#96de3a',
                fontSize : fs
            }
        };
        myLabels.push(obj);
        myLabels.push(labels[i]);
    }
    var option = {
        tooltip : {
            trigger : 'item',
            formatter : "{a} <br/>{b} : {c} ({d}%)"
        },
        legend : {
            orient : 'horizontal',
            left : 'left',
            data : myLabels
        },
        series : [{
            name : '阅读质量',
            type : 'pie',
            radius : '55%',
            center : ['50%', '60%'],
            data : dataValue,
            itemStyle : {
                normal : {
                    label : {
                        show : true,
                        //formatter: '{b} : {c} ({d}%)' ,
                        formatter : '{b} : {c}',
                        textStyle : {
                            fontSize : fs
                        }
                    }
                },
                emphasis : {
                    fontSize : fs,
                    shadowBlur : 10,
                    shadowOffsetX : 0,
                    shadowColor : 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    myChart.setOption(option);
}

//创建阅读内容分析报表
function createReadContent(data) {
    var myChart = echarts.init(document.getElementById('readContent'));
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
        //indicator.push({name:data.labels[i]});
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
            name : '阅读内容',
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
                name : '阅读内容'
            }]
        }]
    };

    myChart.setOption(option);
}

//创建阅读能力分析报表
function createReadAbility(data) {
    var myChart = echarts.init(document.getElementById('readAbility'));
    var indicator = [];
    for (var i = 0; i < data.labels.length; i++) {
        indicator.push({
            text : data.labels[i],
            max : 100,
            min : 10
        });
    }
    var option = {
        tooltip : {
            trigger : 'axis'
        },
        radar : [{
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
                name : '阅读能力'
            }]
        }]
    };
    myChart.setOption(option);
}

//从小学语文课程标准维度分析
//从儿童文学鉴赏维度分析
//从儿童阅读认知心理学维度分析
function createChatInfo(data, name, id) {
    var myChart = echarts.init(document.getElementById(id));
    var indicator = [];
    for (var i = 0; i < data.labels.length; i++) {
        indicator.push({
            text : data.labels[i],
            max : 100,
            min : 10
        });
    }
    var option = {
        tooltip : {
            trigger : 'axis'
        },
        radar : [{
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