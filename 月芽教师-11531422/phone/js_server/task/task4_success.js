appcan.ready(function() {
    appcan.window.evaluateScript({
        name : "pub_task", //窗口名称
        scriptContent : 'step4_icon();'
    });
    getBookInfo();
    //var task_recommend_content=getLocVal("task_recommend_content");

    var bookname = getLocVal("task_bookname");
    var enddate = getLocVal("task_enddate");
    var readtype = getLocVal("task_readtype");
    var review = getLocVal("task_review");
    var studentcount = getLocVal("task_studentcount");

    $("#task_enddate").html(enddate);
    $("#task_readtype").html(readtype);
    $("#task_review").html(review);
    $("#task_studentcount").html(studentcount);
    $("#task_bookname").html(bookname);
});
