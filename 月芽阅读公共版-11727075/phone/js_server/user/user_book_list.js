

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
    var win_url=location.href;
    var win="";
    if(win_url.indexOf("f=root")>0){
        win="?f=root";
    }
    appcan.frame.open({
        id : "content",
        url : [{
            'inPageName' : 'myList',
            'inUrl' : 'user_book_list_content.html'+win
        }, {
            'inPageName' : 'readList',
            'inUrl' : 'user_book_list_read_content.html'+win
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
    if(index==0){
        $("#teacherList").removeClass("foot1").addClass("foot1_a");
        $("#myList").removeClass("foot2_a").addClass("foot2");
    }
    else{
        $("#teacherList").removeClass("foot1_a").addClass("foot1");
        $("#myList").removeClass("foot2").addClass("foot2_a");
    }
    $(".tabs .tabItem").removeClass("tab-active sc-text-active");
    $(".tabs .tabItem:eq(" + index + ")").addClass("tab-active sc-text-active");
    $("#title").text($(".tabs .tabItem:eq(" + index + ")").find(".text").text());
}

appcan.button("#nav-left", "btn-act", function() {
    rootopenPlayer();
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {

    var json={"title":"我的书架","content":"列出我喜欢的图书和教师推荐的图书。"};
    appcan.alert(json);
})