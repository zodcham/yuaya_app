

var titHeight;
appcan.ready(function() {
    config.isMainWin = true;
    init();
});

var openObj = {};

function init() {
	isIPhoneX();

    titHeight = $('#header')[0].offsetHeight;
    appcan.frame.open({
        id : "content",
        url : [{
            'inPageName' : 'myMessage',
            'inUrl' : 'message_list_content.html'
        }, {
            'inPageName' : 'send',
            'inUrl' : 'message_send_list_content.html'
        }, {
            'inPageName' : 'sysMessage',
            'inUrl' : 'message_sys_list_content.html'
        }, {
            'inPageName' : 'valid',
            'inUrl' : 'message_valid_list_content.html'
        }],
        top : titHeight,
        left : 0,
        index : 0,
        change : function(index, res) {
            changeTab(res.multiPopSelectedIndex);

        }
    });
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    };

    $(".tabs .tabItem").on("click", function() {
        switch($(this).attr("id")) {
        case "reward":
            appcan.window.selectMultiPopover("content", 0);
            changeTab(0);
            break;
        case "send":
            if (!openObj["send"]) {
                uexWindow.evaluateMultiPopoverScript("", "content", "send", "loadData();");
                openObj["send"] = true;
            }
            appcan.window.selectMultiPopover("content", 1);
            changeTab(1);
            break;
        case "wealth":
            if (!openObj["sysMessage"]) {
                uexWindow.evaluateMultiPopoverScript("", "content", "sysMessage", "loadData();");
                openObj["sysMessage"] = true;
            }
            appcan.window.selectMultiPopover("content", 2);
            changeTab(2);
            break;
        case "valid":
            if (!openObj["valid"]) {
                uexWindow.evaluateMultiPopoverScript("", "content", "valid", "loadData();");
                openObj["valid"] = true;
            }
            appcan.window.selectMultiPopover("content", 3);
            changeTab(3);
            break;
        }
    });
    changeTab(0);
}

appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {
    appcan.window.open("message_add", "message_add.html", 5);
})
function changeTab(index) {
    $(".tabs .tabItem").removeClass("tab-active");
    $(".tabs .tabItem:eq(" + index + ")").addClass("tab-active");
    $("#title").text($(".tabs .tabItem:eq(" + index + ")").find(".text").text());
}