import Ember from 'ember';

export default Ember.ObjectController.extend({
  chartResOptions: [
    ['screen and (min-width: 640px)', {
      showArea: true,
      lineSmooth: false,

      axisX: {
        showLabel: false
      }
    }]
  ]
});
