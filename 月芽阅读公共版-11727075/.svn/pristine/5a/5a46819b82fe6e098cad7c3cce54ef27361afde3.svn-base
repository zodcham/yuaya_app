var pageIndex=1;
        var g_SwiperItems=[];
        var reloadDate="";
        var loadDate="";
        var reloadJson={"textColor":"#000","imagePath":"res://refesh_icon.png","levelText":"更新日期1","pullToReloadText":"拖动刷新","releaseToReloadText":"释放刷新","loadingText":"刷新中，请稍等"};
        var loadJson={"textColor":"#000","imagePath":"res://refesh_icon.png","levelText":"更新日期2","pullToReloadText":"拖动加载","releaseToReloadText":"释放加载","loadingText":"加载中，请稍等"};
        
        appcan.ready(function() {
            getUserInfo();
            getBookInfo();
            loadData();
            
            uexWindow.setBounce(1);
            uexWindow.notifyBounceEvent(0,1);
            uexWindow.notifyBounceEvent(1,1);
            uexWindow.showBounceView("0","rgba(0, 0, 0, 0)", 1);
            uexWindow.showBounceView("1","rgba(0, 0, 0, 0)", 1);
            uexWindow.onBounceStateChange = function(type, state){
                var time1 = new Date().format("MM-dd HH:mm:ss");   
                switch(type) {
                    case 0:
                        if (state == 2) {
                             refreshData();
                        }
                        break;
                    case 1:
                        if (state == 2) {
                            loadJson.levelText="上次加载："+time1;
                            uexWindow.setBounceParams(1,JSON.stringify(loadJson));
                            pageIndex++;
                           loadData();
                         }
                     break;
                }
            };
            var time1 = new Date().format("MM-dd HH:mm:ss");   
            reloadJson.levelText="上次刷新："+time1;
            loadJson.levelText="上次加载："+time1;
            uexWindow.setBounceParams(0,JSON.stringify(reloadJson));
            uexWindow.setBounceParams(1,JSON.stringify(loadJson));  
               
        });
         appcan.button("#btnAdd", "btn-act", function() {
            appcan.window.open("book_comments_add","book/book_comments_add.html",5);
        })
        
       function refreshData()
       {
            var time1 = new Date().format("MM-dd HH:mm:ss");   
            reloadJson.levelText="上次刷新："+time1;
             uexWindow.setBounceParams(0,JSON.stringify(reloadJson));
             $("#CommentsList .item").remove();
             pageIndex=1;
            loadData();
       }
       
        function loadData(){
            var params = {'bookId' : bookInfo.id,'pageSize' : 20,'pageIndex' : pageIndex};
            common.ajax("/bookEvaluate/list", {
                params : JSON.stringify(params)
            }, function(data) {
                if (pageIndex == 1) {
                    uexWindow.resetBounceView("0");
                }else {
                    uexWindow.resetBounceView("1");
                }
                if(pageIndex==1&&data.obj.count==0){
                    myPrompt.show("暂无评论，赶快来抢沙发~","#CommentsList");
                }else{
                     myPrompt.hide();
                    var list=data.obj.list;
                    if(list){
                        for(var i=0;i<list.length;i++){
                            var obj=list[i];
                            var objItem=$("#item").clone();
                            objItem.removeClass("uhide");
                            // if($("#CommentsList .item").length==0){
                                // objItem.addClass("ubt");
                            // }
                            objItem.attr("id",obj.id);
                            //userId
                            objItem.find(".user-Name").html(obj.userName);
                            if(obj.userImage.length>0){
                                objItem.find(".user-Photo").attr("src",_SERVER_ADDRESS+obj.userImage);
                            }
                            objItem.find(".user").attr("uid",obj.userId); 
                            objItem.find(".user").on("click",function(){
                                var userId = $(this).attr("uid");
                                getCommInfo();
                                commInfo.studentId = userId;
                                setCommInfo();
                                appcan.window.open("message_other","message/message_other.html",5);
                            });
                            var j = 0;
                            var star=obj.score;
                            for (; j < parseInt(star); j++) {
                                objItem.find(".user-Star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five");
                            }
                            star =Math.round(obj.score-star);
                            if(star==1){
                                 objItem.find(".user-Star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five-half");
                            }
             
                            objItem.find(".content").html(obj.content.replace(new RegExp("\n", "g"), "<br><br>"));
                            objItem.find(".user-pdate").html(getformatDate(obj.createDateText,"yyyy-MM-dd HH:mm"));
                            objItem.insertBefore($("#listBottom"));
                        }
                    }else{
                        pageIndex--;
                        toast("没有更多评论了~",config.toastTimeShort);
                    }
                }
                //alert(JSON.stringify(data));
                
            }, function(data) {
                if (pageIndex == 1) {
                    uexWindow.resetBounceView("0");
                }else {
                    uexWindow.resetBounceView("1");
                }
                if(pageIndex>1){
                    pageIndex--;
                }
                toast(getMsgByKey(data.msg), config.toastTimeShort);
            });
        }
        
        appcan.button("#btnAdd", "btn-act", function() {
            appcan.window.open("book_comments_add","book/book_comments_add.html",5);
        })
        
        function getEvaluate(){
             var params = {
                'userId' : userInfo.id,
                'bookId' : bookInfo.id
            };
            common.ajax("/bookEvaluate/myEvaluate", {
                params : JSON.stringify(params)
            }, function(data) {
                if (!data.obj) {
                    $("#divAddComment").removeClass("uhide");
                    $("#CommentsList").css("paddingBottom","3.5em");
                }
                /*  
                    id:评价ID
                    bookId:图书ID
                    studentId:学生ID  --> userId:用户ID
                    score:评价分数
                    content:评价内容
                    bookName:图书名称
                    studentName:学生名称  --> userName:用户名称
                    studentPhoto:学生头像  --> userImage:用户头像
                    createDate:评价时间
                 */
             }, function(data) {
                toast(getMsgByKey(data.msg), config.toastTimeShort);
            });
        }