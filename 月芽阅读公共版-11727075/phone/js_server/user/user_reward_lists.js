

appcan.ready(function() {
	isIPhoneX();
    getUserInfo();
    AddLogContent(userInfo.id, logKeys.HomeMall,{});
    init();

    window.onorientationchange = window.onresize = function() {
        //appcan.frame.resize("content", 0, titHeight);
        init()
    }
});
var tabview = appcan.tab({
    selector : "#tabview",
    hasIcon : false,
    hasAnim : true,
    hasLabel : true,
    hasBadge : false,
    data : [{
        label : '奖励记录',
    }, {
        label : "礼品兑换",
    }, {
        label : '兑换历史',
    }]
});
tabview.on("click", function(obj, index) {
    appcan.window.selectMultiPopover("content", index);
})
appcan.button("#nav-left", "btn-act", function() {
    appcan.window.close(-1);
})
appcan.button("#nav-right", "btn-act", function() {

    var json={"title":"财富商城","content":"通过测评或者参与活动，可获取财富值。财富值可以在商城兑换各种物品。"};
    appcan.alert(json);
})

function init(){
    var titHeight = $('#header').offset().height + $('#tabview').offset().height;

      appcan.frame.open({

           id : "content",

           url : [ {

               "inPageName" :"奖励记录",
               "inUrl" :"user_reward_list_content.html",

           },{

               "inPageName" :"礼品兑换",
               "inUrl" :"../exchange/mall_content.html",

           }, {

               "inPageName" :"兑换历史",
               "inUrl" :'../exchange/exchange_history_content.html',

           },],

           top : titHeight,

           left : 0,

           index : 0,

           change : function(err, res) {
               switch (res.multiPopSelectedIndex) {
                   case 2:
                       AddLogContent(userInfo.id, logKeys.MallBuyHistory,{});
                       break;
               }
              tabview.moveTo(res.multiPopSelectedIndex);
           }
      });
    
}
