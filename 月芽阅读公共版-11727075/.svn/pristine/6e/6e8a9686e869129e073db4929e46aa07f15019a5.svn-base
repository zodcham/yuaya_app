
var timecount_test=0;
var timestart_test=0;
var titHeight;
        appcan.ready(function() {
			isIPhoneX();
            if(timestart_test==0) timestart_test=new Date().getTime();
            getBookInfo();
            $("#title").html(bookInfo.name);
            titHeight = $('#header').offset().height;
            appcan.frame.open("content", "book_review_content.html", 0, titHeight);
            window.onorientationchange = window.onresize = function() {
                appcan.frame.resize("content", 0, titHeight);
            }
        });
        appcan.button("#nav-left", "btn-act", function() {
            timecount_test= new Date().getTime()-timestart_test;
            appcan.window.close(-1);
        })
        
        appcan.button("#nav-right", "btn-act", function() {
            setPageIndex(1,0);
            uexWindow.evaluatePopoverScript("","content","goSheet();");
        })
        function setPageIndex(pageIndex,totalPage){
            if (parseInt(pageIndex) <= parseInt(totalPage) ) {
                $("#pageNum").html(pageIndex + " / " + totalPage);
                $("#footer").removeClass("uhide");
                $("#btnMenu").removeClass("uhide");
            }else {
                $("#footer").addClass("uhide");
                $("#btnMenu").addClass("uhide");
            }

            if (parseInt(pageIndex) == 1)　{
                $(".btnPre").html('<img src="../images/test/pre_no.png">');
            }else {
                $(".btnPre").html('<img src="../images/test/pre.png">');
            }
            if (parseInt(pageIndex) == parseInt(totalPage)) {
                $(".btnNext").html('<img src="../images/test/next_no2.png">');
            }else {
                $(".btnNext").html('<img src="../images/test/next.png">');
            }
            
           appcan.frame.resize("content", 0, titHeight);
        }
        appcan.button(".btnPre", "btn-act", function() {
            uexWindow.evaluatePopoverScript("","content","doPre();");
        })
        appcan.button(".btnNext", "btn-act", function() {
           uexWindow.evaluatePopoverScript("","content","doNext();");
        })

function setBG(){
    $("#footer").css("background-color","#fff");
}