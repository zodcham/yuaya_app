var titHeight;

appcan.ready(function() {
	isIPhoneX();
	
            getBookInfo();
            $("#title").html(bookInfo.name);
            titHeight = $('#header').offset().height;
            appcan.frame.open("content", "book_review_content.html", 0, titHeight);
            window.onorientationchange = window.onresize = function() {
                appcan.frame.resize("content", 0, titHeight);
            }
        });
        appcan.button("#nav-left", "btn-act", function() {
            appcan.window.close(-1);
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
        