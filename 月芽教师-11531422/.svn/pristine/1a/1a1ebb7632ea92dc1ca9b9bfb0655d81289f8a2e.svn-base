
appcan.ready(function() {
	isIPhoneX();

	$("#nav-right").html("辅助测评");

    var titHeight = $('#header').offset().height;
    LoadPage();
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})

appcan.button("#nav-right", "btn-act", function() {
    // var title = "输入密码";
    // var content = "请输入您的教师账户密码。";
    // var fok = function(err, data, dataType, optId) {
    //     if (Number(data.index) == 0) {
    //
    //         getUserInfo();
    //         config.currentPath = "";
    //         var params = {
    //             'username' : userInfo.loginName,
    //             'password' : data.data
    //         };
    //         common.ajax("/teacher/login", {
    //             params : JSON.stringify(params)
    //         }, function(data) {
    //             appcan.window.open("user_task_help", "user_task_help.html", 10);
    //         }, function(data) {
    //             toast(getMsgByKey(data.msg), config.toastTimeShort);
    //         }, {
    //             type : 'POST'
    //         });
    //
    //
    //     } else {
    //     }
    // }
    // appcan.window.prompt(title, content, '', ['确定','取消'], fok);

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
                appcan.window.open("user_task_help", "user_task_help.html", 10);
            }, function(data) {
                toast(getMsgByKey(data.msg), config.toastTimeShort);
            }, {
                type : 'POST'
            });


        } else {
        }
    }
    var json={title:title,message:content,mode:1,defaultValue:"",buttonLabels:"确定,取消"}
    //uexWindow.prompt(json,fok);
    */
    appcan.frame.evaluateScript({
        name: 'user_task_details',
        popName: 'content',
        scriptContent: 'OpenPassword()'
    });

})

function LoadPage(){
    var titHeight = $('#header').offset().height;
    appcan.frame.open("content", "user_task_details_content.html", 0, titHeight);
}
