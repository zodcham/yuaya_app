

var reviewId;
var addImgNum = 1;
var imgList = [];
var uploadId = 0;
var imgLength = 0;
var loadingMsg = "";
var upload_image_url;
var g_params = "";

appcan.ready(function() {
    isIPhoneX();

    getUserInfo();
    //var titHeight = $('#header').offset().height;
    //appcan.frame.open("content", "forumadd_content.html", 0, titHeight);
    //window.onorientationchange = window.onresize = function() {
    //    appcan.frame.resize("content", 0, titHeight);
    //}

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
        //$("#divAddImg").removeClass("uhide");

        var data = {
            min : 1,
            max : (5 - $(".addImg[value]").length),
            quality : 0.8,
            detailedInfo : true
        }
        var json = JSON.stringify(data);
        uexImage.openPicker(json)

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

                    var image = new Image();
                    image.src = imgPath;
                    image.onload = function() {
                        var img64 = compress(image, 1080, 0.7);
                        imgPath = img64;
                    }
                }
                alert($(".noAddImg"));

                var obj = $(".noAddImg").eq(0);
                alert(obj);
                obj.removeClass("noAddImg");
                obj.attr("value", imgPath);
                obj.find(".add_photo").addClass("uhide");
                obj.find(".imgbox").removeClass("uhide");
                alert(32);
                obj.find("img").attr("src", imgPath);
                alert(1);
                // addImgNum++;
                // if(addImgNum < 4){
                // $(".addImg[num="+addImgNum+"] .add_photo").removeClass("uhide");
                // }
            });
            alert(321);
            if ($(".add_photo").not(".uhide").length == 0) {
                $(".noAddImg:eq(0)").find(".add_photo").removeClass("uhide");
            }

        }
        //closeAddImg();
    }
    uexCamera.cbOpen = function(opCode, dataType, data) {
        //closeAddImg();
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})
appcan.button("#nav-add", "btn-act", function() {
    doSubmit();
    //uexWindow.evaluatePopoverScript("","content","doSubmit();");
})

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
    var url = _SERVER_ADDRESS + "/group/threads_add";
    var par = {
        'userid' : userInfo.id,
        'username' : userInfo.name,
        'title' : title,
        'message' : content,
        'cid' : getLocVal("class_id"),
        'gid' : getLocVal("forum_id")
    }

    var ferr = function(err) {
        appcan.window.evaluateScript({
            name : "forum", //窗口名称
            scriptContent : 'reload();'
        });

        appcan.window.close(-1);
    };
    var fok = function(data) {
        // appcan.window.evaluateScript({
        // name : "forum", //窗口名称
        // scriptContent : 'reload();'
        // });

        //alert(data);

        //appcan.window.close(-1);

        //reviewId=data.obj;

        reviewId = data;
        /*g_params = JSON.stringify({
            "tid" : data,
            "pid" : 0,
            "userId" : userInfo.id
        });*/
        //g_params= encodeURI("{tid:250, pid:0}");
        g_params = "tid="+data+"&pid=0&userId="+userInfo.id;
        $.each($("#divImg .addImg[value]"), function(n, obj) {
            imgList.push($(obj).attr("value"));
        });
        imgLength = imgList.length;

        if (imgLength == 0) {
            toast("上传成功~", config.toastTimeShort);
            setTimeout(function() {
                //uexWindow.evaluateMultiPopoverScript("bookIndex", "content", "content", "reloadData()");
                // appcan.window.evaluateScript({
                // name : "forum", //窗口名称
                // scriptContent : 'reload();'
                // });
                appcan.window.evaluatePopoverScript({
                    name : "forum",
                    popName : "content",
                    scriptContent : "refreshData();"
                });
                appcan.window.close(-1);
            }, 1000);
        } else {
            myLoading.show("上传图片");
            //imgUpLoad();
            uploadImg();
        }

    };
    common.ajaxPOST(url, par, fok, ferr);

    /*
     common.ajax("/interactionshare/add", {
     params:JSON.stringify(params)
     }, function(data) {

     }, function(data){
     toast(getMsgByKey(data.msg),config.toastTimeShort);
     }, {
     type : 'POST'
     });
     */

};

var uploadImgNum = 0;
function uploadImg() {
    if (uploadImgNum > imgList.length - 1) {
        uexWindow.toast("0", "5", "图片上传结束！", "2000");
        appcan.window.evaluatePopoverScript({
            name : "forum",
            popName : "content",
            scriptContent : "refreshData();"
        });
        appcan.window.close(-1);
        return;
    }
    upload(imgList[uploadImgNum], uploadImgNum);
    uploadImgNum++;
}

function upload(imgPath, i) {

    //var params = "?params=" + g_params + "&url=group/addGpAttachment&imageIndex=" + (i + 1) + "&imageCount=" + imgList.length;
    //var uploadHttp = "http://192.168.0.130:8080/group/uploadImage" + params;

    var params = "?" + g_params + "&url=group/addGpAttachment&imageIndex=" + (i + 1) + "&imageCount=" + imgList.length;
    var uploadHttp = _SERVER_ADDRESS + "/group/uploadImage" + params;

    appcan.logs(uploadHttp);

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
        //var params = {"programId":reviewId,"imageName":"image0"+uploadId};
        //uexUploaderMgr.createUploader(uploadId, config.serviceUrl + "/interactionshare/uploadImage?params="+JSON.stringify(params));
        var params = "?programId=" + reviewId + "&imageIndex=" + uploadId + "&imageCount=" + imgLength;
        uexUploaderMgr.createUploader(uploadId, "http://139.196.27.76/upload.php" + params);
        //uexUploaderMgr.createUploader(uploadId, "http://139.196.27.76/upload.php"+params);
    }
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