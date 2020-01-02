appcan.ready(function() {
            getUserInfo();
            getProgramInfo();
               $("#start-Score").bind("touchstart",function(){
                    var obj=event.target;
                    if($(obj).hasClass("fa")){
                        $(obj).prevAll(".icon-star-five-hollow").removeClass("icon-star-five-hollow").addClass("icon-star-five").css("color", "#FFC304");
                        $(obj).removeClass("icon-star-five-hollow").addClass("icon-star-five").css("color", "#FFC304");
                        $(obj).nextAll(".icon-star-five").removeClass("icon-star-five").addClass("icon-star-five-hollow").css("color", "#C3C3C3");
                    }
               }).bind("touchmove",function(){
                   if (event.targetTouches.length == 1) {
                　　　　 event.preventDefault();
                        var touch = event.targetTouches[0];
                        $.map($("#start-Score .fa"),function(obj){
                            if(touch.pageX<=$(obj).position().left){
                                $(obj).removeClass("icon-star-five").addClass("icon-star-five-hollow").css("color", "#C3C3C3");
                            }else{
                                $(obj).removeClass("icon-star-five-hollow").addClass("icon-star-five").css("color", "#FFC304");
                            }
                        });
                   } 
                   
               }).bind("touchend",function(){
                   
               });
               $("#btnSubmit").bind("click",function(){
                   doSubmit();
               });
            uexWindow.evaluateScript("",0,"isOpenComments=true;");
            
        });
        
        function utf16toEntities(str) {  
             var flag = true;
            var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则  
            str = str.replace(patt, function(char){  
                    var H, L, code;  
                    if (char.length===2) {  
                        H = char.charCodeAt(0); // 取出高位  
                        L = char.charCodeAt(1); // 取出低位  
                        code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法  
                        flag = false;  
                    } else {  
                        return char;  
                    }  
                });  
            return flag;  
        }  
        function doSubmit() {
            var content=$("#txtComments").val();
             if (content.length == 0) {
                toast("请输入短评内容~", config.toastTimeShort);
                return;
            }
            if (content.length > 1000) {
                toast("短评内容超过1000字~", config.toastTimeShort);
                return;
            }
             var star = $("#start-Score .icon-star-five").length;
             if (star == 0) {
                toast("请选择评分~", config.toastTimeShort);
                return;
             }
            var checkNum = /[\ud800-\udbff][\udc00-\udfff]/g;
            if(checkNum.test(content))
            {
                toast("请勿添加表情图片~", config.toastTimeShort);
                return false;
            }
            
              var params = {'userId' : userInfo.id,'programId': programInfo.id,'content' :content,'score' : star};
            common.ajax("/programEvaluate/add", {
                params : JSON.stringify(params)
            }, function(data) {
                toast("发表成功",config.toastTimeShort);
                setTimeout(function(){
                    uexWindow.evaluateMultiPopoverScript("bookIndex", "content", "comments","refreshData();");
                    uexWindow.evaluateScript("",0,"exit();");
                },1000);
            }, function(data) {
                toast(getMsgByKey(data.msg), config.toastTimeShort);
            }, {type:'POST'});


            //alert(txt);
            
            //
             //appcan.window.close(-1);
        };
        
        // function exit(){
            // if($("#txtComments").val().length>0){
                 // appcan.alert("", "确定要取消评论吗？", ["确定", "取消"], function(e, idx){
                    // if (idx == 1) {
                        // return;
                    // }else{
                        // uexWindow.evaluateScript("",0,"isOpenComments=false;");
                        // appcan.window.close(-1);
                    // }
                 // });
            // }else{
                // uexWindow.evaluateScript("",0,"isOpenComments=false;");
                // appcan.window.close(-1);
            // }
        // }