/**
 * Created by admin on 2017/5/25.
 */
$(document).ready(function(){
    var pageH,pageW;
    page= {
        init: function () {
            ////��ֹbody����
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
            //�ص����������
            //���ò��
            _canvas:function(){
                $("#canVas").lizi({
                    window_width: pageW,//ҳ���
                    window_height: pageH,//ҳ���
                    window_background: '#00113F',//����ɫ
                    star_count: '1000',//������Ŀ
                    star_color: '#FBFFAF',//������ɫ
                    star_depth: '300'//���ֵ������Ǹ���ģ����������֪���ˡ�
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