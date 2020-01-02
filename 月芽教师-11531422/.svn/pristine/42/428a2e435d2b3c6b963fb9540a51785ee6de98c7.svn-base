appcan.ready(function() {
    getSysInfo();
    if (sysInfo.phoneType == "1") {
        $(".checkUpdate").removeClass("uhide");
    }
    getWidgetInfo();
});
appcan.button(".checkUpdate", "btn-act", function() {
    checkUpload(true);
})
function callWidgetInfo(version) {
    $(".version").html(version);
}