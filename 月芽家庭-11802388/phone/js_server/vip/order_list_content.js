var pageIndex = 1;

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
	$(".item").addClass("uhide");
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


	loadData();
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
    $("#orderList .item").remove();
    pageIndex = 1;
    loadData();
}


function loadData() {
	
    getUserInfo();
    var url="/vipProduct/getOrderList";
    var par={params:JSON.stringify({"userId":userInfo.id,"status":"1",pageSize : '10',pageIndex : pageIndex})};
    var fok=function(data) {

        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无订单~", "#orderList");
        } else {

            //alert(JSON.stringify(data));


            var list = data.obj.list;

            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                var objItem = $("#item").clone();
                objItem.attr("id", obj.id);
                objItem.removeClass("uhide");

                var orderStatus = "";
                switch (Number(obj.orderStatus)) {
                    case 0:
                        orderStatus = "<span style='color:red;'>未付款</span>";
                        break;
                    case 1:
                        orderStatus = "<span style='color:blue;'>已付款</span>";
                        break;
                    case 2:
                        orderStatus = "<span style='color:red;'>付款失败</span>";
                        break;

                }
                var payType = "";
                switch (Number(obj.payChannel)) {
                    case 1:
                        payType = "<span style='color:blue;'>支付宝支付</span>";
                        break;
                    case 2:
                        payType = "<span style='color:red;'>微信支付</span>";
                        break;
                }


                objItem.find(".orderNumber").html("单号：" + obj.outTradeNo);
                objItem.find(".orderStatus").html(orderStatus);
                objItem.find(".goodsName").html(obj.itemName);
                objItem.find(".totalMoney").html("￥：" + obj.orderPriceTotal + "元");
                objItem.find(".orderDate").html("" + obj.createDate);
                objItem.find(".payType").html(payType);


                objItem.on("click", function () {
                    var id = $(this).attr("id");
                    getBookInfoById(userInfo.id, id, function (data) {
                        getBookInfo();
                        bookInfo = data;
                        setBookInfo();
                        appcan.window.open("book_default", "book/book_default.html", 5);
                    }, null);

                })

                $("#orderList").append(objItem);
            }
        }


    }
    var ferr=function (data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex > 1) {
            pageIndex--;
        }
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }
    common.ajax(url, par, fok, ferr,{"type" : "GET"});



}


appcan.button("#buy", "btn-act", function() {
    appcan.window.open("wechat_shop", "wechat_shop.html", 5);
});
