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
                console.log(123123);
            }
        },
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

        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
        }
    };
    page.init();
});