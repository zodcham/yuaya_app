
appcan.ready(function() {
    setLocVal("orderStatus","");

    loadOrderInfo();

    loadUserInfo();
	
	
});




var goodsName="";
var goodsMoney=0;
var g_orderId="";
function loadOrderInfo() {
    var list=JSON.parse(getLocVal("orderObj"));
    var orderObj= list[0];
    
    g_orderId=orderObj.orderId;
    $("#itemName").html(orderObj.itemName);
    $("#orderNo").html(orderObj.outTradeNo);
    $("#addTime").html(orderObj.createDate);
    $("#money").html("￥"+ Number(orderObj.itemPrice).toFixed(2)+"元");
    $("#orderStatus").html("待支付");
    $("#orderFreight").html(0);
    $("#orderInfo").removeClass("uhide");

}

function loadUserInfo(){
    getUserInfo();
    if(userInfo.isActiveValidity==0 && userInfo.type!=2){
        $("#vip_user_status").html("您是月芽普通会员，欢迎使用月芽平台。");
    }
    else{
        if(userInfo.type!=2) {
            $("#vip_user_status").html("您已是月芽收费会员，账户将于 " + userInfo.activeValidityDate + " 到期。");
        }
        else{
            $("#vip_user_status").html("您月芽学生用户，欢迎使用月芽家庭版。");
        }
    }
}

appcan.button("#buy", "btn-act", function() {
    appcan.window.open("wechat_shop", "wechat_shop.html", 5);
});
appcan.button("#buy1", "btn-act", function() {
    sysInfo.keytype = 30;
    setSysInfo();
    appcan.window.open("wechat_shop", "wechat_shop.html", 5);
});
appcan.button("#buy2", "btn-act", function() {
    sysInfo.keytype = 90;
    setSysInfo();
    appcan.window.open("wechat_shop", "wechat_shop.html", 5);
});
appcan.button("#buy3", "btn-act", function() {
    sysInfo.keytype = 180;
    setSysInfo();
    appcan.window.open("wechat_shop", "wechat_shop.html", 5);
});
appcan.button("#payConfirm", "btn-act", function() {
    pay();
});



appcan.button("#upLevel", "btn-act", function() {
    var sn=$("#sn").val();
    if(!sn.length) {
        toast("请输入密钥！",1000);
        return;
    }

    var url=_SERVER_ADDRESS+"/phone/register/activateAccount";
    var par={'code' : sn, 'studentId': userInfo.id};
    var ferr=function(err){};
    var fok=function(data){
        var obj=JSON.parse(data);
        userInfo = obj.obj
        appcan.alert({"title":"提示","content":"您的账户已成功激活，会员到期日为："+userInfo.activeValidityDate});
        setUserInfo(false);
        appcan.window.publish(UPDATE_INFO, "0");
        appcan.window.publish(UPDATE_INDEX, "0");
        loadUserInfo();
    };
    common.ajaxPOST(url, par, fok, ferr);
});

function setChecked(id) {
    $("radio").prop("checked",false);
    $("#"+id).prop("checked",true);
}




function pay(){
	
	var paySuccess=true;
    var url="/vipProduct/pay";
    var par={"params":JSON.stringify({"orderId": g_orderId})};
    var fok=function(data) {
        var orderSign=data.obj;
        if(orderSign) {
			uexAliPay.payWithOrder(orderSign, function (error, message) {
				if (error) {
					if(Number(error)==4){
						appcan.alert({"title":"提示","content":"您已取消支付!"});
					}
					else{
						var orderStatus = {"status": 0, "message": "支付失败"};
						setLocVal("orderStatus", JSON.stringify(orderStatus));
						appcan.alert({"title":"提示","content":"支付未成功!"});
					}
				} 
				else {
					UpdateOrderStatus(g_orderId);
					updateUserEndDate();
				}
			})
		}
		else{
			appcan.alert({"title":"提示","content":"支付出现问题，请重新提交。"});
		}
    }
    var ferr=function (data) {
		alert(data);
        alert("支付出现问题，请重新提交。");
    }
	common.ajax(url, par, fok, ferr,{"type" : "POST"});
    

}

function UpdateOrderStatus(orderId){
	getUserInfo();
	var url="/vipProduct/updateOrderStatus";
    var par={"params":JSON.stringify({"orderId": orderId, "userId": userInfo.id})};
    var fok=function(data) {
		var orderStatus = {"status": 1, "message": "支付成功"};
		setLocVal("orderStatus", JSON.stringify(orderStatus));
    }
    var ferr=function (data) {
    }
	common.ajax(url, par, fok, ferr,{"type" : "POST"});
	
}

function updateUserEndDate(){
	if(getLocVal("orderObj")){
		var list=JSON.parse(getLocVal("orderObj"));
		var orderObj= list[0];
		switch (orderObj.itemType) {
            case "2":
                appcan.window.evaluateScript({
                    name : "book_default", //窗口名称
                    scriptContent : 'ShowBuyButton("video");'
                });
				appcan.window.open("pay_result", "pay_result.html", 5);
                break;
            case "4":
                appcan.window.evaluateScript({
                    name : "book_default", //窗口名称
                    scriptContent : 'ShowBuyButton("ppt");'
                });
				appcan.window.open("pay_result", "pay_result.html", 5);
                break;
            case "3":
                appcan.window.evaluateScript({
                    name : "book_default", //窗口名称
                    scriptContent : 'ShowBuyButton("audio");'
                });
				appcan.window.open("pay_result", "pay_result.html", 5);
                break;
            case "5":
				
				var productId = orderObj.itemId;
				getUserInfo();
				var userId=userInfo.id;
				var url="/vipProduct/updateEndDate";
				var par={"params":JSON.stringify({"productId": productId, "userId": userInfo.id})};
				var fok=function(data) {
					var obj=data;
					userInfo = obj.obj
					appcan.alert({"title":"提示","content":"付款成功，您的会员到期日为："+userInfo.activeValidityDate});
					setUserInfo(false);
					appcan.window.publish(UPDATE_INFO, "0");
					appcan.window.publish(UPDATE_INDEX, "0");
					appcan.window.evaluateScript({
						name : "vip", //窗口名称
						scriptContent : 'openContent();'
					});
					appcan.window.open("pay_result", "pay_result.html", 5);
				}
				var ferr=function (data) {}
				$.ajax({
					url : config.serviceUrl + url,
					type : 'GET',
					data : par,
					dataType : 'json',
					success : fok,
					error : ferr
				});
                break;
        }
		
	}
}




