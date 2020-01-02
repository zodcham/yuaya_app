
appcan.ready(function() {
	isIPhoneX();
	
    getUserInfo();
    loadClass();
    $(".btnCancel").on("click", function() {
        uexWindow.evaluateScript("", 0, "closeClass('')");
    });
});

function loadClass() {
    var classList = userInfo.clazzIds;
    for (var i = 0; i < classList.length; i++) {
        var obj = classList[i];
        var objItem = $("#item").clone();
        objItem.attr("id", obj.id);
        objItem.removeClass("uhide");
        objItem.find(".name").html(obj.name);
        objItem.on("click", function() {
            var id = $(this).attr("id");
            var name = $(this).find(".name").html();
            var classObj = {
                'id' : id,
                'name' : name
            };
            uexWindow.evaluateScript("", 0, "closeClass('" + JSON.stringify(classObj) + "')");
        });
        $("#listClass").append(objItem);
    }
}