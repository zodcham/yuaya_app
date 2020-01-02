var dicList = {
    "grade" : [],
    "book_category" : [],
    "recommendLevel" : []
};
var titHeight;
var isOpenComments = false;

function isLoadDic() {
    getCommInfo();
    if (commInfo.grade.length == 0) {
        return false;
    }
    if (commInfo.book_category.length == 0) {
        return false;
    }
    if (commInfo.recommendLevel.length == 0) {
        return false;
    }
    return true;
}

function loadDic() {
    if (isLoadDic()) {
        setBookInfo();
        return;
    }
    $.each(dicList, function(n, obj) {
        if (!obj || obj.length == 0) {
            loadDicData(n);
            return false;
        }
    });
}

function loadDicData(name) {
    var params = {
        "type" : name
    };
    common.ajax("/dict/getDictList", {
        params : JSON.stringify(params)
    }, function(data) {
        var dicObj = {};
        for (var i = 0; i < data.obj.length; i++) {
            var obj = data.obj[i];
            dicObj[obj.value] = obj.label;
        }

        dicList[name] = dicObj;
        commInfo[name] = dicObj;
        setCommInfo();
        loadDic();
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}


appcan.ready(function() {
    uexWindow.setBounce(0); //禁止上拉更新
	appcan.window.evaluateScript({
        name : "pub_task", //窗口名称
        scriptContent : 'step2_icon();'
    });
	
    getUserInfo();
    getBookInfo();
    getCommInfo();

    loadIntro();
    $(".bookName").html(bookInfo.name);
    if (bookInfo.image.length > 0) {
        $(".bookImg").attr("src", _SERVER_ADDRESS + bookInfo.image);
    }
    $(".remark").html("已被推荐" + bookInfo.recommendTimes + "次," + bookInfo.hits + "人读过");
    $(".score").html(bookInfo.score);

    // if (bookInfo.isPass == "1") {
    // $(".").html("再次测评");
    // }

    loadDic();

    var j = 0;
    var star = bookInfo.score;
    for (; j < parseInt(star / 2); j++) {
        $("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five");
    }
    star = Math.round(bookInfo.score - star);
    if (star == 1) {
        $("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five-half");
    }
    setView();
    //$("#info-star")
    //bookInfo.score
});


function setBookInfo() {
    if (bookInfo.recommendLevel.length == 0) {
        $(".recommendLevel").addClass("uhide");
    } else {
        $(".recommendLevel").html(commInfo.recommendLevel[bookInfo.recommendLevel]);
    }
    if (bookInfo.bookCategory.length == 0) {
        $(".bookCategory").addClass("uhide");
    } else {
        $(".bookCategory").html(commInfo.book_category[bookInfo.bookCategory]);
    }
    $(".grade").html(commInfo.grade[bookInfo.grade]);
}

function setView() {
    if (bookInfo.isFavorite == "1") {
        $(".favorite").html("推荐给学生");
    } else {
        $(".favorite").html("加入书架并推荐");
    }
}

appcan.button(".btnReview", "btn-act", function() {
    appcan.window.open("book_review", "book_review.html", 10);
})

appcan.button("#nav-left", "btn-act", function() {
    exit();
})

appcan.button(".favorite", "btn-act", function() {
    if (bookInfo.isFavorite == "1") {
        appcan.window.evaluateScript({
            name : "pub_task", //窗口名称
            scriptContent : 'step3();'
        });
    } else {
        var params = {
            'userId' : userInfo.id,
            'bookId' : bookInfo.id
        };
        common.ajax("/favorite/add", {
            params : JSON.stringify(params)
        }, function(data) {
            bookInfo.isFavorite = "1";
            setBookInfo();
            setView();
            appcan.window.evaluateScript({
                name : "pub_task", //窗口名称
                scriptContent : 'step3();'
            });
        }, function(data) {
            toast(getMsgByKey(data.msg), config.toastTimeShort);
        }, {
            type : 'POST'
        });
    }
});


function setOrientation(type) {
    uexWindow.setOrientation(type);
}



function loadIntro() {
    getBookInfo();
    if (bookInfo.image.length > 0) {
        $(".bookImg").attr("src", _SERVER_ADDRESS + bookInfo.image);
    }
    $(".author").html(bookInfo.author);
    $(".publisher").html(bookInfo.publisher);
    $(".wordCount").html(bookInfo.wordCount + "千字");
    $("#main").html(bookInfo.readGuide);
}
