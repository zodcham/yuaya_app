

var titHeight;
appcan.ready(function() {
	isIPhoneX();
	
    config.isMainWin = true;
    
    init();
    window.onorientationchange = window.onresize = function() {
        init();
    };
});
function init() {
    titHeight = $('#header')[0].offsetHeight;
    appcan.frame.open({
        id : "content",
        url : [{
            'inPageName' : 'myList',
            'inUrl' : 'user_book_list_content.html'
        }, {
            'inPageName' : 'readList',
            'inUrl' : 'user_book_list_read_content.html'
        }],
        top : titHeight,
        left : 0,
        index : 0,
        change : function(index, res) {
            changeTab(res.multiPopSelectedIndex);

        }
    });
    

    $(".tabs .tabItem").on("click", function() {
        switch($(this).attr("id")) {
        case "teacherList":
            appcan.window.selectMultiPopover("content", 0);
            changeTab(0);
            break;
        case "myList":
            appcan.window.selectMultiPopover("content", 1);
            changeTab(1);
            break;
        }
    });
    changeTab(0);
}

function changeTab(index) {
    $(".tabs .tabItem").removeClass("tab-active sc-text-active");
    $(".tabs .tabItem:eq(" + index + ")").addClass("tab-active sc-text-active");
    $("#title").text($(".tabs .tabItem:eq(" + index + ")").find(".text").text());
}

appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {

    var json={"title":"我的书架","content":"列出我喜欢的图书和教师推荐的图书。"};
    appcan.alert(json);
})