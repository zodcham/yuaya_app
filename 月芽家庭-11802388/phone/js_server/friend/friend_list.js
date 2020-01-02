

var titHeight = 0;
appcan.ready(function() {
	isIPhoneX();

    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            exit();
        }
    }
    uexWindow.setReportKey(0, 1);
    titHeight = $('#header').offset().height;
    appcan.frame.open("content", "friend_list_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
    uexIndexBar.onTouchResult = function(opId, dataType, data) {
        toast(data, config.toastTimeShort);
        uexWindow.evaluatePopoverScript("", "content", "touchIndexBar('" + data + "');");
    }
    setTimeout(function() {
        createBar();
    }, 1000);

});
appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function exit() {
    uexIndexBar.close();
    setTimeout(function() {
        appcan.window.close(-1);
    }, 200);
}

function doSubmit() {
    exit();
}

function createBar() {
    var li = ['-'];
    for (var i = 0; i < 26; i++) {
        li.push(getLetterByNum(i));
    }
    var extras = {
        indices : li,
        textColor : "#33a1e6"
    }
    uexIndexBar.open(($("#content").width() - 25), titHeight + 55, 20, $("#content").height() - 70, JSON.stringify(extras));
}
