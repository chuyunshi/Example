/**
 * Created by zmgz on 2017/10/19.
 */
$(document).ready(function(){
    var pageH,pageW;
    page= {
        init: function () {
            ////��ֹbody����
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
            //������Ļ����
            $(window).scroll(function(event){});
        },
        //ȫ�ֱ�������
        variAble:function(){

        },
        //ͼƬ��ԴԤ����
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
                //������ʾ�˵���
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
                //һ���˵����
                $(".menu-nav1 li").on("click",function(event){
                    var _num = $(this).data("num");
                    $(".menu-list"+_num).show().siblings().hide();
                    $(this).addClass("active").siblings().removeClass("active");
                    event.stopPropagation();
                })
                //�ǰ�ť���ֵ���رղ˵���
                $(".menu-list-box").on("click",function(){
                    $(this).hide();
                    $(".menu_btn").removeClass("menu_btn_active")
                    $('body').off("touchmove");
                })
            }
        },
        //��ҳͼƬ�ֲ�
        _swiper:{
            init:function(){
                page._swiper._run();
            },
            _run:function(){
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: 3000,//��ѡѡ��Զ�����
                    loop : true,
                    autoplayDisableOnInteraction : false
                })
            }
        },
        //��ҳ�Ľ�����������
        _index:{
            init:function(){
                page._index._moveTop()
            },
            //���ص�ҳ�涥��
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