var titHeight;
var openObj = {};

appcan.ready(function() {
	isIPhoneX();
	
    init();
});

function init() {
    titHeight = $('#header')[0].offsetHeight;
    appcan.frame.open({
        id : "content",
        url : [{
            'inPageName' : 'readreport',
            'inUrl' : 'student_info_readreport.html'
        }, {
            'inPageName' : 'bookList',
            'inUrl' : 'student_info_content.html'
        }, {
            'inPageName' : 'readfeeling',
            'inUrl' : 'student_info_readfeeling.html'
        }],
        top : titHeight,
        left : 0,
        index : 0,
        change : function(index, res) {
            changeTab(res.multiPopSelectedIndex + "");

        }
    });
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    };

    $(".box").on("click", function() {
        $(this).siblings("input").trigger("click");
        switch($(this).attr("value")) {
        case "0":
            appcan.window.selectMultiPopover("content", 0);
            changeTab("0");
            break;
        case "1":
            appcan.window.selectMultiPopover("content", 1);
            changeTab("1");
            break;
        case "2":
            appcan.window.selectMultiPopover("content", 2);
            changeTab("2");
            break;
        }
    });
    changeTab("0");
}

function changeTab(index) {
    switch(index) {
    case "0":
        break;
    case "1":
        if (!openObj["1"]) {
            uexWindow.evaluateMultiPopoverScript("", "content", "bookList", "loadData();");
            openObj["1"] = true;
        }
        break;
    case "2":
        if (!openObj["2"]) {
            uexWindow.evaluateMultiPopoverScript("", "content", "readfeeling", "reloadData();");
            openObj["2"] = true;
        }
        break;
    }

    $(".box").eq(index).siblings("input").trigger("click");
}

appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})
