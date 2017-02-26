import Ember from 'ember';

const {
  Controller,
} = Ember;

export default Controller.extend({
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
