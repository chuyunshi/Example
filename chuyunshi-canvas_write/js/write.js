/**
 * Created by chuyunshi on 17-05-31.
 */
$(document).ready(function(){
    var pageH,pageW;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    var showImg=$("#showImg");
    var isDrawing=false;
    var el = $('#canvas');

    page={
        init:function(){
            page.resize();
            page._touch();

            $('body').on("touchmove",function (e) {
                e.preventDefault();
            });
        },
        resize:function(){
            console.log(111);
            pageW = $(window).width();
            pageH = $(window).height();
            canvas.width = pageW-2;
            canvas.height = pageH/2.5;
            showImg.find('img').css({
                'height': pageH/2.5+'px',
                'width' : pageW-2
            })
        },

        _touch:function(){
            el.on("touchstart",function(e){
                showImg.removeClass('down');
                isDrawing = true;
                ctx.beginPath();
                var touch = e.touches[0];
                ctx.moveTo(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);
            });

            el.on("touchmove",function(e){
                if (isDrawing==true) {
                    ctx.strokeStyle='red';
                    ctx.lineWidth=2;
                    // 重新获取鼠标位置
                    var touch = e.touches[0];
                    var x=touch.pageX - canvas.offsetLeft;
                    var y=touch.pageY - canvas.offsetTop;
                    //画
                    ctx.lineTo(x, y);
                    ctx.stroke();
                };

            })

        },
        saveCanvas: function(){
            console.log(555);
            var img=document.getElementById("img");
            var img1=$('#img');
            img.src=canvas.toDataURL();
            ctx.clearRect(0, 0, pageW-2, pageH/2);
            showImg.css("display","block");
            showImg.addClass('down');
            img1.addClass('dou');
        },
        clearCanvas: function(){
            ctx.clearRect(0, 0, pageW-2, pageH/2);
            showImg.css("display","none");
            showImg.removeClass('down');
        },
    }
    page.init();
})
