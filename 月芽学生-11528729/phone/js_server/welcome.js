

appcan.ready(function() {
	isIPhoneX();
	
    getSysInfo();
    getUserInfo();
    if (userInfo.id.length == 0 || userInfo.loginName.length == 0 || userInfo.password.length == 0) {
        appcan.window.open("login", "login.html", 5);
    } else {
        appcan.window.open("index", "index.html", 5);
    }
});
