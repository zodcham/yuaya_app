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


});

var uploadImgNum = 0;
function uploadImg() {
    if (uploadImgNum > imgList.length - 1) {
        uexWindow.toast("0", "5", "图片上传结束！", "2000");
        uexWindow.evaluateMultiPopoverScript("yueduquan", "content", "Interaction", "refreshData()");
        uexWindow.evaluateScript("", 0, "exit()");
        return;
    }
    upload(imgList[uploadImgNum], uploadImgNum);
    uploadImgNum++;
}

function upload(imgPath, i) {

    var params = "?programId=" + reviewId + "&imageIndex=" + (i + 1) + "&imageCount=" + imgList.length + "&type=1";
    var uploadHttp = _SERVER_ADDRESS + "/phone/program/uploadImage" + params;

    randOpId = Math.floor(Math.random() * (1000 + 1));
    uexUploaderMgr.onStatus = function(opCode, fileSize, percent, serverPath, status) {
        switch (status) {
        case 0:
            uexWindow.toast("1", "5", percent + "%", "0");
            break;
        case 1:
            uexUploaderMgr.closeUploader(opCode);
            uexWindow.closeToast();
            var uploadMsg = "成功上传图片(" + (i + 1) + "/" + imgList.length + ")";
            uexWindow.toast("0", "5", uploadMsg, "2000");
            uploadImg();
            break;
        case 2:
            uexWindow.closeToast();
            uexWindow.toast('0', '5', "图片上传失败", "2000");
            uexUploaderMgr.closeUploader(opCode);
            uploadImg();
            break;
        default:
            break;
        }
    }

    uexUploaderMgr.cbCreateUploader = function(opCode, dataType, data) {
        if (data == 0) {
            var path = imgPath;
            var inCompress = 2;
            if (uexWidgetOne.platformName == "iOS") {
                uexUploaderMgr.uploadFile(opCode, "file:/" + path, "fileInput", inCompress, 720);
            }
            if (uexWidgetOne.platformName == "android") {
                uexUploaderMgr.uploadFile(opCode, path, "fileInput", inCompress, 720);
            }
        } else {
            uexWindow.closeToast();
            var strimg2 = "图片上传失败";
            uexWindow.toast('0', '5', '图片上传失败', 3000);
        }
    }
    var strimg2 = "开始上传图片";
    uexWindow.toast('1', '5', strimg2, '');
    uexUploaderMgr.createUploader(randOpId, uploadHttp);
}


$("#btnPhoto").off().on("click", function() {
    var data = {
        min : 1,
        max : (5 - $(".addImg[value]").length),
        quality : 0.7,
        detailedInfo : true
    }
    var json = JSON.stringify(data);
    uexImage.openPicker(json)
})

$("#btnCamera").off().on("click", function() {
    uexCamera.open(0, 0.8);
})
function doSubmit() {
    var Title = $("#TitleComments").val();
    var content = $("#txtComments").val();

    if (Title.length == 0) {
        toast("分享标题不能为空~", config.toastTimeShort);
        return;
    }
    if (content.length == 0) {
        toast("分享内容不能为空~", config.toastTimeShort);
        return;
    }

    var checkNum = /[\ud800-\udbff][\udc00-\udfff]/g;
    if (checkNum.test(content)) {
        toast("请勿添加表情图片~", config.toastTimeShort);
        return false;
    }

    var params = {
        'userId' : userInfo.id,
        'name' : Title,
        'readGuide' : content
    };
    common.ajax("/interactionshare/add", {
        params : JSON.stringify(params)
    }, function(data) {
        reviewId = data.obj;
        AddLogContent(userInfo.id, logKeys.SharingSuccess, {"programId": reviewId});
        $.each($("#divImg .addImg[value]"), function(n, obj) {
            imgList.push($(obj).attr("value"));
        });
        imgLength = imgList.length;
        if (imgLength == 0) {
            toast("发布分享成功~", config.toastTimeShort);
            setTimeout(function() {
                uexWindow.evaluateMultiPopoverScript("yueduquan", "content", "Interaction", "refreshData()");
                uexWindow.evaluateScript("", 0, "exit()");
            }, 1000);
        } else {
            myLoading.show("上传图片");
            uploadImg();
        }

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
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