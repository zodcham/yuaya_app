appcan.ready(function() {
    
    $("#HeaderTitle").html("月芽公告");
    
    $("#content").css("line-height","2em").css("padding","0.5em");
    $("#content").css("text-align","left");
    $("#content").html("<p style='width:100%; text-align:center; line-height:3em; font-weight:bold;'>互动分享和读后感的图片上传问题已解决</p><p style='width:100%;'>　　互动分享可上传5张图，读后感上传3张图，欢迎使用。</p>");
    
    

});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})