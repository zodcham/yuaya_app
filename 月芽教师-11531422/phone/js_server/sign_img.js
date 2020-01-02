appcan.ready(function() {
    var signImgurl = window.localStorage["signImgurl"];
    var img='<img style="width:100%;" id="signimg" src="'+ signImgurl +'">';
    $("#div_img").html(img);
});