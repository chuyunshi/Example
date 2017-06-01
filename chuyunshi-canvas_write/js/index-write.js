/**
 * Created by chuyunshi on 17-05-31.
 */
$(document).ready(function(){
    var pageH,pageW;
    var canvas = document.getElementById("canvas");
    var showImg=document.getElementById("showImg");
    var ctx = canvas.getContext("2d");
    var canvas_bak =  document.getElementById("canvas_bak");
    var ctx_bak = canvas_bak.getContext('2d');
    var el_bak = $("#canvas_bak");
    //���ڳ���������
    var cancelList = new Array();
    //�����Ĵ���
    var cancelIndex = 0;
    //��ɫ����ȿ�Ӱ����ʾ��ʶ
    var temp1 = 1;
    var temp2 = 1;
    page={
        init:function(){
            page.resize();
            page.show_hide();
            page.change_bg();
            page.color_change();
            page.width_change();
            page.click_border();
            page.write_touch();
            page.clear();
            page.save();
            //��ֹҳ�滬������Ҫ��΢�Ŵ򿪵�ҳ�����»���������ҳ����Ż���
            $('body').on("touchmove",function (e) {
                e.preventDefault();
            });
            //�����¼�
            $('._left').on("click",function(){
                console.log(cancelList.length)
                console.log(cancelIndex)
                if(cancelIndex < cancelList.length){
                    page.cancel();
                }
            })
            //�������¼�
            $('._right').on("click",function(){
                if(cancelIndex>0){
                    page.next();
                }
            })
        },
        resize:function(){
            console.log(123);
            pageH = $(window).height();
            pageW = $(window).width();
            canvas.height=pageH/2.5;
            canvas.width=pageW-2;
            canvas_bak.height=pageH/2.5;
            canvas_bak.width=pageW-2;
            $("body,.write-content, .write-ul").height(pageH).width(pageW);
            $("#showImg").css({
                "height":pageH/2.5,
                "width":pageW-2
            })

        },
        //����������Ӱ����ʾ���ù����ѱ�ע��
        show_hide:function(){
            var temp=0;
            $(".header").click(function(){
                if(temp==0){
                    $(this).find('img').eq(0).hide();
                    $(this).find('img').eq(1).show();
                    temp=1;
                   // $(".write-content").css('top','0%')
                }else{
                    $(this).find('img').eq(1).hide();
                    $(this).find('img').eq(0).show();
                    $("#showImg").hide();
                    temp=0;
                  //  $(".write-content").css('top','49%')
                }

            })
        },
        change_bg:function(){
            $('.write-ul .li_1').click(function(){
                $(this).addClass("bg").removeClass("bg1");
                $(this).siblings().addClass("bg1").removeClass("bg");

                $(this).find('img').eq(0).show();
                $(this).find('img').eq(1).hide();
                for(var i=0;i<12;i++){
                    $(this).siblings().find('img').eq(2*i+1).show();
                }
            })

        },
        //��ɫѡ���������ʾ
        color_change:function(){
            $(".color").click(function(){
                if(temp1==1){
                    $(".change-color").show();
                    temp1=0;
                }else{
                    $(".change-color").hide();
                    temp1=1;
                }
            })
        },
        //���ѡ�����ʾӰ��
        width_change:function(){
            $(".width").click(function(){
                if(temp2 == 1){
                    $(".change-width").show();
                    temp2 = 0;
                }else{
                    $(".change-width").hide();
                    temp2 = 1;
                }
            })
        },
        //����ѡ�����ɫ����ȼӱ�ʶ��
        click_border:function(){
            $(".change-color li").click(function(){
                $(this).addClass('border3').siblings().removeClass('border3')
            })
            $(".change-width li").click(function(){
                $(this).addClass('borderf').siblings().removeClass('borderf')
            })
        },
        //��д����Ƥ����
        write_touch:function(){
            var _temp=0;
            el_bak.on("touchstart",function(e){
                    $(".change-width").hide();
                    $(".change-color").hide();
                    temp1 = 1;
                    temp2 = 1;
                    $("#showImg").removeClass("up");
                    _temp = 1;
                    var touch = e.touches[0];
                    ctx.beginPath();
                    ctx.moveTo(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);

                });

            el_bak.on("touchmove",function(e){
                console.log(123);
                // ���»�ȡ���λ��
                var touch = e.touches[0];
                var x=touch.pageX - canvas.offsetLeft;
                var y=touch.pageY - canvas.offsetTop;
                //��Ƥ���ܣ�
                if($(".rubber").hasClass('bg')){
                    _temp=0;
                    ctx.clearRect(x-5, y-5 ,10,10);
                }
                if (_temp==1) {
                    //��ȡ��ɫ�ʹ�С
                    var _color=$(".change-color li.border3").attr("data-canvas");
                    var _size=$(".change-width li.borderf").attr("data-canvas");
                    ctx.strokeStyle=_color;
                    ctx.lineWidth=_size;
                    //��
                    ctx.lineTo(x, y);
                    ctx.stroke();
                };


            });
            el_bak.on("touchend",function(){
                var image = new Image();
                image.src = canvas_bak.toDataURL();
                image.onload = function(){
                    ctx.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , pageW-2 , pageH/2.5);
                    page.saveImageToAry();
                }
            });
        },
        //������һ������
        cancel : function(){
            cancelIndex++;
            ctx.clearRect(0,0,pageW-2,pageH/2.5);
            var  image = new Image();
            var index = cancelList.length-1 - cancelIndex  ;
            var url = cancelList[index];
            image.src = url;
            image.onload = function(){
                ctx.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , pageW-2 , pageH/2.5);
            }
        },
        //��������һ������
        next : function(){
            cancelIndex--;
            console.log( cancelIndex);
            ctx.clearRect(0,0,pageW-2,pageH/2.5);
            var  image = new Image();
            var index = cancelList.length-1 - cancelIndex  ;
            var url = cancelList[index];
            image.src = url;
            image.onload = function(){
                ctx.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , pageW-2 , pageH/2.5);
            }
        },
        //������ʷ ���ڳ���
        saveImageToAry:function (){
            cancelIndex = 0;
            var dataUrl =  canvas.toDataURL();
            cancelList.push(dataUrl);
        },
        //�������
        clear:function(){
            $(".clear").click(function(){
                ctx.clearRect(0, 0, pageW-2, pageH/2.5);
                showImg.style.display="none";
                $("#showImg").removeClass("up");
            })

        },
        //���������ͼƬ
        save:function(){
            $(".save").click(function() {
                var img = document.getElementById("img");
                img.src = canvas.toDataURL();
                ctx.clearRect(0, 0, pageW-2, pageH/2.5);
                showImg.style.display = "block";
                $("#showImg").addClass("up");
            });
        },
    }
    page.init();
})