var yearFlag;
var pageIndex = 1;
var reloadDate = "";


appcan.ready(function() {
    getUserInfo();
    getProgramInfo();
    AddLogContent(userInfo.id, logKeys.HomeReadNews,{});
    loadData();
    var time1 = new Date().format("MM-dd HH:mm:ss");
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
    getBookInfo();
    var params = {
        'userId': userInfo.id,
        'bookId' : bookInfo.id,
        pageSize : '8',
        pageIndex : pageIndex,
        'type':'3'
    };
    common.ajax("/bookMediaList/getVideoList", {
        params : JSON.stringify(params)
    }, function(data) {
            var list = data.obj;
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", obj.id);
                objItem.attr("v_url", obj.url);
                objItem.attr("v_title", obj.title);
                objItem.attr("v_image", obj.image);
                objItem.find(".name").html(obj.title);
                objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
                objItem.find(".introduces").html(obj.remarks);

                if(Number(obj.payStatus)==1 || !(userInfo.isActiveValidity==0 && userInfo.type!=2)){ //已付费的，可以查看音频
                    objItem.find(".paid").removeClass("uhide");
                    objItem.find(".btnBuyVideo").addClass("uhide");

                    objItem.bind("click", function() {
                        setLocVal("v_title", $(this).attr("v_title"));
                        setLocVal("v_url", $(this).attr("v_url"));
                        setLocVal("v_image", $(this).attr("v_image"));
                        appcan.window.evaluateScript({
                            name : "book_default", //窗口名称
                            scriptContent : 'loadAudioUrl();'
                        });
                        $(".txtcolor .name").css("color","");
                        $(this).find(".name").css("color","#f70");
                    });
                }
                else{
                    objItem.find(".btnBuyVideo").bind("click", function() {
                        var id=$(this).parents(".item").attr("id");
                        PayOrder(userInfo.id,id,"3");
                    });
                }



                $("#reviewList").append(objItem);

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
    },{"type":"POST"});
}