/**
 * Created by zmgz on 2017/10/19.
 */
$(document).ready(function(){
    var pageH,pageW;
    page= {
        init: function () {
            ////阻止body滑动
            /*$('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            $('body').off("touchmove");*/
            $(window).resize(function () {
                page.resize();
            });
            page.variAble();
            page.resize();
            //page._swiper.init();
            page._menu.init();
            page._index.init()
            //监听屏幕滑动
            $(window).scroll(function(event){});
        },
        //全局变量集合
        variAble:function(){

        },
        //图片资源预加载
        loading: {
            init: function () {
                page.loading._preload();
            },
            _preload:function(){
                var num = 0;
                var _load_zhen =  $(".load_zhen")
                var manifest = [
                    './img/loading/1.png','./img/loading/pan.png','./img/loading/zhen.png',
                    './img/move_line.png','./img/touch_move.png','./img/turn.png',
                    './img/p1/bg.jpg',
                    './img/p5/1.jpg','./img/p5/2.jpg',
                    './img/p7/bg.jpg','./img/p7/1.jpg',
                ];
                for(var b=1;b<=4;b++){
                    manifest[manifest.length] = './img/p1/0' + b + '.jpg';
                    manifest[manifest.length] = './img/p2/' + b + '.jpg';

                }
                for(var c=1;c<=5;c++){
                    manifest[manifest.length] = './img/p2/0' + c + '.jpg';
                }
                for(var d=1;d<=2;d++){
                    manifest[manifest.length] = './img/p3/' + d + '.jpg';
                    manifest[manifest.length] = './img/p4/' + d + '.jpg';
                    manifest[manifest.length] = './img/p6/' + d + '.jpg';
                }

                for(var i= 1;i<=7;i++){
                    manifest[manifest.length] = './img/menu/' + i + '.png';
                    manifest[manifest.length] = './img/menu/0' + i + '.png';
                }
                for(var j= 1;j<=6;j++){
                    manifest[manifest.length] = './img/loading/' + j + '.png';
                }
                for (var a = 1; a <= 50; a++) {
                    manifest[manifest.length] = './img/car_360_0/' + a + '.png';
                    manifest[manifest.length] = './img/car_360_1/' + a + '.png';
                    manifest[manifest.length] = './img/car_360_2/' + a + '.png';
                    manifest[manifest.length] = './img/car_360_3/' + a + '.png';
                }

                var queue = new createjs.LoadQueue(false);
                // 关键！----设置并发数
                queue.setMaxConnections(10);
                // 关键！---一定要将其设置为 true, 否则不起作用
                queue.maintainScriptOrder = true;

                queue.on("complete", function () {
                    console.log("加载完成!!!");
                    $(".loading").addClass("fadeOut");
                    $(".swiper-container1").show();
                    page.guide.init();

                    page.BGM1.pause();

                    $("#auto_play_pic,.swiper-button").on("touchstart",function(){
                        page.BGM.play();
                    });

                    setTimeout(function () {
                        $(window).scrollTop(1);
                    }, 0);
                    page.BGM.play();
                    wx.getNetworkType({
                        success: function (res) {
                            page.BGM.play();
                        }
                    });

                });
                queue.on("progress", function () {
                    var progress = queue.progress * 100;
                    progress = Math.floor(progress);
                    _load_zhen.css("transform","rotateZ("+(progress*2.55)+"deg)");
                    console.log(progress)



                });
                queue.loadManifest(manifest);
            }
        },
        //所有页菜单点击集合
        _menu:{
            init:function(){
                page._menu._btnclick();
            },
            _btnclick:function(){
                //隐藏显示菜单栏
                $(".menu_btn").on("click",function(){
                    if($(this).hasClass("menu_btn_active")){
                        $(".menu-list-box").hide()
                        $(this).removeClass("menu_btn_active");
                        $('body').off("touchmove");
                    }else{
                        $(".menu-list-box").show()
                        $(this).addClass("menu_btn_active");
                        $(window).scrollTop(0);
                        $('body').on("touchmove", function (e) {
                            e.preventDefault();
                        });
                    }
                });
                //一级菜单点击
                $(".menu-nav1 li").on("click",function(event){
                    var _num = $(this).data("num");
                    $(".menu-list"+_num).show().siblings().hide();
                    $(this).addClass("active").siblings().removeClass("active");
                    event.stopPropagation();
                })
                //二级菜单点击
                $(".menu-list li").on("click",function(event){
                    $(".menu-list li").removeClass("nav_this");
                    $(this).addClass("nav_this");
                })
                //非按钮部分点击关闭菜单栏
                $(".menu-list-box").on("click",function(){
                    $(this).hide();
                    $(".menu_btn").removeClass("menu_btn_active")
                    $('body').off("touchmove");
                })
            }
        },
        //首页图片轮播
        _swiper:{
            init:function(){
                page._swiper._run();
            },
            _run:function(){
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: 3000,//可选选项，自动滑动
                    loop : true,
                    autoplayDisableOnInteraction : false
                })
            }
        },
        //首页的结束方法集合
        _index:{
            init:function(){
                page._index._moveTop()
            },
            //返回到页面顶部
            _moveTop:function(){
                $(".footTop").on("click",function(){
                    $(window).scrollTop(0);
                })
            }
        },
        _news_select:{
            init:function(){
                page._news_select._selectBox_showhide()
                page._news_select._select_btn()
                page._news_select._search_news()

            },
            _selectBox_showhide:function(){
                $(".news-select").on("click",function(){
                    $(".search-box").show();
                    $(window).scrollTop(0);
                    $('body').on("touchmove", function (e) {
                        e.preventDefault();
                    })
                })
                $(".search-box").on("click",function(){
                    $(this).hide();
                    $('body').off("touchmove");
                })
            },
            _select_btn:function(){
               $(".select-list li").on("click",function(){
                   $(this).addClass("select-active").siblings().removeClass("select-active")
                   return false;
               })
            },
            _search_news:function() {
                $(".select-complete").on("click", function () {
                    var arr = []
                    for (var i = 0; i < 3; i++) {
                        arr[i] = $(".select-active").eq(i).text()
                    }
                    console.log(arr)
                    return false;
                })
                $(".select-reset").on("click",function(){
                    $(".select-list .reset").addClass("select-active").siblings().removeClass("select-active")
                    return false;
                })
            }
        },
        _recruitment:{
            init:function(){
                page._recruitment._btnClick()
            },
            _btnClick:function(){
                $(".rec-more").on("click",function(){
                    var _flag = $(this).data("num");
                    $(".rec-list-box").hide();
                    $(".rec-box"+_flag).show();
                    $(window).scrollTop(0);
                });
                $(".backIcon").on("click",function(){
                    $(".rec-list-box").show();
                    $(".rec-boxpub").hide();
                    $(window).scrollTop(0);
                })
            }
        },
        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
        }
    };
    page.init();
});