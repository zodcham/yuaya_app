appcan.ready(function() {
    getUserInfo();
    getCommInfo();
    loadData();
});
function loadData() {

    var params = {
        'userId' : userInfo.id,
        'friendId' : commInfo.studentId
    };
    common.ajax("/userFriend/isRequestFriend", {
        params : JSON.stringify(params)
    }, function(data) {

        AddLogContent(userInfo.id, logKeys.PersonMyFriendsInfo, {"friendId":commInfo.studentId});

        var obj = data.obj;


        $("#headImg").attr("src", getHeadImageUrl(obj.userInfo.photo));

        $(".name").html(obj.userInfo.name);

        if(obj.userInfo.nickName && obj.userInfo.clazzId!=userInfo.clazzId) {
            $(".name").parent().parent().remove();
        }
        else{
            $(".name").parent().parent().removeClass("uhide");
        }

        var nickname=obj.userInfo.nickName;


        if(obj.userInfo.nickName) {
            if (obj.userInfo.name == nickname) {
                nickname=GetName(nickname);
            }
            else {
                nickname=nickname.substr(0, 8);
            }
        }
        else
            nickname=GetName(nickname);



        $(".nickName").html(nickname);

        $(".school").html(obj.userInfo.schoolName);
        $(".class").html(obj.userInfo.clazzName);
        if (obj.isFriend == "1") {
            $("#btnAdd").addClass("uhide");
        } else {
            if (obj.isSendRequest == "1") {
                $("#btnAdd").addClass("disable");
                $("#btnAdd").html("好友请求已发送");
                if (obj.status == "3") {
                    $("#btnAdd").addClass("disable");
                    $("#btnAdd").html("已经是好友");
                    // $("#btnAdd").removeClass("disable");
                }
            }
        }

    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}

appcan.button("#btnAdd", "btn-act", function() {
    if (!$("#btnAdd").hasClass("disable")) {
        var params = {
            'userId' : userInfo.id,
            'friendId' : commInfo.studentId,
            'message' : ''
        };
        common.ajax("/userFriend/applyAddFriend", {
            params : JSON.stringify(params)
        }, function(data) {
            $("#btnAdd").addClass("disable");
            $("#btnAdd").html("好友请求已发送");
        }, function(data) {
            toast(getMsgByKey(data.msg), config.toastTimeShort);
        }, {
            type : 'POST'
        });
    }
})
