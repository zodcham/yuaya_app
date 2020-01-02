var yearFlag;
var pageIndex = 1;
var reloadDate = "";

var reloadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期1",
    "pullToReloadText" : "拖动刷新",
    "releaseToReloadText" : "释放刷新",
    "loadingText" : "刷新中，请稍等"
};
var loadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期2",
    "pullToReloadText" : "拖动加载",
    "releaseToReloadText" : "释放加载",
    "loadingText" : "加载中，请稍等"
};

appcan.ready(function() {
    getUserInfo();
    getProgramInfo();
    AddLogContent(userInfo.id, logKeys.HomeReadNews,{});
    loadData();
    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(0, 1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView("0", "rgba(0, 0, 0, 0)", 1);
    uexWindow.showBounceView("1", "rgba(0, 0, 0, 0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
        var time1 = new Date().format("MM-dd HH:mm:ss");
        switch(type) {
        case 0:
            if (state == 2) {
                refreshData();
            }
            break;
        case 1:
            if (state == 2) {
                loadJson.levelText = "上次加载：" + time1;
                uexWindow.setBounceParams(1, JSON.stringify(loadJson));
                pageIndex++;
                loadData();
            }
            break;
        }
    };
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    loadJson.levelText = "上次加载：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));


    window.onscroll = function () {
        var a = document.documentElement.scrollTop || document.body.scrollTop;//滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight;//可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight;//可视化的高度与溢出的距离（总高度）
        if(a + b == c){
            pageIndex++;
            loadData();
        }
    }


});

function refreshData() {
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    $("#reviewList .item").remove();
    pageIndex = 1;
    loadData();
}

function loadData() {
    var params = {
		studentId:userInfo.id,
        pageSize : '9',
        pageIndex : pageIndex
    };

/*
    var par={params : JSON.stringify(params)};
    var fok=function(){alert(1)};
    var ferr=function(err){alert(JSON.stringify(err))};
    //var url=config.serviceUrl + "/program/getProgramInfoMore";
    var url=config.serviceUrl + "/program/getProgramInfoMore";
    alert(url);
    common.ajaxPOST(url,par, fok ,ferr);
*/


    common.ajax("/activity/page", {
        params : JSON.stringify(params)
    }, function(data) {
        
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无新闻~", "#reviewList");
        } else {

            myPrompt.hide();
			
			if(pageIndex==1 && data.obj.hasOwnProperty("schoolList"))
			{
				var list0 = data.obj.schoolList.list;
				for (var i = 0; i < list0.length; i++) {

					var obj = list0[i];
					//appcan.alert(obj.image);
					var objItem = $("#item").clone();
					objItem.removeClass("uhide");
					objItem.attr("id", obj.id);
					objItem.find(".name").html(obj.title);
					objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.images);
					objItem.find(".hits").html('查看：'+obj.hits+'次');
					objItem.find(".users").html('参与：'+obj.participationTimes+'人');
					objItem.find(".evaluateTimes").html('作品：'+obj.productionTimes+'篇');
					objItem.find(".introduces").html(obj.remarks);
					objItem.bind("click", function() {
						var id = $(this).attr("id");
						setLocVal("pk_id",id);
						setLocVal("pk_student_id","");
						appcan.window.open("pk_detail", "pk_detail.html", 5);
					});

					$("#reviewList").append(objItem);
				}
			}
			
            var list = data.obj.sysList.list;
            for (var i = 0; i < list.length; i++) {

                var obj = list[i];
                //appcan.alert(obj.image);
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", obj.id);
                objItem.find(".name").html(obj.title);
                objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.images);
                objItem.find(".hits").html('查看：'+obj.hits+'次');
                objItem.find(".users").html('参与：'+obj.participationTimes+'人');
                objItem.find(".evaluateTimes").html('作品：'+obj.productionTimes+'篇');
                objItem.find(".introduces").html(obj.remarks);
                objItem.bind("click", function() {
                    var id = $(this).attr("id");
                    setLocVal("pk_id",id);
                    setLocVal("pk_student_id","");
                    appcan.window.open("pk_detail", "pk_detail.html", 5);
                });

                $("#reviewList").append(objItem);

            }
        }
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex > 1) {
            pageIndex--;
        }
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });


}