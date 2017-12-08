/**
 *
 */
function sharetopic(id) {
    $(id).share({
        count : 5,
        hasText : false,
        padding : 2,
        appkeys : {
            sina : '2932665024',
            qq : '6d3014d0235a40539d258f32d8cb20c5'
        }
    });
}
/**
 * 设置弹出菜单 require: jquery.popmenu.js
 */
function renderPopupMenu() {
    $(".set-up-ico").popupmenu({
        target : ".set-up-menu",
        time : 300
    });

    $(".class-ico").popupmenu({
        target : ".class-ico-cont",
        time : 500,
        speed : 0
    });

    /*$("#top-menu-user").popupmenu({
        target : "#top-box-user",
        time : 500,
        speed : 0
    });
    $("#top-menu-class").popupmenu({
        target : "#top-box-class",
        time : 500,
        speed : 0
    });
    $("#top-menu-search").popupmenu({
        target : "#top-box-search",
        time : 500,
        speed : 0
    });*/
}


/**
 * 资讯审核
 */
function audit(id, status, flag, comment) {
    var params = "id=" + id + "&status=" + status;
    if (typeof (flag) != 'undefined')
        params += "&flag=" + flag;
    if (typeof (comment) != 'undefined')
        params += "&comment=" + comment;
    $.ajax({
        type : 'POST',
        url : '/services/audit',
        dataType : "json",
        data : params,
        success : function(data) {
            if (data.status == 'success') {
                $('#status-' + id).text(data.message);
                $('#status-' + id).attr('class',
                    'status article-status-' + data.value);
            } else {
                alert(data.message);
            }
        }
    });
    return false;
}
function auditPublished(key, title) {
    if (confirm(title)) {
        audit(key, 'published');
    }
}
function auditDiscard(key, title) {
    $('#discard-title').text(title);
    $('#discard-form').dialog({
        modal : true,
        resizable : false,
        width : 400,
        buttons : {
            '取消' : function() {
                $('#discard-form').dialog('close');
            },
            '确认' : function() {
                // submit;
                var flag = $('input[name=problem]:checked').val();
                if (typeof (flag) != 'undefined') {
                    var comment = $('#comment').val();
                    audit(key, 'discard', flag, comment);
                    $('#discard-form').dialog('close');
                } else {
                    alert("请选择删除原因!");
                }
            }
        }
    });
}
/**
 * 日期格式化(将ymdhis格式化为y-m-d h:i)
 */
function dateformat(date) {
    var y = date.substring(0, 4);
    var m = date.substring(4, 6);
    var d = date.substring(6, 8);

    var h = date.substring(8, 10);
    var i = date.substring(10, 12);
    return y + '-' + m + '-' + d + ' ' + h + ':' + i;

}

/**
 * 上传图片路径转换
 */
function changedir(img)
{
    return img ? img.substr(0,4) + '/' + img.substr(4,4) + '/'+ img : '';
}

/**
 * html实体转化
 */
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
    s    =    str.replace(/&gt;/g,    "&");
    s    =    s.replace(/&lt;/g,        " <");
    s    =    s.replace(/&gt;/g,        ">");
    s    =    s.replace(/&nbsp;/g,        "    ");
    s    =    s.replace(/'/g,      "\'");
    s    =    s.replace(/&quot;/g,      "\"");
    s    =    s.replace(/ <br>/g,      "\n");
    return    s;
}

/**
 * 搜索
 */

function search() {
    var name = $(".search-text").val();
    name = $.trim(name);
    location.href = "/search/"+name;
}



/*
 * 标签云页面
 */
var perpos = 0;
function getpos()
{
    var pwidth = $(".tc-slide-wrap").width();
    var bwidth = parseInt($(".tc-slide-btn").css('left')) + 20;
    perpos = Math.round(Number(bwidth)*100/(Number(pwidth)));
    var lpos = pwidth-bwidth;
    if(bwidth==20)
    {
        perpos = 0;
    }else if(lpos==20)
    {
        perpos = 100;
    }

    //只获取相关时间点（去掉即所有时间）
    if(perpos>=0 && perpos<11)
    {
        perpos = 0;
        tagStyle('day');
    }else if(perpos>=11 && perpos<31)
    {
        perpos = 22;
        tagStyle('couple');
    }else if(perpos>=31 && perpos<50)
    {
        perpos = 41;
        tagStyle('week');
    }else if(perpos>=50 && perpos<70)
    {
        perpos = 60;
        tagStyle('month');
    }else if(perpos>=70 && perpos<89)
    {
        perpos = 79;
        tagStyle('year');
    }else
    {
        perpos = 100;
        tagStyle('all');
    }
    changepos(perpos);



    /*$.post("/services/tagcloud",{perpos:perpos},function(result){
        var str = '';
        for(var i in result)
    {
        str+= "<li><a href='/tag/"+i+"' style='background:rgba(0,128,255,"+result[i].po+");'>"+result[i].tag+"</a></li>";
    }
    $(".tag-cloud-list").html(str);
    },'json');*/
}

