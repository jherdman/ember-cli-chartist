import Controller from '@ember/controller';

import { computed } from '@ember/object';

export default Controller.extend({
  chartResOptions: computed(function() {
    return [
      ['screen and (min-width: 640px)', {
        showArea: true,
        lineSmooth: false,

        axisX: {
          showLabel: false
        }
      }]
    ];
  }),
});
