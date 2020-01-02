

appcan.ready(function() {
	isIPhoneX();
	
    init();

    window.onorientationchange = window.onresize = function() {
        init();
    }
});
var tabview = appcan.tab({
    selector : "#tabview",
    hasIcon : false,
    hasAnim : false,
    hasLabel : true,
    hasBadge : false,
    data : [{
        label : '互动分享',
    }, {
        label : '月芽社区',
    }, {
        label : '消息',
    }, {
        label : '直播',
    }]
});
tabview.on("click", function(obj, index) {
    appcan.window.selectMultiPopover("content", index);
})
// appcan.button(".nav-btn", "btn-act", function() {
// appcan.window.close(-1);
// })
appcan.button("#nav-left", "btn-act", function() {
    exit();
})
function exit() {
    //setOrientation(1);
    uexWindow.evaluatePopoverScript("", "Interaction", "refreshData()");
    appcan.window.close(-1);
}

function init() {
    var titHeight = $('#header').offset().height + $('#tabview').offset().height;

    appcan.frame.open({

        id : "content",

        url : [{

            "inPageName" : "Interaction",
            "inUrl" : "Interaction_content.html",

        }, {

            "inPageName" : "club",
            "inUrl" : '../club/club_content.html',

        }, {

            "inPageName" : "message_list",
            "inUrl" : 'message_list.html',

        }, {

            "inPageName" : "Livebroadcast",
            "inUrl" : 'Livebroadcast_content.html',

        }],

        top : titHeight,

        left : 0,

        index : 0,

        change : function(err, res) {
            tabview.moveTo(res.multiPopSelectedIndex);
        }
    });

}
