$('audio').audioPlayer();
var dicList = {
    "grade" : [],
    "book_category" : [],
    "recommendLevel" : []
};
var titHeight;
var linkHtml;
var isOpenComments = false;

// 右侧菜单
var i = false;

$('#Mode').on('click', function() {
    if (i === false) {
        //显示
        i = true;
        $(".fixedcontent").css("display", "block");
    } else {
        //隐藏
        i = false;
        $(".fixedcontent").css("display", "none");
    }
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    $("#bookList").empty();
    pageIndex = 1;
    loadData();
})
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
    getUserInfo();
    getProgramInfo();
    getCommInfo();
    init();
    window.onorientationchange = window.onresize = function() {
        //init();
    };
    // titHeight = $('#header').offset().height;
    titHeight = $('#header').offset().height;
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            if (isOpenComments) {
                uexWindow.evaluatePopoverScript("", "introduce1", "exit();");
            } else {
                exit();
            }
        }
    }
    init();
    uexWindow.setReportKey(0, 1);
    $(".nav").on("click", function() {
        $(".tab .tabcurrent").removeClass("tabcurrent");
        $(this).addClass("tabcurrent");
        appcan.window.selectMultiPopover("content", $(this).index());
    });
    // init();
    $(".bookName").html(programInfo.name);

    if (programInfo.pptPath.length > 0) {
        $("#nav-right").removeClass("uhide");
    }
    //外链视频
    // alert(programInfo.name);
    // alert(programInfo.introduce);
    // alert(111);
    $(".preview").on("click", function() {
        $(".fixedcontent").css("display", "none");
        getProgramInfo();

        var name = programInfo.pdfPath;

        getSysInfo();
        sysInfo.ranking = {
            "name" : name
        };
        setSysInfo();
        //appcan.window.open("Read_viewer", "preview.html", 5);
		loadAllPicData();

    });
    // $("#download").on("click",function(){
    // getProgramInfo();
    //
    // var name  = programInfo.pdfPath;
    //
    // getSysInfo();
    // sysInfo.ranking = {"name":name};
    // setSysInfo();
    // // appcan.window.open("Read_downloader","downloader.html",10);
    // appcan.window.open("Read_downloader","../update.html",10);
    // });

    $("#nav-left").on("click", function() {

        appcan.window.close(-1);
    });
    // if(programInfo.videoFile.length == 0&&programInfo.chooseAudioPath.length == 0&&programInfo.introduc.length == 0){
    // // alert(1);
    // $("#header").addClass("header");
    // $("#cont").addClass("cont");
    // $(".headerh").html(programInfo.name);
    // }

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
        linkHtml = 'Read_index_introduce_content.html';
    }

    appcan.frame.open({
        id : "content",
        url : [{
            'inPageName' : 'introduce1',
            'inUrl' : linkHtml
        }, {
            'inPageName' : 'Reads',
            'inUrl' : 'Read_index_comments_content.html'
        }, {
            'inPageName' : 'content',
            'inUrl' : 'Read_index_content.html'
        }],
        top : titHeight,
        left : 0,
        index : 0,
        change : function(index, res) {
            $(".tab .tabcurrent").removeClass("tabcurrent");
            $(".nav:eq(" + res.multiPopSelectedIndex + ")").addClass("tabcurrent");
        }
    });
    

    if (programInfo.remarks.length > 0) {
        $("#chainintroduce").removeClass("uhide");
        $("#chain").attr("src", programInfo.remarks);
    }
    //视频第一个图片
    if (programInfo.videoFile.length > 0) {
        $("#willesPlay").removeClass("uhide");
        $(".video").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.videoFile, 1);
        if (!programInfo.posterImagePath) {
            $(".videos").attr("poster", _SERVER_ADDRESS + programInfo.image);
        } else {
            $(".videos").attr("poster", _SERVER_ADDRESS + programInfo.posterImagePath);
        }
    }
    //音频

    if (programInfo.audioFile.length > 0) {
        $("#audio").removeClass("uhide");
        $(".audio").attr("src", _SERVER_VIDEO_ADDRESS + programInfo.audioFile);

        $(".audios").css("background-image", "url(" + _SERVER_ADDRESS + programInfo.image + ")");
    }
    //PPT封面
    if (programInfo.pdfPath.length > 0) {
        $("#pdfPathPPT").removeClass("uhide");
        $("#Explains").addClass("uhide");
        // $(".pdfPath").attr("src",_SERVER_ADDRESS + programInfo.image01);
        $(".headerh").html(programInfo.name);
        $("#Explain").html("内容");
        $(".background").css("background-image", "url(" + _SERVER_ADDRESS + programInfo.image01 + ")");
        $(".Mode").removeClass("uhide");
    }
}

appcan.button("#nav-left", "btn-act", function() {
    // appcan.window.close(-1);
    init();
    exit();
})
function exit() {
    // uexWindow.evaluatePopoverScript("","introduce1","refesh();");
    appcan.window.close(-1);
}

function setOrientation(type) {
    uexWindow.setOrientation(type);
}


function loadAllPicData() {
    getProgramInfo();
    var params = {
        'userId' : userInfo.id,
        'programId' : programInfo.id
    };

    common.ajax("/exercise/getProgramQuestionList", {
        params : JSON.stringify(params)
    }, function(data) {

        dataArra = data.attributes.dataArray;
        
        openBrowser(dataArra);

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, null);
}

//打开图片浏览器
function openBrowser() {
    // alert(dataArra);
    var data = {
        displayActionButton : false,
        displayNavArrows : true,
        enableGrid : true,
        //startOnGrid:true,
        startIndex : 0,
        data : dataArra

    }
    // alert(data.data);
    var json = JSON.stringify(data);
    // alert(json);
    uexImage.openBrowser(json);
}