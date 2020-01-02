
appcan.ready(function() {
    
    var id=getLocVal("message_id");
    var title=getLocVal("message_title");
    var addtime=getLocVal("message_addtime");
    var content=getLocVal("message_content");
    
    $(".Names").html(title);
    $(".Namdata").html(addtime);
    $(".main_content").html(content);
    
});