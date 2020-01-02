var titHeight;

appcan.ready(function() {
	
	uexWindow.setOrientation(2);
	var plat = uexWidgetOne.getPlatform();
	//如果是android平台，则监听返回按钮事件
	if (plat) {
		uexWindow.onKeyPressed = function(keyCode) {
			if (keyCode == 0) {
				appcan.window.close(-1);
				uexWindow.setOrientation(1);
				//返回上一页，设置竖屏，home键在屏幕下方；
			}
		}
		uexWindow.setReportKey(0, 1);
	}
	isIPhoneX();
             getProgramInfo();
            $("#title").html(programInfo.name);
            titHeight = $('#header').offset().height;
            appcan.frame.open("content", "preview_content.html", 0, titHeight);
            window.onorientationchange = window.onresize = function() {
                appcan.frame.resize("content", 0, titHeight);
            }
        });
        appcan.button("#nav-left", "btn-act", function() {
            appcan.window.close(-1);
			uexWindow.setOrientation(1);
        })
        
        appcan.button("#nav-right", "btn-act", function() {
            setPageIndex(1,0);
            uexWindow.evaluatePopoverScript("","content","goSheet();");
        })
        function setPageIndex(pageIndex,totalPage){
                $("#pageNum").html(pageIndex + " / " + totalPage);
            if (parseInt(pageIndex) == 1)　{
                $(".btnPre").removeClass("bc-head").addClass("sc-bg");
            }else if (parseInt(pageIndex) == parseInt(totalPage)) {
                $(".btnNext").removeClass("bc-head").addClass("sc-bg");
            } else {
                $(".btnPre").removeClass("sc-bg").addClass("bc-head");
                $(".btnNext").removeClass("sc-bg").addClass("bc-head");
            }
            
           appcan.frame.resize("content", 0, titHeight);
        }
        appcan.button(".btnPre", "btn-act", function() {
            uexWindow.evaluatePopoverScript("","content","doPre();");
        })
        appcan.button(".btnNext", "btn-act", function() {
           uexWindow.evaluatePopoverScript("","content","doNext();");
        })