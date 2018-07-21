import ChartistChart from './chartist-chart';

import { computed } from '@ember/object';

export default ChartistChart.extend({
  type: 'pie',

  data: computed(function() {
    return {
      labels: ['Chocolate', 'Apple', 'Pumpkin'],
      series: [30, 15, 65]
    };
  }),
});
