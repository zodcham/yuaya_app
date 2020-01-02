

appcan.ready(function() {
	isIPhoneX();
	$("#footer").addClass("uhide");
    var titHeight = $('#header').offset().height;
    init();
    /*
    appcan.frame.open("content", "order_list_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
    */
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})

appcan.button("#nav-right", "btn-act", function() {
    appcan.window.open("help", "../help.html", 5);
})



function init(){
    var titHeight =$('#header')[0].offsetHeight;
	appcan.frame.open("content", "order_list_content.html", 0, titHeight);
	/*
    appcan.frame.open({
        id : "content",
        url : [{'inPageName':'orderList','inUrl':'order_list_content.html'},{'inPageName':'orderListNoPay','inUrl':'order_list_nopay_content.html'}],
        top : titHeight,
        left : 0,
        index : 0,
        change:function(index,res){
            changeTab(res.multiPopSelectedIndex);
        }
    });


    $(".tabs .tabItem").on("click",function(){
        switch($(this).attr("id")){
            case "paySuccess":
                appcan.window.selectMultiPopover("content",0);
                changeTab(0);
                break;
            case "noPay":
                appcan.window.selectMultiPopover("content",1);
                changeTab(1);
                break;
        }
    });
    changeTab(0);
	*/
}
function changeTab(index){
    $(".tabItem").removeClass("tab-active");
    if(0==index){
        $("#paySuccess").addClass("tab-active");
    }
    else{
        $("#noPay").addClass("tab-active");
    }

    //$(".tabItem:eq("+index+")").addClass("tab-active");
    //$("#title").text($(".tabs .tabItem:eq("+index+")").find(".text").text());
}