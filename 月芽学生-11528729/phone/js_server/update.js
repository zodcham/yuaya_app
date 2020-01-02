var inUpdatePath = "wgt://data/updatefile/";
appcan.ready(function() {
    getSysInfo();
    loadData();
    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            //exit();
        }
    }
    uexWindow.setReportKey(0, 1);
});
function loadData() {
    $(".version").html("新版本：" + sysInfo.updateInfo.version);
    $(".desc").html(sysInfo.updateInfo.desc.replace(/\r/g, "<br>").replace(/\n/g, "<br>"));
    $(".progress").addClass("uhide");
    $(".progress_text").text("等待下载");
    $(".progress_bar").css("width", "1%");
    $(".downMenu").addClass("uhide");
    $(".btnMenu").removeClass("uhide");
    if (sysInfo.updateInfo.ismustupdate == "Y") {
        $(".btnPause").html("退出应用");
        $(".btnCancel").addClass("uhide");
    } else {
        //$(".btnPause").html("取消下载");
    }
}

appcan.button(".btnOk", "btn-act", function() {
    $(".progress").removeClass("uhide");
    $(".downMenu").removeClass("uhide");
    $(".btnMenu").addClass("uhide");

    /*

     clearCommInfo();
     getDefaultUserInfo();
     setUserInfo(false);
     */

    downloadFile();
});
appcan.button(".btnCancel", "btn-act", function() {
    //exit();
});

appcan.button(".btnPause", "btn-act", function() {
    //exit();
});
function exit() {
    if (sysInfo.updateInfo.ismustupdate == "Y") {
        //退出程序
        uexWidgetOne.exit();
    } else {
        uexDownloaderMgr.closeDownloader(1);
        appcan.window.close(-1);
    }
}

//下载文件
function downloadFile() {
    inUpdatePath += "yyb_" + sysInfo.updateInfo.version + ".apk";

    uexDownloaderMgr.cbCreateDownloader = function(opCode, dataType, data) {
        switch(dataType) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            if (data == 0) {
                uexDownloaderMgr.download(1, sysInfo.updateInfo.remoteurl, inUpdatePath, 0);
            } else {
                alert("获取新版本失败~");
                loadData();
            }
            break;
        default:
            break;
        }
    }
    uexDownloaderMgr.onStatus = function(opCode, fileSize, percent, status) {
        switch (status) {
        case 0:
            $(".progress_text").text(percent + "%");
            $(".progress_bar").css("width", percent + "%");
            break;
        case 1:
            uexDownloaderMgr.closeDownloader(1);
            setupAppByPath();
            break;
        case 2:
            uexDownloaderMgr.closeDownloader(1);
            //删除旧安装包
            uexFileMgr.deleteFileByPath(inUpdatePath);
            toast("升级新版本失败~", config.toastTimeShort);
            loadData();
            break;
        case 3:
            break;
        }
    }
    uexDownloaderMgr.createDownloader(1);
}

function setupAppByPath() {
    $(".progress_text").text("正在安装...");
    $(".progress_bar").css("width", "100%");
    uexWidget.installApp(inUpdatePath);
    setTimeout(function() {
        appcan.window.close(-1);
    }, 1000);
}