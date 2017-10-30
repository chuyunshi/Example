/*----------------------柱状图-----------------------*/
//坐标轴刻度与标签对齐



$(window).resize(function () {
    aaa();

});
//堆叠条形图
function aaa(){

    var columnar2 = echarts.init(document.getElementById("columnar2"));

    option = {

        title : {
            text: "行业投资额分布图",
            x:'left'
        },

        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['能源领域', '交通运输领域','水利领域','环境保护领域','农业领域','林业领域','重大市政工程领域'],
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['一月','二月','三月','四月','五月','六月','七月']
        },
        series: [
            {
                name: '能源领域',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: '交通运输领域',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '水利领域',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '环境保护领域',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
                name: '农业领域',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [420, 332, 501, 434, 290, 330, 520]
            },
            {
                name: '林业领域',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [453, 587, 665, 474, 852, 424, 752]
            },
            {
                name: '重大市政工程领域',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [456, 787, 572, 636, 752, 354, 1245]
            }
        ]
    };

    columnar2.setOption(option);
};

aaa();





//嵌套环形图
(function(){

    var pie2 = echarts.init(document.getElementById("pie2"));

    option = {

        title : {
            text: "ppp合作模式分布图",
            x: 'center'
        },

        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['MC','O&M','ROT','TOT','BOT','BLT','LOT','BOO']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:398, name:'管理外包', selected:true},
                    {value:1861, name:'特许经营'},
                    {value:335, name:'私有化'}
                ]
            },
            {
                name:'',
                type:'pie',
                radius: ['40%', '55%'],

                data:[
                    {value:251, name:'MC'},
                    {value:147, name:'O&M'},


                    {value:310, name:'ROT'},
                    {value:234, name:'TOT'},
                    {value:134, name:'BOT'},
                    {value:135, name:'BLT'},
                    {value:1048, name:'LOT'},
                    {value:335, name:'BOO'},
                ]
            }
        ]
    };
    pie2.setOption(option);
})();


//饼状图
(function(){

    var pie3 = echarts.init(document.getElementById("pie3"));

    option = {
        title : {
            text: 'PPP项目阶段对比图',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['识别阶段','准备阶段','采购阶段','执行阶段','移交阶段']
        },
        series : [
            {
                name: '',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'识别阶段'},
                    {value:310, name:'准备阶段'},
                    {value:234, name:'采购阶段'},
                    {value:135, name:'执行阶段'},
                    {value:1548, name:'移交阶段'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    pie3.setOption(option);
})();


//南丁格尔玫瑰图
(function(){

    var pie4 = echarts.init(document.getElementById("pie4"));

    option = {
        title : {
            text: '新项目行业分布',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:['能源领域','交通运输领域','水利领域','环境保护领域','农业领域','林业领域','重大市政工程领域']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                //dataView : {show: true, readOnly: false},
                magicType : {
                    //show: true,
                   // type: ['pie', 'funnel']
                },
                //restore : {show: true},
                //saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [

            {
                name:'',
                type:'pie',
                radius : [20, 70],
                center : ['50%', '50%'],
                roseType : 'area',
                data:[
                    {value:10, name:'能源领域'},
                    {value:5, name:'交通运输领域'},
                    {value:15, name:'水利领域'},
                    {value:25, name:'环境保护领域'},
                    {value:20, name:'农业领域'},
                    {value:35, name:'林业领域'},
                    {value:30, name:'重大市政工程领域'}

                ]
            }
        ]
    };

    pie4.setOption(option);
})();