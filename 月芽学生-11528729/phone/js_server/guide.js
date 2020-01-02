appcan.ready(function() {
            getSysInfo();
            // $(".swiper-slide").css("width",$("#page_0").width() + "px").css("height",$("#page_0").height() + "px");
             // var swiper = new Swiper('.swiper-container', {
                // pagination: '.swiper-pagination',
                // paginationClickable: true
            // });
            //
            sysInfo.isFirstInto = false;
            setSysInfo();
            appcan.window.open("login","login.html",5);
        });
        
        appcan.button("#btnEntry", "btn-act", function() {
            sysInfo.isFirstInto = false;
            setSysInfo();
            appcan.window.open("login","login.html",5);
        })