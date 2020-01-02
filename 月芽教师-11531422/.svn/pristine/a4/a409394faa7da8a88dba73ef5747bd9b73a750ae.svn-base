var pageIndex = 1;        
        var loadJson = {"textColor":"#000","imagePath":"res://refesh_icon.png","levelText":"更新日期2","pullToReloadText":"拖动加载","releaseToReloadText":"释放加载","loadingText":"加载中，请稍等"};
        var searchType = '0';
        
        appcan.ready(function() {
            getUserInfo();
            getCommInfo();
            uexWindow.setBounce(1);
            uexWindow.notifyBounceEvent(1,1);
            uexWindow.showBounceView("1","rgba(0,0,0,0)", 1);
            uexWindow.onBounceStateChange = function(type, state){
                switch(type) {
                    case 1:
                        if (state == 2) {
                            pageIndex++;
                            loadData();
                         }
                     break;
                }
            };
        });

        function loadData(){
            isLoading=true;
            var time1 = new Date().format("HH:mm:ss"); 
            loadJson.levelText="上次更新："+time1;
            uexWindow.setBounceParams(1,JSON.stringify(loadJson));
            //isPass 是否认证通过 ('0':未认证, '1':已认证) 
            //type0=全部、1=必读、2=选读、3=自选
            
            var params={'userId':commInfo.studentId,'pageSize': 15, 'pageIndex': pageIndex,'type':'0','isRead':0};
            common.ajax("/myBookshelf/listForStudent", {
               params:JSON.stringify(params)
            }, function(data) {
               if(!data.obj||!data.obj.list||data.obj.list.length==0){
                   if(pageIndex>1){
                        pageIndex--;
                   }
                   if($("#bookList .item").length>0){
                        toast("已全部加载~",config.toastTimeShort);
                   }else{
                       myPrompt.show("未找到数据","#bookList");
                   }
               }else{
                   myPrompt.hide();
                   var lineObj=$('<div class="ub ub-fh umar-t"></div>');
                    var index=0;
                   for(var i=0;i<data.obj.list.length;i++){
                       var obj=data.obj.list[i];
                       var objItem=$("#item").clone();
                       objItem.attr("id",obj.bookId);
                       objItem.removeClass("uhide");
                       if(obj.book.image.length>0){
                        objItem.find(".bookImage").attr("src",_SERVER_ADDRESS+obj.book.image);
                       }
                       switch(obj.type){
                           case "1":
                                objItem.find(".mark").addClass("mark_integrant");
                           break;
                           case "2":
                                objItem.find(".mark").addClass("mark_selective");
                           break;
                           case "3":
                                objItem.find(".mark").addClass("mark_self");
                           break;
                       }
                       objItem.find(".bookName").html(obj.book.name);
                       objItem.find(".author").html(obj.book.author);
                       objItem.find(".score").html(obj.book.score);
                       objItem.find(".hits").html(obj.book.hits);
                       if(obj.type=="1"){
                            objItem.find(".time").html(obj.endDateText);
                       }else{
                            objItem.find(".time").parents(".timeBox").empty();
                       }
                       if (obj.isPass == "1") {
                           objItem.find(".btnReview").html("再次测评");
                       }
                       // score evaluateAvgScore isPass 

                       objItem.find(".click2").on("touchstart",function(){
                          $(this).parents(".item").removeClass("click");
                       }).on("touchend",function(){
                          setTimeout(function(){
                                $(this).parents(".item").addClass("click");
                           },500);
                       }).on("touchcancel",function(){
                           setTimeout(function(){
                                $(this).parents(".item").addClass("click");
                           },500);
                       });
                       $("#bookList").append(objItem);
                    }
                    $(".item").on("click",function(){
                       var id=$(this).attr("id");
                       getBookInfoById(userInfo.id,id,function(data){  
                                getBookInfo();
                                bookInfo=data;
                                setBookInfo();
                                appcan.window.open("bookIndex","../book/book_index.html",10);
                        },null);
                    });
                    $(".btnReview").on("click",function(){
                        event.stopPropagation();
                         var id=$(this).parents(".item").attr("id");
                        getBookInfoById(userInfo.id,id,function(data){  
                            getBookInfo();
                            bookInfo=data;
                            setBookInfo();
                            appcan.window.open("book_review","../book/book_review.html",10);
                        },null);
                    });
                    $(".btnIntroduce").on("click",function(){
                         event.stopPropagation();
                         var id=$(this).parents(".item").attr("id");
                        getBookInfoById(userInfo.id,id,function(data){  
                            getBookInfo();
                            bookInfo=data;
                            setBookInfo();
                            appcan.window.open("book_introduce_add","../book/book_introduce_add.html",10);
                        },null);
                    });
               }
               
               isLoading=false;
               uexWindow.resetBounceView("1");
              
            }, function(data){
                isLoading=false;
                if(pageIndex>1){
                    pageIndex--;
                }
                uexWindow.resetBounceView("1");
                toast(getMsgByKey(data.msg),config.toastTimeShort);
                
            },{loadingMsg:'正在查询，请稍后...'});
        }