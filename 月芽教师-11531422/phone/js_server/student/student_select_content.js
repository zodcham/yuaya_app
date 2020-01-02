var letter = "";
var checkStudent = [];
var friendList = [];
appcan.ready(function() {
    getBookInfo();
    getUserInfo();
    getCommInfo();
    if (commInfo.selectStudentType == "0") {
    } else {
        $("#list_class").append("<option value='friend'>我的好友</option>");
    }
    checkStudent = bookInfo.studentChecked;
    loadClass();
    $("#list_class").on("change", function() {
        loadStudent();
    });
});

function touchIndexBar(itemId) {
    var obj = $(".item[key='" + itemId + "']").eq(0);
    $("html,body").animate({
        scrollTop : obj[0].offsetTop
    }, 100);
}

appcan.button(".checkall", "btn-act", function() {
    var flag = $(this).find(".fa").hasClass("icon-checkbox");
    changeCheckBox(flag);
    var classId = $("#list_class").val();
    $("#" + classId).find(".item input").attr("checked", flag);
});

function ischeckAll() {
    var classId = $("#list_class").val();
    var flag = $("#" + classId).find(".item input:checkbox").length > 0;
    flag = (flag && $("#" + classId).find(".item input:checkbox").not("input:checked").length == 0);
    changeCheckBox(flag);
}

function changeCheckBox(flag) {
    if (flag) {
        $(".checkall .fa").removeClass("icon-checkbox").addClass("icon-checkboxchecked");
        $(".checkall .text").html("全不选");
    } else {
        $(".checkall .fa").removeClass("icon-checkboxchecked").addClass("icon-checkbox");
        $(".checkall .text").html("全选");
    }
}

function createView(studentList) {
    var classId = $("#list_class").val();
    $.each(studentList, function(key, list) {
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", "item_" + obj.id);
                objItem.attr("key", key);
                objItem.find("input").attr("id", obj.id).attr("name", obj.name);
                if ($.inArray(obj.id, checkStudent) >= 0) {
                    objItem.find("input").attr("checked", true);
                }
                if (obj.photo && obj.photo.length > 0) {
                    objItem.find("img").attr("src", _SERVER_ADDRESS + obj.photo);
                }
                objItem.find(".name").html(obj.name);
                objItem.on("click", function() {
                    $(this).find("input").attr("checked", (!$(this).find("input").attr("checked")));
                    ischeckAll();
                });

                if (letter != key) {
                    letter = key;
                    var objItem2 = $("#item2").clone();
                    objItem2.attr("id", "letter_" + key);
                    objItem2.removeClass("uhide");
                    objItem2.find(".letter").html(letter);
                    $("#" + classId).append(objItem2);
                }

                $("#" + classId).append(objItem);
            }
        } else {
            $("#" + classId).append("<div class='item' key='" + key + "'></div>");
        }
    });
    ischeckAll();
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

function getCheckedValue() {
    var checkList = $("#divList .item input:checkbox:checked");
    var returnList = [];
    $.map(checkList, function(obj) {
        var stuObj = {};
        stuObj.id = $(obj).attr("id");
        stuObj.name = $(obj).attr("name");
        returnList.push(stuObj);
    });
    bookInfo.studentChecked = returnList;
    setBookInfo();
    appcan.window.publish(STUDENT_SELECT, "0");
    uexWindow.evaluateScript("", 0, "doSubmit();");
}

//加载班级
function loadClass() {
    var params = {
        'userId' : userInfo.id
    };
    common.ajax("/teacher/myClazz", {
        params : JSON.stringify(params)
    }, function(data) {
        for (var i = 0; i < data.obj.length; i++) {
            var obj = data.obj[i];
            if (i == 0) {
                clazzId = obj.id;
            }
            $("#list_class").append("<option value='" + obj.id + "'>" + obj.name + "</option>");
        }
        loadStudent();
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

//加载学生
function loadStudent() {
    var classId = $("#list_class").val();
    $("#divList .list").addClass("uhide");
    if ($("#" + classId).length == 0) {
        $("#divList").append($("<div id='" + classId + "' class='ub ub-f1 ub-ver list'></div>"));
        if (classId == "friend") {
            loadFriend();
            return;
        }
        var params = {
            'clazzId' : classId
        };
        common.ajax("/clazz/getStudentList", {
            params : JSON.stringify(params)
        }, function(data) {
            var list = data.obj;

            if (list && list.length > 0) {
                myPrompt.hide();
                var studentList = getDefaultList();
                for (var i = 0; i < list.length; i++) {
                    var py = pinyin.getCamelChars(list[i].name.trim());
                    if (py.length > 1) {
                        py = py.substr(0, 1).toUpperCase();

                    } else {
                        py = "-";
                    }
                    list[i].index = py;
                    studentList[py].push(list[i]);
                }

                createView(studentList);
            } else {
                myPrompt.show("", "#" + classId);
            }
        }, function(data) {
            toast(getMsgByKey(data.msg), config.toastTimeShort);
        }, {
            loadingMsg : '正在加载学生，请稍后...'
        });
    } else {
        $("#" + classId).removeClass("uhide");
    }
}

//加载我的好友
function loadFriend() {
    if (friendList.length > 0) {
        createView(friendList);
    } else {
        var params = {
            'userId' : userInfo.id
        };
        common.ajax("/userFriend/friendList", {
            params : JSON.stringify(params)
        }, function(data) {
            var list = data.obj;
            if (list && list.length > 0) {
                friendList = getDefaultList();
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == userInfo.id) {
                        continue;
                    }
                    var py = pinyin.getCamelChars(list[i].name.trim());
                    if (py.length > 1) {
                        py = py.substr(0, 1);
                    } else {
                        py = "-";
                    }
                    list[i].index = py;
                    friendList[py].push(list[i]);
                }
                createView(friendList);
            } else {
                myPrompt.show("", "#friend");
            }
        }, function(data) {
            toast(getMsgByKey(data.msg), config.toastTimeShort);
        });
    }
}