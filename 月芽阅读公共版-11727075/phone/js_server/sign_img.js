appcan.ready(function() {
	var signImgurl = window.localStorage["signImgurl"];
	//$("#signimg").attr("src",signImgurl);
	var img='<img style="width:100%;" id="signimg" src="'+ signImgurl +'">';
	$("#div_img").html(img);
	/*setTimeout(function(){ 
		uexWindow.toast({
		  type:0,
		  location:5,
		  msg:"今日完成签到，财富 +1",
		  duration:3000
		});
		 }, 500);
   */ 
	
	
});