
appcan.ready(function() {
	isIPhoneX();
	
    var titHeight = $('#header').offset().height;
	
	var d = new Date();
	var h=d.getHours();
	if(h==19 || h==20 || h==21 || h==22)
	{
		$("#content").html("晚7点至10点为使用高峰期，暂停访问排行，请在其他时间查看，谢谢您的支持。");
	}
	else{
		appcan.frame.open("content", "student_analysis_content.html", 0, titHeight);
	}
	
    
    window.onorientationchange = window.onresize = function() {
        appcan.frame.resize("content", 0, titHeight);
    }
});
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})

appcan.button("#nav-right", "btn-act", function() {
    appcan.window.open("studentCharts", "studentCharts.html", 10);
})