function tagStyle(type)
{
    $("#tag-cloud-list a").each(function(){
        var po = $(this).data(type);

        if(po>0.5)
            $(this).css('color',"#fff");
        else
            $(this).css('color',"#38485a");
        $(this).css('background-color',"rgba(250,118,66,"+po+")");


        var fontsize = Number(po)*20  + 10+ 'px';

        if(po>0) $(this).show(); else $(this).hide();
        $(this).animate({
            fontSize:fontsize
        },500);
    });
}

function changepos(perpos)
{
    var cleft = 0;
    var pwidth = $(".tc-slide-wrap").width();
    if(perpos!= 0 && perpos!=100)
        cleft = (0.01*perpos*pwidth - 20);
    if(Number(perpos) == Number(100))
    {
        cleft = pwidth-40;
    }
    $(".tc-slide-btn").css('left',cleft);
}

function jumppos(event)
{
    var mountx = event.pageX;//鼠标左坐标
    var slidex = $(".tc-slide-wrap")[0].offsetParent.offsetLeft;//div左坐标
    var buttonx = Number(mountx) - Number(slidex) - 20;//按钮相对于div left坐标
    $(".tc-slide-btn").css('left',buttonx);
    getpos();
}

function touch (event){
    var event = event || window.event;
    var btnleft = 0;
    var pwidth = $(".tc-slide-wrap").width();
    switch(event.type){
        case "touchstart":
            break;
        case "touchend":
            getpos();
            break;
        case "touchmove":
            event.preventDefault();
            btnleft = event.touches[0].clientX - 40>=0 ? event.touches[0].clientX - 40 : 0;
            btnleft = event.touches[0].clientX - 40>=pwidth ? pwidth : event.touches[0].clientX - 40;
            $("#tc-slide-btn").css('left',btnleft+'px');
            break;
    }
}

/**
 * 批量反选
 */
function mulcheck(mul)
{
    mul.each(function(){
        $(this).prop("checked", !$(this).prop("checked"));
    });
}

function indexOf(arr, item) {
    return Array.prototype.indexOf ? Array.prototype.indexOf.call(arr, item) : function (arr, item) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    }.call(arr, arr, item)
}


/*
 * 首页
 */
