import ChartistChart from './chartist-chart';

export default ChartistChart.extend({
  type: 'pie',
  data: {
    labels: ['Chocolate', 'Apple', 'Pumpkin'],
    series: [30, 15, 65]
  }
});
