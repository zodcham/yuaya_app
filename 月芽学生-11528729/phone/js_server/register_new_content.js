//所有省市县集合
var _pclist=null;

appcan.ready(function() {   
    
    initPccList();  
})

function initPccList () {
    //appcan.locStorage.remove('pclist')
    _pclist=appcan.locStorage.getVal('pclist');
    _pclist=JSON.parse(_pclist);
    if (_pclist==null) {
        config.currentPath = "";
        var params = {};
        common.ajax("/register/getAreaList", {
            params : JSON.stringify(params)
            }, function(data) {
                if (data.success) {
                    _pclist=data.obj;
                    bindSlect('selProvince',1);
                    appcan.locStorage.setVal('pclist',JSON.stringify(_pclist));
                }
            }, function(data) {
    
            }, {
                type : 'GET'
            });
        
    }else{
        bindSlect('selProvince',1);
    }
}

function getOfficeList (areaId2) {
  $('#selClass').empty().val('').parent().find('div').html('班级')
  var $sel=$('#selOffice').empty().val('');
  $sel.parent().find('div').html('机构')
  
  config.currentPath = "";
  var params = {};
  params.areaId2=areaId2;
  
  common.ajaxGET(_SERVER_ADDRESS+"/v1/phone/register/getOfficeList",
    params 
    , function(data) {
        data=JSON.parse(data);
        var list=data.obj;
        if (data.success) {
            $sel.append('<option value=""></option>');
            for (var i=0; i < list.length; i++) {
                $sel.append('<option value="'+escape(JSON.stringify(list[i]))+'">'+list[i].name+'</option>');
            }
        }
    }, function(data) {

    });
}

function getClazzList (schoolId) {
  var $sel=$('#selClass').empty().val('');
  $sel.parent().find('div').html('班级')
    
  config.currentPath = "";
  var params = {};
  params.schoolId=schoolId;
  
  common.ajaxGET(_SERVER_ADDRESS+"/v1/phone/register/getClazzList", 
    params, 
    function(data) {
        data=JSON.parse(data);
        var list=data.obj;
        console.log(list);
        if (data.success) {
            $sel.append('<option value=""></option>');
            for (var i=0; i < list.length; i++) {
                $sel.append('<option value="'+escape(JSON.stringify(list[i]))+'" clazzCode="'+list[i].clazzCode+'">'+list[i].name+'</option>');
            }
        }
    }, function(data) {

    });
}

function bindSlect(sid,pid){
    var $sel=$('#'+sid).empty();
    $sel.append('<option value=""></option>');
    for (var i=0; i < _pclist.length; i++) {
        if (_pclist[i].parentId == pid){
            $sel.append('<option value="'+escape(JSON.stringify(_pclist[i]))+'">'+_pclist[i].name+'</option>');
        }
    }
    $sel.get(0).selectedIndex=0;
}

appcan.switchBtn(".switch", function(obj, value) {
    if (value) {
        $("#content1").addClass("uhide");
        $("#content2").removeClass("uhide");
    } else{
        $("#content2").addClass("uhide");
        $("#content1").removeClass("uhide");
    };
});


appcan.select(".select",function(ele,value){
    model=JSON.parse(unescape(value));
    console.log(model);
    
    if ($(ele).attr('id')=='selProvince') {
        bindSlect('selCity',model.id);
        $('#selCity').val('').parent().find('div').html('市');
        $('#selCounty').empty().val('').parent().find('div').html('区/县');
        getOfficeList(model.id);
        pms.area2Id=model.id;
        pms.area2Name=model.name; 
    }
    else if ($(ele).attr('id')=='selCity') {
        bindSlect('selCounty',model.id);
        $('#selCounty').val('').parent().find('div').html('区/县')
        getOfficeList(model.id);
        pms.area3Id=model.id;
        pms.area3Name=model.name;
    }
    else if ($(ele).attr('id')=='selCounty') {
        getOfficeList(model.id);
        pms.area4Id=model.id;
        pms.area4Name=model.name;
    }
    else if($(ele).attr('id')=='selOffice'){
        getClazzList(model.id);
        pms.schoolId=model.id;
        pms.schoolName=model.name;
    }
    else if($(ele).attr('id')=='selClass'){
        pms.clazzId=model.id;
        pms.clazzName=model.name;
        pms.clazzCode=model.clazzCode;
    }
});

var $btnGetcode=$('#btnGetcode');
//
$btnGetcode.bind('click',function(){
    //获取验证码
  btnGetcodeClick();
});

function btnGetcodeClick(){
  config.currentPath = "";
  var params = {};
  params.mobile=$('#mobile').val();
  
  common.ajaxGET(_SERVER_ADDRESS+"/phone/register/getRegisterCode", 
    params, 
    function(data) {
        data=JSON.parse(data);
        if (data.success) {
            countdowm(60);
        }
        else{
            
        }
        toast(data.msg, config.toastTimeLong);
    }, function(data) {
        console.log(data);
    });
}
//按钮读秒
function countdowm (s) {
  $btnGetcode.removeClass('bc-head').addClass('sc-bg-btn-cancel').html(s+'获取验证码').unbind('click');
  if(s>0){
      s--;
      setTimeout(function(){
          countdowm(s);
      },1000)
  }
  else{
      $btnGetcode.addClass('bc-head').html('获取验证码').bind('click',function(){
            //获取验证码
          btnGetcodeClick();
        });;
  }
}

//无班级代码
$('#regsend1').on('click',function(){
    var pms=getRegisterParams();
    //独立处理参数
    
    sendRegister(pms);
});
//有班级代码
$('#regsend2').on('click',function(){
    var pms=getRegisterParams();
    //独立处理参数
    
    sendRegister(pms);
});

var pms={};
function getRegisterParams(){
    
    
    pms.isInviteCode='';
    pms.name=$.trim($('#realname').val());
    pms.nickName=$.trim($('#nickname').val());
    pms.age=$.trim($('#age').val());
    pms.mobile=$.trim($('#mobile').val());
    pms.password=$.trim($('#password').val());
    pms.verification=$.trim($('#validatecode').val());
    pms.password2=$.trim($('#password1').val());
    
    pms.inviteCode='';
    
    return pms;
}

//提交注册
function sendRegister (params) {
    console.log(JSON.stringify(params));
    if($.trim(params.nickName)==''){
        //请输昵称
        return;
    }
    if($.trim(params.name)==''){
        //请输真实名称
        return;
    }
    if($.trim(params.verification)==''){
        //请输入验证码
        return;
    }
    if($.trim(params.password)==''){
        //请输入密码
        return;
    }
    if($.trim(params.password2)==''){
        //请输入确认密码
        return;
    }
    if($.trim(params.password)!=$.trim(params.password2)){
        //两次密码不同
        return;
    }
    
    common.ajax("/register/registerSelf", {
        params : JSON.stringify(params)
        }, function(data) {
            data=JSON.parse(data);
            console.log(data);
            if (data.success) {
                
            }
            toast(data.msg, config.toastTimeLong);
        }, function(data) {
            console.log(data);
            toast('执行异常', config.toastTimeLong);
        }, {
            type : 'POST'
        });
    
   /*
    common.ajaxPOST(_SERVER_ADDRESS+"/phone/register/registerSelf", 
        params, 
        function(data) {
            data=JSON.parse(data);
            console.log(data);
            if (data.success) {
                
            }
        }, function(data) {
            console.log(data);
    });
    */
}
