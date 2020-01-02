var reviewId;
var addImgNum = 1;
var imgList = [];
var uploadId = 0;
var imgLength = 0;
var loadingMsg = "";
var upload_image_url;
appcan.ready(function() {
    getUserInfo();
    getProgramInfo();
    // loadData();
    var size = $("#divImg").width() * 0.3;
    $(".addImg").css("width", size + "px").css("height", size + "px");

    $("#divImg .remove").on("click", function() {
        var objParent = $(this).parents(".addImg");
        objParent.addClass("noAddImg");
        objParent.removeAttr("value");
        objParent.find(".add_photo").removeClass("uhide");
        objParent.find(".imgbox").addClass("uhide");
        objParent.find("img").attr("src", "");
        //objParent.insertAfter($(".addImg:eq(2)"));

        // for(var i = 2 ; i >= 0 ; i --){
        // $(".addImg:eq("+i+")").attr("num",(i+1));
        // if($("#divImg .add_photo:not([class*=uhide])").length > 1){
        // $(".addImg:eq("+i+")").find(".add_photo").addClass("uhide");
        // }
        // }
        // addImgNum -- ;

        while ($(".add_photo").not(".uhide").length > 1) {
            $(".add_photo").not(".uhide").eq($(".add_photo").not(".uhide").length - 1).addClass("uhide");
        }
    });
    $(".add_photo").on("click", function() {
        addImgNum = $(this).parents(".addImg").attr("num");
        uexWindow.evaluateScript("", 0, "isOpenChooseImg=true;");
        $("#divAddImg").removeClass("uhide");
    });
    $(".btnCancel").on("click", function() {
        closeAddImg();
    });

    uexImage.onPickerClosed = function(info) {
        var data = JSON.parse(info);
        if (!data.isCancelled) {
            $.map(data.data, function(imgPath) {
                var obj = $(".noAddImg:eq(0)");
                obj.removeClass("noAddImg");
                obj.attr("value", imgPath);
                obj.find(".add_photo").addClass("uhide");
                obj.find(".imgbox").removeClass("uhide");
                obj.find("img").attr("src", imgPath);
                // addImgNum++;
                // if(addImgNum < 4){
                // $(".addImg[num="+addImgNum+"] .add_photo").removeClass("uhide");
                // }
            });
            if ($(".add_photo").not(".uhide").length == 0) {
                $(".noAddImg:eq(0)").find(".add_photo").removeClass("uhide");
            }

        }
        closeAddImg();
    }
    uexCamera.cbOpen = function(opCode, dataType, data) {
        closeAddImg();
    }
    //图片上传
    uexUploaderMgr.cbCreateUploader = function(opCode, dataType, data) {
        if (data == 0) {
            uexUploaderMgr.uploadFile(uploadId, upload_image_url, "fileInput", 2, 800);
        } else {
            myLoading.close();
            delReviewId();
            toast("初始化图像失败~", config.toastTimeShort);

        }
    }

    uexUploaderMgr.onStatus = function(opCode, fileSize, percent, serverPath, status) {

        switch (status) {
        case 0:
            myLoading.setTitle(loadingMsg + percent + "%");
            break;
        case 1:
            uexUploaderMgr.closeUploader(0);

            break;
        case 2:
            myLoading.close();
            delReviewId();
            toast("图片上传失败，请重试~", config.toastTimeShort);
            setTimeout(function() {
                uexUploaderMgr.closeUploader(0);
            }, config.toastTimeShort);
        }
    }
});

appcan.button("#btnPhoto", "btn-act", function() {
    var data = {
        min : 1,
        max : (5 - $(".addImg[value]").length),
        quality : 0.8,
        detailedInfo : true
    }
    var json = JSON.stringify(data);
    uexImage.openPicker(json)
})

appcan.button("#btnCamera", "btn-act", function() {
    uexCamera.open(0, 0.8);
})
function doSubmit() {
    var title = $("#threads_title").val();
    var content = $("#threads_content").val();

    //if(Title.length==0){
    //    toast("标题不能为空。",config.toastTimeShort);
    //    return;
    //}
    if (content.length == 0) {
        toast("内容不能为空。", config.toastTimeShort);
        return;
    }

    var checkNum = /[\ud800-\udbff][\udc00-\udfff]/g;
    if (checkNum.test(content)) {
        toast("请勿添加表情图片~", config.toastTimeShort);
        return false;
    }
    var url = "/group/threads_add";
    var par = {
        'userId' : userInfo.id,
        'title' : title,
        'content' : content
    }
    var ferr = function() {
    };
    var fok = function() {

    };
    //common.ajaxPOST(url, par, fok, ferr);


};

function loadData() {
    var params = {
        'bookId' : bookInfo.id,
        "studentId" : userInfo.id
    };
    common.ajax("/programReview/list", {
        params : JSON.stringify(params)
    }, function(data) {
        for (var i = 0; i < data.obj.length; i++) {
            $("#divHistoryBox").removeClass("uhide");
            var obj = data.obj[i];
            var objItem = $("#item").clone();
            objItem.attr("id", obj.id);
            objItem.removeClass("uhide");
            objItem.find(".time").html("发表于：" + obj.createDateText);
            var content = obj.content.replace(new RegExp("\n", "g"), "<br><br>");
            content = content.replace(new RegExp("<br/>", "g"), "<br><br>");

            objItem.find(".content").html(content);
            for (var j = 1; j < 4; j++) {
                if (obj["image0" + j].length > 0) {
                    var divImg = $("<div style='width:5em;height:5em' class='umar-r'><img src='" + _SERVER_ADDRESS + obj["image0" + j] + "' style='width:100%;height:100%'></div>");
                    objItem.find(".imgs").append(divImg);
                }
            }
            $("#divHistory").append(objItem);
        }

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}



function delReviewId() {
    var params = {
        'reviewId' : reviewId
    };
    common.ajax("/programReview/delete", {
        params : JSON.stringify(params)
    }, function(data) {
        reviewId = "";
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

function closeAddImg() {
    uexWindow.evaluateScript("", 0, "isOpenChooseImg=false;");
    $("#divAddImg").addClass("uhide");
}
