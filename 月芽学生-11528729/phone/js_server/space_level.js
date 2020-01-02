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

    $("#footer").css("width",(1080*wpx)+"px").css("height",(742*hpx)+"px").css("background","url("+ _SERVER_ADDRESS +"/static/space/lv_foot.png) no-repeat").css("background-size","100% 100%");
    $("#img_tree").css("margin-bottom",(590*hpx)+"px");


    getUserInfo();

    //AddLogContent(userInfo.id, logKeys.PersonMySpace,{});


    $("#label_name").html(userInfo.name + "");

    // var g_json = {
    //     "read_count" : 10,
    //     "word_count" : 500,
    //     "review_score" : 580,
    //     "sign_count" : 55,
    //     "test_count" : 3,
    //     "game_count" : 10
    // };

    var g_json = {
        "read_count" : userInfo.readBookCount,
        "word_count" : userInfo.readWordCount,
        "review_score" : userInfo.expCountReview,
        "sign_count" : userInfo.signCount,
        "test_count" : userInfo.scoreCount,
        "game_count" : 0
    };

    json=GetLevel("person", userInfo.expCount);
    var Person_level = json.level;
    var Person_metel_type = json.metel_type;
    var Person_star = json.star;
    var Person_next = json.next;


    $("#span_level").html("功名: "+GetPersonLevel(Person_level) +" " + Person_star +"星");

    $("#img_lv").attr("src", _SERVER_ADDRESS + "/static/space/lv"+Person_level+".png");

    $("#img_person").attr("src", _SERVER_ADDRESS + "/static/space/"+Person_level+".png");
    $("#img_person").attr("title",GetPersonLevel(Person_level)+Person_star+"星");
    $("#img_person").attr("remark","由个人经验值决定等级").attr("star",Person_star).attr("exp",userInfo.expCount).attr("next",Person_next);

    $("#headImg").attr("src", _SERVER_ADDRESS + userInfo.photo);
    $("#img_tree").attr("src",_SERVER_ADDRESS + "/static/space/t"+Person_level+".png");
    $("#label_exp_current").html(userInfo.expCount);
    $("#label_exp_nextlevel").html(Person_next);

    $("#span_gold").html("财富: "+userInfo.goldCount);


})

function GetMetelStar(t, star){
    var r="";
    switch (t) {
        case 1:
            r="铜榜"+star+"星";
            break;
        case 2:
            r="银榜"+star+"星";
            break;
        case 3:
            r="金榜"+star+"星";
            break;
    }
    return r;
}





appcan.button(".btn_back", "btn-act", function() {
    appcan.window.close(-1);
})

function ShowHelp(t) {
    setLocVal("help_type", t);
    appcan.window.open("space_levelup", "space_levelup.html", 5);
}