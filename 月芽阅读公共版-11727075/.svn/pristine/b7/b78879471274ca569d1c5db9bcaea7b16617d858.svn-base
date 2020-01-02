var g_PageIndex = 1;
        var loadJson = {
            "textColor" : "#000",
            "imagePath" : "res://refesh_icon.png",
            "levelText" : "更新日期1",
            "pullToReloadText" : "下拉加载",
            "releaseToReloadText" : "释放加载",
            "loadingText" : "加载中，请稍等..."
        };
        var refreshJson = {
            "textColor" : "#000",
            "imagePath" : "res://refesh_icon.png",
            "levelText" : "更新日期1",
            "pullToReloadText" : "下拉刷新",
            "releaseToReloadText" : "释放刷新",
            "loadingText" : "刷新中，请稍等..."
        };
        
        appcan.ready(function() {
            getUserInfo();
            getCommInfo();
            uexWindow.setBounce(1);
            uexWindow.notifyBounceEvent(0, 1);
            uexWindow.notifyBounceEvent(1, 1);
            uexWindow.showBounceView(0, "rgba(0,0,0,0)", 1);
            uexWindow.showBounceView(1, "rgba(0,0,0,0)", 1);
            uexWindow.onBounceStateChange = function(type, state) {
                switch (type) {
                case 0:
                    if (state == 2) {
                      reloadData();
                    }
                    break;
                case 1:
                    if (state == 2) {
                        var time1 = new Date().format("HH:mm:ss");
                        loadJson.levelText = "上次加载: " + time1;
                        uexWindow.setBounceParams(1, JSON.stringify(loadJson));
                        loadReview();
                    }
                    break;
                }
            };
            
            var time1 = new Date().format("HH:mm:ss");
            loadJson.levelText = "上次更新: " + time1;
            refreshJson.levelText = "上次加载: " + time1;
            uexWindow.setBounceParams(0, JSON.stringify(refreshJson));
            uexWindow.setBounceParams(1, JSON.stringify(loadJson));
            reloadData();
            
        });
        
        function reloadData(){
            var time1 = new Date().format("HH:mm:ss");
            refreshJson.levelText = "上次刷新: " + time1;
            uexWindow.setBounceParams(0, JSON.stringify(refreshJson));
            $("#listView").empty();
            g_PageIndex = 1;
            loadReview();
        }
        
        function loadReview(){
             var params = {
                'userId' : userInfo.id,
                'pageSize' : 20,
                "finishState":"",
                'pageIndex' : g_PageIndex
            };
            common.ajax("/student/book/myTask", {
                params : JSON.stringify(params)
            }, function(data) {
                if (g_PageIndex == 1) {
                    uexWindow.resetBounceView("0");
                }else {
                    uexWindow.resetBounceView("1");
                }
                if (data.obj) {
                    if (!data.obj.count || data.obj.count == 0) {
                        myPrompt.show("暂无阅读任务~");
                        return;
                    }else  if (!data.obj.list || data.obj.list.length == 0) {
                        toast("没有更多数据了~", config.toastTimeShort);
                        return;
                    }
                } else {
                    if (g_PageIndex == 1) {
                        myPrompt.show("暂无阅读任务~");
                    }
                    return;
                }
                //hideNoData();
                var arr = [];
                for (var i = 0; i < data.obj.list.length; i++) {
                    var obj = data.obj.list[i];
                    var itemObj = $("#item").clone();
                    itemObj.attr("id", obj.recommend.bookId);
                    itemObj.removeClass("uhide");
                    if (obj.recommend.bookImage && obj.recommend.bookImage.length > 0) {
                        itemObj.find(".bookImg").attr("src", getHeadImageUrl(obj.recommend.bookImage));
                    }
                    itemObj.find(".startDate").html(getformatDate(obj.createDate,"yyyy.MM.dd"));
                    itemObj.find(".endDate").html(getformatDate(obj.recommend.endDate,"yyyy.MM.dd"));
                    itemObj.find(".bookName").html(obj.recommend.bookName);
                    
                    // itemObj.find(".isMustReview .checkbox").addClass(obj.recommend.isMustReview == "1"　? "checkbox_on":"checkbox_off");
                    // itemObj.find(".finishState .checkbox").addClass(obj.recommend.finishState == "1"　? "checkbox_on":"checkbox_off");
                     itemObj.find(".isMustReview .checkbox").addClass(obj.bookReviewCount > 0　? "checkbox_on":"checkbox_off");
                     itemObj.find(".finishState .checkbox").addClass(obj.exerciseAccuracy >= 0.7　? "checkbox_on":"checkbox_off");    
                                        
                    if(obj.recommend.isMustReview != "1") {
                        $("#btnIntroduce").addClass("uhide");
                    }
                    
                    var dateDiff = DateDiff(new Date().format("yyyy/MM/dd"),getformatDate(obj.createDate,"yyyy/MM/dd"));
                    if(dateDiff <= 2) {
                        itemObj.find(".mark").addClass("mark_new");
                    }
                    if (obj.bookReviewCount > 0) {
                        itemObj.find(".level").html("(" + (obj.reviewLevelName.length > 0 ? obj.reviewLevelName : "待评") + ")");
                    }
                    $('#listView').append(itemObj);
                };
                
                $(".btnReview").on("click",function(){
                     var id=$(this).parents(".item").attr("id");
                    getBookInfoById(userInfo.id,id,function(data){  
                        getBookInfo();
                        bookInfo=data;
                        setBookInfo();
                        appcan.window.open("book_review","../book/book_review.html",5);
                    },null);
                });
                $(".btnIntroduce").on("click",function(){
                    var id=$(this).parents(".item").attr("id");
                    getBookInfoById(userInfo.id,id,function(data){  
                        getBookInfo();
                        bookInfo=data;
                        setBookInfo();
                        appcan.window.open("book_introduce_add","../book/book_introduce_add.html",5);
                    },null);
                });
                
                g_PageIndex++;

            }, function(data) {
                toast(data.msg,config.toastTimeShort);
                if (g_PageIndex == 1) {
                    uexWindow.resetBounceView("0");
                }else {
                    uexWindow.resetBounceView("1");
                }
                if (g_PageIndex > 1) {
                    g_PageIndex--;
                }
            });
        }