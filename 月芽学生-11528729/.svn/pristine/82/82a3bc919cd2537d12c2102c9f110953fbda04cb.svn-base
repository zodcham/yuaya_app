var pageIndex = 1;
var reloadDate = "";
var loadDate = "";
var totalPageSize = 0;
var orderByType = '1';
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
$(".sc-text-hint").html("&nbsp;");
appcan.ready(function() {
	
    getSysInfo();
    getUserInfo();
    if (sysInfo.ranking.rankingType != "all") {
        $("#item .school").addClass("uhide");
    }

    switch (sysInfo.ranking.rankingType) {
        case "clazz":
            AddLogContent(userInfo.id, logKeys.RankClass, {});
            break;
        case "grade":
            AddLogContent(userInfo.id, logKeys.RankGrade, {});
            break;
        case "school":
            AddLogContent(userInfo.id, logKeys.RankSchool, {});
            break;
        case "all":
            AddLogContent(userInfo.id, logKeys.RankAll, {});
            break;
    }

    loadTip();
    uexWindow.setBounce(1);
    uexWindow.notifyBounceEvent(0, 1);
    uexWindow.notifyBounceEvent(1, 1);
    uexWindow.showBounceView("0", "rgba(0, 0, 0, 0)", 1);
    uexWindow.showBounceView("1", "rgba(0, 0, 0, 0)", 1);
    uexWindow.onBounceStateChange = function(type, state) {
        var time1 = new Date().format("MM-dd HH:mm:ss");
        switch(type) {
        case 0:
            if (state == 2) {
                refreshData();
            }
            break;
        case 1:
            if (state == 2) {
                loadJson.levelText = "上次加载：" + time1;
                uexWindow.setBounceParams(1, JSON.stringify(loadJson));
                pageIndex++;
                loadData();
            }
            break;
        }
    };
    var i = false;
    $(".box").on("click", function() {
        if (i === false) {
            // alert('单击');
            i = true;

            $(this).siblings("input").trigger("click");
            orderByType = $(this).attr("value");

            if (1 == orderByType) {
                $("#experience1").css("background", "url(../css/image1/Descending.png)");
                $("#experience1").css("background-size", "100% 100%");
            }
            if (2 == orderByType) {
                $("#experience2").css("background", "url(../css/image1/Descending.png)");
                $("#experience2").css("background-size", "100% 100%");
            }
            if (3 == orderByType) {
                $("#experience3").css("background", "url(../css/image1/Descending.png)");
                $("#experience3").css("background-size", "100% 100%");
            }
            $("#rankingList").empty();
            pageIndex = 1;
            myPrompt.hide();
            loadData();
        } else {
            i = false;

            $(this).siblings("input").trigger("click");
            var orderByTyps = $(this).attr("value");
            orderByType = orderByTyps + 1;

            if (11 == orderByType) {
                $("#experience1").css("background", "url(../css/image1/Ascending.png)");
                $("#experience1").css("background-size", "100% 100%");
            }
            if (21 == orderByType) {
                $("#experience2").css("background", "url(../css/image1/Ascending.png)");
                $("#experience2").css("background-size", "100% 100%");
            }
            if (31 == orderByType) {
                $("#experience3").css("background", "url(../css/image1/Ascending.png)");
                $("#experience3").css("background-size", "100% 100%");
            }
            $("#rankingList").empty();
            pageIndex = 1;
            myPrompt.hide();
            loadData();
        }
    });

    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    loadJson.levelText = "上次加载：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    uexWindow.setBounceParams(1, JSON.stringify(loadJson));
});

function refreshData() {
    var time1 = new Date().format("MM-dd HH:mm:ss");
    reloadJson.levelText = "上次刷新：" + time1;
    uexWindow.setBounceParams(0, JSON.stringify(reloadJson));
    $("#rankingList .item").remove();
    pageIndex = 1;
    loadData();
}

