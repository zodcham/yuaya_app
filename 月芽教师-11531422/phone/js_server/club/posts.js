
appcan.ready(function() {
	isIPhoneX();
	
	$("#footer").addClass("uhide");
	
    $("#forum_title").html(getLocVal("forum_title"));
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "posts_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})
function reload() {
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "posts_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
}

function posts_add() {
    
	//appcan.window.open("posts_add", "posts_add.html", 5);
	
    /*
     var titHeight = $('#header').offset().height;
     var pushUrl = "posts_add_content.html";
     uexWindow.openPopover({
     name : "posts_add_content",
     url : pushUrl,
     x : 0,
     y : 0,
     w : document.body.clientWidth,
     h : document.body.clientHeight,
     bottomMargin : 0,
     extraInfo : {
     opaque : true
     }
     });
     */
}