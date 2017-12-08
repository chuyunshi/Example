
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '75px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+";path=/"+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function isWeixin(id)
{
    var url;
    if(navigator.userAgent.toLowerCase().indexOf("micromessenger") > 0)
    {
        return true;
    }else
    {
        if(id != 1)
            url = "http://bang.mbalib.com/question/"+id;
        else
            url = "http://bang.mbalib.com";
        $("#wx-img").html('');
        $("#wx-img").qrcode({
            //render: "table", //table方式
            width: 200, //宽度
            height:200, //高度
            text: "http://bang.mbalib.com/question/"+id //任意内容
        });
        $(".wx-pc").show();
        showBg();
        return false;
    }
}

function showBg()
{
    var width = document.body.clientWidth;
    var height = document.body.scrollHeight;
    document.getElementById("bg").setAttribute('style','display:block;width:'+width+'px;height:'+height+'px;left:0;top:0');
}

function hideBg()
{
    $("#bg").hide();
}

function HTMLEnCode(str)
{
    var    s    =    "";
    if    (str.length    ==    0)    return    "";
    s    =    str.replace(/&/g,    "&amp;");
    s    =    s.replace(/</g,        "&lt;");
    s    =    s.replace(/>/g,        "&gt;");
    s    =    s.replace(/    /g,        "&nbsp;");
    s    =    s.replace(/\'/g,      "'");
    s    =    s.replace(/\"/g,      "&quot;");
//	s    =    s.replace(/\n/g,      " <br>");
    return    s;
}
function HTMLDeCode(str)
{
    var    s    =    "";
    if    (str.length    ==    0)    return    "";
    s    =    str.replace(/&amp;/g,    "&");
    s    =    s.replace(/&lt;/g,        " <");
    s    =    s.replace(/&gt;/g,        ">");
    s    =    s.replace(/&nbsp;/g,        "    ");
    s    =    s.replace(/'/g,      "\'");
    s    =    s.replace(/&apos;/g,      "\'");
    s    =    s.replace(/&#39;/g,      "\'");
    s    =    s.replace(/&#039;/g,      "\'");
    s    =    s.replace(/&quot;/g,      "\"");
    //s    =    s.replace(/ <br>/g,      "\n");
    return    s;
}

//统计回答时提交的时间
function statAnswerSubmitTime(time)
{
    _hmt.push(['_trackEvent', 'answer','submit','time',time]);
}


(function(){
    $(function(){
        $(".wx-close").click(function(){
            hideBg();
            $(".wx-pc").hide();
        });
    });
})();
