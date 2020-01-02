//$("html").css('font-size',"16px");
//var rem_size=$("html").css('font-size');
var width=document.body.clientWidth;
var height=document.body.clientHeight;
var g_width=1080;
var g_height=1722;

var wpx=width/g_width;
var hpx=height/g_height;


var type_list=[];

appcan.ready(function() {
    $("#main").css("width",(g_width*wpx*3)+"px").css("height",(g_height*wpx)+"px").css("background","url(images/2_1.jpg) no-repeat").css("background-size","100% 100%");
    //alert(width+","+height);
    //alert(wpx);


    var item_height=255;
    var item_width=190;


    type_list=[{"id":"1","title":"衣服","list":[{
            id:"11"
            ,title:"衣服1"
            ,image_url:"images/xz01.png"
            ,background_url:""
            ,type_id:""
            ,level_id:""
            ,x:300+1080
            ,y:730
            ,price:"100"
            ,introduce:"衣服简介1"
            ,width:190
            ,height:255
            ,status:0
            ,overlap_id:1
            ,zindex:100
        },{
            id:"12"
            ,title:"衣服2"
            ,image_url:"images/sign2.png"
            ,background_url:""
            ,type_id:""
            ,level_id:""
            ,x:300+1080
            ,y:730
            ,price:"100"
            ,introduce:"衣服简介2"
            ,width:190
            ,height:255
            ,status:0
            ,overlap_id:1
            ,zindex:100
        },{
            id:"13"
            ,title:"裤子1"
            ,image_url:"images/word2.png"
            ,background_url:""
            ,type_id:""
            ,level_id:""
            ,x:300+1080
            ,y:850
            ,price:"100"
            ,introduce:"裤子简介1"
            ,width:190
            ,height:255
            ,status:0
            ,overlap_id:2
            ,zindex:99
        }]},
        {"id":"2","title":"人物饰品","list":[
                {
                    id:"21"
                    ,title:"秀才"
                    ,image_url:"images/level3.png"
                    ,background_url:""
                    ,type_id:""
                    ,level_id:""
                    ,x:300+1080
                    ,y:900
                    ,price:"100"
                    ,introduce:"由个人经验值决定等级。"
                    ,width:500
                    ,height:700
                    ,status:0
                    ,overlap_id:10001
                    ,zindex:1
                }
            ]},
        {"id":"3","title":"书桌饰品","list":[]},
        {"id":"4","title":"书架","list":[]},
        {"id":"5","title":"家具","list":[]},
        {"id":"6","title":"墙上字画","list":[]},
        {"id":"7","title":"勋章","list":[]},
        {"id":"8","title":"勋章墙","list":[]},
        {"id":"9","title":"地面","list":[]}];

    var obj=[{
        id:"23"
        ,title:"物品标题"
        ,image_url:"images/xz01.png"
        ,background_url:""
        ,type_id:""
        ,level_id:""
        ,x:100
        ,y:100
        ,price:"100"
        ,introduce:"物品简介"
        ,width:190
        ,height:255
    }];

    ShowUserItems();//显示用户所有已用物品


    //appcan.logs(width/1080);

    //appcan.logs(width);

    getUserInfo();
    AddLogContent(userInfo.id, logKeys.PersonMySpace,{});

    var width_screen = document.body.clientWidth;
    var height_screen = document.body.clientHeight;




    window.scrollTo(document.body.clientWidth, 0);

    var g_json = {
        "read_count" : 490,
        "word_count" : 5010,
        "review_score" : 580,
        "sign_count" : 55
    };
    var json = GetBookLevel(g_json.read_count);
    var read_level = json.read_level;
    var read_metel_type = json.read_metel_type;

    json=GetWordLevel(g_json.word_count);
    var word_level = json.level;
    var word_metel_type = json.metel_type;

    json=GetReviewLevel(g_json.review_score);
    var review_level = json.level;
    var review_metel_type = json.metel_type;

    json=GetSignLevel(g_json.sign_count);
    var sign_level = json.level;
    var sign_metel_type = json.metel_type;

    $("#img_read").attr("src","images/read"+read_metel_type+".png");
    $("#img_word").attr("src","images/word"+word_metel_type+".png");
    $("#img_review").attr("src","images/review"+review_metel_type+".png");
    $("#img_sign").attr("src","images/sign"+sign_metel_type+".png");


    $("#img_read").attr("title","博览群书 "+read_level+" 级");
    $("#img_word").attr("title","手不释卷"+word_level+"级");
    $("#img_review").attr("title","妙笔生花"+review_level+"级");
    $("#img_sign").attr("title","持之以恒"+sign_level+"级");

    $("#img_read").attr("remark","由阅读图书的数量决定等级。");
    $("#img_word").attr("remark","由阅读图书的字数决定等级。");
    $("#img_review").attr("remark","由读后感的评分决定等级。");
    $("#img_sign").attr("remark","由阅连续签到的次数决定等级。");

    $("#img_person").attr("title","秀才");
    $("#img_person").attr("remark","由个人经验值决定等级");


    appcan.button(".position_type", "btn-act", function() {
        ShowItemType(this);//点击物品类别
    })
})

