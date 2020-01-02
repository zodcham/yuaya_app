/**
 * js工具类
 */
var CONNECTSTATUS_FLAG = true;
var SHOW_MSG_FLAT = true;
var tools = {
    /**
     * 异步请求数据Json
     * @param string url:服务器数据接口地址
     * @param string param:post参数,格式:对象或参数名1=参数值1&参数名2=参数值2...
     * @param string callSuccess:数据获取成功后的回调函数
     * @param string callFailed:数据获取失败后的回调函数
     * @param boolean cached:是否使用LocalStorage缓存数据,默认不缓存
     */
    ajaxJson : function(url, param, callSuccess, callFailed, cached) {
        //debugger;
        var data = [];
        if ( typeof (param) == 'undefined' || param == '') {
            data = '';
        } else {
            if ( typeof (param) == 'object') {
                $.each(param, function(key, value) {
                    data.push({
                        'key' : key,
                        'value' : value
                    });
                });
            } else if ( typeof (param) == 'string') {
                var params = param.split('&');
                for (var i in params) {
                    var map = params[i].split('=');
                    data.push({
                        'key' : map[0],
                        'value' : map[1]
                    });
                }
            }
        }
        if ( typeof (callSuccess) == 'undefined') {
            callSuccess = null;
        }
        if ( typeof (callFailed) == 'undefined') {
            callFailed = getJSONError;
        }
        if ( typeof (cached) == 'undefined') {
            cached = false;
        } else {
            cached = true;
        }
        this.jAPP.getJSON(url, callSuccess, 'json', callFailed, 'post', data, cached);
    },
    /**
     * 异步请求数据Text
     * @param string url:服务器数据接口地址
     * @param string param:post参数,格式:参数名1=参数值1&参数名2=参数值2...
     * @param string callSuccess:数据获取成功后的回调函数
     * @param string callFailed:数据获取失败后的回调函数
     * @param boolean cached:是否使用LocalStorage缓存数据,默认不缓存
     */
    ajaxText : function(url, param, callSuccess, callFailed, cached) {
        var data = [];
        if ( typeof (param) == 'undefined' || param == '') {
            data = '';
        } else {
            var params = param.split('&');
            for (var i in params) {
                var map = params[i].split('=');
                data.push({
                    'key' : map[0],
                    'value' : map[1]
                });
            }
        }
        if ( typeof (callSuccess) == 'undefined') {
            callSuccess = null;
        }
        if ( typeof (callFailed) == 'undefined') {
            callFailed = getJSONError;
        }
        if ( typeof (cached) == 'undefined') {
            cached = false;
        } else {
            cached = true;
        }
        this.jAPP.getJSON(url, callSuccess, 'text', callFailed, 'post', data, cached);
    },
    /**
     * 将json字符串转换成json对象
     * @param string jsonStr
     */
    parseJson : function(jsonStr) {
        if (jsonStr == "") {
            return {};
        }
        return $.parseJSON(jsonStr);
    },
    /**
     * 将json对象转换成json字符串
     * @param {Object} json
     */
    jsonToString : function(json) {
        return JSON.stringify(json);
    },
    /**
     * 获取json对象的长度
     * @param {Object} json
     */
    getJsonLength : function(json) {
        var len = 0;
        for (var item in json) {
            len++;
        }
        return len;
    },
    /**
     * html转义
     * @param string html
     */
    htmlEncode : function(html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    /**
     * html反转义
     * @param string html
     */
    htmlDecode : function(html) {
        var temp = document.createElement("div");
        temp.innerHTML = html;
        var output = temp.innerText || temp.textContent;
        output = output ? output : html;
        temp = null;
        return output;
    },
    /**
     * 页面上下弹动
     * @param string downcb
     * @param string upcb
     */
    setPageBounce : function(downcb, upcb) {
        var t = ['0', '0'];
        uexWindow.onBounceStateChange = function(type, status) {
            if (downcb && type == 0 && status == 2) {
                downcb();
            }
            if (upcb && type == 1 && status == 2) {
                upcb();
            }
            uexWindow.resetBounceView(type);
        }
        uexWindow.setBounce("1");
        var lastTime = getLocVal("last_update");
        if (lastTime == "") {
            lastTime = tools.formatDate(new Date());
        }
        var inJson = {
            "imagePath" : "res://loading.png",
            "textColor" : "#AAA",
            "levelText" : "上次更新时间：" + lastTime,
            "loadingText" : "加载中，请稍等..."
        };
        if (downcb) {
            t[0] = '1';
            uexWindow.setBounceParams(0, JSON.stringify(inJson));
            uexWindow.notifyBounceEvent("0", "1");
        }
        if (upcb) {
            t[1] = '1';
            uexWindow.setBounceParams(1, JSON.stringify(inJson));
            uexWindow.notifyBounceEvent("1", "1");
        }
        uexWindow.showBounceView("0", "#FFF", t[0]);
        uexWindow.showBounceView("1", "#FFF", t[1]);
    },
    /**
     * 页面顶部弹动
     * @param string downcb
     */
    setPageUpBounce : function(downcb) {
        var t = '0';
        uexWindow.onBounceStateChange = function(type, status) {
            if (downcb && type == 0 && status == 2) {
                downcb();
            }
            uexWindow.resetBounceView(0);
        }
        uexWindow.setBounce("1");
        uexWindow.hiddenBounceView("1");
        var inJson = {
            "imagePath" : "res://loading.png",
            "textColor" : "#AAA",
            "loadingText" : "加载中，请稍等..."
        };
        if (downcb) {
            t = '1';
            uexWindow.setBounceParams(0, JSON.stringify(inJson));
            uexWindow.notifyBounceEvent("0", "1");
        }
        uexWindow.showBounceView("0", "#FFF", t);
    },
    /**
     * 页面底部弹动
     * @param string upcb
     */
    setPageDownBounce : function(upcb) {
        var t = '0';
        uexWindow.onBounceStateChange = function(type, status) {
            if (upcb && type == 1 && status == 2) {
                upcb();
            }
            uexWindow.resetBounceView(1);
        }
        uexWindow.setBounce("1");
        uexWindow.hiddenBounceView("0");
        var inJson = {
            "imagePath" : "res://loading.png",
            "textColor" : "#AAA",
            "loadingText" : "加载中，请稍等..."
        };
        if (upcb) {
            t = '1';
            uexWindow.setBounceParams(1, JSON.stringify(inJson));
            uexWindow.notifyBounceEvent("1", "1");
        }
        uexWindow.showBounceView("1", "#FFF", t);
    },
    /**
     * 隐藏底部弹动,上拉分页时使用
     * @param string curPage:当前页
     * @param string totalPage:总页数
     * return 返回true,表示到达最后一页
     */
    hideBounce : function(curPage, totalPage) {
        curPage = parseInt(curPage) + 1;
        totalPage = parseInt(totalPage);
        if (curPage >= totalPage) {
            if (totalPage == 1) {
                uexWindow.hiddenBounceView("1");
            }
            if (curPage > totalPage) {
                return true;
            }
            uexWindow.hiddenBounceView("1");
        }
        return false;
    },
    /**
     * 显示加载框
     * @param String mes:显示的提示语
     * @param int d:毫秒数,窗口存在时间
     * @param int t:窗口显示模式,0 普通模式,1 进度条模式
     */
    showLoading : function(mes, d, t) {
        uexWindow.toast( t ? t : 1, 5, mes ? mes : '', d ? d : 0);
    },
    /**
     * 关闭加载框
     */
    hideLoading : function() {
        uexWindow.closeToast();
    },
    /**
     * 判断数组中是否存在某个值
     * @param string val
     * @param array arrayData
     */
    inArray : function(val, arrayData) {
        for (var i in arrayData) {
            if (arrayData[i] == val) {
                return true;
            }
        }
        return false;
    },
    /**
     * 飞入动画效果
     * @param srcObj:原对象
     * @param targetObj:目标对象
     * @param speed:动画速度,单位毫秒,默认为normal
     */
    flyInto : function(srcObj, targetObj, speed) {
        var srcLeft = srcObj.offset().left;
        var srcTop = srcObj.offset().top;
        var targetLeft = targetObj.offset().left;
        var targetTop = targetObj.offset().top;
        if (srcObj.eq(1).is(':animated')) {
            return;
        }
        var copySrc = srcObj.clone();
        $("body").append(copySrc);
        if (speed == "" || typeof (speed) == "undefined") {
            speed = "normal";
        }
        copySrc.css({
            position : 'absolute',
            left : srcLeft,
            top : srcTop
        });
        copySrc.animate({
            width : 20,
            height : 20,
            left : targetLeft,
            top : targetTop,
            opacity : 0.5
        }, speed, function() {
            copySrc.remove();
        });
    },
    /**
     * 格式化数字
     * @param value:数字
     * @param numberOfDecimal:小数位数
     * @param thousenSeparator:千位分隔符
     * @returns
     */
    formatNumber : function(value, numberOfDecimal, thousenSeparator) {
        if ( typeof (numberOfDecimal) == "undefined") {
            numberOfDecimal = 0;
        }
        if ( typeof (thousenSeparator) == "undefined") {
            thousenSeparator = ",";
        }
        value = parseFloat(value);
        value = value.toFixed(numberOfDecimal);
        var val_string = value + '';
        var tmp = val_string.split('.');
        var abs_val_string = (tmp.length == 2) ? tmp[0] : val_string;
        var deci_string = ('0.' + (tmp.length == 2 ? tmp[1] : 0)).substr(2);
        var nb = abs_val_string.length;

        for (var i = 1; i < 4; i++) {
            if (value >= Math.pow(10, (3 * i))) {
                abs_val_string = abs_val_string.substring(0, nb - (3 * i)) + thousenSeparator + abs_val_string.substring(nb - (3 * i));
            }
        }
        if (parseInt(numberOfDecimal) == 0) {
            return abs_val_string;
        }
        return abs_val_string + "." + (deci_string > 0 ? deci_string : '00');
    },
    /**
     * 字符串左侧补0
     * @param {Object} str
     * @param {Object} digits
     */
    zeroPad : function(str, digits) {
        if (digits == 'undefined') {
            return str;
        }
        digits = parseInt(digits);
        if (digits < 1) {
            return str;
        }
        str = str.toString();
        while (str.length < digits) {
            str = '0' + str;
        }
        return str;
    },
    /**
     * 将文本域中的回车符替换为换行
     * @param string str
     */
    replaceEnter : function(str) {
        if (str == null || str == "") {
            return;
        }
        return str.replace(/\r\n/ig, "<br/>");
    },
    /**
     * 获取复选框选中项的value值
     * @param string name:复选框的name名称
     * @param string sep:多个值之间的分隔符
     */
    getCheckedValue : function(name, sep) {
        var textStr = "";
        sep = sep ? sep : ',';
        $("input[name='" + name + "']").each(function() {
            if ($(this).prop("checked")) {
                textStr = textStr.concat(sep).concat($(this).prop("value"));
            }
        });
        textStr = textStr.substring(textStr.indexOf(sep) + 1);
        return textStr;
    },
    /**
     * 当前window状态变更
     * @param Function cb0
     * @param Function cb1
     */
    changeState : function(cb0, cb1) {
        if (!(cb0 && cb1)) {
            return;
        }
        uexWindow.onStateChange = function(state) {
            //回到当前window时执行的函数
            if (state == 0 && cb0) {
                cb0();
            }
            //当前window压入后台时执行的函数
            if (state == 1 && cb1) {
                cb1();
            }
        }
    },
    /**
     * 设置session
     * @param string key
     * @param string value
     */
    setSession : function(key, value) {
        window.sessionStorage[key] = value;
    },
    /**
     * 获取指定session
     * @param string key
     */
    getSession : function(key) {
        if (window.sessionStorage[key]) {
            return window.sessionStorage[key];
        } else {
            return "";
        }
    },
    /**
     * 清除session
     * @param string key
     */
    clearSession : function(key) {
        if (key) {
            window.sessionStorage.removeItem(key);
        } else {
            window.sessionStorage.clear();
        }
    },
    /**
     * 获取指定前缀的元素对象
     * @param string prefix
     */
    getByPrefix : function(prefix) {
        return $("[id^=" + prefix + "]");
    },
    /**
     * 获取指定后缀的元素对象
     * @param string suffix
     */
    getBySuffix : function(suffix) {
        return $("[id$=" + suffix + "]");
    },
    /**
     * 验证手机号码
     * @param string tel
     */
    isMobileNumber : function(tel) {
        var mobileNumber = $.trim(tel);
        if (mobileNumber == "") {
            return false;
        }
        var reg = /^((((13|14|15|18|17)[0-9]{1}))+\d{8})$/;
        if (!reg.test(mobileNumber)) {
            return false;
        }
        return true;
    },
    /**
     * 获取网络状态
     */
    showConnectStatus : function(callBack) {
        uexDevice.cbGetInfo = function(opCode, dataType, data) {
            var device = eval('(' + data + ')');
            var connectStatus = device.connectStatus;
            var msg = '';
            if (connectStatus == -1) {
                msg = '您的网络不可用';
                if (CONNECTSTATUS_FLAG) {
                    uexWindow.toast(0, 5, msg, 3000);
                }
                CONNECTSTATUS_FLAG = false;
                SHOW_MSG_FLAT = true;
            } else if (connectStatus == 0) {
                //msg = 'wifi网络已连接';
                //if(SHOW_MSG_FLAT){
                //  uexWindow.toast(0,5,msg,3000);
                //}
                CONNECTSTATUS_FLAG = true;
                SHOW_MSG_FLAT = true;
            } else {
                // msg = '您的网络处于非wifi状态，注意流量哦';
                // if (SHOW_MSG_FLAT) {
                    // uexWindow.toast(0, 5, msg, 3000);
                // }
                CONNECTSTATUS_FLAG = true;
                SHOW_MSG_FLAT = false;
            }
            callBack.call(this,connectStatus);
        }
        uexDevice.getInfo('13')
    },
    /**
     * 检查是否已连网
     */
    isConnected : function(cb) {
        uexDevice.getInfo('13')
        uexDevice.cbGetInfo = function(opCode, dataType, data) {
            var isConn = false;
            var device = eval('(' + data + ')');
            var connectStatus = device.connectStatus;
            var msg = '';
            if (connectStatus != -1) {
                isConn = true;
            }
            if (isConn) {
                if (cb) {
                    cb();
                }
            } else {
                uexWindow.toast(0, 5, '您的网络不可用', 3000);
            }

        }
    },
    /**
     * 退出应用
     * @param {Object} msg
     */
    exit : function(msg) {
        if (msg) {
            uexWindow.cbConfirm = function(opId, dataType, data) {
                if (data == 0) {
                    uexWidgetOne.exit(0);
                }
            }
            uexWindow.confirm('提示', msg, ['确定', '取消']);
        } else {
            uexWidgetOne.exit();
        }
    },
    /**
     * 处理Android返回键事件
     * @param {Object} cb
     */
    handleBack : function(cb) {
        if (uexWidgetOne.getPlatform()) {
            uexWindow.onKeyPressed = function(keyCode) {
                if (keyCode == 0) {
                    cb();
                }
            }
            uexWindow.setReportKey(0, 1);
        }
    },
    /**
     * 获取二维码或条形码
     * @param int type:条码类型,0 二维码,1 条形码
     * @param {Object} cbSuccess:扫描成功回调
     * @param {Object} cbFailed:扫描失败回调
     * @param {Object} msg: type 为0时的提示信息
     */
    getBarCode : function(type, cbSuccess, cbFailed, msg) {
        var codeType = new Array('ZXing', 'ZBar');
        if (cbSuccess) {
            uexScanner.cbOpen = cbSuccess;
        }
        if (cbFailed) {
            uexWidgetOne.cbError = cbFailed;
        }
         var jsonData = '{"tipLabel":"'+msg+'","title":"扫一扫"}';
        uexScanner.setJsonData(jsonData);
        uexScanner.open();
            
        // if (type == 0) {
            // msg = msg ? msg : '扫一扫';
            // uexScanner.open(codeType[type], msg);
        // } else {
            // var jsonData = '{"tipLabel":"'+msg+'","title":"扫一扫"}';
            // alert(jsonData);
            // uexScanner.setJsonData(jsonData);
            // uexScanner.open();
            // // if (msg) {
                // // uexScanner.open(codeType[type], msg);
            // // } else {
                // // uexScanner.open(codeType[type]);
            // // }
        // }
    },
    /**
     * 倒计时
     * @param {Object} id
     * @param {Object} waitTime
     * @param {Object} msg
     */
    countDown : function(id, waitTime, msg) {
        if (waitTime == 0) {
            $("#" + id).removeAttr("disabled").removeClass("disabled-bg").addClass("check-bg").html(msg);
        } else {
            $("#" + id).attr("disabled", true).removeClass("check-bg").addClass("disabled-bg").html("重新发送(" + waitTime + ")");
            waitTime--;
            setTimeout(function() {
                tools.countDown(id, waitTime, msg);
            }, 1000);
        }
    },
    /**
     * 倒计时,天时分秒
     * @param {Object} time
     */
    downTime : function(time) {
        var NowTime = new Date();
        var t = time - NowTime.getTime();
        if (t <= 0) {
            document.getElementById("t_d").innerHTML = '00';
            document.getElementById("t_h").innerHTML = '00';
            document.getElementById("t_m").innerHTML = '00';
            document.getElementById("t_s").innerHTML = '00';
            return false;
        }
        var d = Math.floor(t / 1000 / 60 / 60 / 24);
        var h = Math.floor(t / 1000 / 60 / 60 % 24);
        var m = Math.floor(t / 1000 / 60 % 60);
        var s = Math.floor(t / 1000 % 60);
        document.getElementById("t_d").innerHTML = this.zeroPad(d, 2);
        document.getElementById("t_h").innerHTML = this.zeroPad(h, 2)
        document.getElementById("t_m").innerHTML = this.zeroPad(m, 2)
        document.getElementById("t_s").innerHTML = this.zeroPad(s, 2)
        return true;
    },
    /**
     * 时间戳转换
     */
    localTime : function(time) {
        time = time ? time : new Date();
        return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    formatDate : function(date) {
        var html = date.getFullYear();
        html += '-' + tools.zeroPad(date.getMonth() + 1, 2);
        html += '-' + tools.zeroPad(date.getDate(), 2);
        html += ' ' + tools.zeroPad(date.getHours(), 2);
        html += ':' + tools.zeroPad(date.getMinutes(), 2);
        html += ':' + tools.zeroPad(date.getSeconds(), 2);
        return html;
    },
    /**
     * 对象长度
     */
    objCount : function(o) {
        var t = typeof (o);
        if (t == 'string') {
            return o.length;
        } else if (t == 'object') {
            var n = 0;
            for (var i in o) {
                n++;
            }
            return n;
        }
        return false;
    },
    /**
     * 对象克隆
     */
    objectClone : function(o) {
        var i = {};
        for (var e in o) {
            if ( typeof o[e] == 'object')
                i[e] = this.objectClone(o[e]);
            else
                i[e] = o[e];
        }
        return i;
    },
    parseRuledetail : function(ruleDetail) {
        var result = [];
        var rule = [];
        temp = ruleDetail.split(':');
        temp[1] = temp[1].substring(1);
        temp[1] = temp[1].substring(0, temp[1].length - 1);
        ruleDetails = temp[1].split(';');
        for (var ix in ruleDetails) {
            rule = ruleDetails[ix].split('=');
            result[rule[0]] = rule[1];
        }
        return result;
    },
    //身份证号验证
    checkCard : function(cardId) {
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (!reg.test(cardId)) {
            return false;
        }
        return true;
    },
    //数组去重
    unique_array : function(arr) {
        var m,
            n = [],
            o = {};
        for (var i = 0; ( m = arr[i]) !== undefined; i++) {
            if (!o[m]) {
                n.push(m);
                o[m] = true;
            }
        }
        return n;
    },
    /**
     * 数组倒置
     * @param array arrayObj:数组
     */
    swap : function(arrayObj) {
        var result = new Array();
        var len = arrayObj.length - 1;
        while (len >= 0) {
            result.push(arrayObj[len--]);
        }
        return result;
    },
    /**
     * 将数组转换为字符串
     * @param array arrayObj:数组
     * @param string sep:分隔符
     */
    arrayToString : function(arrayObj, sep) {
        var result = '';
        if ( typeof (sep) == "undefined") {
            sep = ',';
        }
        var len = arrayObj.length;
        for (var i = 0; i < len; i++) {
            if (i > 0) {
                result += sep + arrayObj[i];
            } else {
                result = arrayObj[i];
            }
        }
        return result;
    },
    /**
     * 获取数组的最大值
     * @param array arr
     */
    getMax : function(arr) {
        return Math.max.apply(this, arr);
    },
    /**
     * 获取数组中的最小值
     * @param array arr
     */
    getMin : function(arr) {
        return Math.min.apply(this, arr);
    },
    round2 : function(x) {
        var f_x = parseFloat(x);
        if (isNaN(f_x)) {
            return false;
        }
        var f_x = Math.round(x * 100) / 100;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    },
    /**
     * 计算时间差
     * 时间格式 年-月-日 小时:分钟:秒
     * @param startTime:开始时间
     * @param endTime:结束时间
     * @param diffType:时间差类型,可选的值有 day,hour,minute,second
     * @returns
     */
    getDateDiff : function(startTime, endTime, diffType) {
        startTime = startTime.replace(/\-/g, "/");
        endTime = endTime.replace(/\-/g, "/");
        diffType = diffType.toLowerCase();
        var sTime = new Date(startTime);
        //开始时间
        var eTime = new Date(endTime);
        //结束时间
        var divNum = 1;
        switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
        }
        return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
    }
};