appcan.ready(function() {
    loadUserInfo();
});

function loadUserInfo(){
    getUserInfo();
    if(userInfo.isActiveValidity==0 && userInfo.type!=2){
        $("#vip_user_status").html(userInfo.name + ", 您是月芽普通会员，欢迎使用月芽平台。");
    }
    else{
        if(userInfo.type!=2) {
            $("#vip_user_status").html(userInfo.name + ", 您已是月芽收费会员，账户将于 " + userInfo.activeValidityDate + " 到期。");
        }
        else{
            $("#vip_user_status").html(userInfo.name + ", 您是月芽学生版用户，欢迎使用月芽家庭版。");
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
appcan.button("#buy4", "btn-act", function() {
    sysInfo.keytype = 360;
    setSysInfo();
    appcan.window.open("wechat_shop", "wechat_shop.html", 5);
});


//支付
function GotoPay(productId){
    var url="/vipProduct/get";
    var par={params:JSON.stringify([{"userId":userInfo.id,"productId":productId,"type":"5"}])};
    var fok=function(data) {
		
        var obj=data.obj;
        setLocVal("orderObj", JSON.stringify(obj));
        appcan.window.open("order", "../vip/order.html", 5);
    }
    var ferr=function (data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }
    common.ajax(url, par, fok, ferr,{"type" : "POST"});
}


//直接支付 30天会员
appcan.button("#buy01", "btn-act", function() {
	sysInfo.vipType = 30;
    setSysInfo();
    var productId=$("#buy01").attr("productId");
    GotoPay(productId);
});

//直接支付 90天会员
appcan.button("#buy02", "btn-act", function() {
	sysInfo.vipType = 90;
	setSysInfo();
    var productId=$("#buy02").attr("productId");
    GotoPay(productId);
});

//直接支付 180天会员
appcan.button("#buy03", "btn-act", function() {
	sysInfo.vipType = 180;
	setSysInfo();
    var productId=$("#buy03").attr("productId");
    GotoPay(productId);
});

//直接支付 365天会员
appcan.button("#buy04", "btn-act", function() {
	sysInfo.vipType = 365;
	setSysInfo();
    var productId=$("#buy04").attr("productId");
    GotoPay(productId);
});

//激活
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