//加载更多资讯
var showid = new Array();//用于防止加载更多出现相同资讯
function moreArticle(){
    var start = Number($("#article_num").val());
    var $this = $(this);
    $(this).removeClass('loading-ar');

    if(showid.length == 0)
    {
        $(".latest-article-title a").each(function(){
            var href= $(this).attr('href');
            var href_arr = href.split("/");
            showid.push(href_arr[2]);
        });
    }
    $(".loading-now").show();
    $(".loading-bd").hide();
    $.post("/services/articleLatest",{start:start},function(result){
        if(!$.isEmptyObject(result))
        {
            var str = '';
            for(var i in result)
            {
                //if(showid.indexOf(result[i].id) != -1) continue;
                if(indexOf(showid,result[i].id) != -1) continue;
                showid.push(result[i].id);
                var createtime = dateformat(result[i].time);
                if(result[i].image_type != 2)
                {
                    var strArr = new Array();
                    strArr = result[i].image.split(".");
                    result[i].image = '<img  data-url="'+result[i].image+'" data-urlsmall="'+result[i].smallimage+'" src="http://static.mbalib.com/news/images/blank.gif"/>';
                }else
                {
                    result[i].image = '<img src="http://static.mbalib.com/news/images/blank.gif" data-url="http://static.mbalib.com/news/images/article_default.jpg" data-urlsmall="http://static.mbalib.com/news/images/article_default.jpg"/>';
                }
                result[i].summary = HTMLEnCode(result[i].summary);
                str +='<div class="latest-article">'+
                    '<div class="latest-article-img">'+
                    '<a href="javascript:void(0)" name="'+result[i].id+'"  class="love-ico-wh love-ico-bl">'+
                    '<i class="love14-ico">'+result[i].votes+'</i>'+
                    '<em class="zan-num">+1</em>'+
                    '</a>'+
                    '<a target="_blank" href="story/'+result[i].id+'" title="" class="img">'+result[i].image+'</a>'+
                    '</div>'+
                    '<div class="latest-article-hd">'+
                    '<h3 class="latest-article-title"><a  target="_blank"  href="story/'+result[i].id+'" title="'+result[i].title+'">'+result[i].title+'</a></h3>'+
                    '<ul class="latest-article-list">';

                //原创判断
                if(result[i].original == 1) {
                    str += '<li><span class="yc-btn">原创</span></li>';
                }

                str	+='<li><span>•</span><a   href="people/'+result[i].user+'">'+result[i].user+'</a></li>'+
                    '<li><span>•</span><a    href="category/'+result[i].category+'">'+result[i].category+'</a></li>'+
                    '<li><span>•</span>'+createtime+'</li>'+
                    '<li><span>•</span>'+result[i].comments+'条评论</li>'+
                    '</ul>'+
                    '<p class="latest-article-cont">'+result[i].summary+'</p>'+
                    '</div>'+
                    '</div>';
            }
            var num = Number(result.length) + Number(start);
            $(".loading-cl").before(str);
            $("#article_num").val(num);
        }else
        {
            $(".loading-bd a").html('没有更多资讯了');
        }
        $(".loading-now").hide();
        $(".loading-bd").show();
        $this.addClass('loading-ar');
        var shownum = start - 1;
        var attr = "data-url";
        if($(window).width()<=320)
        {
            attr = "data-urlsmall";
        }
        $(".img:gt("+shownum+") img").scrollLoading({
            'attr':attr
        });
    },'json');
}


/*
 * 每周精读
 */
//上一年
function lastyear(){
    var year = $(".email-file-column .input").html();
    year = year-1;
    if(year <= 2007) year = 2007;
    $(".email-file-column .input").html(year);
    $("#next-r").addClass('next-r');
    $("#next-r").removeClass('next-r-no');
    changeWeeks(year);

}
//下一年
function nextyear(){
    var currentyear = $("#cyear").val();
    var year = $(".email-file-column .input").html();
    year = $.trim(year);
    if(year==currentyear)
        return false;
    if(Number(year)==Number(currentyear)-1)
    {
        $("#next-r").addClass('next-r-no');
        $("#next-r").removeClass('next-r');
    }
    year = Number(year) + Number(1);
    $(".email-file-column .input").html(year);
    changeWeeks(year);
}

function changeWeeks(year)
{
    var cweek = $("#cweek").val();//当前周
    $.post("/services/getWeeks",{year:year},function(result){
        var str = '';
        for(var i in result)
        {
            if(result[i]==cweek)
            {
                var cl = 'selected';
            }else
            {
                var cl= '';
            }

            str += '<li><a href="/featured/'+result[i]+'" class="email-week '+cl+'">'+result[i]+'</a></li>';
        }
        $(".email-file-list").html(str);
    },'json');
}
//订阅，退订
function subemail(){
    var name = $(this).attr('name');
    var $this = $(this);
    $.post('/services/changeSubscribed',{sub:name},function(result){
        if(result.state==1)
        {
            if(name==0)
            {
                $this.attr('value','订阅');
                $this.attr('name',1);
                $("#sub-state").html('&nbsp;&nbsp;您还未订阅推荐邮件');
                alert('退订成功');
            }else
            {
                $this.attr('value','退订');
                $this.attr('name',0);
                $("#sub-state").html('&nbsp;&nbsp;您已订阅了推荐邮件');
                alert('订阅成功');
            }
        }else
        {
            alert(result.info);
        }
    },'json');
}

/**
 * 文章详细页，评论
 */

