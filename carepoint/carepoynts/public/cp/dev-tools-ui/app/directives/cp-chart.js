angular.module('cp-directives', ['chart.js']).directive('cpChart', function () {
    return {
        restrict: 'E',
        scope: {
            cpChartType: '@',
            cpChartData: '=',
            cpChartLabels: '=',
            cpChartOptions: '=',
            cpChartSeries: '@',
            cpChartColors: '@',
            cpChartDatasetOverride: '@'
        },
        template: '<div id="chartElem" class="" ng-if="cpChartData">' +
        '<canvas id="bar2" class="chartBase" chart-type="cpChartType" chart-data="cpChartData" chart-labels="cpChartLabels" chart-options="cpChartOptions"' +
        'chart-colors="cpChartColors" chart-series="cpChartSeries" chart-dataset-override = "cpChartDatasetOverride">' +
        '</canvas>' +
        '</div>',
        link: function (scope, element, attr) {
            scope.cpChartColors = scope.cpChartColors ? scope.cpChartColors : ['#5cb4c1']; //Primary color of Carepoynt App
            if (scope.cpChartType === 'line') {
                scope.cpChartDatasetOverride = scope.cpChartDatasetOverride ? scope.cpChartDatasetOverride : [{ fill: false }];
            }
        }
    }

});