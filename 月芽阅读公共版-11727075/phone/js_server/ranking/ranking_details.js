

var titHeight;
        appcan.ready(function() {
			isIPhoneX();
			
            getSysInfo();
            config.isMainWin=true;
            $("#title").html(sysInfo.ranking.rankingName);
			var d = new Date();
			var h=d.getHours();
            init();
            window.onorientationchange = window.onresize = function() {
                //appcan.frame.resize("content", 0, titHeight);
                init();
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
                top : titHeight,
                left : 0,
                index : 0,
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
             appcan.window.selectMultiPopover("content",1);
            changeTab(1);
        }  
        function changeTab(index){
            $(".tabs .tabItem").removeClass("active text-blue");
            $(".tabs .tabItem:eq("+index+")").addClass("active text-blue");
            if(index==0){
                $("#title").html('<img src="../images/rank/bt001.png">');
                $("#footer_btn1").html('');
                $("#footer_btn2").html('');
                $("#footer_btn2").html('<img src="../images/rank/footer_btn2.jpg">');
            }
            else {
                $("#title").html('<img src="../images/rank/bt002.png">');
                $("#footer_btn2").html('');
                $("#footer_btn1").html('');
                $("#footer_btn1").html('<img src="../images/rank/footer_btn1.jpg">');
            }
            //$("#title").text($(".tabs .tabItem:eq("+index+")").find(".text").text());
        }
