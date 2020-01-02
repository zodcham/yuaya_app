document.write("<script src='http://www.readseed.cn/nocache/js_machine_v200/js/common_new.js?time="+ (new Date().getTime()) +"'></"+"script>");

appcan.ready(function() {
    // appcan.window.openPopover({
    //     name:'button',
    //     dataType:0,
    //     url:"button.html",
    //     top:800,
    //     left:830,
    //     width:200,
    //     height:200
    // });

    getUserInfo();
    getCommInfo();

    getSysInfo();
    LoadAll();
    loadBookList();
})



appcan.button("#bookshelf", "btn-act", function() {
    rootClosePlayer();
    appcan.window.open("bookList", "user/user_book_list.html?f=root", 5);
});
function openTask(){
    getCommInfo();
    commInfo.finishState = '0';
    setCommInfo();
    rootClosePlayer();
    appcan.window.open("user_read_taskss", "user/user_read_taskss.html?f=root", 5);
}
appcan.button("#mytasks", "btn-act", function() {
    openTask();
});
appcan.button("#review", "btn-act", function() {
    rootClosePlayer();
    appcan.window.open("book_review_historys", "book/book_review_historys.html?f=root", 5);
});
appcan.button("#report", "btn-act", function() {
    rootClosePlayer();
    appcan.window.open("user_report_search", "user/user_report_search.html?f=root", 5);
});

appcan.button("#moreNews", "btn-act", function() {
    rootClosePlayer();
    appcan.window.open("newslist", "newslist.html?f=root", 5);
});
appcan.button("#morePPT", "btn-act", function() {
    rootClosePlayer();
    appcan.window.open("readlist", "./yueduquan/ReadList.html?f=root", 5);
});
appcan.button("#moreVideo", "btn-act", function() {
    rootClosePlayer();
    appcan.window.open("book_introduct", "book/book_introduct.html?f=root", 5);
});
appcan.button("#moreBook", "btn-act", function() {
    rootClosePlayer();
    appcan.window.open("index_mall", "index_mall.html?f=root", 5);
});
appcan.button("#goodBookList", "btn-act", function() {
    rootClosePlayer();
    appcan.window.open("good_book", "book/good_book.html?f=root", 5);
});

appcan.button("#moreAudio", "btn-act", function() {
    rootClosePlayer();
    appcan.window.open("book_famousteache", "book/book_Famousteache.html?f=root", 5);
});



function LoadAll() {
    /*读数据库版本*/
    $("#name").html(userInfo.name);
    var time1 = new Date().format("HH:mm:ss");

    var par = {};
    var url = _SERVER_ADDRESS + "/phone/newindex";
    var ferr = function(err) {

    };

    var fok = function(data) {

        data = JSON.parse(data);

        LoadNews(data.xw);
        LoadVideo(data.ddsp);
        LoadAudio(data.jdzy);
        LoadCourse(data.kcld);

    };
    common.ajaxPOST(url, par, fok, ferr);
}


//新闻
function LoadNews(data) {
    var index = 0;
    var shtml = '';
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var objNews = $("#item_news").clone();
        objNews.attr("id", obj.id);
        objNews.removeClass("uhide");
        var newstitle = obj.name.substring(0, 16);
        objNews.find(".news_title").html(newstitle);
        objNews.find(".news_author").html("月芽阅读");
        objNews.find(".news_date").html(obj.date);
        var imgUrl=_SERVER_ADDRESS+obj.image;
        objNews.find(".news_pic").attr("src",imgUrl);

        objNews.bind("click", function() {
            var id = $(this).attr("id");
            getProgramInfoById(id, function(data) {
                getProgramInfo();
                programInfo = data;
                setProgramInfo();
                rootClosePlayer();
                appcan.window.open("newslist", "newslist.html?f=root", 5);

            }, null);
        });

        $("#news_list").append(objNews);

    }

}


//视频
function LoadVideo(data) {
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var objNews = $("#itemVideo").clone();
        objNews.attr("id", obj.id);
        objNews.removeClass("uhide");
        var newstitle = obj.name.substring(0, 16);
        var imgUrl=_SERVER_ADDRESS+obj.image;
        objNews.find(".videoTitle").html(newstitle);
        objNews.find(".videoImage").html('<img src="'+ imgUrl +'" style="height:143px;width:98px;margin-top:12px;margin-left:17px;">');

        objNews.bind("click", function() {
            var id = $(this).attr("id");
            getBookInfoById(userInfo.id, id, function(data) {
                getBookInfo();
                bookInfo = data;
                setBookInfo();
                setLocVal("bookInfo_default","video");
                rootClosePlayer();
                appcan.window.open("book_default", "book/book_default.html?f=root", 5);
            }, null);
        });

        $("#videoList").append(objNews);

    }

    //$("#news_list").html(shtml);

}


