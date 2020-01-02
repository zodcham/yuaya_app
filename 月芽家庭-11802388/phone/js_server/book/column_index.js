


var dicList = {
    "grade" : [],
    "book_category" : [],
    "recommendLevel" : []
};
var titHeight;
var linkHtml;
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
        setProgramInfo();
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
	
	window.onorientationchange = window.onresize = function() {
        //appcan.frame.resize("content", 0, titHeight);
		init();
    };
    getUserInfo();
    getProgramInfo();
    getCommInfo();
    titHeight = $('#header').offset().height;
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            if (isOpenComments) {
                uexWindow.evaluatePopoverScript("", "introduce", "exit();");
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
    $(".bookName").html(programInfo.name);

    loadDic();

    var j = 0;
    var star = programInfo.score;
    for (; j < parseInt(star / 2); j++) {
        $("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five");
    }
    star = Math.round(programInfo.score - star);
    if (star == 1) {
        $("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five-half");
    }
    setView();
});

function init() {
    titHeight = $('#header')[0].offsetHeight;

    if (programInfo.weixingLink.length > 0) {
        linkHtml = programInfo.weixingLink;
    } else {
        linkHtml = 'column_index_introduce_content.html';
    }

    appcan.frame.open({
        id : "content",
        url : [{
            'inPageName' : 'introduce',
            'inUrl' : linkHtml
        }, {
            'inPageName' : 'comments',
            'inUrl' : 'column_index_comments_content.html'
        }, {
            'inPageName' : 'content',
            'inUrl' : 'column_index_content.html'
        }],
        top : titHeight,
        left : 0,
        index : 0,
        change : function(index, res) {
            $(".tab .tabcurrent").removeClass("tabcurrent");
            $(".nav:eq(" + res.multiPopSelectedIndex + ")").addClass("tabcurrent");
        }
    });
    
}

appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function exit() {
    uexWindow.evaluatePopoverScript("", "introduce", "refesh();");
    appcan.window.close(-1);
}

function setOrientation(type) {
    uexWindow.setOrientation(type);
}
