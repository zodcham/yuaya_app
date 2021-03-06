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
	isIPhoneX();
	
    getUserInfo();
    getBookInfo();
    getCommInfo();
    titHeight = $('#header').offset().height;
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            if (isOpenComments) {
                uexWindow.evaluatePopoverScript("", "book_comments", "exit();");
            } else {
                exit();
            }
        }
    }
    uexWindow.setReportKey(0, 1);
    $(".nav").on("click", function() {
        $(".tab .tabcurrent").removeClass("tabcurrent");
        $(this).addClass("tabcurrent");
        appcan.window.selectMultiPopover("content", $(this).index());
    });
    init();
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

appcan.button(".btnReview", "btn-act", function() {
    if (bookInfo.isFavorite == "1") {
        appcan.window.open("book_review", "book_review.html", 10);
    } else {
        toast("请先加入书架~", config.toastTimeShort);
    }
});

appcan.button(".btnIntroduce", "btn-act", function() {
    if (bookInfo.isFavorite == "1") {
        appcan.window.open("book_introduce_add", "book_introduce_add.html", 10);
    } else {
        toast("请先加入书架~", config.toastTimeShort);
    }
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
        $(".favorite").html("移出书架");
    } else {
        $(".favorite").html("加入书架");
    }
}

function init() {
    titHeight = $('#header')[0].offsetHeight;
    appcan.frame.open({
        id : "content",
        url : [{
            'inPageName' : 'introduce',
            'inUrl' : 'book_index_introduce_content.html'
        }, {
            'inPageName' : 'comments',
            'inUrl' : 'book_index_comments_content.html'
        }, {
            'inPageName' : 'content',
            'inUrl' : 'book_index_content.html'
        }],
        top : titHeight,
        left : 0,
        index : 0,
        change : function(index, res) {
            $(".tab .tabcurrent").removeClass("tabcurrent");
            $(".nav:eq(" + res.multiPopSelectedIndex + ")").addClass("tabcurrent");
        }
    });
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    };
}

appcan.button(".btnReview", "btn-act", function() {
    appcan.window.open("book_review", "book_review.html", 10);
})

appcan.button("#nav-left", "btn-act", function() {
    exit();
})

appcan.button(".favorite", "btn-act", function() {
    if (bookInfo.isFavorite == "1") {
        var params = {
            'userId' : userInfo.id,
            'bookId' : bookInfo.id
        };
        common.ajax("/favorite/remove", {
            params : JSON.stringify(params)
        }, function(data) {
            bookInfo.isFavorite = "0";
            setBookInfo();
            setView();
            toast("已移出书架~", config.toastTimeShort);
        }, function(data) {
            toast(getMsgByKey(data.msg), config.toastTimeShort);
        }, {
            type : 'POST'
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
            toast("已加入书架~", config.toastTimeShort);
        }, function(data) {
            toast(getMsgByKey(data.msg), config.toastTimeShort);
        }, {
            type : 'POST'
        });
    }
});

function exit() {
    //setOrientation(1);
    appcan.window.close(-1);
    //uexWindow.evaluatePopoverScript("","introduce","closePlayer();");
}

function setOrientation(type) {
    uexWindow.setOrientation(type);
}