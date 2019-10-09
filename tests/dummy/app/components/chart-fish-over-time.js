import ChartistChart from './chartist-chart';

import { computed } from '@ember/object';

export default ChartistChart.extend({
  type: 'bar',

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
