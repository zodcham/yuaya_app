appcan.ready(function() {
	isIPhoneX();
    step1();
});
appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function exit() {
    //uexWindow.evaluatePopoverScript("user_info", "content", "loadData();");
    appcan.window.close(-1);
}

function step1(){
    var titHeight = titHeight = $('#header').offset().height;
    appcan.frame.open("content", "task1_search.html", 0, titHeight);
    $(".step").removeClass("step_ok").removeClass("step_doing").addClass("step_undo");
    $("#step1").removeClass("step_undo").addClass("step_doing");
}
function step1_icon(){
    $("#step1").removeClass("step_undo").addClass("step_doing");
}

function step2(){
    var titHeight = $('#header').height();
    appcan.frame.open("content", "task2_bookshelf.html", 0, titHeight);
}
function step2_icon(){
    $("#step1").removeClass("step_doing").addClass("step_ok");
    $("#step2").removeClass("step_undo").addClass("step_doing");
}

function step3(){
    var titHeight = $('#header').height();
    appcan.frame.open("content", "task3_recommend.html", 0, titHeight);
}
function step3_icon(){
    $("#step1").removeClass("step_doing").addClass("step_ok");
    $("#step3").removeClass("step_undo").addClass("step_doing");
}


function openStudent() {
    appcan.window.open("student_select", "../student/student_select.html", 10);
}



function step4(){
    var titHeight = $('#header').height();
    appcan.frame.open("content", "task4_success.html", 0, titHeight);
}
function step4_icon(){
    //$("#step3").removeClass("step_doing").addClass("step_ok");
    $(".step").removeClass("step_doing").removeClass("step_undo").addClass("step_ok");
}
