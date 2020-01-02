var yearFlag;
var pageIndex = 1;
var reloadDate = "";
var isbnType = '1';
var reloadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期1",
    "pullToReloadText" : "拖动刷新",
    "releaseToReloadText" : "释放刷新",
    "loadingText" : "刷新中，请稍等"
};
var loadJson = {
    "textColor" : "#000",
    "imagePath" : "res://refesh_icon.png",
    "levelText" : "更新日期2",
    "pullToReloadText" : "拖动加载",
    "releaseToReloadText" : "释放加载",
    "loadingText" : "加载中，请稍等"
};
var gradeType = '1';
var content1 = '1';
var content2 = '1';

appcan.ready(function() {
    $("#sortNav").addClass("uhide");
    $("#reviewList1").css("width","100%");
    loadGroup();

    gradeType = content1;

});

function refreshData() {
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));

    $("#reviewList1 .item").remove();
    $("#reviewList2 .item2").remove();

    pageIndex = 1;

    loadData();

}

function loadGroup() {

    var url = _SERVER_ADDRESS + "/group/class";
    var par = {};
    var ferr = function(err) {

    };
    var fok = function(data) {
        alert(data);
        data = JSON.parse(data);
        var htm = '';
        var check = '';
        var defaultid = "";
        $.each(data, function(index, value) {
            if (index == 0) {
                check = ' checked="checked"';
                defaultid = value["cid"];
            } else
                check = '';
            htm += '<div><input type="radio" name="money" ' + check + '  class="uhide"/>';
            htm += '<b class="box" value="' + value["cid"] + '">' + value["title"] + '</b></div>';
        });

        $('#sortNav').html(htm);
        loadForum(defaultid);

        $(".box").on("click", function() {
            $(this).siblings("input").trigger("click");
            gradeType = $(this).attr("value");
            content1 = $(this).attr("value");

            $("#reviewList1").empty();
            pageIndex = 0;
            loadForum($(this).attr("value"));
        });
    }
    common.ajaxPOST(url, par, fok, ferr);
}

function loadForum(id) {
    var url = _SERVER_ADDRESS + "/group/group";
    var par = {
        "cid" : id
    };
    var ferr = function(err) {
    };
    var fok = function(data) {

        data = JSON.parse(data);
        var htm = '';
        $.each(data, function(index, value) {
            //htm+='<div class="box" value="'+ value["id"] +'">'+ value["title"] +'</div>';
            var img = value["icon"] + '';
            //img = _SERVER_VIDEO_ADDRESS + "/" + img;
            img = "http://www.readseed.cn/" + img;
            //alert(img);
            /*
             if (img!=''){
             img="http://192.168.0.134/bbs/data/attachment/common/"+value["icon"];
             }
             else{
             img="http://192.168.0.134/bbs/static/image/common/forum.gif";
             }
             */
            htm += '<div class="ub ub-ac listchild" onclick="openforum(' + value["cid"] + ', ' + value["gid"] + ', \'' + value["title"] + '\')">';
            htm += '     <div class="div_img"><img src="' + img + '" class="forumimg"></div>';
            htm += '     <div class="ub ub-ver">';
            htm += '         <div class="title">' + value["title"] + '</div>';
            htm += '         <div class="threads"><span >' + value["threadsCount"] + '话题</span><span style="margin-left:2em">' + value["postsCount"] + '帖子</span></div>';
            htm += '     </div>';
            htm += ' </div>';

        });
        $('#reviewList1').html(htm);

    }
    common.ajaxPOST(url, par, fok, ferr);
}

function openforum(cid, id, title) {
    setLocVal("class_id", cid);
    setLocVal("forum_id", id);
    setLocVal("forum_title", title);
    appcan.window.open("forum", "forum.html", 5);
}

