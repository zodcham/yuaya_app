var listItemWidth = 0;
var dicList = {
    "orderBy" : [],
    "grade" : [],
    "book_category" : [],
    "language" : [],
    "scoreSeg" : []
};
var operateDivId = "";
appcan.ready(function() {
    getCommInfo();
    if (commInfo.mallSearch.key) {
        $("#txtSearch").val(commInfo.mallSearch.key.value);
    }
    listItemWidth = $("#main").width();
    loadSort();
    $(".item").on("click", function() {
        operateDivId = $(this).attr("id");
        $("#listItem .listBox").addClass("uhide").css("width", "0px");
        $("#listItem ." + operateDivId).removeClass("uhide");
        $("#listItem").removeClass("uhide")
        $("#listItem ." + operateDivId).animate({
            'width' : (listItemWidth * 0.7) + 'px'
        }, 200);
    });
});
function loadDic() {
    $.each(dicList, function(n, obj) {
        if (!obj || obj.length == 0) {
            loadData(n);
            return false;
        }
    });
}

function loadSort() {
    var list = [];
    list.push({
        'id' : name + '_all',
        'value' : '',
        'label' : '默认'
    });
    list.push({
        'id' : name + '_evaluate_score',
        'value' : 'evaluate_score',
        'label' : '评分'
    });
    list.push({
        'id' : name + '_fav_times',
        'value' : 'fav_times',
        'label' : '收藏'
    });
    list.push({
        'id' : name + '_recommend_times',
        'value' : 'recommend_times',
        'label' : '推荐'
    });
    list.push({
        'id' : name + '_score',
        'value' : 'score',
        'label' : '积分'
    });
    createItem(list, "orderBy");
}

function loadData(name) {
    var params = {
        "type" : name
    };
    common.ajax("/dict/getDictList", {
        params : JSON.stringify(params)
    }, function(data) {
        //id remarks value label description sort parentId
        data.obj.splice(0, 0, {
            'id' : name + '_all',
            'value' : '',
            'label' : '全部'
        });
        createItem(data.obj, name);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

function createItem(list, name) {
    var checkedValue = commInfo.mallSearch[name];
    for (var i = 0; i < list.length; i++) {
        var obj = list[i];
        var objItem = $("#boxItem").clone();
        objItem.find("input").attr("name", name);
        if (i == 0) {
            objItem.addClass("ubt");
            objItem.find("input").attr("checked", true);
            $("#" + name).find(".value").html(obj.label);
            $("#" + name).attr("value", obj.value);
        }
        if (checkedValue && obj.value == checkedValue.value) {
            objItem.find("input").attr("checked", true);
            $("#" + name).find(".value").html(obj.label);
            $("#" + name).attr("value", obj.value);
        }
        objItem.removeClass("uhide");
        objItem.attr("id", obj.id);
        objItem.attr("value", obj.value);
        objItem.find(".text").html(obj.label);
        objItem.on("tap", function() {
            $(this).find("input").attr("checked", true);
            var forId = $(this).parents(".listBox").attr("for");
            $("#" + forId).find(".value").html($(this).find(".text").html());
            $("#" + forId).attr("value", $(this).attr("value"));

            $(this).parents(".listBox").animate({
                'width' : '0px'
            }, 200);
            setTimeout(function() {
                $("#listItem").addClass("uhide");
            }, 200);

        });
        $("#listItem").find("." + name).append(objItem);
    }
    dicList[name] = list;
    loadDic();
}

function exit() {
    if ($("#listItem").hasClass("uhide")) {
        uexWindow.evaluateScript("", 0, "close()");
    } else {
        $("#listItem ." + operateDivId).animate({
            'width' : '0px'
        }, 200);
        setTimeout(function() {
            $("#listItem").addClass("uhide");
        }, 200);
    }
}

appcan.button("#closeItem", "btn-act", function() {
    exit();
})

appcan.button("#btnSearch", "btn-act", function() {
    var txtSearch = $("#txtSearch").val();
    var searchObj = {};
    searchObj.key = {
        "value" : txtSearch,
        "text" : txtSearch
    };
    $.each(dicList, function(n, obj) {

        searchObj[n] = {
            "value" : $("#" + n).attr("value"),
            "text" : $("#" + n).find(".value").html()
        };
    });
    commInfo.mallSearch = searchObj;
    setCommInfo();
    uexWindow.evaluateMultiPopoverScript("index", "content", "mall", "search()");
    uexWindow.evaluateScript("", 0, "close()");
})

appcan.button("#btnDefault", "btn-act", function() {
    $("#txtSearch").val("");
    $.each(dicList, function(n, obj) {
        $("#" + n).find(".value").html(obj[0].label);
        $("#" + n).attr("value", obj[0].value);
    });
}); 