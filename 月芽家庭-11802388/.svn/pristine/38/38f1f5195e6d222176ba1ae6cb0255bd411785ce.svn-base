

var titHeight;
var orientationFlag = 1;
appcan.ready(function() {
	isIPhoneX();
	
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            exit();
        }
    }
    uexWindow.setReportKey(0, 1);

    var titHeight = $('#header').offset().height;
    getSysInfo();
    var url = "";
    switch(sysInfo.report.type) {
    case "1":
        url = "user_report_content.html";
        break;
    case "2":
        url = "user_report_chart_content.html";
        setOrient();
        break;
    case "3":
        url = "user_report_chart_content.html";
        setOrient();
        break;
    case "4":
        url = "user_report_book_list_content.html";
        break;
    case "5":
        url = "user_report_book_report_content.html";
        break;
    case "6":
        url = "user_report_details_content.html";
        break;
    }
    $("#title").html(sysInfo.report.name);
    appcan.frame.open("content", url, 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});

appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function exit() {
    if (orientationFlag != 1) {
        uexWindow.setOrientation(1);
    }
    appcan.window.close(-1);
}

function setOrient() {
    orientationFlag = orientationFlag == 1 ? 2 : 1;
    uexWindow.setOrientation(orientationFlag);
}