appcan.button("#apphelp", "btn-act", function() {

})


function ShowUserItems(){
    var htm_type="";
    var html_list='';
    $(type_list).each(function(i,o){
        var itemcount=o.list.length>0?"("+o.list.length+")":"";
        var active= i==0?"active":"";

        htm_type+="<div typeid=\""+ o.id +"\" class=\"position_type ub btn bc-white ub-ac ub-pc "+active+"\">"+ o.title +itemcount+"</div>";

        var hide= (i==0?"":"uhide");
        html_list+='<div id="itemlist_'+ o.id +'" class="div_item_list ub ub-f1 '+hide+'">';
        $(o.list).each(function(il,ol){
            var use="";
            if(ol.status==1){
                use=" used ";
                ShowItem(i,il);
            }
            html_list+='<div id="item'+ ol.id +'" class="roomitem ub btn bc-white ub-ac ub-pc '+use+'" onclick="ShowItem('+i+','+il+')">'+ ol.title +'</div>';
        })
        html_list+='</div>';
    });

    $("#div_position").html(htm_type);
    $("#div_position_list").html(html_list);
}


function ShowOption(){
    $("#div_position_block").removeClass("uhide");
    var id=$("#div_position .active").attr("typeid");
    $(".div_item_list").addClass("uhide");
    $("#itemlist_"+id).removeClass("uhide");
}

function CloseOption(){
    $("#div_position_block").addClass("uhide");
}

function ShowItemType(obj){
    $(".position_type").removeClass("active");
    $(obj).addClass("active");
    var id=$(obj).attr("typeid");
    $(".div_item_list").addClass("uhide");
    $("#itemlist_"+id).removeClass("uhide");
}


function ShowItem(tidx, idx){

    var obj=type_list[tidx].list[idx];

    if($("#item"+obj.id).hasClass("used")){
        $("#img"+obj.id).remove();
        $("#item" + obj.id).removeClass("used");
    }
    else {
        var removeObj=$(".itemoverlap" + obj.overlap_id);
        $("#item" + removeObj.attr("itemid")).removeClass("used");
        removeObj.remove();


        var style = ' style="left:(item_left)px;top:(item_top)px;width:(item_width)px;height:(item_height)px;" ';
        style = style.replace("(item_left)", (obj.x) * wpx).replace("(item_top)", (obj.y) * hpx).replace("(item_width)", obj.width * wpx).replace("(item_height)", obj.height * wpx);

        var item1 = '<img id="img'+ obj.id +'" itemid="'+ obj.id +'" src="' + obj.image_url + '" class="abs itemoverlap'+obj.overlap_id+' " ' + style + ' style="z-index: '+obj.zindex+';" onclick="ShowBadge(this);" title="' + obj.title + '" remark="' + obj.introduce + '">';

        $("#main").append(item1);
        $("#item" + obj.id).addClass("used");
    }
}


function ShowBadge(obj){
    var htm='<div class="alert_content">';
    htm+='<div class="ub ub-f1 ub-pc"><img src="'+ $(obj).attr("src") +'" style="height:6em"></div>';
    htm+='<div class="ub ub-f1 ub-pc">'+ $(obj).attr("title") +'</div>';
    htm+='<div class="ub ub-f1 ub-pc ulev-1" style="color:#666;">'+ $(obj).attr("remark") +'</div>';
    htm+='</div>';
    layer.open({
        content: htm
        ,skin: 'showbadge'
    });
}


function openalert() {
    //询问框
    layer.open({
        title : ['获得经验值', 'background-color: #00cc33; color:#fff;'],
        content : '<div class="ub ub-ver" style="height:5em;"><div class="ub ub-f1">获得</div><div class="ub ub-f1">55经验</div></div>',
        style : 'background-color:#fff; color:#666; border:none;'//自定风格
        ,
        time : 2,
        btn : ['关闭'],
        yes : function(index) {
            layer.close(index);
        }
    });
}


var BookShelfTransform=true;
function MoveBookShelf(sum){
    var obj=document.getElementById("div_bookshelf");
    obj.style.transition="-webkit-transform 500ms ";
    if(BookShelfTransform){
        obj.style.webkitTransform="perspective(0em) rotateY(0deg)";
        BookShelfTransform=false;
    }
    else
    {
        obj.style.webkitTransform="perspective(20em) rotateY(-45deg)";
        BookShelfTransform=true;
    }
}
function shang(sum){
    var obj=document.getElementById("webkfaid");
    obj.style.transition="-webkit-transform 500ms ease-out";
    obj.style.webkitTransform="translate(0px,"+sum+"px) scale(1) translateZ(0px)";
}


