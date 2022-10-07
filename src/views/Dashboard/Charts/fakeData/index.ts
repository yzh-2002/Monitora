// fake数据（后面替换为mock接口）

export const LineChartData ={
    type:"area",
    height:400,
    options:{
        chart: {
            id: 'support-chart',
            sparkline: {
                enabled: true
            },
            toolbar:{
                show:true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        xaxis:{
            type:"datetime",
            categories:['2022-09-27','2022-09-28','2022-09-29','2022-09-30','2022-10-01','2022-10-02','2022-10-03']
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                format:'dd/MM/yy'
            },
            y: {
                title: 'Ticket '
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            name:"network-00",
            data: [0, 15, 10, 50, 30, 40, 25]
        },
        {
            name:"network-01",
            data: [2, 7, 6, 20, 45, 37, 16]
        },
        {
            name:"network-02",
            data: [19, 22, 34, 55, 23, 46, 4]
        }
    ]
}

export const FanChartData ={
    type: 'donut',
    height:300,
    options: {
        chart: {
            id: 'support-chart',
            sparkline: {
                enabled: true
            },
            toolbar:{
                show:true
            }
        },
        stroke: {
            colors: ['#fff'] //39c5bb
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    },
    labels:["network-00","network-01","network-02"],
    series: [31,27,11],
}