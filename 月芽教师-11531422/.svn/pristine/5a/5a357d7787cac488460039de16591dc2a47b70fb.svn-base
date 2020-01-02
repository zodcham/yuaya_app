var g_json;

appcan.ready(function() {
    var width=$("#school").width();
    var height=width*(1920/1920);
    $("#school").css("height",height);
    $("#person").css("height",height);
    $("#grade").css("height",height);
    $("#completation_count").css("height",height);
    
    getSysInfo();
    getUserInfo();
    if(getLocVal("charts_school_name").length>0){
        $("#school_name").html(getLocVal("charts_school_name"));
        $("#school_name").removeClass("uhide");
    }
    
    LoadData();
    
    
    
});


function LoadData() {
    var url = g_ServerUrl + "/a/analyze/school";
    var par = {
        "schoolid" : getLocVal("charts_school_id")
        //"schoolid" : "387fdb0ca13a486eb4341aa8c6c85a46"
    };
    var ferr = function(err) {
        var school_name = "本校阅读概览";
            g_json = {
                "school_name" : school_name,
                "school_data" : [{
                    value : 0,
                    name : '已参与'
                }, {
                    value : 0,
                    name : '未参与'
                }],
                "person_data" : {
                    "person_name" : [],
                    "score" : [],
                    "class" : []
                },
                "pub_data" : {
                    "class" : [],
                    "score" : [],
                },
                "completation_data" : {
                    "class" : [],
                    "score" : [],
                },
                "grade_data" : []
            };
            LoadCharts();

            layui.use(['layer'], function() {
                var layer = layui.layer;
                layer.msg('该学校没有阅读数据');
            });
    };
    var fok = function(data) {
        
        if (data == "1") {//如果学校没有阅读数据
            var school_name = "本校阅读概览";
            g_json = {
                "school_name" : school_name,
                "school_data" : [{
                    value : 0,
                    name : '已参与'
                }, {
                    value : 0,
                    name : '未参与'
                }],
                "person_data" : {
                    "person_name" : [],
                    "score" : [],
                    "class" : []
                },
                "pub_data" : {
                    "class" : [],
                    "score" : [],
                },
                "completation_data" : {
                    "class" : [],
                    "score" : [],
                },
                "grade_data" : []
            };
            LoadCharts();

            layui.use(['layer'], function() {
                var layer = layui.layer;
                layer.msg('该学校没有阅读数据');
            });
        } else {
            g_json = JSON.parse(data);
            LoadCharts();
        }
    };
    ajaxPOST(url, par, fok, ferr);

}

function LoadCharts() {
    for (var i = 0; i < g_json.grade_data.length; i++) {
        g_json.grade_data[i].name = GetGradeName(g_json.grade_data[i].name);
    }

    $("#school_name").html(g_json.school_name);
    $("#user_count").html(g_json.school_data[0].value);

    var user_count = Number(g_json.school_data[0].value);
    var unuser_count = Number(g_json.school_data[1].value);
    var per = user_count / (user_count + unuser_count) * 100;


    $("#user_per").html(per.toFixed(2) + "%");


    LoadSchool();
    LoadPerson();
    LoadGrade();
    LoadCompletation();

    
}


$("#show_grade").on("click", function() {
    appcan.window.open("grade_charts", "grade_charts.html", 10);
});
$("#show_class").on("click", function() {
    appcan.window.open("class_charts", "class_charts.html", 10);
});
