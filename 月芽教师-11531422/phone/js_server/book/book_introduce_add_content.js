appcan.ready(function() {
    $(".addImg").on("click", function() {
        uexWindow.evaluateScript("", 0, "isOpenChooseImg=true;");
        $("#divAddImg").removeClass("uhide");
    });
    $(".btnCancel").on("click", function() {
        closeAddImg();
    });
});

appcan.button("#btnPhoto", "btn-act", function() {
    var data = {
        min : 1,
        max : 1,
        quality : 0.8,
        detailedInfo : true
    }
    var json = JSON.stringify(data);
    uexImage.openPicker(json)
})

appcan.button("#btnCamera", "btn-act", function() {
})

appcan.button("#btnSubmit", "btn-act", function() {
})
function closeAddImg() {
    uexWindow.evaluateScript("", 0, "isOpenChooseImg=false;");
    $("#divAddImg").addClass("uhide");
}