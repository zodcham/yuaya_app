appcan.ready(function() {
    getUserInfo();
    if (userInfo.id.length == 0 || userInfo.loginName.length == 0 || userInfo.password.length == 0) {
        appcan.window.open("login", "login.html", 0);
    } else {
        appcan.window.open("index", "index.html", 0);
    }
}); 