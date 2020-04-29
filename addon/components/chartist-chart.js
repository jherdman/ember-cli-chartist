/* global Chartist */

import Component from '@glimmer/component';

import { tracked } from '@glimmer/tracking';

import { assert } from '@ember/debug';

import { action } from '@ember/object';

import { capitalize } from '@ember/string';

export default class ChartistChart extends Component {
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

  @tracked
  chart = null;

  constructor(owner, args) {
    super(owner, args);

    const { type } = args;

    // Before trying to do anything else, let's check to see if any necessary
    // attributes are missing or if anything else is fishy about attributes
    // provided to the component in the template.
    //
    // We're doing this to help ease people into this project. Instead of just
    // getting some "uncaught exception" we're hoping these error messages will
    // point them in the right direction.
    assert(
      'Invalid or missing "type" attribute',
      typeof type !== 'undefined' && type !== null
    );
  }

  get chartType() {
    return capitalize(this.args.type);
  }

  get updateOnData() {
    return this.args.updateOnData ?? true;
  }

  @action
  initializeChart(mountElement) {
    const {
      args: {
        data,
        options,
        responsiveOptions,
      },
      chartType,
    } = this;

    const chart = new (Chartist[chartType])(
      mountElement,
      data,
      options,
      responsiveOptions
    );

    this.chart = chart;

    this.chart.on('created', this.onCreated);
    this.chart.on('draw', this.onDraw);
    this.chart.on('data', this.onData);
  }

  get onData() {
    return this.args.onData || function() {};
  }

  get onDraw() {
    return this.args.onDraw || function() {};
  }

  get onCreated() {
    return this.args.onCreated || function() {};
  }

  @action
  updateChart() {
    const {
      args: {
        data,
        options = {},
      },
      chart,
      updateOnData,
    } = this;

    if (typeof data === 'undefined') {
      return;
    }

    if (updateOnData) {
      chart.update(data, options);
    }
  }

  @action
  teardownChart() {
    this.chart.detach();
  }
}
