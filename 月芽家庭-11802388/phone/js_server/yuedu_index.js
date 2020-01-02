

var dicList={"grade":[],"book_category":[],"recommendLevel":[]};
        var titHeight;
        var isOpenComments=false;
        
        function isLoadDic(){
            getCommInfo();
            if (commInfo.grade.length == 0)
            {
                return false;
            }
            if (commInfo.book_category.length == 0)
            {
                return false;
            }
            if (commInfo.recommendLevel.length == 0)
            {
                return false;
            }
            return true;
        }
        
        function loadDic(){
            if (isLoadDic())
            {
                setBookInfo();
                return;
            }
            $.each(dicList,function(n,obj){
                if(!obj||obj.length==0){
                    loadDicData(n);
                    return false;
                }
            });
        }
        function loadDicData(name){
          var params={ "type": name};
            common.ajax("/dict/getDictList", {
               params:JSON.stringify(params)
            }, function(data) {
                var dicObj = {};
                for(var i=0;i<data.obj.length;i++){
                    var obj=data.obj[i];
                    dicObj[obj.value] = obj.label;
                }
            
                dicList[name] = dicObj;
                commInfo[name] = dicObj;
                setCommInfo();
                loadDic();
            }, function(data){
                toast(getMsgByKey(data.msg),config.toastTimeShort);
            });
        }
        
        appcan.ready(function() {
			isIPhoneX();
	
            window.onorientationchange = window.onresize = function() {
                init();
            };
            getUserInfo();
            getBookInfo();
            getCommInfo();
             titHeight = $('#header').offset().height;
               uexWindow.onKeyPressed = function(keyCode) {
                if (keyCode == 0) {
                    if (isOpenComments) {
                        uexWindow.evaluatePopoverScript("","book_comments","exit();");
                    } else {
                    exit();
                    }
                }
            }
            uexWindow.setReportKey(0, 1);
            $(".nav").on("click", function() {
                $(".tab .tabcurrent").removeClass("tabcurrent");
                $(this).addClass("tabcurrent");
                appcan.window.selectMultiPopover("content",$(this).index());
            });
            init();
            $(".bookName").html(bookInfo.name);
           
          
             loadDic();
             
             var j = 0;
             var star=bookInfo.score;
             for (; j < parseInt(star/ 2); j++) {
                $("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five");
             }
             star =Math.round(bookInfo.score-star);
             if(star==1){
                $("#info-star .fa").eq(j).removeClass("icon-star-five-hollow").addClass("icon-star-five-half");
             }
             setView();
                //$("#info-star")
                //bookInfo.score
                
       uexWeiXin.registerApp(appId);     
            
          uexWeiXin.cbRegisterApp = function (opCode,dataType,data){
                if(data == "1"){
                  //  alert('注册失败！');
                }
                if(data == "0"){
                   // alert('注册成功！');
                }
            }
       uexWeiXin.cbShareLinkContent = function(data) {
            if(data=="0"){
               appcan.window.alert({
                    title : '提示信息！',
                    content :'分享成功~',
                    buttons : '确定',

                });
            }else{
                appcan.window.alert({
                    title : '提示信息！',
                    content :'分享失败~',
                    buttons : '确定',

                });
            }
      };
        });
          appcan.button("#btnAdd", "btn-act", function() {
            appcan.window.open("book_comments_add","book/book_comments_add.html",5);
        })
        
         
        function setBookInfo()
        {
             if (bookInfo.recommendLevel.length == 0)
             {
                  $(".recommendLevel").addClass("uhide");
             }
             else
             {
                $(".recommendLevel").html(commInfo.recommendLevel[bookInfo.recommendLevel]);
             }
             if (bookInfo.bookCategory.length == 0)
             {
                  $(".bookCategory").addClass("uhide");
             }
             else
             {
                $(".bookCategory").html(commInfo.book_category[bookInfo.bookCategory]);
             }
             $(".grade").html(commInfo.grade[bookInfo.grade]);
        }
        
        function setView(){
            if(bookInfo.isFavorite=="1"){
                 //$(".favorite").removeClass("icon_into").addClass("icon_remove");
                 $(".favorite .txt").html("移出书架");
             }else{  
                 //$(".favorite").removeClass("icon_remove").addClass("icon_into");
                 $(".favorite .txt").html("加入书架");
             }
        }
         function init(){
           titHeight =$('#header')[0].offsetHeight;
            appcan.frame.open({
                id : "content",
                url : [{'inPageName':'introduce','inUrl':'yuedu_index_introduce_content.html'},{'inPageName':'comments','inUrl':'yuedu_index_comments_content.html'},{'inPageName':'content','inUrl':'yuedu_index_content.html'}],
                top : titHeight,
                left : 0,
                index : 0,
                change:function(index,res){
                   $(".tab .tabcurrent").removeClass("tabcurrent");
                   $(".nav:eq("+res.multiPopSelectedIndex+")").addClass("tabcurrent");
                }
            });
            
        }
        
        appcan.button("#nav-left", "btn-act", function() {
           exit();
        })
        
        appcan.button(".favorite", "btn-act", function() {
            if(bookInfo.isFavorite=="1"){ 
                var params={ 'userId' : userInfo.id,'bookId' : bookInfo.id};
                common.ajax("/favorite/remove", {
                   params:JSON.stringify(params)
                }, function(data) {
                    bookInfo.isFavorite="0";
                    setBookInfo();
                    setView();
                    toast("已移出书架~",config.toastTimeShort);
                }, function(data){
                    toast(getMsgByKey(data.msg),config.toastTimeShort);
                }, {
                    type : 'POST'
                });
            }else{
                var params={ 'userId' : userInfo.id,'bookId' : bookInfo.id};
                common.ajax("/favorite/add", {
                   params:JSON.stringify(params)
                }, function(data) {
                    bookInfo.isFavorite="1";
                    setBookInfo();
                    setView();
                    toast("已加入书架~",config.toastTimeShort);
                }, function(data){
                    toast(getMsgByKey(data.msg),config.toastTimeShort);
                }, {
                    type : 'POST'
                });
            }
        });
        
        function exit() {
            //setOrientation(1);
             
            appcan.window.close(-1);
            //uexWindow.evaluatePopoverScript("","introduce","closePlayer();");
        }
        
        function setOrientation(type){
            uexWindow.setOrientation(type);
        }
           
        appcan.button("#nav-left", "btn-act", function() {
            appcan.window.close(-1);
        })
 
        appcan.button("#Forward", "btn-act", function() {
           Forward();    
        })
        // uinputs
        
         // 教师   用户分享链接
    //var appId = "wxdd94041dd73a8049";
   // var app_serect = "9e2ce31ee8b9855b4f7ce5a4d4854c75";
   // var app_key = "a0ad0cca-70b6-4dfc-8dff-2f8eb43698ce"; 
    
    // 学生   用户分享链接
     var appId = "wx009651c6fd586eb2";
      
      appcan.button("#wedpageUrl0", "btn-act", function() {
          $("#divAddImg").addClass("uhide");  
       var jsonstr0 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/yuedu_index.html?'+userInfo.id+'?'+bookInfo.id+'?","scene":"0","title":"'+bookInfo.name+'","description":"分享一下"}';
            uexWeiXin.shareLinkContent(jsonstr0);
      })
      
       appcan.button("#wedpageUrl1", "btn-act", function() {
          $("#divAddImg").addClass("uhide");  
      var jsonstr1 = '{"thumbImg":"http://www.readseed.cn/yueya_webapp/icon.png","wedpageUrl":"http://www.readseed.cn/yueya_webapp/yuedu_index.html?'+userInfo.id+'?'+bookInfo.id+'?","scene":"1","title":"'+bookInfo.name+'","description":"分享一下"}';
            uexWeiXin.shareLinkContent(jsonstr1);
      })
      
     $(".btnCancel").on("click",function(){
            closeAddImg();
      });
      
     function closeAddImg(){       
      uexWindow.evaluateScript("",0,"isOpenChooseImg=true;");
       $("#divAddImg").addClass("uhide");                                                                             
     } 