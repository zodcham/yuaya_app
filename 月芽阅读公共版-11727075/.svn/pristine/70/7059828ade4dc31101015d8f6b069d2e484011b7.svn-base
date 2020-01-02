var titleHeight = 0;
var studentList = [];
var g_classId;
var letter = "";
appcan.ready(function() {
    getUserInfo();
    loadFriend();
});

function loadFriend() {
    var params = {
        'userId' : userInfo.id
    };
    common.ajax("/userFriend/friendList", {
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

function createView() {
    $.each(studentList, function(key, list) {
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                /*
                 * friendId : 好友用户ID
                 friendName : 好友用户名称
                 friendPhoto : 好友用户头像
                 */
                var objItem = $("#item").clone();
                objItem.removeClass("uhide");
                objItem.attr("id", obj.id);
                objItem.attr("key", key);
                if (obj.photo && obj.photo.length > 0) {
                    objItem.find("img").attr("src", _SERVER_ADDRESS + obj.photo);
                }
                objItem.find(".name").html(obj.name);
                objItem.find(".btnDel").on("click", function() {
                    var id = $(this).parents(".item").attr("id");
                    appcan.alert("确认操作", "确认删除该好友？", ["确定", "取消"], function del(e, idx) {
                        if (idx == 1) {
                            return;
                        }
                        delFriend(id);
                    });
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

function delFriend(friendId) {
    var params = {
        'userId' : userInfo.id,
        "friendId" : friendId
    };
    common.ajax("/userFriend/delete", {
        params : JSON.stringify(params)
    }, function(data) {
        $("#" + friendId).remove();
        toast("删除成功~", config.toastTimeShort);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        "type" : "POST"
    });
}