function loadData() {

    var params = {
        'programCategory' : '4',
        pageSize : '10',
        pageIndex : pageIndex,
        'grade' : gradeType,
        'month' : sysInfo.ranking.grade,
        'year' : sysInfo.ranking.report
    };
    common.ajax("/program/getProgramInfoMore", {
        params : JSON.stringify(params)
    }, function(data) {
        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("内容将按时发布，敬请期待~~", "#reviewList1");
            $("#reviewList2").addClass("myPromptList");
        } else {
            $("#reviewList2").removeClass("myPromptList");
            myPrompt.hide();
            var list = data.obj.list;
            for (var i = 0; i < list.length; i++) {

                var obj = list[i];
                //appcan.alert(obj.image);
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", obj.id);
                // 视频
                if (obj.videoFile.length > 0) {
                    objItem.find("#videoFile").removeClass("uhide");
                }
                objItem.find(".ImagePoster").attr("src", _SERVER_ADDRESS + obj.posterImagePath);
                if (obj.remarks.length > 0) {
                    objItem.find("#videoFile").removeClass("uhide");
                }

                // 音频
                if (obj.audioFile.length > 0) {
                    // choose_audio_path

                    objItem.find("#audioplay").removeClass("uhide");
                }
                //PPT
                objItem.attr("pptPath", obj.pptPath);
                if (obj.pptPath.length > 0) {
                    objItem.find("#SlidePPT").removeClass("uhide");
                }
                objItem.find(".bookImage01").attr("src", _SERVER_ADDRESS + obj.image01);
                objItem.find(".bookImage02").attr("src", _SERVER_ADDRESS + obj.image02);

                objItem.find(".name").html(obj.name);
                objItem.find(".bookImage").attr("src", _SERVER_ADDRESS + obj.image);
                objItem.find(".hits").html(obj.hits);
                objItem.find(".evaluateTimes").html(obj.evaluateTimes);
                objItem.find(".introduces").html(obj.introduce);

                //1精读，2泛读，3选读
                switch(obj.readType) {
                case "1":
                    objItem.find(".mark").addClass("mark_essence");
                    break;
                case "2":
                    objItem.find(".mark").addClass("mark_extensive");
                    break;
                case "3":
                    objItem.find(".mark").addClass("mark_choose");
                    break;
                }

                objItem.bind("click", function() {
                    var id = $(this).attr("id");

                    getProgramInfoById(id, function(data) {
                        getProgramInfo();
                        programInfo = data;
                        setProgramInfo();
                        appcan.window.open("Read_index", "Read_index.html", 5);

                    }, null);

                });

                $("#reviewList1").append(objItem);

            }
            var list2 = data.obj.list;
            for (var j = 0; j < list.length; j++) {

                var obj2 = list2[j];
                var objItem2 = $("#item2").clone();
                objItem2.removeClass("uhide");
                objItem2.attr("id", obj2.id);
                // 视频
                if (obj2.videoFile.length > 0) {
                    objItem2.find("#videoFile").removeClass("uhide");
                }
                objItem2.find(".ImagePoster").attr("src", _SERVER_ADDRESS + obj2.posterImagePath);
                if (obj2.remarks.length > 0) {
                    objItem2.find("#videoFile").removeClass("uhide");
                }

                // 音频
                if (obj2.audioFile.length > 0) {
                    // choose_audio_path

                    objItem2.find("#audioplay").removeClass("uhide");
                }
                //PPT
                objItem2.attr("pptPath", obj2.pptPath);
                if (obj2.pptPath.length > 0) {
                    objItem2.find("#SlidePPT").removeClass("uhide");
                }
                objItem2.find(".bookImage01").attr("src", _SERVER_ADDRESS + obj2.image01);
                objItem2.find(".bookImage02").attr("src", _SERVER_ADDRESS + obj2.image02);

                objItem2.find(".name").html(obj2.name);
                objItem2.find(".bookImage").attr("src", _SERVER_ADDRESS + obj2.image);
                objItem2.find(".hits").html(obj.hits);
                objItem2.find(".evaluateTimes").html(obj2.evaluateTimes);
                objItem2.find(".introduces").html(obj2.introduce);

                //1精读，2泛读，3选读
                switch(obj2.readType) {
                case "1":
                    objItem2.find(".mark").addClass("mark_essence");
                    break;
                case "2":
                    objItem2.find(".mark").addClass("mark_extensive");
                    break;
                case "3":
                    objItem2.find(".mark").addClass("mark_choose");
                    break;
                }

                objItem2.bind("click", function() {
                    var id = $(this).attr("id");

                    getProgramInfoById(id, function(data) {
                        getProgramInfo();
                        programInfo = data;
                        setProgramInfo();
                        appcan.window.open("Read_index", "Read_index.html", 5);

                    }, null);

                });

                $("#reviewList2").append(objItem2);
            }
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
    });
}