//滚动条下拉，右侧边栏自适应高度位置(需侧栏绝对定位)
function sidebarAutoPosizion()
{
    var content_top = $(".content").offset().top;
    var scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
    if(scroll_top<=content_top)
    {
        $(".sidebar-wrap").css('top',content_top-scroll_top);
        return false;
    }
    var sidebar_height = $(".sidebar-wrap").height();//右侧栏高度
    var body_height = document.body.scrollHeight-window.screen.availHeight;
    var content_height =  $(".content").height(); //内容页高度
    //var sidebar_offset = Math.round(Number(content_height-sidebar_height) * Number(scroll_top) /Number(body_height)) - content_top;
    var sidebar_offset =  -Math.round(Number(content_top+sidebar_height-window.screen.availHeight) * Number(scroll_top) /Number(body_height));
    //	var sidebar_offset = $(".sidebar-wrap").css('margin-top');
    //$(".weixin p").html('ct:'+body_height+',cp:'+scroll_top+',s:'+sidebar_height+',sp:'+sidebar_offset);
    //var sidebar_top = scroll_top - sidebar_offset;
    $(".sidebar-wrap").css('top',sidebar_offset+'px');
}
//收藏
function collectArticle(){
    var $this = $(this);
    $.post("/services/collect",{article_id:wgArticleId},function(result){
        if(result.state==1)
        {
            $("#faver-num").html("已收藏");
            $("#faver-num").attr("style",'');
            $("#faver-num").show();
            $("#faver-num").stop().animate({top:"-50px",opacity:"0"},'slow');
            var count = $("#collect_count").html();
            count = Number(count) + 1;
            $("#collect_count").html(count);
            $this.addClass('faver-ico-sel');
            $this.removeClass('faver-ico-normal');
        }
        else
        {
            $("#faver-num").html(result.info);
            $("#faver-num").attr("style",'');
            $("#faver-num").show();
            $("#faver-num").stop().animate({top:"-50px",opacity:"0"},'slow');
        }
    },'json');
}

//取消收藏
function cancelFavoriteDetail()
{
    var $this = $(this);
    $.post("/services/removeFavorite",{article_id:wgArticleId},function(result){
        if(result.state==1)
        {
            $("#faver-num").html("取消收藏");
            $("#faver-num").attr("style",'');
            $("#faver-num").css("background",'#4F5F6E');
            $("#faver-num").show();
            $("#faver-num").stop().animate({top:"-50px",opacity:"0"},'slow');
            var count = $("#collect_count").html();
            count = Number(count) - 1;
            $("#collect_count").html(count);
            $this.addClass('faver-ico-normal');
            $this.removeClass('faver-ico-sel');
        }
        else
        {
            $("#faver-num").html(result.info);
            $("#faver-num").attr("style",'');
            $("#faver-num").show();
            $("#faver-num").stop().animate({top:"-50px",opacity:"0"},'slow');
        }
    },'json');
}

//显示隐藏分享
function showShare()
{
    var load =  $("#sharearticle").attr('load');
    if(load==0)
    {
        window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"【"+wgArticleTitle +"】"+wgArticleSummary +"","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
        $("#sharearticle").attr('load',1);
    }
    if($("#sharearticle").is(":hidden"))
        $("#sharearticle").show();
    else
        $("#sharearticle").hide();
}
//提交评论
function commentSubmit(){
    $(this).attr('disabled','disabled');
    var comment = $("#scomment").val();
    var et = $("#comment_et").val();
    if(!$.trim(comment))
    {
        alert('内容不能为空');
        $(this).removeAttr('disabled');
        return false;
    }
    $.post("/services/comment",{et:et,article_id:wgArticleId,comment:comment},function(result){
        alert(result.info);
        if(result.state==1)
        {
            $("#scomment").val('');
            location.reload();
        }
        if(result.token)
        {
            $("#comment_et").val(result.token);
        }
        $(".button").removeAttr('disabled');
    },'json');
}

//评论喜欢
function commentlove(){
    if(typeof(wgArticleId) == "undefined")
        wgArticleId = 0;
    var comment_id = $(this).attr('name');
    var $this = $(this);

    //检查是否赞过
    var state = $this.attr('state');
    if (state == 'voted'){
        alert('您已经赞过该留言了');
        return;
    }
    $(this).attr('state','voted');

    var reply_uid = $(this).attr('uid');
    $.post("/services/commentvote",{reply_uid:reply_uid,article_id:wgArticleId,comment_id:comment_id},function(result){
        if(result.state==1)
        {
            var vote = Number($(".love-people-"+comment_id).html())+1;
            $(".love-people-"+comment_id).html(vote);
            $this.removeClass('love-ico');
            $this.addClass('love-ico-sel');
        }else
        {
            alert(result.info);
        }
    },'json');
}

