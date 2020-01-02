appcan.ready(function() {
    uexWindow.evaluateScript("", 0, "isOpenSheet=true;");
    $("#commentPop").parent().height(parseInt($("#commentPop").parent().parent().height()));
    $("#main").bind("click", function(obj) {
        appcan.window.close(-1);
        uexWindow.evaluateScript("", 0, "isOpenSheet=false;");
    })
});
appcan.button("#btn1", "ani-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "openCamera();");
});
appcan.button("#btn2", "ani-act", function() {
    uexWindow.evaluatePopoverScript("", "content", "openfile();");

});
appcan.button("#btn5", "ani-act", function() {
    appcan.window.close(-1);
    uexWindow.evaluateScript("", 0, "isOpenSheet=false;");
}); 