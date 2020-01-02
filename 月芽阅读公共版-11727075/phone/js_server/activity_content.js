appcan.ready(function() {
    getUserInfo();
    getCommInfo();
    loadData();
});

function loadData() {
    var params = {
        'userId' : userInfo.id,
        "activityId" : commInfo.activityId
    };
    common.ajax("/system/getActivityContent", {
        params : JSON.stringify(params)
    }, function(data) {
        /**
         *id: 活动id
         title: 活动标题
         image: 活动图片地址
         sort: 排序
         isLink: 是否是链接地址(0:否， 1:是)
         content : 活动详情内容
         updateDate: 发布时间
         */
        $("#pTitle").html(data.obj.title);
        $("#pDate").html(data.obj.updateDate);
        $("#pContent").html(data.obj.content);
    }, function(data) {
        toast(getMsgByKey(data.msg), config.toastTimeShort);
    });
}