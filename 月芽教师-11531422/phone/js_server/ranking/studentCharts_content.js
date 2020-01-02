var titHeight = 0;
var fs = 30;
var g_levelist=[], g_explist=[], g_moneylist=[], g_readlist=[], g_wordslist=[],g_reviewlist=[],g_namelist=[]; 

appcan.ready(function() {
    var width=$("#grade").width();
    var height=width*(1920/1920);
    $("#grade").css("height",height);
    
    fs = (window.screen.width / 800) * 30;
    
    getSysInfo();
    getUserInfo();
    loadData();
    
});


appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})



function loadData() {
    
    var nowDate = new Date();
    var date_begin = (nowDate.getFullYear() - 1) + "-" + 1 + "-" + 1;
    var date_end = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
    var params = {
        'userId' : userInfo.id,
        dataType : '1',
        pageSize : '2000',
        pageIndex : 1,
        'beginDate' : date_begin,
        'endDate' : date_end
    };
    

    common.ajax(
        "/ranking/listStudentAnalyse"
        ,{params : JSON.stringify(params)}
        , function(data) {
            
            if (data.obj.count == 0) {
                
            } else {
                
                var levelname=["白身","秀才","举人","贡生","进士","探花","榜眼","状元","翰林","大学仕"], levelcount=[0,0,0,0,0,0,0,0,0,0];
                
                var str="";

                var list = data.obj.list;
                if (list) {
                    for (var i = 0; i < list.length; i++) {
                        var obj = list[i];
                        
                        var levelIndex= levelname.indexOf(obj.readLevelName);
                        levelcount[levelIndex]++;//从学生列表数据获得阅读级别，累计该级别的数量
                        
                        g_namelist.push(obj.studentName.substring(0,6));//学生姓名
                        g_explist.push(obj.scoreCount); //经验值数据
                        g_moneylist.push(obj.goldCount);//财富值数据
                        g_readlist.push(obj.readBookCount);//阅读本数数据
                        g_wordslist.push(obj.readWordCount);//阅读字数数据
                        g_reviewlist.push(obj.reviewCount);//读后感数据
                    }
                    
                    for(var i=0;i<levelcount.length;i++){
                        if(levelcount[i]==0) continue;
                        var obj={value:levelcount[i], name: levelname[i]};
                        g_levelist.push(obj); //阅读级别数据
                    }
                    
                    LoadLevel();
                }
            }
        }, function(data) {toast(getMsgByKey(data.msg), config.toastTimeShort);}
    );
}


function LoadLevel() {
    $(".chart_active").removeClass("chart_active");
    $("#chart_type_1").addClass("chart_active");
    
    $("#grade").removeClass("uhide");
    $("#exp").addClass("uhide");
    
    var myChart = echarts.init(document.getElementById('grade'));
    var option = {
        title : {
            text: "等级",
            textStyle: {
                fontSize : fs
            }
        },
        grid: {
            left: '15%',
            right: '15%',
            bottom: '15%',
            containLabel: true
        },
        
        series: [
            {
                name: '平均阅读量',
                type: 'pie',
                radius: ['40%', '60%'],
                label: {
                    normal: {
                        formatter: '{b}\n{c}人',
                        "textStyle" : {
                            fontSize : fs
                        }
                    }
                },

                center: ['50%', '55%'],
                data: g_levelist,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 1,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        color: function (params) {
                            var colorList = [
                              '#0bd0d9', '#2f7fd8', '#8bbc22', '#10cf9b', '#7cca62',
                               '#f49100', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                               '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }
        ]
    };

    myChart.setOption(option);

}



function LoadChart(t,m_title) {
    $(".chart_active").removeClass("chart_active");
    $("#chart_type_"+t).addClass("chart_active");
    
    var json=[];
    switch(t){
        case 2:
            json=g_explist;
            break;
        case 3:
            json=g_moneylist;
            break;
        case 4:
            json=g_readlist;
            break;
        case 5:
            json=g_wordslist;
            break;
        case 6:
            json=g_reviewlist;
            break;
    }
    
    $("#grade").addClass("uhide");
    $("#exp").removeClass("uhide");
    $("#exp").css("height",(g_namelist.length*2)+"em");
    
    var myChart = echarts.init(document.getElementById('exp'));
    var option = {
        title : {
            text: m_title,
            textStyle: {
                fontSize : fs
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: g_namelist,
            axisLabel: {
                            textStyle: {
                                fontSize : fs
                            }
                        }
        },
        series: [
            {
                name: '人均阅读字数',
                type: 'bar',
                barWidth: '50%',
                data: json,
                itemStyle: {
                    normal: {
                        color: '#7cca62',
                        //以下为是否显示，显示位置和显示格式的设置了
                        label: {
                            show: true,
                            position: 'right',
                            //                             formatter: '{c}'
                            formatter: '{c}',
                            "textStyle" : {
                                fontSize : fs
                            }
                        }
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}


