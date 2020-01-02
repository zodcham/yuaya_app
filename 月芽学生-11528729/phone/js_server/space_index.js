var rem_size=$("html").css('font-size');
var width=document.body.clientWidth;
var height=document.body.clientHeight;

var wpx=width/1080;
var hpx=height/1860;


var type_list=[];

appcan.ready(function() {
	
    loadBooks();

    //根据屏幕分辨率来定位
    $("#main").css("width",(1658*wpx)+"px").css("height",(1860*hpx)+"px").css("background","url("+ _SERVER_ADDRESS +"/static/space/bg5.jpg) no-repeat").css("background-size","100% 100%");

    ShowLefeTop("#img_list",190,490);//定位徽章面板
    ShowWidthHeight("#img_list",400,770);//徽章面板大小

    $("#img_list img").css("margin-top",(0*hpx)+"px"); //各徽章的上间距
    ShowWidthHeight("#img_list img",395,140);//各徽章图片的大小


    ShowLefeTop("#img_person",418,1330); //学生的等级图片位置
    ShowWidthHeight("#img_person",300,300);//学生的等级图片大小

    ShowLefeTop("#div_level",910,725); //中间显示功名、经验值、财富的部分的位置
    ShowWidthHeight("#div_level",138,245); //中间显示功名、经验值、财富的部分的位置

    ShowLefeTop("#div_bookshelf",1196,740); //书架图书列表的位置
    ShowWidthHeight("#div_bookshelf",390,660); //书架图书列表的大小



    getUserInfo();

    AddLogContent(userInfo.id, logKeys.PersonMySpace,{});



    $("#label_name").html(userInfo.name + "<br>阅读空间"); //中间部分的用户名

    window.scrollTo(400*wpx, 0); //居中显示


    var g_json = {
        "read_count" : userInfo.readBookCount,
        "word_count" : userInfo.readWordCount,
        "review_score" : userInfo.expCountReview,
        "sign_count" : userInfo.signCount,
        "test_count" : userInfo.scoreCount,
        "game_count" : 0
    };

    var json = GetLevel("read",g_json.read_count); //阅读图书的数量：等级信息（学富五车）
    var read_level = json.level; //等级
    var read_metel_type = json.metel_type;//金、银、铜
    var read_star = json.star; //星级
    var read_next = json.next; //下一等级需要的经验

    json=GetLevel("word", g_json.word_count); //阅读图书的字数：等级信息（博览群书）
    var word_level = json.level;
    var word_metel_type = json.metel_type;
    var word_star = json.star;
    var word_next = json.next;

    json=GetLevel("review", g_json.review_score); //读后感的评分(分) 妙笔生花
    var review_level = json.level;
    var review_metel_type = json.metel_type;
    var review_star = json.star;
    var review_next = json.next;

    json=GetLevel("sign", g_json.sign_count); //签到的次数 持之以恒
    var sign_level = json.level;
    var sign_metel_type = json.metel_type;
    var sign_star = json.star;
    var sign_next = json.next;

    json=GetLevel("game", g_json.game_count); //测评积分 金榜题名
    var game_level = json.level;
    var game_metel_type = json.metel_type;
    var game_star = json.star;
    var game_next = json.next;

    json=GetLevel("test", g_json.test_count); //参加阅读计划（活动）的次数 才高八斗
    var test_level = json.level;
    var test_metel_type = json.metel_type;
    var test_star = json.star;
    var test_next = json.next;


    json=GetLevel("person", userInfo.expCount); //个人经验的等级
    var Person_level = json.level;
    var Person_metel_type = json.metel_type;
    var Person_star = json.star;
    var Person_next = json.next;

    $("#span_level").html("功名: "+GetPersonLevel(Person_level)); //个人等级
    $("#img_person").attr("src",_SERVER_ADDRESS + "/static/space/"+Person_level+".png"); //等级图片
    $("#img_person").attr("title",GetPersonLevel(Person_level)+Person_star+"星"); //星级
    $("#img_person").attr("remark","由个人经验值决定等级").attr("star",Person_star).attr("exp",userInfo.expCount).attr("next",Person_next); //经验


    $("#label_exp_current").html(userInfo.expCount); //经验
    $("#label_exp_nextlevel").html(Person_next); //下一级需要的经验

    $("#span_gold").html("财富: "+userInfo.goldCount); //财富值


    $("#img_read").attr("src",_SERVER_ADDRESS + "/static/space/xue"+read_metel_type+".png"); //徽章：学富五车
    $("#img_word").attr("src",_SERVER_ADDRESS + "/static/space/bo"+word_metel_type+".png"); //徽章：博览群书
    $("#img_review").attr("src",_SERVER_ADDRESS + "/static/space/miao"+review_metel_type+".png"); //徽章：妙笔生花
    $("#img_sign").attr("src",_SERVER_ADDRESS + "/static/space/chi"+sign_metel_type+".png"); //徽章：持之以恒
    $("#img_test").attr("src",_SERVER_ADDRESS + "/static/space/jin"+test_metel_type+".png"); //徽章：金榜题名
    $("#img_game").attr("src",_SERVER_ADDRESS + "/static/space/cai"+game_metel_type+".png"); //徽章：才高八斗

    //各徽章的说明，用于弹出窗口显示
    $("#img_read").attr("title","学富五车"+" "+ GetMetelStar(read_metel_type,read_star) +"").attr("remark","阅读图书的数量(本)").attr("star",read_star).attr("exp",g_json.read_count).attr("next",read_next).attr("helptype","read");
    $("#img_word").attr("title","博览群书"+" "+ GetMetelStar(word_metel_type,word_star)).attr("remark","阅读的字数(千字)").attr("star",word_star).attr("exp",g_json.word_count).attr("next",word_next).attr("helptype","word");
    $("#img_review").attr("title","妙笔生花"+" "+ GetMetelStar(review_metel_type,review_star)).attr("remark","读后感的评分(分)").attr("star",review_star).attr("exp",g_json.review_score).attr("next",review_next).attr("helptype","review");
    $("#img_sign").attr("title","持之以恒"+" "+ GetMetelStar(sign_metel_type,sign_star)).attr("remark","签到的次数(次)").attr("star",sign_star).attr("exp",g_json.sign_count).attr("next",sign_next).attr("helptype","sign");
    $("#img_test").attr("title","金榜题名"+" "+ GetMetelStar(test_metel_type,test_star)).attr("remark","测评积分(分)").attr("star",test_star).attr("exp",g_json.test_count).attr("next",test_next).attr("helptype","test");
    $("#img_game").attr("title","才高八斗"+" "+ GetMetelStar(game_metel_type,game_star)).attr("remark","参加阅读计划（活动）的次数(次)").attr("star",game_star).attr("exp",g_json.game_count).attr("next",game_next).attr("helptype","game");



    appcan.button(".position_type", "btn-act", function() {
        ShowItemType(this);//点击物品类别
    })
})




