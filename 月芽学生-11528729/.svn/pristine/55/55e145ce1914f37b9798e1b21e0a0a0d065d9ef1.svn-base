

var titHeight;
        appcan.ready(function() {
			isIPhoneX();
			
            getSysInfo();
            config.isMainWin=true;
            $("#title").html(sysInfo.ranking.rankingName);
			var d = new Date();
			var h=d.getHours();
            if(h==19 || h==20 || h==21 || h==22)
            {
                $("#content").html("晚7点至10点为使用高峰期，暂停访问排行，请在其他时间查看，谢谢您的支持。");
            }
            else{
                init();    
            }
            window.onorientationchange = window.onresize = function() {
                //appcan.frame.resize("content", 0, titHeight);
                if(h==19 || h==20 || h==21 || h==22)
				{
					$("#content").html("晚7点至10点为使用高峰期，不能访问排行，请在其他时间查看，谢谢您的支持。");
				}
				else{
					init();    
				}
            };
        });
        appcan.button("#nav-left", "btn-act", function() {
            appcan.window.close(-1);
        })
         function init(){
           titHeight =$('#header')[0].offsetHeight;
            appcan.frame.open({
                id : "content",
                url : [{'inPageName':'month','inUrl':'ranking_details_month_content.html'},{'inPageName':'total','inUrl':'ranking_details_content.html'}],
                //url : [{'inPageName':'month','inUrl':'ranking_details_month_content.html'}],
                top : titHeight,
                left : 0,
                index : 1,
                change:function(index,res){
                    changeTab(res.multiPopSelectedIndex);
                }
            });
            
            
            $(".tabs .tabItem").on("click",function(){
                switch($(this).attr("id")){
                    case "month":
                         appcan.window.selectMultiPopover("content",0);
                         changeTab(0);
                        break;
                    case "total":
                         appcan.window.selectMultiPopover("content",1);
                         changeTab(1);
                        break;
                }
            });
            changeTab(1);
        }  
        function changeTab(index){
            $(".tabs .tabItem").removeClass("active text-blue");
            $(".tabs .tabItem:eq("+index+")").addClass("active text-blue");
            $("#title").text($(".tabs .tabItem:eq("+index+")").find(".text").text());
        }
