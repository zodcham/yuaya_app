var inUpdatePath = "wgt://我的资源/";
var pathfile;
var locArray;
var filename;

appcan.ready(function() {

    getSysInfo();
    // if (sysInfo.phoneType == "1") {
    // $(".checkUpdate").removeClass("uhide");
    // $(".page_2").addClass("uhide");
    // }
    getProgramInfo();
    // loadData();

    // uexWindow.onKeyPressed = function(keyCode) {
    // if (keyCode == 0) {
    // exit();
    // if(sysInfo.phoneType.length >0){
    // alert(sysInfo.phoneType);
    // }
    // }
    // }
    // uexWindow.setReportKey(0, 1);
});
function loadData() {
    // getSysInfo();
    pathfile = sysInfo.ranking.name;

    locArray = pathfile.split("/");
    filename = locArray[locArray.length - 1];

    $(".version").html(filename);
    $(".desc").html(filename.desc.replace(/\r/g, "<br>").replace(/\n/g, "<br>"));

    $(".progress").addClass("uhide");
    $(".progress_text").text("等待下载");
    $(".progress_bar").css("width", "1%");
    $(".downMenu").addClass("uhide");
    $(".btnMenu").removeClass("uhide");

    if (sysInfo.updateInfo.ismustupdate == "Y") {
        $(".btnPause").html("退出应用");
        $(".btnCancel").addClass("uhide");
    } else {
        $(".btnPause").html("取消下载");
    }

}

appcan.button(".btnOk", "btn-act", function() {
    $(".progress").removeClass("uhide");
    $(".downMenu").removeClass("uhide");
    $(".btnMenu").addClass("uhide");
    downloadFile();
});
appcan.button(".btnCancel", "btn-act", function() {
    exit();
});

appcan.button(".btnPause", "btn-act", function() {
    exit();
});
function exit() {
    if (sysInfo.updateInfo.ismustupdate == "Y") {
        //退出程序
        uexWidgetOne.exit();
    } else {

        appcan.window.close(-1);
        uexDownloaderMgr.closeDownloader(1);
    }
}

//下载文件
function downloadFile() {

    //文件路径截取

    inUpdatePath += filename;

    uexDownloaderMgr.cbCreateDownloader = function(opCode, dataType, data) {
        switch(dataType) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            if (data == 0) {
                // sysInfo.updateInfo.remoteurl
                uexDownloaderMgr.download(1, sysInfo.updateInfo.remoteurl, inUpdatePath, 0);
            } else {
                alert("文件失败~");
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
            toast("文件下载失败~", config.toastTimeShort);
            loadData();
            break;
        case 3:
            break;
        }
    }
    uexDownloaderMgr.createDownloader(1);
}

//安卓下载完成提示
function setupAppByPath() {

    //$(".progress_text").text("正在安装...");
    $(".progress_text").text("文件下载完成~");
    $(".progress_bar").css("width", "100%");
    $(".complete").removeClass("uhide");
}

appcan.button(".nav-btn", "btn-act", function() {
    appcan.window.close(-1);
})
