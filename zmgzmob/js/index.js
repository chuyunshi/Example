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
            page._index.init()
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
        //����ҳ�˵��������
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