function open_left() {
    appcan.window.open("bookList", "space_left.html", 1);
}

function open_center() {
    alert("2");
}

function open_right() {
    appcan.window.open("bookList", "space_right.html", 2);
}


appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})
function GetBookLevel(read_count) {
    var read_level = 0;
    var read_metel_type = 0;
    if (read_count > 0 && read_count < 5) {
        read_level = 0;
        read_metel_type = 0;
    } else if (read_count >= 5 && read_count < 10) {
        read_level = 1;
        read_metel_type = 1;
    } else if (read_count >= 10 && read_count < 25) {
        read_level = 2;
        read_metel_type = 1;
    } else if (read_count >= 25 && read_count < 50) {
        read_level = 3;
        read_metel_type = 1;
    } else if (read_count >= 50 && read_count < 80) {
        read_level = 4;
        read_metel_type = 2;
    } else if (read_count >= 80 && read_count < 100) {
        read_level = 5;
        read_metel_type = 2;
    } else if (read_count >= 100 && read_count < 200) {
        read_level = 6;
        read_metel_type = 2;
    } else if (read_count >= 200 && read_count < 300) {
        read_level = 7;
        read_metel_type = 3;
    } else if (read_count >= 300 && read_count < 500) {
        read_level = 8;
        read_metel_type = 3;
    } else if (read_count >= 500) {
        read_level = 9;
        read_metel_type = 3;
    }
    return {
        "read_level" : read_level,
        "read_metel_type" : read_metel_type
    };
}

function GetWordLevel(count) {
    var level = 0;
    var metel_type = 0;
    if (count >= 10 && count < 100) {
        level = 0;
        metel_type = 0;
    } else if (count >= 100 && count < 500) {
        level = 1;
        metel_type = 1;
    } else if (count >= 500 && count < 1000) {
        level = 2;
        metel_type = 1;
    } else if (count >= 1000 && count < 2000) {
        level = 3;
        metel_type = 1;
    } else if (count >= 2000 && count < 3000) {
        level = 4;
        metel_type = 2;
    } else if (count >= 3000 && count < 5000) {
        level = 5;
        metel_type = 2;
    } else if (count >= 5000 && count < 10000) {
        level = 6;
        metel_type = 2;
    } else if (count >= 10000 && count < 20000) {
        level = 7;
        metel_type = 3;
    } else if (count >= 20000 && count < 50000) {
        level = 8;
        metel_type = 3;
    } else if (count >= 50000) {
        level = 9;
        metel_type = 3;
    }
    return {
        "level" : level,
        "metel_type" : metel_type
    };
}

function GetReviewLevel(count) {
    var level = 0;
    var metel_type = 0;
    if (count >= 0 && count < 1) {
        level = 0;
        metel_type = 0;
    } else if (count >= 5 && count < 5) {
        level = 1;
        metel_type = 1;
    } else if (count >= 20 && count < 20) {
        level = 2;
        metel_type = 1;
    } else if (count >= 30 && count < 30) {
        level = 3;
        metel_type = 1;
    } else if (count >= 50 && count < 50) {
        level = 4;
        metel_type = 2;
    } else if (count >= 80 && count < 80) {
        level = 5;
        metel_type = 2;
    } else if (count >= 100 && count < 100) {
        level = 6;
        metel_type = 2;
    } else if (count >= 150 && count < 150) {
        level = 7;
        metel_type = 3;
    } else if (count >= 200 && count < 200) {
        level = 8;
        metel_type = 3;
    } else if (count >= 500) {
        level = 9;
        metel_type = 3;
    }
    return {
        "level" : level,
        "metel_type" : metel_type
    };
}


function GetSignLevel(count) {
    var level = 0;
    var metel_type = 0;
    if (count >= 3 && count < 7) {
        level = 0;
        metel_type = 0;
    } else if (count >= 7 && count < 10) {
        level = 1;
        metel_type = 1;
    } else if (count >= 10 && count < 14) {
        level = 2;
        metel_type = 1;
    } else if (count >= 14 && count < 21) {
        level = 3;
        metel_type = 1;
    } else if (count >= 21 && count < 30) {
        level = 4;
        metel_type = 2;
    } else if (count >= 30 && count < 60) {
        level = 5;
        metel_type = 2;
    } else if (count >= 60 && count < 60) {
        level = 6;
        metel_type = 2;
    } else if (count >= 90 && count < 90) {
        level = 7;
        metel_type = 3;
    } else if (count >= 100 && count < 100) {
        level = 8;
        metel_type = 3;
    } else if (count >= 120) {
        level = 9;
        metel_type = 3;
    }
    return {
        "level" : level,
        "metel_type" : metel_type
    };
}