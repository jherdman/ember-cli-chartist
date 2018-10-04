/* global Chartist */
import Component from '@ember/component';

import { assert } from '@ember/debug';

import { observer, computed } from '@ember/object';

import { capitalize } from '@ember/string';

export default Component.extend({
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

  chart: null,

  data: null,

  options: null,

  responsiveOptions: null,

  type: null,

  updateOnData: true,

  // Before trying to do anything else, let's check to see if any necessary
  // attributes are missing or if anything else is fishy about attributes
  // provided to the component in the template.
  //
  // We're doing this to help ease people into this project. Instead of just
  // getting some "uncaught exception" we're hoping these error messages will
  // point them in the right direction.
  init() {
    let data = this.get('data');

    assert(
      'The value of the "data" attribute must be an object',
      typeof data === 'object' &&
      data !== null
    );

    this._super(...arguments);
  },

  chartType: computed('type', function() {
    let type = this.get('type');

    assert(
      'Invalid or missing "type" attribute',
      typeof type !== 'undefined' && type !== null
    );

    return capitalize(type);
  }),

  // This is where the business happens. This will only run if checkForReqs
  // doesn't find any problems.
  didInsertElement() {
    let {
      chartType,
      data,
      element,
      options,
      responsiveOptions,
    } = this.getProperties(
      'chartType',
      'data',
      'element',
      'options',
      'responsiveOptions'
    );

    let chart = new (Chartist[chartType])(
      element,
      data,
      options,
      responsiveOptions
    );

    this.set('chart', chart);
  },

  onData: observer('data', function() {
    let {
      chart,
      data,
      options,
      updateOnData,
    } = this.getProperties(
      'chart',
      'data',
      'options',
      'updateOnData'
    );

    if (updateOnData) {
      let opts = options || {};

      chart.update(data, opts);
    }
  }),
});
