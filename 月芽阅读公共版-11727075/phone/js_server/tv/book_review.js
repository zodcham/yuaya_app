
var timecount_test=0;
var timestart_test=0;
var titHeight;
appcan.ready(function() {
    isIPhoneX();
    if(timestart_test==0) timestart_test=new Date().getTime();
    getBookInfo();
    $("#title").html(bookInfo.name);
    titHeight = $('#header').offset().height;
    appcan.frame.open("content", "book_review_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    timecount_test= new Date().getTime()-timestart_test;
    appcan.window.close(-1);
})

appcan.button("#nav-right", "btn-act", function() {
    setPageIndex(1,0);
    uexWindow.evaluatePopoverScript("","content","goSheet();");
})
function setPageIndex(pageIndex,totalPage){
    if (parseInt(pageIndex) <= parseInt(totalPage) ) {
        $("#pageNum").html(pageIndex + " / " + totalPage);
        $("#footer").removeClass("uhide");
        $("#btnMenu").removeClass("uhide");
    }else {
        $("#footer").addClass("uhide");
        $("#btnMenu").addClass("uhide");
    }
    if (parseInt(pageIndex) == 1)　{
        $(".btnPre").addClass("btnPre_disable");
        $(".btnPre .text").removeClass("bc-text-head");
    }else {
        $(".btnPre").removeClass("btnPre_disable");
        $(".btnPre .text").addClass("bc-text-head");
    }
    if (parseInt(pageIndex) == parseInt(totalPage)) {
        $(".btnNext .text").html("答题卡");
    }else {
        $(".btnNext .text").html("下一题");
    }

    appcan.frame.resize("content", 0, titHeight);
}
appcan.button(".btnPre", "btn-act", function() {
    uexWindow.evaluatePopoverScript("","content","doPre();");
})
appcan.button(".btnNext", "btn-act", function() {
    uexWindow.evaluatePopoverScript("","content","doNext();");
})
