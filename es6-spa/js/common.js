import * as action from '../store/actions'
//import FastClick from 'fastclick'
//FastClick.attach(document.body);

function init(){
    document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + 1 + ', maximum-scale=' + 1 + ', minimum-scale=' + 1 + ', user-scalable=no');
    window.REM=document.documentElement.clientWidth/7.5;
    document.documentElement.style.fontSize = window.REM + 'px';

    window.addEventListener("popstate", function(e) {
        $.urlObj=$Parse(decodeURI(window.location.href))
        if($.pageDirect){
            $.store.dispatch(action.pageGo())
        }else{
            $.store.dispatch(action.pageBack())
        }
    }, false);

    if(localStorage.getItem('openId')){
        $.openId =  localStorage.getItem('openId')
        $.photoUrl = localStorage.getItem('photoUrl')
    }else{
        var ob=$Parse(window.location.href);
        var environment=$.type;         //表明支付宝还是微信
        var code='';                    //授权code 在用户访问授权地址后返回
        if(environment==1){             //环境不同code的key不同，获取授权code
            code=ob.code;
        }else{
            code=ob.auth_code;
        }
        /*$Ajax('commonRestController.do?userInfoGetSuper',{
            environment:environment,
            code:code ? code : '',
            returnUrl:code ? '' :  encodeURIComponent(window.location.href)
        },function(data){
            if(!code){
                window.location.href = decodeURIComponent(data.obj.codeUrl);  //跳转到授权地址授权
            }else{                                      //如果授权完成，即为获取用户信息
                $.openId = data.obj.userId;
                $.photoUrl = data.obj.avatar;
                localStorage.setItem('openId',$.openId);
                localStorage.setItem('photoUrl',$.photoUrl)
            }
        })*/
    }
}

//config
var $=new Object()
$.reqHost='http://192.168.11.49:8452/guahao/wx/' 
$.area=['西院区','东院区','北院区']
$.org=[1,2,3]
$.urlObj=$Parse(decodeURI(window.location.href))
$.hosName=""
$.copyright="Copyright ©2017 深圳医依帮网络技术有限公司"
$.type=(function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(/micromessenger/i.test(ua)){
                return 1;                     //微信
            }else if(/alipayclient/i.test(ua)){
                return 2;                     //支付宝
            }else{
                return 2;
            }
        })()

//页面跳转
function $Go(url){window.location.href=url}

//页面正向翻页
$.pageDirect=0
function $Next(){
    $.pageDirect=1;
    setTimeout(function(){
        $.pageDirect=0
    },300)
}

//Loading
function $Loading(){
    var el=document.createElement('div');
    el.id='loading';
    el.innerHTML='<div class="loadEffect"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>';
    document.getElementsByTagName('html')[0].appendChild(el)
}
$Loading.remove=function(){
    var el=document.getElementById('loading');
    if(el)document.getElementsByTagName('html')[0].removeChild(el)
}

//AJAX请求
function $Ajax(url,obj,fn){
    ajax("post",$.reqHost+url,$Param(obj),fn);
    function ajax(method, url, data, success,err) {
        $Loading();
        var xhr = new XMLHttpRequest();
        if (method == 'get' && data) {
            url += '?' + data;
        }
        xhr.open(method,url,true);
        if (method == 'get') {
            xhr.send();
        } else {
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
        xhr.onreadystatechange = function() {
            if ( xhr.readyState == 4 ) {
                $Loading.remove();
                if ( xhr.status == 200 ) {
                    var data = eval("("+xhr.responseText+")");
                    if(!data.success)alert(data.msg);
                    if(success && data.success)return success( data );
                } else {
                    err && err();
                }
            }
        }
    }
}

//JSON转query
function $Param(obj){
    var arr=[];
    for(var k in obj){
        arr.push(k+'='+encodeURI(obj[k] instanceof Object ? JSON.stringify(obj[k]) : obj[k]));
    }
    return arr.join('&')
}

//query转JSON
function $Parse(string){
    var obj = new Object(),
        strs,
        arr = string.split("#");
    for(var j=0;j<arr.length;j++){
        var line = arr[j];
        if (line.indexOf("?") != -1) {
            line = line.substr(line.indexOf("?") + 1);
            strs = line.split("&");
            for (var i = 0; i < strs.length; i++) {
                var tempArr = strs[i].split("=");
                obj[tempArr[0]] = tempArr[1];
            }
        }
    }
    return obj;
}

//Date对象格式化
function $Time(tDate){
    var tMonth = tDate.getMonth()+1,tDay = tDate.getDate();
    tMonth < 10 ? tMonth = '0' + tMonth: null;
    tDay < 10 ? tDay = '0' + tDay: null;
    return tDate.getFullYear()+'-'+tMonth+'-'+tDay
}

//给支付平台坑爹接口擦屁股
function $Fuck(a){
    if(typeof a.length == 'undefined' && typeof a != 'number'){
        return [a]
    }else{
        return a
    }
}

init()

export {$,$Go,$Loading,$Ajax,$Param,$Parse,$Time,$Fuck,$Next}