function ShowLefeTop(obj,left,top){
    $(obj).css("top",(top*hpx)+"px").css("left",(left*wpx)+"px");
}
function ShowWidthHeight(obj,mWidth,mHeight){
    $(obj).css("height",(mHeight*hpx)+"px").css("width",(mWidth*wpx)+"px");
}

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

function ShowBookList(){

}

function ShowBadge(obj){
    var htm='<div class="alert_content" style="height:10em;">';
    // htm+='<div class="ub ub-f1 ub-pc" style="height:3em; ><i class="fa fa-question-circle-o" aria-hidden="true" onclick="ShowHelp(\''+ $(obj).attr("helptype") +'\')"></i></div>';
    htm+='<div class="ub-f1" style="height:3em; line-height: 3em;text-align: right;"><i class="fa fa-question-circle-o" aria-hidden="true"  onclick="ShowHelp(\''+ $(obj).attr("helptype") +'\')"></i></div>';
    htm+='<div class="ub ub-f1 ub-pc"><img src="'+ $(obj).attr("src") +'" style="width:100%;"></div>';
    htm+='<div class="ub ub-f1 ub-pc">'+GetStrHtml($(obj).attr("star"))+'</div>';
    htm+='<div class="ub ub-f1 ub-pc">'+ $(obj).attr("title") +'</div>';
    htm+='<div class="ub ub-f1 ub-pc ulev-1" style="color:#666;">'+ $(obj).attr("remark") +'：'+$(obj).attr("exp")+'，升级须 '+ $(obj).attr("next") +'</div>';
    htm+='</div>';
    layer.open({
        content: htm
        ,skin: 'showWin'
    });
}

function ShowHelp(t) {
    setLocVal("help_type", t);
    appcan.window.open("space_levelup", "space_levelup.html", 5);
}