//音频
function LoadAudio(data) {
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var objNews = $("#itemAudio").clone();
        objNews.attr("id", obj.id);
        objNews.removeClass("uhide");
        var newstitle = obj.name.substring(0, 16);
        var imgUrl=_SERVER_ADDRESS+obj.image;
        objNews.find(".audioTitle").html(newstitle);
        objNews.find(".audioImage").html('<img src="'+ imgUrl +'" style="height:156px;width:160px;margin-top:0px;margin-left:19px;">');

        objNews.bind("click", function() {
            var id = $(this).attr("id");
            getProgramInfoById(id, function(data) {
                getProgramInfo();
                programInfo = data;
                setProgramInfo();
                rootClosePlayer();
                appcan.window.open("column_index", "book/column_index.html?f=root", 5);
            }, null);
        });

        $("#audioList").append(objNews);

    }

    //$("#news_list").html(shtml);

}



//课程领读
function LoadCourse(data) {
    var height_screen = document.body.clientHeight;
    var width_screen = document.body.clientWidth;

    var len = data.length > 4 ? 4 : data.length;
    if (len == 2) {
        $(".Reads").css("width", "100%");
    } else if (len == 3) {
        $(".Reads").css("width", "150%");
    } else if (len == 4) {
        $(".Reads").css("width", "200%");
    } else {
        //$(".Reads").width(Math.round((data.obj.length * 0.25) * 10000) / 100.00 + "%");
        $(".Reads").width((50 * len) + "%");
    }
    $(".Reads").html('');

    for (var i = 0; i < len; i++) {

        var obj = data[i];
        var ReadItem = $("#ReadItems").clone();
        ReadItem.attr("id", obj.id);
        ReadItem.attr("grade", obj.grade);
        ReadItem.attr("month", obj.month);
        ReadItem.attr("year", obj.year);
        ReadItem.attr("name", obj.name);

        ReadItem.removeClass("uhide");
        //图片
        ReadItem.find(".ReadImages").attr("src", _SERVER_ADDRESS + obj.image);

        /*
         var g_wgt_url = "wgt://data/download" + (obj.image);
         var g_img_url = _SERVER_ADDRESS + obj.image;

         if (uexFileMgr.isFileExistByPath(g_wgt_url)) {
         //本地有图片
         g_img_url = "file:/" + uexFileMgr.getFileRealPath(g_wgt_url);
         }
         ReadItem.find(".ReadImages").attr("src", g_img_url);
         */

        ReadItem.find(".ReadNames").html(obj.name);

        ReadItem.bind("click", function() {
            var month = $(this).attr("month");
            var name = $(this).attr("name");
            var report = $(this).attr("year");

            getSysInfo();
            sysInfo.ranking = {
                "grade" : month,
                "name" : name,
                "report" : report
            };
            setSysInfo();
            rootClosePlayer();
            appcan.window.open("readcontents", "./yueduquan/Readcontents.html?f=root", 5);

        });

        $(".Reads").append(ReadItem);
    }
    $("#div_reads").scrollLeft(260);
}



//课程领读
function LoadCourse_new(data) {
    var len = data.length;
    var objList=[];
    var imageList=[];
    for (var i = 0; i < len; i++) {
        var obj = data[i];
        objList.push({
            "grade" : obj.month,
            "name" : obj.name,
            "report" : obj.year
        });
        imageList.push(_SERVER_ADDRESS + obj.image);


        /*
        ReadItem.bind("click", function() {
            var month = $(this).attr("month");
            var name = $(this).attr("name");
            var report = $(this).attr("year");

            getSysInfo();
            sysInfo.ranking = {
                "grade" : month,
                "name" : name,
                "report" : report
            };
            setSysInfo();

            appcan.window.open("Readcontent", "yueduquan/Readcontents.html", 5);

        });
        */

    }

    // var params = {
    //     x: 87,
    //     y: 380,
    //     width: 920,
    //     height: 265,
    //     isScrollWithWeb: true,
    //     placeholderImage: imageList[0],
    //     imageUrl: imageList
    // };
    // var coverFlow = uexCoverFlow2.create(JSON.stringify(params));

    var param={
        interval:1000,
        anchor:["87", "380"],
        height:265,
        width:920,
        urls:imageList
    };
    //var view1=uexScrollPicture.createNewScrollPicture(param);

    // uexScrollPicture.startAutoScroll(JSON.stringify({
    //     view:view1
    // }));
}


function loadBookList() {
    getUserInfo();
    var params = {
        'userId' : userInfo.id,
        'pageSize' : 12,
        'pageIndex' : 1
    };
    common.ajax("/student/book/getRecommendBook", {
        params : JSON.stringify(params)
    }, function(data) {

        for (var i = 0; i < data.obj.list.length; i++) {
            var obj = data.obj.list[i];

            var objNews = $("#itemVideo").clone();

            objNews.attr("id", obj.bookId);

            objNews.removeClass("uhide");
            var newstitle = obj.bookName;
            var imgUrl=_SERVER_ADDRESS+obj.bookPhoto;

            objNews.find(".videoTitle").html(newstitle);
            objNews.find(".videoImage").html('<img src="'+ imgUrl +'" style="height:143px;width:98px;margin-top:12px;margin-left:17px;">');
            objNews.bind("click", function() {
                var id = $(this).attr("id");
                getBookInfoById(userInfo.id, id, function(data) {
                    getBookInfo();
                    bookInfo = data;
                    setBookInfo();
                    rootClosePlayer();
                    appcan.window.open("book_default", "book/book_default.html?f=root", 5);
                }, null);
            });
            $("#BookList").append(objNews);

        }


    }, function(data) {
    }, null, false);
}