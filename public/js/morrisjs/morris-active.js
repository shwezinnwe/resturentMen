// Dashboard 1 Morris-chart

Morris.Area({
    element: 'morris-area-chart',
    data: [{
        period: '2012',
        'Myanmar Foods': 0,
        'Chinese Foods': 0,
        'Thai Foods': 0
    }, {
        period: '2013',
        'Myanmar Foods':400,
        'Chinese Foods':300,
        'Thai Foods': 100
    }, {
        period: '2014',
        'Myanmar Foods': 300,
        'Chinese Foods': 200,
        'Thai Foods': 400
    }, {
        period: '2015',
        'Myanmar Foods': 300,
        'Chinese Foods': 250,
        'Thai Foods': 250
    }, {
        period: '2016',
        'Myanmar Foods': 380,
        'Chinese Foods': 300,
        'Thai Foods': 300
    }, {
        period: '2017',
        'Myanmar Foods': 300,
        'Chinese Foods':250,
        'Thai Foods': 300
    },
    {
        period: '2018',
        'Myanmar Foods': 300,
        'Chinese Foods': 250,
        'Thai Foods': 250
    }],
    xkey: 'period',
    ykeys: ['Myanmar Foods', 'Chinese Foods', 'Thai Foods'],
    labels: ['Myanmar Foods', 'Chinese Foods', 'Thai Foods'],
    pointSize: 0,
    fillOpacity: 0.6,
    pointStrokeColors:['red', 'green', 'blue'],
    behaveLikeLine: true,
    gridLineColor: '#e0e0e0',
    lineWidth:0,
    hideHover: 'auto',
    lineColors: ['red', 'green', 'blue'],
    resize: true

});

Morris.Area({
    element: 'extra-area-chart',
    data: [{
        period: '2012',
        'Myanmar Foods': 0,
        'Chinese Foods': 0,
        'Thai Foods': 0
    }, {
        period: '2013',
        'Myanmar Foods': 400,
                'Chinese Foods': 300,
                'Thai Foods': 330
    }, {
        period: '2014',
        'Myanmar Foods': 300,
        'Chinese Foods': 200,
        'Thai Foods': 350
    }, {
        period: '2015',
        'Myanmar Foods': 380,
        'Chinese Foods': 300,
        'Thai Foods': 300
    }, {
        period: '2016',
        'Myanmar Foods': 400,
        'Chinese Foods':380,
        'Thai Foods': 300
    }, {
        period: '2017',
        'Myanmar Foods': 400,
        'Chinese Foods':380,
        'Thai Foods': 300
    }, {
        period: '2018',
        'Myanmar Foods': 380,
        'Chinese Foods': 250,
        'Thai Foods': 250
    }


    ],
    lineColors: ['red', 'green', 'blue'],
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
