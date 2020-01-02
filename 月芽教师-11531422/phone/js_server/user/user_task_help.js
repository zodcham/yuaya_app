
appcan.ready(function() {
	isIPhoneX();

    var titHeight = $('#header').offset().height;
    LoadPage();

    appcan.window.monitorKey(0,1,function(){
        return false;
    })

    uexWindow.onKeyPressed = function(keyCode) {
        if (keyCode == 0) {
            return false;
        }
    }


    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {


    /*
    var title = "输入密码";
    var content = "请输入您的教师账户密码。";
    var fok = function(index,data) {
        if (index == 0) {

            getUserInfo();
            config.currentPath = "";
            var params = {
                'username' : userInfo.loginName,
                'password' : data
            };
            common.ajax("/teacher/login", {
                params : JSON.stringify(params)
            }, function(data) {
                appcan.window.close(-1);
            }, function(data) {
                toast(getMsgByKey(data.msg), config.toastTimeShort);
            }, {
                type : 'POST'
            });


        } else {
        }
    }
    var json={"title":title,"message":content,"mode":1,"defaultValue":"","buttonLabels":"确定,取消"}
    uexWindow.prompt(json,fok);
    //appcan.window.prompt(title, content, '', ['确定','取消'], fok);
    */
    appcan.frame.evaluateScript({
        name: 'user_task_help',
        popName: 'content',
        scriptContent: 'OpenPassword()'
    });
})

appcan.button("#nav-right", "btn-act", function() {

})

function LoadPage(){
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "user_task_help_content.html", 0, titHeight);
}
