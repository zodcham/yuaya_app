appcan.ready(function() {
    var titHeight = $('#header').offset().height + $('#tabview').offset().height;

    appcan.frame.open({

        id : "content",

        url : [{

            "inPageName" : "邮箱找回",
            "inUrl" : "phone_Pass.html",

        }, {

            "inPageName" : "手机号码找回",
            "inUrl" : "applyPass.html",

        }],

        top : titHeight,

        left : 0,

        index : 0,

        change : function(err, res) {
            tabview.moveTo(res.multiPopSelectedIndex);
        }
    });

    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
var tabview = appcan.tab({
    selector : "#tabview",
    hasIcon : false,
    hasAnim : false,
    hasLabel : true,
    hasBadge : false,
    data : [{
        label : '邮箱找回',
    }, {
        label : "手机号码找回",
    }]
});
tabview.on("click", function(obj, index) {
    appcan.window.selectMultiPopover("content", index);
})
appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})
