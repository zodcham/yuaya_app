var g_json;
var g_gradelist = [];
var g_classjson;
var g_classname;

appcan.ready(function() {
    var width=$("#grade_books").width();
    var height=width*(1920/1920);
    $("#grade_books").css("height",height);
    $("#grade_words").css("height",height);
    $("#grade_rate").css("height",height);
    $("#top1_class_rate").css("height",height);
    
    getSysInfo();
    getUserInfo();
    LoadAllGrade();
});

function LoadAllGrade() {
    $(".grade_active").removeClass("grade_active");
    $("#grade_all").addClass("grade_active");

    var url = g_ServerUrl + "/a/analyze/grade_all";
    var par = {
        "schoolid" : getLocVal("charts_school_id"),
        //"schoolid" : "387fdb0ca13a486eb4341aa8c6c85a46"
        "date_start":"2018-10-15",
        "date_end":"2019-10-15"
    };
    var ferr = function(err) {
    };
    var fok = function(data) {
        if (data == "1") {//没有阅读数据
            g_json = {
                "school_name" : "本校",
                "grade_id" : [],
                "books" : {
                    "class_list" : [],
                    "class_books" : [],
                },
                "words" : {
                    "class_list" : [],
                    "class_words" : [],
                },
                "rate" : {
                    "class_list" : [],
                    "class_rate" : [],
                },
                "top1_class" : {
                    "top1_class" : "",
                    "data" : [{
                        value : 0,
                        name : '已参与'
                    }, {
                        value : 0,
                        name : '未参与'
                    }]
                }
            }
            GetGradeList(g_json.books.class_list);

            $("#class_name").html("全部年级");
            $(".analyze_name").html("各年级");
            LoadBooks();
            LoadRate();
            LoadWords();
            g_classjson = g_json.top1_class;
            g_classname = "年级";
            LoadClass();
            /*
            layui.use(['layer'], function() {
                var layer = layui.layer;
                layer.msg('学校没有阅读数据');
            });
            */

        } else {
            g_json = JSON.parse(data);

            grade_id_list = g_json.grade_id;
            for (var i = 0; i < grade_id_list.length; i++) {
                var grade_name = GetGradeName(grade_id_list[i]);
                g_gradelist.push(grade_name);
                var obj = $("#grade_" + (i + 1));
                obj.removeClass("uhide");
                obj.html(grade_name);
            }

            GetGradeList(g_json.books.class_list);

            $("#school_name").html(g_json.school_name);
            $("#class_name").html("全部年级");
            $(".analyze_name").html("各年级");
            LoadBooks();
            LoadRate();
            LoadWords();
            g_classjson = g_json.top1_class;
            g_classname = "年级";
            LoadClass();
        }
    };
    ajaxPOST(url, par, fok, ferr);

}

function LoadGrade(grade) {
    var url = g_ServerUrl + "/a/analyze/grade";
    var par = {
        "schoolid" : getLocVal("charts_school_id"),
        //"schoolid" : "387fdb0ca13a486eb4341aa8c6c85a46",
        "grade" : grade
    };
    var ferr = function(err) {
    };
    var fok = function(data) {
        g_json = JSON.parse(data);
        $(".grade_active").removeClass("grade_active");
        $("#grade_"+grade).addClass("grade_active");
        $("#class_name").html(GetGradeName(grade));
        $(".analyze_name").html("各班");
        LoadBooks();
        LoadRate();
        LoadWords();
        g_classname = "班级";
        g_classjson = g_json.top1_class;

        LoadClass();
    }
    ajaxPOST(url, par, fok, ferr);

}
