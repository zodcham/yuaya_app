appcan.ready(function() {
    getCommInfo();
    loadData();
});
function loadData() {
    for (var i = 0; i < commInfo.taskData.students.length; i++) {
        var obj = commInfo.taskData.students[i];
        var objItem = $("#item").clone();
        if (i == 0) {
            objItem.addClass("uhide");
        }
        alert(obj.studentId);
        objItem.attr("id", obj.studentId);
        objItem.attr("name", obj.studentName);
        objItem.attr("bookReviewCount", obj.bookReviewCount);
        objItem.attr("reviewLevel", obj.reviewLevel);
        objItem.attr("status", obj.finishState);
        objItem.removeClass("uhide");
        objItem.find(".name").html(obj.studentName);
        var status = obj.finishState;
        if (status == "0") {
            if (obj.bookReviewCount == 0) {
                status = "未测评";
                objItem.find(".fa").addClass("uhide");
            } else {
                status = "进行中";
            }
        } else if ( status = "1") {
            status = obj.reviewLevelName;
        } else {
            status = "未完成";
            objItem.find(".fa").addClass("uhide");
        }
        objItem.find(".status").html(status);

        $("#main").append(objItem);
    }
    $("#main .item").on("click", function() {
        //alert("123");
        //console.log(JSON.stringify(commInfo.taskData.students));
        if (parseInt($(this).attr("bookReviewCount")) > 0) {
            var userId = $(this).attr("id");
            var userName = $(this).attr("name");
            commInfo.taskData = {
                "userId" : userId,
                "userName" : userName,
                "reviewLevel" : $(this).attr("reviewLevel")
            };
            setCommInfo();
            appcan.window.open("user_task_review", "user_task_review.html", 10);
        }
    });
    /*
     *   studentId:学生ID
     exerciseScore:测评得分
     exerciseAccuracy:测评正确率
     reviewLevel:读后感评级（字典）
     reviewLevelName
     finishState:完成状态（0=进行中、1=完成、2=未完成）
     studentName:学生名称
     bookReviewCount:读后感的数量
     */
}

function updateData(reviewLevel) {
    getCommInfo();
    var userId = commInfo.taskData.userId;
    var reviewLevelName;
    switch(reviewLevel) {
    case 0:
        reviewLevelName = "差";
        break;
    case 1:
        reviewLevelName = "良";
        break;
    case 2:
        reviewLevelName = "优";
        break;
    }
    $("#" + userId).find(".status").html(reviewLevelName);

    for (var i = 0; i < commInfo.taskData.students.length; i++) {
        if (obj.studentId == userId) {
            commInfo.taskData.students[i].finishState = 1;
            commInfo.taskData.students[i].reviewLevel = reviewLevel;
            commInfo.taskData.students[i].reviewLevelName = reviewLevelName;
            setCommInfo();
            break;
        }
    }
}