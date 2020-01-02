
appcan.ready(function() {
    
    var id=getLocVal("message_id");
    var title=getLocVal("message_title");
    var addtime=getLocVal("message_addtime");
    var content=getLocVal("message_content");
	content=ReplaceEnter(content);
    
    $(".Names").html(title);
    $(".Namdata").html(addtime);
    $(".main_content").html(content);
    
});

//替换所有的回车换行  
function ReplaceEnter(content)  
{  
    var string = content;  
    try{  
        string=string.replace(/\r\n/g,"<br>")  
        string=string.replace(/\n/g,"<br>");  
    }catch(e) {  
        alert(e.message);  
    }  
    return string;  
} 
