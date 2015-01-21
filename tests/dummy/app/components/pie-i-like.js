import ChartistChart from './chartist-chart';

function getData () {
  return {
    series: [
      ['Chocolate', 'Apple', 'Steak']
    ]
  };
}

var pieChartData = {
  labels: ['Pizza', 'Fish', 'Puppies'],
  series: [
    [40, 25, 25]
  ]
}

export default ChartistChart.extend({
  type: 'pie',
  data: pieChartData
  // init: function () {
  //   this.set('data', pieChartData);
  //   this._super();
  // }
});
