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
    loadData();
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
            imgUpLoad();
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
        max : (3 - $(".addImg[value]").length),
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
    var content = $("#txtComments").val();
    if (content.length == 0) {
        toast("说说你的感想吧~", config.toastTimeShort);
        return;
    }

    var checkNum = /[\ud800-\udbff][\udc00-\udfff]/g;
    if (checkNum.test(content)) {
        toast("请勿添加表情图片~", config.toastTimeShort);
        return false;
    }

    var params = {
        'userId' : userInfo.id,
        'programId' : programInfo.id,
        'content' : content
    };
    common.ajax("/programReview/save", {
        params : JSON.stringify(params)
    }, function(data) {
        reviewId = data.obj;

        AddLogContent(userInfo.id, logKeys.SharingWriteSuccess, {"programReviewId":reviewId});

        $.each($("#divImg .addImg[value]"), function(n, obj) {
            imgList.push($(obj).attr("value"));
        });
        imgLength = imgList.length;
        if (imgLength == 0) {
            toast("上传成功~", config.toastTimeShort);
            setTimeout(function() {
                uexWindow.evaluateMultiPopoverScript("bookIndex", "content", "content", "reloadData()");
                uexWindow.evaluateScript("", 0, "exit()");
            }, 1000);
        } else {
            myLoading.show("上传图片");
            imgUpLoad();
        }
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        type : 'POST'
    });
};

function loadData() {
    var params = {
        'programId' : programInfo.id,
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
            // var result =content.split("<br><br>");
            // content = "";
            // for (var j = 0 ; j < result.length ; j ++) {
            // content +="<p style='text-indent:2em'>"+result[j]+"</p>";
            // }

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

function imgUpLoad() {
    if (imgList.length == 0) {
        myLoading.close();
        toast("上传成功~", config.toastTimeShort);
        setTimeout(function() {
            uexWindow.evaluateMultiPopoverScript("bookIndex", "content", "content", "reloadData()");
            uexWindow.evaluateScript("", 0, "exit()");
        }, 1000);
    } else {
        loadingMsg = "上传图片(" + uploadId + "/" + imgLength + "):";
        myLoading.setTitle(loadingMsg + "0%");
        uploadId++;
        upload_image_url = imgList[0];
        imgList.shift();
        var params = {
            "reviewId" : reviewId,
            "imageName" : "image0" + uploadId
        };
        uexUploaderMgr.createUploader(uploadId, config.serviceUrl + "/programReview/uploadImage?params=" + JSON.stringify(params));
    }
}

function delReviewId() {
    var params = {
        'reviewId' : reviewId
    };
    common.ajax("/programReview/delete", {
        params : JSON.stringify(params)
    }, function(data) {
        AddLogContent(userInfo.id, logKeys.SharingReviewDel, {"programReviewId":reviewId});
        reviewId = "";
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

function closeAddImg() {
    uexWindow.evaluateScript("", 0, "isOpenChooseImg=false;");
    $("#divAddImg").addClass("uhide");
}
