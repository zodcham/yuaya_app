

appcan.ready(function() {

    appcan.window.evaluateScript({
        name : "order", //窗口名称
        scriptContent : 'appcan.window.close(-1);'
    });


    loadInfo();
});


function loadInfo() {
	var list=JSON.parse(getLocVal("orderObj"));
    var orderObj= list[0];
    $("#goodsName").html(orderObj.itemName);
    $("#goodsMoney").html("￥"+Number(orderObj.itemPrice).toFixed(2)+"元");
	//$("#goodsName").html("支付成功");

}


appcan.button("#btnSuccess", "btn-act", function() {

    appcan.window.open("order_list", "order_list.html", 5);
    setTimeout(function(){ appcan.window.evaluateScript({
        name : "pay_result", //窗口名称
        scriptContent : 'appcan.window.close(-1);'
    }); }, 2000);


});