function loadData() {
    //排名类型['clazz':'班级排名', 'grade':'年级排名(只有学生才有)', 'school':'学校排名', 'all':'平台排名'](*)'orderByType':orderByType
    var params = {
        'userId' : userInfo.id,
        'clazzId' : userInfo.clazzId,
        'dataType' : '1',
        'type' : sysInfo.ranking.rankingType,
        pageSize : '20',
        pageIndex : pageIndex,
        'orderByType' : orderByType
    };
    common.ajax("/ranking/list", {
        params : JSON.stringify(params)
    }, function(data) {

        if (pageIndex == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (pageIndex == 1 && data.obj.count == 0) {
            myPrompt.show("暂无排名~", "#CommentsList");
        } else {
            myPrompt.hide();
            var list = data.obj.list;
            totalPageSize = data.obj.count;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    var objItem = $("#item").clone();
                    objItem.removeClass("uhide");

                    switch($("#rankingList .item").length) {
                    case 0:
                        objItem.find(".icon").addClass("icon_rank_first");
                        break;
                    case 1:
                        objItem.find(".icon").addClass("icon_rank_second");
                        break;
                    case 2:
                        objItem.find(".icon").addClass("icon_rank_third");
                        break;
                    default:
                        objItem.find(".icon").addClass("icon_rank_none");
                        break;
                    }
                    objItem.attr("id", obj.id);
                    objItem.find(".ranking").html($("#rankingList .item").length + 1);

                    var realname=obj.name;
                    if(obj.clazzId==userInfo.clazzId)
                        objItem.find(".name").html(realname);
                    else if(obj.nickName) {
                        if (obj.nickName == realname) {
                            objItem.find(".name").html(GetName(realname));;
                        }
                        else {
                            objItem.find(".name").html(obj.nickName.substr(0, 8));
                        }
                    }
                    else
                        objItem.find(".name").html(GetName(realname));

                    objItem.find(".class").html(obj.clazzName);

                    objItem.find(".school").html("[" + obj.schoolName + "]");
                    objItem.find(".integral").html(obj.scoreCount);
                    //经验值
                    objItem.find(".wealth").html(obj.goldCount);
                    //财富值
                    objItem.find(".readNum").html(obj.readBookCount);
                    //阅读本数

                    objItem.find(".content").html(obj.content);
                    objItem.find(".user-pdate").html(obj.createDateText);

                    if (obj.id == userInfo.id) {
                        objItem.removeClass("bc-white").addClass("sc-bc-yellow2");
                    }

                    $("#rankingList").append(objItem);
                }

                $("#rankingList .item").on("click", function() {
                    var userId = $(this).attr("id");
                    getCommInfo();
                    commInfo.studentId = userId;
                    setCommInfo();
                    appcan.window.open("message_other", "../message/message_other.html", 5);
                });
            } else {
                pageIndex--;
                toast("没有更多排名了~", config.toastTimeShort);
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

function loadTip() {
    var params = {
        'userId' : userInfo.id,
        'clazzId' : userInfo.clazzId,
        'dataType' : '1',
        'type' : sysInfo.ranking.rankingType
    };
    common.ajax("/ranking/getRankTip", {
        params : JSON.stringify(params)
    }, function(data) {
        allCount = data.obj.allCount;
        rankCount = data.obj.rankCount;
		
		var m_typename="";
		switch(sysInfo.ranking.rankingType)
		{
			case "clazz":
				$(".myItem .typeName").html("班级");
				m_typename="班级";
			break;
			case "grade":
			   $(".myItem .typeName").html("年级");
			   m_typename="年级";
			break;
			case "school":
				$(".myItem .typeName").html("学校");
				m_typename="学校";
			break;
			case "all":
				$(".myItem .typeName").html("平台");
				m_typename="平台";
			break;
		}
		var htm='<div class="ub">总积分位列全'+m_typename+'第&nbsp;&nbsp;</div>';
		htm+='<div class="ub bc-text-head myRanking ulev1">'+ rankCount +'</div>';
		htm+='<div class="ub">&nbsp;&nbsp;名</div>';
		$(".sc-text-hint").html(htm);
		/*
        switch(sysInfo.ranking.rankingType) {
        case "clazz":
            $(".myItem .typeName").html("班级");
            break;
        case "grade":
            $(".myItem .typeName").html("年级");
            break;
        case "school":
            $(".myItem .typeName").html("学校");
            break;
        case "all":
            $(".myItem .typeName").html("平台");
            break;
        }
        $(".myItem .myRanking").html(rankCount);
        var per = (1 - (rankCount / allCount)) * 100;
        $(".myItem .percentage").html(per.toFixed(2) + "%");
        $(".line").addClass("uhide");
		*/
        //$(".myItem").removeClass("uhide");
        // var divLine = $("<div class='ub ub-fh sc-bg' style='height:3em'></div>")
        // $("#rankingList").append(divLine);
        loadData();

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}