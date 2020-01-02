appcan.ready(function() {
    getUserInfo();
    getCommInfo();
    $("#name").html(commInfo.mallName);
});
function doSubmit() {
    var address = $("#address").val();
    var receiver = $("#receiver").val();
    var phone = $("#phone").val();
    var note = $("#note").val();
    if (address.length == 0) {
        $("#address").focus();
        toast("请输入收货地址", config.toastTimeShort);
        return;
    }
    if (receiver.length == 0) {
        $("#receiver").focus();
        toast("请输入收货人姓名", config.toastTimeShort);
        return;
    }
    if (phone.length == 0) {
        $("#phone").focus();
        toast("请输入收货人电话", config.toastTimeShort);
        return;
    }
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(1[0-9]{2}))+\d{8})$/;

    if (!myreg.test(phone)) {
        $("#phone").focus();
        toast("请输入正确的电话号码", config.toastTimeShort);
        return;
    }
    var params = {
        'userId' : userInfo.id,
        'giftId' : commInfo.mallId,
        'address' : address,
        'receiver' : receiver,
        'phone' : phone,
        'note' : note
    };
    common.ajax("/gift/exchange", {
        params : JSON.stringify(params)
    }, function(data) {
        AddLogContent(userInfo.id, logKeys.MallBuyGift,{"giftId":commInfo.mallId, "content":commInfo.mallName});
        uexWindow.evaluateScript("", 0, "exit()");
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        "type" : "POST"
    });
}