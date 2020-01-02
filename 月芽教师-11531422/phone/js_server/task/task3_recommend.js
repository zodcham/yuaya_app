var nowDate;

appcan.ready(function() {
    appcan.window.evaluateScript({
        name : "pub_task", //窗口名称
        scriptContent : 'step3_icon();'
    });
    
    SetFavorite();
    
    getUserInfo();
    getCommInfo();
    commInfo.selectStudentType = "0";
    setCommInfo();
    appcan.window.subscribe(STUDENT_SELECT, getStudentList);

    $(".radioItem").on("click", function() {
        $(this).find("input").attr("checked", true);
        if ($("#divReadType").hasClass("uhide")) {
            $("#introduce .item").html($("input[name='introduce']:checked").attr("text"));
            $("#introduce .item").attr("value", $("input[name='introduce']:checked").attr("value"));
        } else {
            $("#readType .item").html($("input[name='readType']:checked").attr("text"));
            $("#readType .item").attr("value", $("input[name='readType']:checked").attr("value"));
        }
        var flag = $("#radioBox").height();
        $("#radioBox").animate({
            bottom : -flag + 'px'
        }, 300);
        setTimeout(function() {
            $("#divRadio").css("background", "rgba(0,0,0,0)");
            $("#divRadio").addClass("uhide");
        }, 400);
    });
    $(".btnCloseRadio").on("click", function() {
        var flag = $("#radioBox").height();
        $("#radioBox").animate({
            bottom : -flag + 'px'
        }, 300);
        setTimeout(function() {
            $("#divRadio").css("background", "rgba(0,0,0,0)");
            $("#divRadio").addClass("uhide");
        }, 400);
    });
    $("#readType").on("click", function() {
        $("#divReadType").removeClass("uhide");
        $("#divIntroduce").addClass("uhide");
        $("#divRadio").removeClass("uhide");
        $("#radioBox").css("bottom", "-" + $("#radioBox").height() + "px");
        $("#radioBox").animate({
            bottom : '0px'
        }, 300);
        setTimeout(function() {
            $("#divRadio").css("background", "rgba(0,0,0,0.3)");
        }, 400);
    });
    $("#introduce").on("click", function() {
        $("#divReadType").addClass("uhide");
        $("#divIntroduce").removeClass("uhide");
        $("#divRadio").removeClass("uhide");
        $("#radioBox").css("bottom", "-" + $("#radioBox").height() + "px");
        $("#radioBox").animate({
            bottom : '0px'
        }, 300);
        setTimeout(function() {
            $("#divRadio").css("background", "rgba(0,0,0,0.3)");
        }, 400);
    });
    $("#student").on("click", function() {
        uexWindow.evaluateScript("", 0, "openStudent();");
        appcan.window.evaluateScript({
            name : "pub_task", //窗口名称
            scriptContent : 'openStudent();'
        });
    });
    nowDate = new Date();
	var sDate=addMoth(nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(), 1);
    //$("#date .item").html(nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate());
	$("#date .item").html(sDate);
	//alert(sDate.getFullYear() + "-" + sDate.getMonth() + "-" + sDate.getDate());
	//$("#date .item").html(sDate.getFullYear() + "-" + sDate.getMonth() + "-" + sDate.getDate());
    // uexControl.cbOpenDatePickerWithConfig=function(data){
    // data=JSON.parse(data);
    // $("#date .item").html(data.year+"-"+data.month+"-"+data.day);
    // }
    $("#divCalender").bind("click", function() {
        $("#divCalender").addClass("uhide");
    });
    $("#calendar").bind("click", function() {
        event.stopPropagation();
    });
    $("#date").on("click", function() {
        var nDate = getformatDate($("#date .item").html());
        initCalendar(nDate, function(dateStr) {
            var date = getDateByStr(dateStr);
            $("#date .item").html(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            $("#divCalender").addClass("uhide");
        });

        $("#divCalender").removeClass("uhide");
        // var params = {
        // datePickerId:1,
        // initDate:{
        // year:nowDate.getFullYear(),
        // month:nowDate.getMonth()+1,
        // day:nowDate.getDate()
        // },
        // minDate:{
        // limitType:0,
        // data:{
        // year:nowDate.getFullYear(),
        // month:nowDate.getMonth(),
        // day:nowDate.getDate()+1
        // }
        // },
        // maxDate:{
        // limitType:0,
        // data:{
        // year:nowDate.getFullYear()+1,
        // month:nowDate.getMonth()+1,
        // day:nowDate.getDate()
        // }
        // }
        // }
        // var data = JSON.stringify(params);
        // uexControl.openDatePickerWithConfig(data);
    });

});


function SetFavorite(){
    getBookInfo();
    getUserInfo();
    if (bookInfo.isFavorite != "1") {
        var params = {
            'userId' : userInfo.id,
            'bookId' : bookInfo.id
        };
        common.ajax("/favorite/add", {
            params : JSON.stringify(params)
        }, function(data) {
            bookInfo.isFavorite = "1";
            setBookInfo();
        }, function(data) {
            toast(getMsgByKey(data.msg), config.toastTimeShort);
        }, {
            type : 'POST'
        });
    }
}



function getStudentList() {
    getBookInfo();
    $("#student .item").html("已选择" + bookInfo.studentChecked.length + "名学生");
}

//  uexWindow.alert("提示信息",' '+'推荐图书名称：'+bookInfo.name+';  阅读截止日期：'+$("#date .item").html()+';阅读类型：'+$("#readType .item").html()+';读后感要求：'+$("#introduce .item").html()+';已选择学生：'+dd,"确定");

appcan.button("#btnSubmit", "btn-act", function() {
    getBookInfo();
    var stuStr = "";
    var dd = "";
    $.each(bookInfo.studentChecked, function(id, stuObj) {
        if (stuStr.length > 0) {
            stuStr += "|";
        }
        stuStr += stuObj.id;
        dd += stuObj.name + ",";
    });
    if(dd==""){
        toast(conMsg.NOT_CHOOSE_STUDNET, config.toastTimeShort);
        return false;
    }
    
    var recommend_content='推荐图书名称：' + bookInfo.name + ';\n阅读截止日期：' + $("#date .item").html() + ';\n阅读类型：' + $("#readType .item").html() + ';\n读后感要求：' + $("#introduce .item").html() + ';\n已选择学生：' + dd;
    
    var enddate=$("#date .item").html();
    var readtype=$("#readType .item").html();
    var review=$("#introduce .item").html();
    
    setLocVal("task_bookname",bookInfo.name);
    setLocVal("task_enddate",enddate);
    setLocVal("task_readtype",readtype);
    setLocVal("task_review",review);
    setLocVal("task_studentcount",dd);
    
    appcan.window.alert({
        title : "提示信息",
        content : recommend_content,
        buttons : ['确定', '取消'],
        callback : function(err, data, dataType, optId) {

            if ("1" == data) {

            } else if ("0" == data) {
                Submit();
            }
        }
    });
});
function Submit() {
    getBookInfo();
    var stuStr = "";
    $.each(bookInfo.studentChecked, function(id, stuObj) {
        if (stuStr.length > 0) {
            stuStr += "|";
        }
        stuStr += stuObj.id;
    });
    if(stuStr==""){
        toast(conMsg.NOT_CHOOSE_STUDNET, config.toastTimeShort);
        return false;
    }

    var params = {
        'userId' : userInfo.id,
        'bookId' : bookInfo.id,
        'studentIds' : stuStr,
        'type' : $("#readType .item").attr("value"),
        'isMustReview' : $("#introduce .item").attr("value"),
        'endDate' : $("#date .item").html()
    };
    alert(JSON.stringify(params));
    appcan.logs(params);
    return;
    common.ajax("/recommend/add", {
        params : JSON.stringify(params)
    }, function(data) {
        // appcan.window.evaluateScript({
            // name : "pub_task", //窗口名称
            // scriptContent : 'step4();'
        // });
        $("#btnSubmit").addClass("uhide");
        $("#task_success").removeClass("uhide");
        $(".radioItem").unbind();
        $(".click").unbind();
        //ShowAlert("任务发布成功！");
        appcan.window.evaluateScript({
            name : "pub_task", //窗口名称
            scriptContent : 'step4_icon();'
        });
        // toast("任务发布成功~", config.toastTimeShort); setTimeout(function() {
            // uexWindow.evaluateScript("", 0, "exit();");
        // }, config.toastTimeShort);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    }, {
        'type' : 'POST',
        loadingMsg : '正在提交，请稍后...'
    });
}


function ShowAlert(content){
    var htm='<div class="alert_content">';
    //htm+='<div class="ub ub-f1 ub-pc">'+ title +'</div>';
    htm+='<div class="ub ub-f1 ub-pc" style="color:#666;">'+ content +'</div>';
    htm+='</div>';
    layer.open({
        content: htm
        ,skin: 'showbadge'
      });
}


function addMoth(d,m){
   var ds=d.split('-'),_d=ds[2]-0;
   var nextM=new Date( ds[0],ds[1]-1+m+1, 0 );
   var max=nextM.getDate();
   d=new Date( ds[0],ds[1]-1+m,_d>max? max:_d );
   dnew=d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
   return dnew;
   //return dnew.toLocaleDateString().match(/\d+/g).join('-')
}