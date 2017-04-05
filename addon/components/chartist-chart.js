/* global Chartist */
import Ember from 'ember';

const {
  computed,
  deprecate,
  observer,
  Component,
  String: {
    capitalize
  }
} = Ember;

export default Component.extend({
  chart: null,

  // This is the structure that chartist is expecting, it can be overidden in
  // your components which extend this one.
  defaultDataStructure: {
    labels: [],
    series: []
  },

  classNameBindings: ['ratio'],
  classNames: ['ct-chart'],

  // The ratio of the chart as it scales up/down in size.
  //
  // Available ratios:
  //
  // name              ratio
  // ct-square         1
  // ct-minor-second   15:16
  // ct-major-second   8:9
  // ct-minor-third    5:6
  // ct-major-third    4:5
  // ct-perfect-fourth 3:4
  // ct-perfect-fifth  2:3
  // ct-minor-sixth    5:8
  // ct-golden-section 1:1.618
  // ct-major-sixth    3:5
  // ct-minor-seventh  9:16
  // ct-major-seventh  8:15
  // ct-octave         1:2
  // ct-major-tenth    2:5
  // ct-major-eleventh 3:8
  // ct-major-twelfth  1:3
  // ct-double-octave  1:4
  ratio: 'ct-square',

  type: 'line',
  chartType: computed('type', function() {
    return capitalize(this.get('type'));
  }),

  data: null,
  options: null,
  responsiveOptions: null,
  updateOnData: true,

  // Don't use this! It's a testing hook
  _createdEventHook() {},

  // Before trying to do anything else, let's check to see if any necessary
  // attributes are missing or if anything else is fishy about attributes
  // provided to the component in the template.
  //
  // We're doing this to help ease people into this project. Instead of just
  // getting some "uncaught exception" we're hoping these error messages will
  // point them in the right direction.
  init() {
    let data = this.get('data');
    let type = this.get('type');

    if (typeof data === 'string') {
      deprecate(
        'Chartist-chart: The value of the "data" attribute on should be an object, it\'s a string. Setting default data structure instead.',
        false,
        {
          id: 'chartist.data-type',
          until: '2.0.0',
        }
      );

      let defaultDataStructure = this.get('defaultDataStructure');

      this.set('data', defaultDataStructure);
    }

    if (!type || !Chartist[this.get('chartType')]) {
      deprecate(
        'Chartist-chart: Invalid or missing "type" attribute, defaulting to "line".',
        false,
        {
          id: 'chartist.chart-type',
          until: '2.0.0',
        }
      );

      this.set('type', 'line');
    }

    this._super(...arguments);
  },

  // This is where the business happens. This will only run if checkForReqs
  // doesn't find any problems.
  didInsertElement() {
    let data = this.get('data') || this.get('defaultDataStructure');

    let chart = new Chartist[this.get('chartType')](
      this.get('element'),
      data,
      this.get('options'),
      this.get('responsiveOptions')
    );

    chart.on('created', this._createdEventHook);

    this.set('chart', chart);

    this._super(...arguments);
  },

  onData: observer('data', function() {
    if (this.get('updateOnData')) {
      let opts = this.get('options') || {};

      this.get('chart').update(
        this.get('data'),
        opts
      );
    }
  }),
});
