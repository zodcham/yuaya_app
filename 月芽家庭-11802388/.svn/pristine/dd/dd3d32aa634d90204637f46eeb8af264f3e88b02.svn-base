appcan.ready(function() {
    var size = $("#page").width() - 100;
    $("#box").css("width", size + "px").css("height", size + "px");
    $("#box").on("click", function() {
        event.stopPropagation();
    });
    $("#page").on("click", function() {
        uexWindow.evaluateScript("", 0, "closeFilter();");
    });
})