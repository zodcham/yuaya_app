
var titHeight;


appcan.ready(function() {
	isIPhoneX();
	
			
            config.isMainWin=true;
            init();
        });
        function init(){
           titHeight =$('#header')[0].offsetHeight;
            appcan.frame.open({
                id : "content",
                url : [{'inPageName':'user_reward_list_content','inUrl':'user_reward_list_content.html'},{'inPageName':'user_reward_list_wealth_content','inUrl':'user_reward_list_wealth_content.html'}],
                top : titHeight,
                left : 0,
                index : 0,
                change:function(index,res){
                    changeTab(res.multiPopSelectedIndex);
                }
            });
            window.onorientationchange = window.onresize = function() {
                appcan.frame.resize("content", 0, titHeight);
            };
            
            $(".tabs .tabItem").on("click",function(){
                switch($(this).attr("id")){
                    case "reward":
                         appcan.window.selectMultiPopover("content",0);
                         changeTab(0);
                        break;
                    case "wealth":
                         appcan.window.selectMultiPopover("content",1);
                         changeTab(1);
                        break;
                }
            });
            changeTab(0);
        }
        function changeTab(index){
            $(".tabs .tabItem").removeClass("tab-active");
            $(".tabs .tabItem:eq("+index+")").addClass("tab-active");
            $("#title").text($(".tabs .tabItem:eq("+index+")").find(".text").text());
        }
        
        appcan.button("#nav-left", "btn-act", function() {
            appcan.window.close(-1);
        })
