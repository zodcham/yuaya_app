var g_json;

appcan.ready(function() {
    
    
    getSysInfo();
    getUserInfo();
    
    LoadData();
    
});




function LoadData() {
    //var url = g_ServerUrl + "/a/analyze/all_school";
    var url = "http://www.readseed.cn:8080/a/analyze/all_school";
    var par = {
        "schoolid": "1"
    };
    var ferr = function(err) {
    };
    var fok = function(data) {
        //data=JSON.parse(data);
        var json=[];
        
        $.each(data, function(i,n){
            json.push({title : n.NAME,id : n.ID});
        })
        
        var lv = appcan.listview({
            selector : "#listview",
            type : "thinLine",
            hasAngle : true,
            hasTouchEffect:   true 
        });
        lv.set(json);
        lv.on("click", function(ele, obj, curEle) {
            setLocVal("charts_school_id",obj.id);
            setLocVal("charts_school_name",obj.title);
            appcan.window.open("school_analysis", "school_analysis.html", 10);
        })
        
    };
    //ajaxPOST(url, par, fok, ferr);

    
    
    appcan.request.ajax({
    url:"http://www.readseed.cn:8080/a/analyze/all_school",
    type:"GET",
    data:{}, 
    dataType:"json",
    timeout:30000,
    success:fok, 
    error:ferr

    });

}



$("#show_grade").on("click", function() {
    appcan.window.open("grade_charts", "grade_charts.html", 10);
});
$("#show_class").on("click", function() {
    appcan.window.open("class_charts", "class_charts.html", 10);
});
