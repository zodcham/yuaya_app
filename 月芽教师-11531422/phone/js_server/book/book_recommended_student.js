var titHeight;
var isFrameList = false;
var myClassList = [];
var openFlag = 0;
var selectedIndex = 0;
var winIsShow = true;

appcan.ready(function() {
	isIPhoneX();
	
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            hide();
        }
    }
    uexWindow.setReportKey(0, 1);

    getUserInfo();
    getBookInfo();
    config.isMainWin = true;
    myLoading.show("正在加载，请稍后...");
    init();
    uexIndexBar.onTouchResult = function(opId, dataType, data) {
        toast(data, config.toastTimeShort);
        if (isFrameList) {
            uexWindow.evaluateMultiPopoverScript("", "content", myClassList[selectedIndex].id, "touchIndexBar('" + data + "');");
        } else {
            uexWindow.evaluatePopoverScript("", "content", "touchIndexBar('" + data + "');");
        }
    }
});
function createBar() {
    var li = ['-'];
    for (var i = 0; i < 26; i++) {
        li.push(getLetterByNum(i));
    }
    var extras = {
        indices : li,
        textColor : "#000000"//"#5485fe"
    }
    uexIndexBar.open(($("#content").width() - 50), titHeight, 50, $("#content").height() - 20, JSON.stringify(extras));
}

function init() {
    myClassList = bookInfo.classList;
    if (myClassList.length > 1) {
        isFrameList = true;
        var myUrl = [];
        for (var i = 0; i < myClassList.length; i++) {
            var obj = myClassList[i];
            myUrl.push({
                'inPageName' : obj.id,
                'inUrl' : 'book_recommended_student_content.html'
            });
            $("#tab").append($("<div class='ub ub-ac ub-pc ub-f1 nav " + ((i == 0) ? "tabcurrent" : "") + "' id='" + obj.id + "'><span>" + obj.name + "</span></div>"));
        }
        $("#tab").removeClass("uhide");
        $(".nav").on("click", function() {
            $(".tab .tabcurrent").removeClass("tabcurrent");
            $(this).addClass("tabcurrent");
            selectedIndex = $(this).index();
            appcan.window.selectMultiPopover("content", $(this).index());
            initCheckBox();
        });
        titHeight = $('#header')[0].offsetHeight;
        appcan.frame.open({
            id : "content",
            url : myUrl,
            top : titHeight,
            left : 0,
            index : 0,
            change : function(index, res) {
                $(".tab .tabcurrent").removeClass("tabcurrent");
                selectedIndex = res.multiPopSelectedIndex;
                $(".nav:eq(" + res.multiPopSelectedIndex + ")").addClass("tabcurrent");
                initCheckBox();
            }
        });
    } else {
        titHeight = $('#header')[0].offsetHeight;
        appcan.frame.open("content", "book_recommended_student_content.html", 0, titHeight);
        myLoading.close();
    }
    createBar();
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    };
}

appcan.button("#nav-left", "btn-act", function() {
    hide();
})
function getLoaded() {
    if (isFrameList) {
        openFlag++;
        if (openFlag >= myClassList.length) {
            for (var i = 0; i < myClassList.length; i++) {
                uexWindow.evaluateMultiPopoverScript("", "content", myClassList[i].id, "loadStudent('" + myClassList[i].id + "')");
            }
            myLoading.close();
        }
    } else {
        uexWindow.evaluateMultiPopoverScript("", "content", "loadStudent('" + myClassList[0].id + "')");
    }
}

appcan.button("#nav-right", "btn-act", function() {
    var flag = $(this).find(".fa").hasClass("icon-checkbox");
    if (flag) {
        $(this).find(".fa").removeClass("icon-checkbox").addClass("icon-checkboxchecked");
    } else {
        $(this).find(".fa").removeClass("icon-checkboxchecked").addClass("icon-checkbox");
        uexWindow.evaluateMultiPopoverScript("", "content", myClassList[selectedIndex].id, "checkAll(false);");
    }
    if (isFrameList) {
        uexWindow.evaluateMultiPopoverScript("", "content", myClassList[selectedIndex].id, "checkAll(" + flag + ");");
    } else {
        uexWindow.evaluatePopoverScript("", "content", "checkAll('" + flag + "');");
    }
});
function initCheckBox() {
    if (isFrameList) {
        uexWindow.evaluateMultiPopoverScript("", "content", myClassList[selectedIndex].id, "ischeckAll();");
    } else {
        uexWindow.evaluateMultiPopoverScript("", "content", "ischeckAll();");
    }
}

function changeCheckBox(flag) {
    if (flag) {
        $("#nav-right .fa").removeClass("icon-checkbox").addClass("icon-checkboxchecked");
    } else {
        $("#nav-right .fa").removeClass("icon-checkboxchecked").addClass("icon-checkbox");
    }
}

appcan.button("#btnAdd", "btn-act", function() {
    config.isMainWin = true;
    myLoading.show("正在处理，请稍后...");
    if (isFrameList) {
        openFlag = 0;
        uexWindow.evaluateMultiPopoverScript("", "content", myClassList[openFlag].id, "getCheckedValue();");
    } else {
        uexWindow.evaluateMultiPopoverScript("", "content", "getCheckedValue();");
    }

});
function doSubmit() {
    openFlag++;
    if (openFlag < myClassList.length) {
        uexWindow.evaluateMultiPopoverScript("", "content", myClassList[openFlag].id, "getCheckedValue();");
        myLoading.close();
        uexWindow.setWindowHidden(1);
    } else {
        uexWindow.evaluatePopoverScript("book_recommended", "content", "getStudentList();");
        myLoading.close();
        uexWindow.setWindowHidden(1);
    }
}

function exit() {
    appcan.window.close(-1);
    uexWindow.evaluateScript("book_recommended", 0, "close();");
}

function hide() {
    if (winIsShow) {
        winIsShow = false;
        config.isMainWin = true;
        myLoading.show("正在处理，请稍后...");
        if (isFrameList) {
            openFlag = 0;
            uexWindow.evaluateMultiPopoverScript("", "content", myClassList[openFlag].id, "getCheckedValue();");
        } else {
            uexWindow.evaluateMultiPopoverScript("", "content", "getCheckedValue();");
        }
    } else {
        exit();
    }
}

function show() {
    winIsShow = true;
    uexWindow.setWindowHidden(0);
}