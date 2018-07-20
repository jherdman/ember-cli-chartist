import ChartistChart from './chartist-chart';

import { later } from '@ember/runloop';

import { Promise } from 'rsvp';

import { computed } from '@ember/object';

// This is faking a fairly common use case of using data for a chart in an
// async way.
function getData () {
  return new Promise(function(resolve) {
    later(function() {
      resolve({
        labels: [
          'Salmon', 'Yellowtail', 'Dolphin', 'Cow'
        ],
        series: [
          ['2', '8', '3', '9']
        ]
      });
    }, 500);
  });
}

export default ChartistChart.extend({
  init() {
    getData().then((data) => {
      this.set('data', data);
    });

    this._super();

    // An example showing that the chart will update when the data changes.
    later(() => {
      let newData = {
        labels: [
          'Salmon', 'Yellowtail', 'Dolphin', 'Cow'
        ],
        series: [
          ['22', '18', '0', '19']
        ]
      };

      this.set('data', newData);
    }, 4000);
  },

  ratio: 'ct-minor-seventh',

  options: computed(function() {
    return {
      showPoint: false,
      axisY: {
        offset: 0,
        showLabel: false,
        showGrid: true,
      },
      axisX: {
        showGrid: false,
      }
    };
  }),

  responsiveOptions: computed(function() {
    return [
      ['screen and (min-width: 640px)', {
        showPoint: true,
        axisY: {
          offset: 50,
          showLabel: true
        }
      }]
    ];
  }),
});
