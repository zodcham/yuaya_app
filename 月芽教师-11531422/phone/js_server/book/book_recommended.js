var titHeight;

appcan.ready(function() {
	isIPhoneX();
	
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            exit();
        }
    }
    uexWindow.setReportKey(0, 1);

    titHeight = $('#header').offset().height;
    appcan.frame.open("content", "book_recommended_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function openStudent() {
    appcan.window.open("student_select", "../student/student_select.html", 10);
}

function setFooterView(isHide) {
    if (isHide) {
        $("#footer").addClass("uhide");
    } else {
        $("#footer").removeClass("uhide");
    }
    appcan.frame.resize("content", 0, titHeight);
    uexWindow.evaluatePopoverScript("", "content", "getStudentList();");
}

function exit() {
    appcan.window.close(-1);
}

appcan.button("#btnSubmit", "btn-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "doSubmit();");
})