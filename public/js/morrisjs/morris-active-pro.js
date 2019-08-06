// Dashboard 1 Morris-chart


Morris.Area({
        element: 'extra-area-chart',
        data: [{
                    period: '2012',
                    Myanmar Foods: 0,
                    Chinese Foods: 0,
                    Thai Foods: 0
                }, {
                    period: '2013',
                    Myanmar Foods: 50,
                    Chinese Foods: 15,
                    Thai Foods: 5
                }, {
                    period: '2014',
                    Myanmar Foods: 20,
                    Chinese Foods: 50,
                    Thai Foods: 65
                }, {
                    period: '2015',
                    Myanmar Foods: 60,
                    Chinese Foods: 12,
                    Thai Foods: 7
                }, {
                    period: '2016',
                    Myanmar Foods: 30,
                    Chinese Foods: 20,
                    Thai Foods: 120
                }, {
                    period: '2017',
                    Myanmar Foods: 25,
                    Chinese Foods: 80,
                    Thai Foods: 40
                }, {
                    period: '2018',
                    Myanmar Foods: 10,
                    Chinese Foods: 10,
                    Thai Foods: 10
                }


                ],
                lineColors: ['#f75b36', '#00b5c2', '#8698b7'],
                xkey: 'period',
                ykeys: ['Myanmar Foods', 'Chinese Foods', 'Thai Foods'],
                labels: ['Myanmar Foods', 'Chinese Foods', 'Thai Foods'],
                pointSize: 0,
                lineWidth: 0,
                resize:true,
                fillOpacity: 0.8,
                behaveLikeLine: true,
                gridLineColor: '#e0e0e0',
                hideHover: 'auto'
        
    });
