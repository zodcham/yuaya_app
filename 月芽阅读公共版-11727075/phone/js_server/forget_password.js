appcan.ready(function() {
    
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "forget_password_content.html", 0, titHeight);
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});


appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})



