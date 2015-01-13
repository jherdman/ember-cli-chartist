import ChartistChart from './chartist-chart';

function getData () {
  return {
    labels: [
      'Salmon', 'Yellowtail', 'Dolphin', 'Cow'
    ],
    series: [
      ['2', '8', '3', '9']
    ]
  };
}

export default ChartistChart.extend({
  init: function () {
    this.set('data', getData());
    this._super();
  },

  ratio: 'ct-minor-seventh',
  options: {
    showPoint: false,
    axisY: {
      offset: 0,
      showLabel: false,
      showGrid: true,
    },
    axisX: {
      showGrid: false,
    }
  },

  responsiveOptions: [
    ['screen and (min-width: 640px)', {
      showPoint: true,
      axisY: {
        offset: 50,
        showLabel: true
      }
    }]
  ]
});
