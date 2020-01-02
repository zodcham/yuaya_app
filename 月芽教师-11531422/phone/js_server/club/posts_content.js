﻿var pageIndex=1;
        var reloadDate="";
        var reloadJson={"textColor":"#000","imagePath":"res://refesh_icon.png","levelText":"更新日期1","pullToReloadText":"拖动刷新","releaseToReloadText":"释放刷新","loadingText":"刷新中，请稍等"};
        var loadJson={"textColor":"#000","imagePath":"res://refesh_icon.png","levelText":"更新日期2","pullToReloadText":"拖动加载","releaseToReloadText":"释放加载","loadingText":"加载中，请稍等"};
        var g_page=1;
        var g_pagecount=1;
        var g_pagesize=20;
        
        appcan.ready(function() {
			
			$("p").css("color","#333").css("font-size","1.2em");

            loadThreads();

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
                            if (g_page >= g_pagecount) {
                                toast("没有更多回复。", config.toastTimeShort);
                                uexWindow.hiddenBounceView(1);
                                return false;
                            }
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
        
       
        
      
       function loadThreads(){
           var id = getLocVal("threads_id");
           var gid = getLocVal("forum_id");
           var cid = getLocVal("class_id");
           
           var url=_SERVER_ADDRESS+"/group/postslist"; 
           var par={"tid":id, "cid":cid, "gid":gid, "page":g_page};

           var ferr=function(err){};
           var fok=function(data){
               if (g_page == 1) {
                    uexWindow.resetBounceView("0");
                }else {
                    uexWindow.resetBounceView("1");
                }
                myPrompt.hide();
               
               data=JSON.parse(data);
               
               
               var replies = Number(data.postsCount);
               if((replies % g_pagesize)==0)
                    g_pagecount = replies/g_pagesize;
               else
                    g_pagecount = parseInt(replies/g_pagesize)+1;
                    
                if(replies>g_pagesize)
                    g_page++;
                
               var usericon=data.usericon;
               usericon = _SERVER_VIDEO_ADDRESS + usericon ;
               $('#lz_icon').attr("src", usericon);
               $('#lz_username').html(data.username);
               //var cTime=dateStr(Number(data.addtime)/1000);
               var cTime=friendly_time(Number(data.addtime)/1000);
               $('#lz_addtime').html(cTime);
               $('#lz_replies').html(data.postsCount);
               $('#lz_views').html(data.hitsCount);
               $('#lz_title').html(data.title);
               $('#lz_content').html(data.message.replace(/\n/g,"<br />"));
               var imghtm='';
               //alert(JSON.stringify(data));
               if(data.imglist.length>0)
               {
                    //var imglist=JSON.parse(data.imglist);
                    var imglist=data.imglist;
                    $.each(imglist,function(index, v) {
                            imghtm+='<img src="'+ (_SERVER_ADDRESS + "/" + v) +'" class="contentimg">';
                    })
                    
               }
               
               getUserInfo();
               
               
               if(userInfo.id == data.userid){
                   $("#threads_del").click(function(){
                       del_threads(data.tid);
                   });
                   $("#threads_edit").click(function(){
                       edit_threads(data.tid);
                   });
                   $("#threads_del").removeClass("uhide"); 
                   $("#threads_edit").removeClass("uhide");
               }
               
               
               
               $('#lz_imglist').html(imghtm);
               
               list=data.postlist;
               var htm='';
               $.each(list,function(index,value) {
                   htm=$("#list_div").html();
                   htm=htm.replace( "|username|", value["username"]);
                   htm=htm.replace( "|content|", value["message"].replace(/\n/g,"<br />"));
                   //alert(value["pid"]);
                   //htm=htm.replace( "|id|", value["pid"]);
                   //cTime=timetrans(Number(value["addtime"]));
                   var cTime=friendly_time(Number(value["addtime"])/1000);
                   htm=htm.replace( "|addtime|", cTime);
                   htm=htm.replace( "|position|", value["floor"]);
                   htm=htm.replace("yypid", value["pid"]);
                   htm=htm.replace("yypid", value["pid"]);
                   htm=htm.replace("yypid", value["pid"]);
                   htm=htm.replace("yytid", value["tid"]);
                   var userid=value["userid"];
                   htm=htm.replace( "|touserid|", userid);
                   htm=htm.replace( "|tousername|", value["username"]);
                   var postusericon=value["usericon"];
                   postusericon = _SERVER_VIDEO_ADDRESS + postusericon ;
                   htm=htm.replace( "|usericon|", postusericon);
                   //htm=htm.replace( "|usericon|", usericon);
                   
                   
                    var imghtml='';
                    
                   if(value["imglist"].length>0)
                   {
                        var imglist_post=value["imglist"];
                        $.each(imglist_post,function(index, v) {
                                imghtml+='<img src="'+ (_SERVER_VIDEO_ADDRESS + v) +'" class="contentimg">';
                        })
                   }
                   
               if(userInfo.id == userid){
                   htm=htm.replace( "|hide|", "");
                   htm=htm.replace( "|hide|", "");
               }
               else{
                   htm=htm.replace( "|hide|", "uhide");
                   htm=htm.replace( "|hide|", "uhide");
               }
                   
                  htm=htm.replace("|imglist|", imghtml);
                  
                  var postshtml='';
                   if(value["postlist"].length>0){
                       var floor=value["postlist"];
                       postshtml='<div class="ub ub-ver infloor ub-f1" style="margin-top:2em;">';
                                
                       $.each(floor,function(index, v) {
                                postshtml+='<p style="margin-top:1em;"><a>'+ v.username +': </a>';
                                if(v.toUsername.length>0) postshtml+='回复 <a>'+ v.toUsername +'</a>: ';
                                postshtml+='<span class="infloor_span"  onclick="posts_infloor_add('+ value["pid"] +',\''+v.userid+'\',  \''+v.username+'\')">';
                                postshtml+=v.message;
                                postshtml+='</span>';
                                postshtml+=friendly_time(Number(data.addtime)/1000);
                                
                                if(v.userid==userInfo.id){
                                    postshtml+='<input type="button" style="width:2.5em; border-width:0; text-align:center; font-size:1em;  background-color:#00A0E9 ;color:#fff;border-radius: 0.3em;margin-left:1.5em;"  onclick="edit_posts(\''+v.pid+'\',\''+v.tid+'\')" class="|hide|" value="修改">';
                                    postshtml+='<input type="button" style="width:2.5em; border-width:0; text-align:center; font-size:1em;  background-color:#F16412 ;color:#fff;border-radius: 0.3em;margin-left:1.5em;"  onclick="del_posts(\''+v.pid+'\',\''+v.tid+'\')" class="|hide|" value="清除">';
                                }
                                postshtml+='</p>';
                        })
                       /*<div class="ub ub-ver infloor" style="margin-top:1.5em;">
                            <p><a>林源: </a> 回复 <a href="">林源</a>: 楼中楼1 <span class="infloor_span">5小时前</span></p>
                            <p><a >林源：</a>楼中楼2 <span class="infloor_span">5小时前</span></p>
                        </div>
                        */
                       postshtml+='</div>';
                   }
                   
                   htm=htm.replace( "|infloor|", postshtml);
                   /*
                   if(value["postlist"].length!="")
                   {
                        var imglist=JSON.parse(value["imglist"]);
                        $.each(imglist,function(index, v) {
                            if (index<6)
                                imghtml+='<img src="'+ v +'" class="contentimg">';
                        })
                        
                   }
                  */
                 
                   
                   
                   
                   $('#postlist').append(htm);
                });
           }
           common.ajaxPOST(url, par, fok, ferr);
           
           
       }
       
       function updatethread(){
           getUserInfo();
           var url=_SERVER_ADDRESS+"/group/findThread";
             
           var par={'userid' : userInfo.id,'tid' : getLocVal("threads_edit_id")};
           var ferr=function(err){
               };
           var fok=function(data){
               
               var obj=JSON.parse(data);
               var title=obj.title;
               var content=obj.message;
               alert(content);
               $('#lz_title').html(data.title);
               $('#lz_content').html(data.message);       
           };
            common.ajaxPOST(url, par, fok, ferr);
       }
       
       
       function openforum(id, title){
           setLocVal("forum_id", id);
           setLocVal("forum_title", title);
           appcan.window.open("posts","posts.html",5);
       }
       
       
       function refreshData(){
             g_page=1;
            var time1 = new Date().format("MM-dd HH:mm:ss");   
            reloadJson.levelText="上次刷新："+time1;
             uexWindow.setBounceParams(0,JSON.stringify(reloadJson));

             $("#postlist").html("");
            loadThreads();
       }
       
       function LoadNewList(){
             g_page=1;
             $("#postlist").html("");
            GetList();
       }
    
    function GetList(){
        
        if (g_page == 1) {
            uexWindow.resetBounceView("0");
        } else {
            uexWindow.resetBounceView("1");
        }
        if (g_page >= g_pagecount) {
            toast("没有更多回复。", config.toastTimeShort);
            return false;
        }
        
        var id = getLocVal("threads_id");
           var gid = getLocVal("forum_id");
           var cid = getLocVal("class_id");
           
           var url=_SERVER_ADDRESS+"/group/postslist"; 
           var par={"tid":id, "cid":cid, "gid":gid, "page":g_page};
           
           
           


           
           var ferr=function(err){};
           var fok=function(data){
               
                
              g_page++;
              
               data=JSON.parse(data);
               
               list=data.postlist;
               var htm='';
               
               $.each(list,function(index,value) {
                   htm=$("#list_div").html();
                   htm=htm.replace( "|username|", value["username"]);
                   htm=htm.replace( "|content|", value["message"].replace(/\n/g,"<br />"));
                   //alert(value["pid"]);
                   //htm=htm.replace( "|id|", value["pid"]);
                   //cTime=timetrans(Number(value["addtime"]));
                   var cTime=friendly_time(Number(value["addtime"])/1000);
                   htm=htm.replace( "|addtime|", cTime);
                   htm=htm.replace( "|position|", value["floor"]);
                   htm=htm.replace("yypid", value["pid"]);
                   htm=htm.replace("yypid", value["pid"]);
                   htm=htm.replace("yypid", value["pid"]);
                   htm=htm.replace("yytid", value["tid"]);
                   var userid=value["userid"];
                   htm=htm.replace( "|touserid|", userid);
                   htm=htm.replace( "|tousername|", value["username"]);
                   var postusericon=value["usericon"];
                   postusericon = _SERVER_VIDEO_ADDRESS + postusericon ;
                   htm=htm.replace( "|usericon|", postusericon);
                   //htm=htm.replace( "|usericon|", usericon);
                   
                   
                    var imghtml='';
                    
                   if(value["imglist"].length>0)
                   {
                        var imglist_post=value["imglist"];
                        $.each(imglist_post,function(index, v) {
                                imghtml+='<img src="'+ (_SERVER_VIDEO_ADDRESS + v) +'" class="contentimg">';
                        })
                   }
                   
               if(userInfo.id == userid){
                   htm=htm.replace( "|hide|", "");
                   htm=htm.replace( "|hide|", "");
               }
               else{
                   htm=htm.replace( "|hide|", "uhide");
                   htm=htm.replace( "|hide|", "uhide");
               }
                   
                  htm=htm.replace("|imglist|", imghtml);
                  
                  var postshtml='';
                   if(value["postlist"].length>0){
                       var floor=value["postlist"];
                       postshtml='<div class="ub ub-ver infloor ub-f1" style="margin-top:2em;">';
                                
                       $.each(floor,function(index, v) {
                                postshtml+='<p style="margin-top:1em;"><a>'+ v.username +': </a>';
                                if(v.toUsername.length>0) postshtml+='回复 <a>'+ v.toUsername +'</a>: ';
                                postshtml+='<span class="infloor_span"  onclick="posts_infloor_add('+ value["pid"] +',\''+v.userid+'\',  \''+v.username+'\')">';
                                postshtml+=v.message;
                                postshtml+='</span>';
                                postshtml+=friendly_time(Number(data.addtime)/1000);
                                
                                if(v.userid==userInfo.id){
                                    postshtml+='<input type="button" style="width:2.5em; border-width:0; text-align:center; font-size:1em;  background-color:#00A0E9 ;color:#fff;border-radius: 0.3em;margin-left:1.5em;"  onclick="edit_posts(\''+v.pid+'\',\''+v.tid+'\')" class="|hide|" value="修改">';
                                    postshtml+='<input type="button" style="width:2.5em; border-width:0; text-align:center; font-size:1em;  background-color:#F16412 ;color:#fff;border-radius: 0.3em;margin-left:1.5em;"  onclick="del_posts(\''+v.pid+'\',\''+v.tid+'\')" class="|hide|" value="清除">';
                                }
                                postshtml+='</p>';
                        })
                       /*<div class="ub ub-ver infloor" style="margin-top:1.5em;">
                            <p><a>林源: </a> 回复 <a href="">林源</a>: 楼中楼1 <span class="infloor_span">5小时前</span></p>
                            <p><a >林源：</a>楼中楼2 <span class="infloor_span">5小时前</span></p>
                        </div>
                        */
                       postshtml+='</div>';
                   }
                   
                   htm=htm.replace( "|infloor|", postshtml);
                   /*
                   if(value["postlist"].length!="")
                   {
                        var imglist=JSON.parse(value["imglist"]);
                        $.each(imglist,function(index, v) {
                            if (index<6)
                                imghtml+='<img src="'+ v +'" class="contentimg">';
                        })
                        
                   }
                  */
                 
                   
                   
                   
                   $('#postlist').append(htm);
                });
           
               
           }
           common.ajaxPOST(url, par, fok, ferr);
           
           
           
           
           
       }
       
       function posts_infloor_add(pid,uid, username){
           setLocVal("posts_id", pid);
           setLocVal("touserid", uid);
           setLocVal("tousername", username);
           //appcan.window.open("posts_infloor_add","posts_infloor_add.html",5);
       }
       
       
       function timetrans(date){
        var date = new Date(date);//如果date为10位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    }      
    
//删除
function del_threads(theoryIds) {
    appcan.window.alert({
        title : "提示",
        content : '确定清除主题内容吗？',
        buttons : ['确定', '取消'],
        callback : function(err, data, dataType, optId) {

            if ("1" == data) {
            } else if ("0" == data) {
               var url=_SERVER_ADDRESS+"/group/threads_delete"; 
               var par={
                    'userid' : userInfo.id,
                    'tid' : theoryIds
                };
               var ferr=function(err){};
               var fok=function(data){
                   toast("主题内容清除成功。", config.toastTimeShort);
                   $("#" + theoryIds).addClass("uhide");
                   refreshData();
               };
                common.ajaxPOST(url, par, fok, ferr);
            }
        }
    });
}
    
//删除
function del_posts(pid, tid) {
    appcan.window.alert({
        title : "提示",
        content : '确定清除回复内容吗？',
        buttons : ['确定', '取消'],
        callback : function(err, data, dataType, optId) {
            if ("1" == data) {
            } else if ("0" == data) {
               var url=_SERVER_ADDRESS+"/group/post_delete"; 
               var par={
                    'userid' : userInfo.id,
                    'pid' : pid
                };
               var ferr=function(err){
               };
               var fok=function(data){
                   toast("回复内容清除成功。", config.toastTimeShort);
                   refreshData();
               };
                common.ajaxPOST(url, par, fok, ferr);
            }
        }
    });
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

    
function AddThreadsClick(tid){
   var url=_SERVER_ADDRESS+"/group/add_threads_click"; 
   var par={'tid' : tid};
   var ferr=function(err){};
   var fok=function(data){
   };
    common.ajaxPOST(url, par, fok, ferr);
}


function edit_threads(tid) {
    setLocVal("threads_edit_id", tid);
    appcan.window.open("forumedit", "forumedit.html", 5);
}

function edit_posts(pid) {
    setLocVal("posts_edit_id", pid);
    appcan.window.open("posts_edit", "posts_edit.html", 5);
}