//删除评论
function commentdelete()
{
    if(confirm('您确定要删除该评论吗？'))
    {
        var id = $(this).attr('name');
        var $this = $(this);
        $.post('/services/commentDelete',{id:id},function(result){
            if(result.state==1)
            {
                $this.parents(".comment").remove();
            }else
            {
                alert(result.info);
            }
        },'json');
    }
}

/**
 * 文章列表投票
 */
function vote()
{
    var $this = $(this);

    //检查是否赞过
    var state = $this.attr('state');
    if (state == 'voted'){
        animateVoteFailure($this.children('.zan-num'),'您已经赞过');
        return;
    }
    $(this).attr('state','voted');

    var article_id = $this.attr('name');
    $.post("/services/articlevote",{article_id:article_id},function(result){
        if(result.state==1)
        {
            animateVoteSuccess($this);
        }else
        {
            animateVoteFailure($this.children('.zan-num'),result.info);
        }
    },'json');
}
function animateVoteSuccess(o){
    o.children('.zan-num').show();
    o.children('.zan-num').stop().animate({top:"-50px",opacity:"0"},'slow');
    var vote = Number(o.children('.love14-ico').html())+1;
    o.children('.love14-ico').html(vote);
}
function animateVoteFailure(o,info){
    o.attr('style','');
    o.css("width",'85px');
    o.css("left",'0px');
    o.html(info);
    o.show();
    o.stop().animate({top:"-50px",opacity:"0"},'slow');
}

//文章喜欢
function articlelove(){
    var $this = $(this);

    //检查是否赞过
    var state = $this.attr('state');
    if (state == 'voted'){
        animateVoteFailure($("#zan-num"),'您已经赞过');
        return;
    }
    $(this).attr('state','voted');

    $.post("/services/articlevote",{article_id:wgArticleId},function(result){
        if(result.state==1)
        {
            $("#zan-num").show();
            $("#zan-num").stop().animate({top:"-50px",opacity:"0"},'slow');
            var vote = Number($this.html())+1;
            $this.html(vote);
            $this.addClass('sel');
        }else
        {
            animateVoteFailure($("#zan-num"),'您已经赞过');
        }
    },'json');
}

//回复他人的回复
function commentreply(){
    var lo = $(this).children("span").html();
    var name = $(this).parent().siblings('a').html();
    var str = '#'+lo+'  @'+name+' ';
    $("#scomment").val(str);
}
function replyReplace(str)
{
    var linkstr = str.replace(/(@)(([a-zA-Z_0-9]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3]){0,30}) /,"<a href='/people/$2'>$1$2 </a>");
    return replaceStr = linkstr.replace(/#(\d+)楼/,"<a href='#c$1'>#$1楼</a>");
}

//加载评论
function commentload(){
    if($(".loading-bd a").html()=='没有更多评论了')
        return false;
    var $this = $(this);
    $(this).removeClass('loading-co');
    var start = $("#comment_num").val();
    var upload = $("#avatar_dir").val();
    $(".loading-now").show();
    $(".loading-bd").hide();
    $.post("/services/commentLatest",{article_id:wgArticleId,start:start},function(result){
        if(!$.isEmptyObject(result))
        {
            var str = '';
            var j = start;
            for(var i in result)
            {
                var createtime = dateformat(result[i].time);
                var subavatar = result[i].avatar;
                var strArr = new Array();
                if(result[i].avatar)
                    strArr = subavatar.split(".");
                j = Number(j) + Number(1);
                result[i].avatar = changedir(result[i].avatar);
                result[i].content = HTMLEnCode(result[i].content);
                result[i].content = replyReplace(result[i].content);
                if(result[i].avatar=='useruploaded')
                {
                    var img = '<img src="/avatars/user_uploaded/'+result[i].user_name+'" width=50 height=50>';
                }
                else if(result[i].avatar)
                {
                    var img = '<img src="/uploads/thumb/avatar/'+result[i].avatar+'/50px-'+strArr[0]+'.jpg" width=50 height=50>';
                }else
                {
                    var img = '<img src="http://static.mbalib.com/news/images/avatar-50.png">';
                }

                if(wgUserId == result[i].user_id || wgUserType == 'god' || wgUserType == 'admin')
                {
                    var deletecomment = '<a name="'+result[i].id+'" href="javascript:void(0)" class="delete-ico"></a>';
                }else
                {
                    var deletecomment = '';
                }

                var love = 'love-ico';
                //var createtime = dateformat(result[i].article_createtime);
                str += '<div class="comment" name="c'+j+'" id="c'+j+'">'+
                    '<a href="/people/'+result[i].user_name+'" class="avatar">'+img+'</a>'+
                    '<div class="comment-wrapper">'+
                    '<div class="comment-head">'+
                    '<div class="comment-head-r">'+
                    '<a href="javascript:void(0)" class="'+love+'" name="'+result[i].id+'" uid="'+result[i].user_id+'"><span><span class="love-people-'+result[i].id+'">'+result[i].votes+'</span>人点赞</span></a>'+
                    '<a href="#vcontent" class="reply-ico"><span>'+j+'楼</span></a>'+deletecomment+
                    '</div>'+
                    '<a href="/people/'+result[i].user_name+'" class="comment-head-name">'+result[i].user_name+'</a>'+
                    '</div>'+
                    '<p class="comment-cont">'+result[i].content+'</p>'+
                    '<p class="comment-bottom">'+createtime+'</p>'+
                    '</div>'+
                    '</div>';
            }
            var num = Number(result.length) + Number(start);
            $(".loading-cl").before(str);
            $("#comment_num").val(num);
        }else
        {
            $(".loading-bd a").html('没有更多评论了');
        }
        $(".loading-now").hide();
        $(".loading-bd").show();
        $this.addClass('loading-co');
    },'json');
}

