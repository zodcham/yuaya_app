/*
 * var time1 = new Date().format("yyyy-MM-dd HH:mm:ss");     
 * var time2 = new Date().format("yyyy-MM-dd");    
 */
Date.prototype.format = function(fmt)   
{
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};

var getformatDate = function(dateStr,fmt) {
    if (fmt) {
        return new Date(dateStr.replace(/-/g,"/")).format(fmt);
    }else {
         return new Date(dateStr.replace(/-/g,"/"));
    }
}   

/*
 * var var=String.format("{0}-{2}","1","2")
 */
String.format = function() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

var getLetterByNum=function(n) {
    return String.fromCharCode(65 + parseInt(n));
}

//计算天数差的函数，通用  
var DateDiff = function(sDate1,sDate2){  
       var aDate,oDate1,oDate2,iDays;
           aDate = sDate1.split("/");
       oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
       if(sDate2){
            aDate = sDate2.split("/");  
            oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); 
       }else{
           oDate2=new Date();
       }
       iDays = parseInt(Math.abs(oDate1 - oDate2)/1000/60/60/24);
       return iDays;  
}

//生成随机颜色
var getRandomColor = function(){
   //return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
   return '#'+(Math.random()*0xffffff<<0).toString(16);  
}

//秒 转 时：分：秒
function formatSeconds(s) {
    var t = "";
    if (s > -1) {
        hour = Math.floor(s / 3600);
        min = Math.floor(s / 60) % 60;
        sec = s % 60;
        // day = parseInt(hour / 24);
        // if (day > 0) {
            // hour = hour - 24 * day;
            // t += day + ":" + hour + ":";
        // } else {
            // t += hour + ":";
        // }
        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        if (sec < 10) {
            t += "0";
        }
        t += sec;
    }
    return t;
}