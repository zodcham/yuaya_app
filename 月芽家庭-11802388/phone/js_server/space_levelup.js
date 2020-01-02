//$("html").css('font-size',"16px");
var rem_size=$("html").css('font-size');
var width=document.body.clientWidth;
var height=document.body.clientHeight;
//var g_width=1080;
//var g_height=1920;
var g_width=1742/3;
var g_height=1860;

var wpx=width/1080;
var hpx=height/1860;


var type_list=[];

appcan.ready(function() {
    var t=getLocVal("help_type");
    if(!t) return;
    //$(".tabel_level").addClass("uhide");
    $("#div_"+t).removeClass("uhide");
    switch (t) {
        case "read":
            $("#span_title").html("学富五车<br>徽章获得条件");
            $("#div_test").before("<div style='width:90%;margin:1em auto; text-align: left;'>说明：阅读册数+1的条件为通过该书测评，每册书只统计一次。</div>");
            break;
        case "word":
            $("#span_title").html("博览群书<br>徽章获得条件");
            break;
        case "review":
            $("#span_title").html("妙笔生花<br>徽章获得条件");
            break;
        case "sign":
            $("#span_title").html("持之以恒<br>徽章获得条件");
            break;
        case "test":
            $("#span_title").html("金榜题名<br>徽章获得条件");
            break;
        case "game":
            $("#span_title").html("才高八斗<br>徽章获得条件");
            break;
        case "person":
            $("#span_title").html("功名升级条件");
            $(".obj_exp").removeClass("uhide");
            break;
    }

})

appcan.button(".btn_back", "btn-act", function() {
    appcan.window.close(-1);
})