function ShowPerson(obj){
    var htm='<div class="alert_content" style="height:20em;">';
    htm+='<div class="ub ub-f1 ub-pc"><img src="'+ $(obj).attr("src") +'" style="width:8em;"></div>';
    htm+='<div class="ub ub-f1 ub-pc">'+GetStrHtml($(obj).attr("star"))+'</div>';
    htm+='<div class="ub ub-f1 ub-pc">'+ $(obj).attr("title") +'</div>';
    htm+='<div class="ub ub-f1 ub-pc ulev-1" style="color:#666;">'+ $(obj).attr("remark") +'</div>';
    htm+='<div class="ub ub-f1 ub-pc ulev-1" style="color:#666;">经验：'+ $(obj).attr("exp") +'/'+ $(obj).attr("next") +'</div>';
    htm+='</div>';
    layer.open({
        content: htm
        ,skin: 'showWin'
    });
}


function ShowBookShelf(){
    var htm='<div class="alert_content " style= "height:30em;margin:0;overflow-y: auto;">';
    htm+=$("#div_showbookshelf").html();
    htm+='</div>';
    layer.open({
        content: htm
        ,skin: 'showShelf'
    });
}


function GetStrHtml(star){
    var htm='';
    for(var i=1;i<=Number(star);i++){
        htm+='<img src="' + _SERVER_ADDRESS + '/static/space/star.png" style="width:2em;">';
    }

    for(var i=Number(star)+1;i<=3;i++){
        htm+='<img src="'+ _SERVER_ADDRESS + '/static/space/star2.png" style="width:2em;">';
    }
    return htm;
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
    return false;
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

}

function open_right() {
    appcan.window.open("bookList", "space_right.html", 2);
}


appcan.button(".btn_back", "btn-act", function() {
    appcan.window.close(-1);
})






function loadBooks() {
    //isPass 是否认证通过 ('0':未认证, '1':已认证)
    //type0=全部、1=必读、2=选读、3=自选
    getCommInfo();
    getUserInfo();
    var params = {
        'userId' : userInfo.id,
        'pageSize' : 2000,
        'pageIndex' : 1,
        'type' : 3,
        'isRead' : 0
    };
    common.ajax("/myBookshelf/listForStudent", {
        params : JSON.stringify(params)
    }, function(data) {

        if (data.obj.list.length > 0) {
            var lineObj = $('<div class="ub ub-fh umar-t"></div>');
            var index = 0;
            for (var i = 0; i < data.obj.list.length; i++) {
                var obj = data.obj.list[i];
                var objItem = $("#item").clone();
                objItem.attr("id", obj.bookId);
                objItem.attr("title", obj.book.name);
                objItem.find(".book_name").html(obj.book.name);
                objItem.removeClass("uhide");
                if (obj.book.image.length > 0) {
                    objItem.find(".book_img").attr("src", _SERVER_ADDRESS + obj.book.image);
                    objItem.attr("src", _SERVER_ADDRESS + obj.book.image);
                }
                $("#div_bookshelf").append(objItem);


                var objItem1 = $("#itemBig").clone();
                objItem1.attr("id", obj.bookId);
                objItem1.attr("title", obj.book.name);
                objItem1.find(".book_name").html(obj.book.name);
                objItem1.removeClass("uhide");
                if (obj.book.image.length > 0) {
                    objItem1.find(".book_img").attr("src", _SERVER_ADDRESS + obj.book.image);
                    objItem1.attr("src", _SERVER_ADDRESS + obj.book.image);
                }
                $("#div_showbookshelf").append(objItem1);


            }

            $(".itemBig").on("click", function() {
                var id = $(this).attr("id");
                getBookInfoById(userInfo.id, id, function(data) {
                    getBookInfo();
                    bookInfo = data;
                    setBookInfo();
                    appcan.window.open("book_default", "book/book_default.html", 5);
                }, null);
            });


        }



    }, function(data) {

        toast(getMsgByKey(data.msg), config.toastTimeShort);

    }, {
        loadingMsg : '正在查询，请稍后...'
    });
}

function ShowBook(obj) {
    var id = $(obj).attr("id");
    getBookInfoById(userInfo.id, id, function(data) {
        getBookInfo();
        bookInfo = data;
        setBookInfo();
        appcan.window.open("book_default", "book/book_default.html", 5);
    }, null);
}

function ShowUserInfo() {
    appcan.window.open("space_level", "space_level.html", 5);
}