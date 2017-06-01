/**
 * Created by admin on 2017/5/25.
 */
$(document).ready(function(){
    var pageH,pageW;
    page= {
        init: function () {
            ////阻止body滑动
            $('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            window.addEventListener("touchstart", function (e) {
                //e.preventDefault();
            });

            $(window).resize(function () {
                page.resize();
            });

            page.resize();
            page.canVas.init();

        },
        canVas:{
            init:function(){
              page.canVas._canvas();
            },
            //重点在这里！！！
            //调用插件
            _canvas:function(){
                $("#canVas").lizi({
                    window_width: pageW,//页面宽
                    window_height: pageH,//页面高
                    window_background: '#00113F',//背景色
                    star_count: '1000',//粒子数目
                    star_color: '#FBFFAF',//粒子颜色
                    star_depth: '300'//这个值，你猜是干嘛的，随便调调你就知道了。
                });
            }

        },

        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $('canvas').attr('width', pageW).attr('height', pageH)
        }
    };
    page.init();
});