import Ember from 'ember';
import ChartistChart from './chartist-chart';

// This is faking a fairly common use case of using data for a chart in an
// async way.
function getData () {
  return new Ember.RSVP.Promise(function(resolve) {
    Ember.run.later(function() {
      resolve({
        labels: [
          'Salmon', 'Yellowtail', 'Dolphin', 'Cow', 'Pig', 'Dog'
        ],
        series: [
          ['2', '8', '3', '9']
        ]
      });
    }, 1000);
  });
}

export default ChartistChart.extend({
  init: function () {
    getData().then(function (data) {
      this.set('data', data);
    }.bind(this));

    this._super();

    // An example showing that the chart will update when the data changes.
    Ember.run.later(function() {
      var newData = {
        labels: [
          'Salmon', 'Yellowtail', 'Dolphin', 'Cow', 'Horse', 'Cat'
        ],
        series: [
          ['22', '18', '0', '19']
        ]
      };

      this.set('data', newData);
    }.bind(this), 4000);
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
