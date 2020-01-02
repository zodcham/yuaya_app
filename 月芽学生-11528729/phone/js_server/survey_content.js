

appcan.ready(function() {
    var url = "http://www.readseed.cn/survey/queryAll";
    var par = {};
    var fok = function(data) {
        var json = eval("(" + data + ")");

        if (json.success) {
            var sList = new Array();
            $.each(json.obj, function(name, value) {
                var listchild = {
                    "title" : value.surveyName,
                    "id" : value.surveyId,
                    "url" : value.surveyUrl,
                    icon : "./css/icons/research_list.png"
                };
                sList.push(listchild);
            });
            var lv = appcan.listview({
                selector : "#listview",
                type : "thinLine",
                hasAngle : true,
                hasIcon : true
            });
            lv.set(sList)
            lv.on("click", function(ele, obj, curEle) {
                setLocVal("survey_url", obj.url);
                setLocVal("survey_title", obj.title);
                appcan.window.open("surveydetail", "survey_detail.html", 5);
                //alert(JSON.stringify(obj));
            })
        }
    };
    var ferr = function(err) {
    };

    common.ajaxPOST(url, par, fok, ferr);

});
