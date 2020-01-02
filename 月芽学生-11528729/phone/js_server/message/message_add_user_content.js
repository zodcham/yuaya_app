var titleHeight = 0;
var studentList = [];
var g_classId;
var letter = "";
appcan.ready(function() {
    getUserInfo();
    loadStudent();
    createBar();
    uexIndexBar.onTouchResult = function(opId, dataType, data) {
        var obj = $(".item[key='" + data + "']").eq(0);
        $("html,body").animate({
            scrollTop : obj[0].offsetTop
        }, 100);
    }
});
function createBar() {
    var li = ['-'];
    for (var i = 0; i < 26; i++) {
        li.push(getLetterByNum(i));
    }
    var extras = {
        indices : li,
        textColor : "#5485fe"
    }
    getSysInfo();
    uexIndexBar.open(($("#main").width() - 40), sysInfo.titleHeight, 40, $("#main").height() - 20 - sysInfo.titleHeight, JSON.stringify(extras));

}

function loadStudent() {
    var params = {
        'clazzId' : userInfo.clazzId
    };
    common.ajax("/clazz/getStudentList", {
        params : JSON.stringify(params)
    }, function(data) {
        var list = data.obj;
        if (list && list.length > 0) {
            studentList = getDefaultList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == userInfo.id) {
                    continue;
                }
                var py = pinyin.getCamelChars(list[i].name);
                if (py.length > 1) {
                    py = py.substr(0, 1);
                } else {
                    py = "-";
                }
                list[i].index = py;
                studentList[py].push(list[i]);
            }
            createView();
        } else {
            myPrompt.show();
        }
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        loadingMsg : '正在加载学生，请稍后...'
    });
}

function closeBar() {
    uexIndexBar.close();
}

function createView() {
    $.each(studentList, function(key, list) {
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", "item_" + obj.id);
                objItem.attr("key", key);
                objItem.find("input").attr("id", obj.id);
                objItem.find("input").attr("name", obj.name);
                if (obj.photo && obj.photo.length > 0) {
                    objItem.find("img").attr("src", _SERVER_ADDRESS + obj.photo);
                }
                objItem.find(".name").html(obj.name);
                objItem.on("click", function() {
                    $(this).find("input").attr("checked", (!$(this).find("input").attr("checked")));
                    //ischeckAll();
                });
                if (letter != key) {
                    letter = key;
                    var objItem2 = $("#item2").clone();
                    objItem2.attr("id", "letter_" + key);
                    objItem2.removeClass("uhide");
                    objItem2.find(".letter").html(letter);
                    $("#main").append(objItem2);
                }
                $("#main").append(objItem);
            }
        } else {
            $("#main").append("<div class='item' key='" + key + "'></div>");
        }
    });
    $("#item").remove();
}

function getDefaultList() {
    var list = {
        '-' : []
    };
    for (var i = 0; i < 26; i++) {
        list[getLetterByNum(i)] = [];
    }
    return list;
}

function checkAll(flag) {
    $("#main .item input").attr("checked", flag);
}

// function ischeckAll(){
// var flag=($("#main .item input:checkbox").length>0&&($("#main .item input:checkbox").not("input:checked").length==0));
// uexWindow.evaluateScript("", 0, "changeCheckBox("+flag+");");
// }

function getCheckedValue() {
    var checkList = $("#main .item input:checkbox:checked");
    var returnList = [];
    $.map(checkList, function(obj) {

        returnList.push({
            "id" : $(obj).attr("id"),
            "name" : $(obj).attr("name")
        });
    });
    // getUserInfo();
    // userInfo.chooseStudent=returnList;
    // setUserInfo();
    uexWindow.evaluatePopoverScript("", "content", "addUser('" + JSON.stringify(returnList) + "');");
    uexWindow.evaluateScript("", 0, "closeAddUserView();");
}
