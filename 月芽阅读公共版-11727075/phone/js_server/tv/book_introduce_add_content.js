var reviewId;
var addImgNum = 1;
var imgList = [];
var uploadId = 0;
var imgLength = 0;
var loadingMsg = "";
var upload_image_url;
appcan.ready(function() {
    getUserInfo();
    getBookInfo();
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

                getSysInfo();

                if (Number(sysInfo.phoneType) == 1) {
                    //压缩图片
                    /*
                     var params = {srcPath : imgPath,desLength : 150*1024};
                     uexImage.compressImage(params, function(err,errStr){});
                     */
                    var image = new Image();
                    image.src = imgPath;
                    image.onload = function() {
                        var img64 = compress(image, 1080, 0.5);
                        imgPath = img64;
                    }
                }

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
            //alert("上传成功，服务器路径为"+serverPath+"End");
            //imgUpLoad();
            uploadImg();
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


appcan.button("#submit", "btn-act", function() {
    doSubmit();
})


function doSubmit() {
    var content = $("#txtComments").val();
    if (content.length == 0) {
        toast("文字内容不能为空!", config.toastTimeShort);
        return;
    }

    var checkNum = /[\ud800-\udbff][\udc00-\udfff]/g;
    if (checkNum.test(content)) {
        toast("请勿添加表情图片~", config.toastTimeShort);
        return false;
    }

    var params = {
        'userId' : userInfo.id,
        'bookId' : bookInfo.id,
        'content' : content
    };
    common.ajax("/bookReview/save", {
        params : JSON.stringify(params)
    }, function(data) {
        reviewId = data.obj;
        AddLogContent(userInfo.id, logKeys.BookReviewWriteSuccess, {"reviewId":reviewId});
        $.each($("#divImg .addImg[value]"), function(n, obj) {
            imgList.push($(obj).attr("value"));
        });
        imgLength = imgList.length;
        if (imgLength == 0) {
            toast("上传成功~", config.toastTimeShort);
			appcan.window.evaluateScript({
                name:'book_default',
                scriptContent:"OpenWin('review')"
            });
            setTimeout(function() {
                //uexWindow.evaluateMultiPopoverScript("bookIndex", "content", "content", "reloadData()");
                uexWindow.evaluateScript("", 0, "exit()");
            }, 1000);
        } else {
            myLoading.show("上传图片");
            //imgUpLoad();
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
    common.ajax("/bookReview/list", {
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

                    var divImg = $("<div style='width:5em;height:5em' class='umar-r' onclick=\"openbrower('" + obj.id + "')\"><img src='" + _SERVER_ADDRESS + obj["image0" + j] + "' class='" + obj.id + "' style='width:100%;height:100%'></div>");
                    objItem.find(".imgs").append(divImg);
                }
            }
            $("#divHistory").append(objItem);
        }

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

function openbrower(id) {
    var obj = $("." + id);
    var imglist = [];
    for (var i = 0; i < obj.length; i++) {
        var child = {
            src : obj[i].src,
            thumb : obj[i].src,
        };
        imglist.push(child);
    }

    var data = {
        displayActionButton : false,
        displayNavArrows : true,
        enableGrid : true,
        startIndex : 0,
        data : imglist
    }
    uexImage.openBrowser(JSON.stringify(data));
}

var uploadImgNum = 0;
function uploadImg() {
    if (uploadImgNum > imgList.length - 1) {
        uexWindow.toast("0", "5", "图片上传结束！", "2000");
        //uexWindow.evaluateMultiPopoverScript("bookIndex", "content", "content", "reloadData()");
		appcan.window.evaluateScript({
			name:'book_default',
			scriptContent:"OpenWin('review')"
		});
        uexWindow.evaluateScript("", 0, "exit()");
        return;
    }
    upload(imgList[uploadImgNum], uploadImgNum);
    uploadImgNum++;
}

function upload(imgPath, i) {

    var params = "?reviewId=" + reviewId + "&imageIndex=" + (i + 1) + "&imageCount=" + imgList.length + "&type=1";
    var uploadHttp =  _SERVER_ADDRESS+"/phone/bookReview/uploadImage"+params;


    randOpId = Math.floor(Math.random() * (1000 + 1));
    uexUploaderMgr.onStatus = function(opCode, fileSize, percent, serverPath, status) {
        switch (status) {
        case 0:
            uexWindow.toast("1", "5", percent + "%", "0");
            break;
        case 1:
            uexUploaderMgr.closeUploader(opCode);
            uexWindow.closeToast();
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

function imgUpLoad() {

    var par = "reviewId=" + reviewId;

    var req = uexXmlHttpMgr.create({
        method : "POST",
        url : _SERVER_ADDRESS + "/phone/bookReview/uploadImage?" + par,
        timeout : 15000,
    });

    for (var i = 0; i < imgList.length; i++) {

        upload_image_url = imgList[i];
        var index = (i + 1);
        uexXmlHttpMgr.setPostData(req, 1, "fileInput" + index, upload_image_url);
        uexXmlHttpMgr.setPostData(req, 0, "image0" + index, "image0" + index);

    }
    uexXmlHttpMgr.send(req, 0, function(status, resStr, resCode, resInfo) {
        uexXmlHttpMgr.close(req);
    }, function(progress) {
    });

    myLoading.close();
    toast("上传成功~", config.toastTimeShort);
	appcan.window.evaluateScript({
		name:'book_default',
		scriptContent:"OpenWin('review')"
	});
    setTimeout(function() {
        //uexWindow.evaluateMultiPopoverScript("bookIndex", "content", "content", "reloadData()");
        uexWindow.evaluateScript("", 0, "exit()");
    }, 1000);

}

/*
 * 图片压缩
 * img    原始图片
 * width   压缩后的宽度
 * height  压缩后的高度
 * ratio   压缩比率
 */
function compress(img, width, ratio) {
    var canvas,
        ctx,
        img64,
        height;
    height = img.height / img.width * width;
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    img64 = canvas.toDataURL("image/jpeg", ratio);

    return img64;
}

function imgUpLoad_bak() {
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
        uexUploaderMgr.createUploader(uploadId, config.serviceUrl + "/bookReview/uploadImage?params=" + JSON.stringify(params));
    }
}

function delReviewId() {
    var params = {
        'reviewId' : reviewId
    };
    common.ajax("/bookReview/deletereviewId", {
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
