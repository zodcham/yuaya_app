var g_SwiperParent;
        var g_SwiperItems=[];
        appcan.ready(function() {
            var width_screen=document.body.clientWidth;
            var height_screen=document.body.clientHeight;
            if(height_screen>width_screen){ //竖屏
                $(".videos").css("width","100%");
            }
            else{
                $(".videos").css("width","50%");
            }
                      
            loadData();
        });
        function loadData(){
            getBookInfo();
            alert();
            $(".author").html(bookInfo.author);
            $(".publisher").html(bookInfo.publisher);
            $(".wordCount").html(bookInfo.wordCount+"千字"); 
            $(".video").src=_SERVER_VIDEO_ADDRESS + bookInfo.videoFile;

            $(".video").attr("src",_SERVER_VIDEO_ADDRESS + bookInfo.videoFile,1);
            $(".videos").attr("poster",_SERVER_ADDRESS + bookInfo.image);
            $(".hits").html(bookInfo.hits+"次");
            $(".recommendTimes").html(bookInfo.recommendTimes+"次");
          
            $("#main").html(bookInfo.readGuide);
            
             
        }
       
        function closePlayer(){
            //uexVideo.closePlayer();
        }
        window.onload = window.onresize = function () {
             resizeIframe();
         }
         var resizeIframe=function(){
             var bodyw=document.body.clientWidth;
             for(var ilength=0;ilength<=document.getElementsByTagName("iframe").length;ilength++){
                  //设定高度
                 document.getElementsByTagName("iframe")[ilength].height = bodyw*9/16;
             }
         } 