//复制到剪贴板
function copyToClipBoard()
{
    if(window.clipboardData)
    {
        clipboardData.setData('Text',wgArticleTitle+'\r\n\r\n'+wgArticleSummary+'\r\n\r\n'+wgArticleUrl);
        alert('复制成功');
    }else
    {
        prompt("非IE浏览器，请手动复制下面文字",wgArticleTitle+wgArticleSummary+wgArticleUrl);
    }
}

//判断PC
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


//个人主页取消收藏
function cancelFavorite()
{
    var article_id = $(this).attr('name');
    $.post("/services/removeFavorite",{article_id:article_id},function(result){
        alert(result.info);
        if(result.state == 1)
            location.reload();
    },'json');
}

//详情页JS调用
function renderArticleDetail()
{
    $(".button").click(commentSubmit);
    $(".loading-co").click(commentload);
    $(document).on('click','.faver-ico-normal',collectArticle);
    $(document).on('click','.faver-ico-sel',cancelFavoriteDetail);
    $(document).on('click','.delete-ico',commentdelete);
    $(document).on('click','.comment-head-r .love-ico',commentlove);
    $(document).on('click','.article-vote',articlelove);
    $(document).on('click','.reply-ico',commentreply);
    $("#share-ico-normal").click(showShare);
    $(".single-post-comment__comments .comment-cont").each(function(){
        var str = $(this).html();
        var replaceStr = replyReplace(str);
        $(this).html(replaceStr);
    });
    var pc = isPC();
    if(pc)
    {
        var clip = new ZeroClipboard(document.getElementById("copy-ico-normal"), {
            moviePath: "/js/ZeroClipboard.swf",
            useNoCache: false,
        });

        var suffix = "（更多要闻请下载进入MBA智库资讯APP查询 http://www.mbalib.com/apps/news/）";
        $("#copy-ico-normal").attr("data-clipboard-text",wgArticleTitle + suffix +'\r\n\r\n'+wgArticleSummary+'\r\n\r\n'+wgArticleUrl);
        clip.on( 'complete', function(client, args) {
            $("#copy-num").html("复制成功");
            $("#copy-num").attr("style",'');
            //$("#copy-num").css("left",'0px');
            $("#copy-num").show();
            $("#copy-num").stop().animate({top:"-50px",opacity:"0"},'slow');
        } );
    }else
    {
        $("#copy-ico-normal").click(copyToClipBoard);
    }
    $(document).bind("click",function(e){
        var target = $(e.target);
        if(target.closest("#share-ico-normal").length == 0){
            $("#sharearticle").hide();
        }
    });

    //右侧边栏滚动条滚动到一定位置固定位置
    var sidetop = $(".midright").offset().top;
    var sideheight = $(".midright").height();
    $(window).scroll(function () {
        var scrolltop = $(document).scrollTop();
        var wheight = $(window).height();
        if(sidetop<=scrolltop && sideheight<wheight)
            $(".midright").addClass('sidebar-fixed');
        else
            $(".midright").removeClass('sidebar-fixed');
    });
}

