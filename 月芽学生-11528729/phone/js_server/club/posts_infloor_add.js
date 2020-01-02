var reviewId;
var addImgNum = 1;
var imgList = [];
var uploadId = 0;
var imgLength = 0;
var loadingMsg = "";
var upload_image_url;


appcan.ready(function() {
	isIPhoneX();
	
    var tousername = getLocVal("tousername");
    $("#toTitle").html(tousername);
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
    var post_id = getLocVal("posts_id");
    if (post_id == null) {
        post_id = 0;
    }
    var url = _SERVER_ADDRESS + "/group/posts_add";
    var par = {
        'userid' : userInfo.id,
        'username' : userInfo.name,
        'message' : content,
        'cid' : getLocVal("class_id"),
        'gid' : getLocVal("forum_id"),
        'tid' : getLocVal("threads_id"),
        'postid' : getLocVal("posts_id"),
        'toUserid' : getLocVal("touserid"),
        'toUsername' : getLocVal("tousername")
    }
    //alert(JSON.stringify(par));
    var ferr = function(err) {
        appcan.window.evaluateScript({
            name : "posts", //窗口名称
            scriptContent : 'reload();'
        });
        appcan.window.close(-1);
    };
    var fok = function(data) {

        AddLogContent(userInfo.id, logKeys.ClubPostsReplySuccess, {"postId": data});

        appcan.window.evaluateScript({
            name : "posts", //窗口名称
            scriptContent : 'reload();'
        });

        appcan.window.close(-1);

    };
    common.ajaxPOST(url, par, fok, ferr);


};


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
