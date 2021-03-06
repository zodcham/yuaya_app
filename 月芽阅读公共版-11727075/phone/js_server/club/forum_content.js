﻿var pageIndex=1;
        var reloadDate="";
        var reloadJson={"textColor":"#000","imagePath":"res://refesh_icon.png","levelText":"更新日期1","pullToReloadText":"拖动刷新","releaseToReloadText":"释放刷新","loadingText":"刷新中，请稍等"};
        var loadJson={"textColor":"#000","imagePath":"res://refesh_icon.png","levelText":"更新日期2","pullToReloadText":"拖动加载","releaseToReloadText":"释放加载","loadingText":"加载中，请稍等"};
        var g_page=1;
        var g_pagecount=1;
        var g_pagesize=20;
        
        $("#forumicon").attr("src","");
        
        appcan.ready(function() {

            var id = getLocVal("forum_id");
            AddLogContent(userInfo.id, logKeys.ClubEnter, {"forumId":id});

            loadForum();
            
            
            uexWindow.setBounce(1);
            uexWindow.notifyBounceEvent(0,1);
            uexWindow.notifyBounceEvent(1,1);
            uexWindow.showBounceView("0","rgba(0, 0, 0, 0)", 1);
            uexWindow.showBounceView("1","rgba(0, 0, 0, 0)", 1);
            uexWindow.onBounceStateChange = function(type, state){
                var time1 = new Date().format("MM-dd HH:mm:ss");
                switch(type) {
                    case 0:
                        if (state == 2) {
                             refreshData();
                        }
                        break;
                    case 1:
                        if (state == 2) {
                            loadJson.levelText="上次加载："+time1;
                            uexWindow.setBounceParams(1,JSON.stringify(loadJson));
                           GetList();
                         }
                     break;
                }
            
            }
            var time1 = new Date().format("MM-dd HH:mm:ss");   
            reloadJson.levelText="上次刷新："+time1;
            loadJson.levelText="上次加载："+time1;
            uexWindow.setBounceParams(0,JSON.stringify(reloadJson));
            uexWindow.setBounceParams(1,JSON.stringify(loadJson));
            
            
        });
        
      
       function loadForum(){
           var id = getLocVal("forum_id");
           var cid = getLocVal("class_id");
           var url=_SERVER_ADDRESS+"/group/threads";
           var par={"cid": cid, "gid":id, "page":1};

           var ferr=function(err){};
           var fok=function(data){
               
               if (g_page == 1) {
                    uexWindow.resetBounceView("0");
                }else {
                    uexWindow.resetBounceView("1");
                }
                myPrompt.hide();
               $('#newlist').html('');
               data=JSON.parse(data);
               var posts = Number(data.postsCount);
               if((posts % g_pagesize)==0)
                    g_pagecount = posts/g_pagesize;
               else
                    g_pagecount = parseInt(posts/g_pagesize)+1;

                if(posts>g_pagesize)
                    g_page++;
               
               //alert(data.icon);
               var icon_url=_SERVER_ADDRESS + "/" +data.icon; 
               $('#forumicon').attr("src", icon_url);
               $('#forumtitle').html(data.title);
               $('#forumthreads').html(data.threadsCount);
               $('#forummember').html(data.memberCount);
               $('#forumposts').html(data.postsCount);
               var list=data.newlist;
               var htm='';
               $.each(list,function(index,value) {
                   
                   htm=$("#list_div").html();
                   htm=htm.replace("width:5em; text-align: left; margin-left:1em;\" class=\"ub ub-ver\"", " text-align: left; margin-left:1em;\" class=\"ub ub-ver ub-f1\"");
                   htm=htm.replace( "|username|", value["username"]);
                   
                   
                   
                   htm=htm.replace( "|replies|", value["postsCount"]);
                   
                   var t_title="";
                   if(value["title"]){
                       t_title=value["title"];
                   }
                   htm=htm.replace( "|title|", t_title);
                   
                   var lzcontent1=value["message"].replace(/\n/g,"<br />").substring(0,100);
                   if(value["message"].length>100) lzcontent1+="...";
                   htm=htm.replace( "|content|", lzcontent1);
                   htm=htm.replace( "|id|", value["tid"]);
                   
                   var cTime=friendly_time(Number(value["lastPostTime"])/1000);
                   htm=htm.replace( "|lasttime|",  cTime);
                   
                   
                   
                   var userid=value["userid"];
                   
                   var usericon=value["usericon"]; //'../css/image1/ico_headimg.png';
                   usericon = _SERVER_ADDRESS + usericon ;
                   htm=htm.replace( "|usericon|", usericon);
                   
                    var imghtm='';
                   
                   if(value["imglist"])
                   {
                       
                        var imglist=value["imglist"];
                        $.each(imglist,function(index, v) {
                            if (index<6)
                                imghtm+='<img src="'+ (_SERVER_ADDRESS + v) +'" class="contentimg">';
                        })
                        
                   }
                   
                   
                   htm=htm.replace("|imglist|", imghtm);
                   
                   
                   $('#newlist').append(htm);
                });
           }
           common.ajaxPOST(url, par, fok, ferr);
       }
       
       
       function open_threads(id){
           setLocVal("threads_id", id);
           appcan.window.open("posts","posts.html",5);
       }
       
       function refreshData(){
             g_page=1;
            var time1 = new Date().format("MM-dd HH:mm:ss");   
            reloadJson.levelText="上次刷新："+time1;
             uexWindow.setBounceParams(0,JSON.stringify(reloadJson));

             $("#postlist").html("");
            loadForum();
       }
          
       function GetList(){
            
           var id = getLocVal("forum_id");
           var cid = getLocVal("class_id");
           var url=_SERVER_ADDRESS+"/group/threads";
           //var par={"id":id, "page":g_page};
           var par={"cid": cid, "gid":id, "page":g_page};
           var ferr=function(err){};
           var fok=function(data){
               if (g_page == 1) {
                    uexWindow.resetBounceView("0");
                }else {
                    uexWindow.resetBounceView("1");
                }
                myPrompt.hide();
              g_page++;

               data=JSON.parse(data);
               var posts = Number(data.postsCount);
               if((posts % g_pagesize)==0)
                    g_pagecount = posts/g_pagesize;
               else
                    g_pagecount = parseInt(posts/g_pagesize)+1;

                if(posts>g_pagesize)
                    g_page++;
               
               //alert(data.icon);
               var icon_url=_SERVER_VIDEO_ADDRESS + "/" +data.icon; 
               $('#forumicon').attr("src", icon_url);
               $('#forumtitle').html(data.title);
               $('#forumthreads').html(data.threadsCount);
               $('#forummember').html(data.memberCount);
               $('#forumposts').html(data.postsCount);
               var list=data.newlist;
               var htm='';
               $.each(list,function(index,value) {
                   
                   htm=$("#list_div").html();
                   htm=htm.replace("width:5em; text-align: left; margin-left:1em;\" class=\"ub ub-ver\"", " text-align: left; margin-left:1em;\" class=\"ub ub-ver ub-f1\"");
                   htm=htm.replace( "|username|", value["username"]);
                   
                   
                   
                   htm=htm.replace( "|replies|", value["postsCount"]);
                   htm=htm.replace( "|title|", value["title"]);
                   var lzcontent1=value["message"].replace(/\n/g,"<br />").substring(0,100);
                   if(value["message"].length>100) lzcontent1+="...";
                   htm=htm.replace( "|content|", lzcontent1);
                   htm=htm.replace( "|id|", value["tid"]);
                   
                   var cTime=friendly_time(Number(value["lastPostTime"])/1000);
                   htm=htm.replace( "|lasttime|",  cTime);
                   
                   
                   
                   var userid=value["userid"];
                   
                   var usericon=value["usericon"]; //'../css/image1/ico_headimg.png';
                   usericon = _SERVER_VIDEO_ADDRESS + usericon ;
                   htm=htm.replace( "|usericon|", usericon);
                   
                    var imghtm='';
                   
                   
                   if(value["imglist"]!="")
                   {
                        var imglist=JSON.parse(value["imglist"]);
                        $.each(imglist,function(index, v) {
                            if (index<6)
                                imghtm+='<img src="'+ (_SERVER_ADDRESS + v) +'" class="contentimg">';
                        })
                        
                   }
                   
                   htm=htm.replace("|imglist|", imghtm);
                   
                   
                   $('#newlist').append(htm);
                });
           }
           common.ajaxPOST(url, par, fok, ferr);
       }
       
       


    //友好的时间返回函数（如：10分钟前）time_stamp为UNIX秒数
function friendly_time(time_stamp)
{
    
  var now_d = new Date();
  var now_time = now_d.getTime() / 1000; //获取当前时间的秒数
  var f_d = new Date();
  f_d.setTime(time_stamp * 1000);
  var f_time = f_d.toLocaleDateString();
 
  var ct = now_time - time_stamp;
  var day = 0;
  if (ct < 0)
  {
    f_time = "【预约】" + f_d.toLocaleString();
  }
  else if (ct < 60)
  {
    f_time = Math.floor(ct) + '秒前';
  }
  else if (ct < 3600)
  {
    f_time = Math.floor(ct / 60) + '分钟前';
  }
  else if (ct < 86400)//一天
  {
    f_time = Math.floor(ct / 3600) + '小时前';
  }
  else if (ct < 604800)//7天
  {
    day = Math.floor(ct / 86400);
    if (day < 2)
      f_time = '昨天';
    else
      f_time = day + '天前';
  }
  else
  {
    day = Math.floor(ct / 86400);
    f_time = day + '天前';
  }
  return f_time;
}