/**
 * 新建修改文章页
 */
//输入框剩余字数提示
function summaryWords()
{
    var str = $(".textarea2").val();
    var num = 300-bytenumber(str);
    if(num>=0)
    {
        $("#summaryNotice").html("还可以输入<span style='color:red'>"+num+"</span>个字符");
    }
    else
    {
        num = Math.abs(num);
        $("#summaryNotice").html("已超出<span style='color:red'>"+num+"</span>个字符");
    }
}
function bytenumber(str)
{
    var byteLen=0,len=str.length;
    if(str){
        for(var i=0; i<len; i++){
            if(str.charCodeAt(i)>255){
                byteLen += 3;
            }
            else{
                byteLen++;
            }
        }
        return byteLen;
    }
    else{
        return 0;
    }
}

//获取相似文章
function similarArticle()
{
    var title = $(this).val();
    var id = $("#id").val();
    if(title.length>5)
    {
        $.post("/services/similarArticle",{title:title,id:id},function(result){
            if(!$.isEmptyObject(result))
            {
                var str = '<div class="similarlist"><span class="title">已存在相似标题的文章：</span><ul class="tagname-list">';
                for(var i in result)
                {
                    str+= '<li><a target="_blank"  href="/story/'+result[i].id+'">'+result[i].title+'</a></li>';
                }
                str+='</ul></div>';
            }else
            {
                str = '';
            }
            $('#title-list').html(str);
        },'json');
    }else
    {
        $('#title-list').html('');
    }
}

//验证原链接是否存在
function verifySource()
{
    var source = $(this).val();
    var id = $("#id").val();
    if(source.length>0)
    {
        $.post("/services/verifySource",{source:source,id:id},function(result){
            var articles = result.articles;
            if(!$.isEmptyObject(articles))
            {
                var str = '<div class="similarlist"><span class="title">已存在相同源链接的文章：</span><ul class="tagname-list">';
                for(var i in articles)
                {
                    str+= '<li><a target="_blank"  href="/story/'+articles[i].id+'">'+articles[i].title+'</a></li>';
                }
                str+='</ul></div>';
            }else
            {
                str = '';
            }
            $('#source-list').html(str);
            if(result.domain)
            {
                $("#source-info").html("已匹配来源:"+result.domain);
            }else
            {
                $("#source-info").html("未匹配来源");
            }
        },'json');
    }else
    {
        $('#source-list').html('');
    }
}


/**
 * 调整到更改头像页面
 */
function jumpavatar()
{
    location.href="/user/avatar";
    return false;
}

$(function(){
    $(".search-button").click(search);
    $('.search-text').keydown(function(e){
        if(e.keyCode==13){
            search();
        }
    });

    /**
     * 手机顶部MENU显示隐藏
     */
    $("#top-menu-user").click(function(){
        var st = $("#TopNav").attr('style');
        if(!st)
        {
            $("#TopNav").attr('style','display:block');
            $("#top-box-class,.wrap-m,.l-nav-wrap").attr('style','');
        }else
        {
            $("#TopNav").attr('style','');
        }
    });
    $("#top-menu-search").click(function(){
        var st = $(".wrap-m").attr('style');
        if(!st)
        {
            $(".wrap-m").attr('style','display:block');
            $("#top-box-class,#TopNav,.l-nav-wrap").attr('style','');
            $(".search-text").focus();
        }else
        {
            $(".wrap-m").attr('style','');
        }

    });
    $("#top-menu-class").click(function(){
        var st = $("#top-box-class").attr('style');
        if(!st)
        {
            $("#top-box-class").attr('style','display:block');
            $(".wrap-m,#TopNav,.l-nav-wrap").attr('style','');
        }else
        {
            $("#top-box-class").attr('style','');
        }
    });
    $("#top-menu-home").click(function(){
        var st = $(".l-nav-wrap").attr('style');
        if(!st)
        {
            $("#top-box-class,.wrap-m,#TopNav").attr('style','');
            $(".l-nav-wrap").attr('style','display:block');
        }else
        {
            $(".l-nav-wrap").attr('style','');
        }
    });

    /**
     * 回到顶部
     */
    $(".backToTop").click(function(){
        scroll(0,0);
    });

    window.onscroll = function(){
        var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if(winScroll!=0)
            $(".backToTop").show();
        else
            $(".backToTop").hide();
    }
})

