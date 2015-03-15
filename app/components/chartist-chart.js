import Ember from 'ember';
/* global Chartist */

// This is a custom "undefined", just a safety measure to make sure someone else
// doesn't override undefined.
var UNDEF,
  // This is the structure that chartist is expecting
  defaultDataStructure = {labels: [], series: []};

export default Ember.Component.extend({
  chart: UNDEF,

  classNameBindings: ['ratio'],
  classNames: ['ct-chart'],
  customClassNames: [],

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
  chartType: function () {
    return this.get('type').capitalize();
  }.property('type'),

  data: defaultDataStructure,
  options: UNDEF,
  responsiveOptions: UNDEF,
  updateOnData: true,

  // This is where the business happens. This will only run if checkForReqs
  // doesn't find any problems.
  renderChart: function () {
    var element = this.get('customElement');
    if (element) {
      element = '#' + this.get('elementId') + ' ' + element;
      Ember.$(element).addClass(this.get('customClassNames').join(' ') + ' ' + this.get('ratio'));
    } else {
      element = this.get('element');
    }

    var chart = new Chartist[this.get('chartType')](
      element,
      this.get('data'),
      this.get('options'),
      this.get('responsiveOptions')
    );

    this.set('chart', chart);
  }.on('didInsertElement'),

  onData: function () {
    if (this.get('updateOnData')) {
      this.get('chart').update(this.get('data'));
    }
  }.observes('data'),

  // Before trying to do anything else, let's check to see if any necessary
  // attributes are missing or if anything else is fishy about attributes
  // provided to the component in the template.
  //
  // We're doing this to help ease people into this project. Instead of just
  // getting some "uncaught exception" we're hoping these error messages will
  // point them in the right direction.
  checkForReqs: function () {
    var data = this.get('data'),
    type = this.get('type');

    if (typeof data === 'string') {
      console.info('Chartist-chart: The value of the "data" attribute on should be an object, it\'s a string.');
      this.set('data', defaultDataStructure);
    }

    if (!type || !Chartist[this.get('chartType')]) {
      console.info('Chartist-chart: Invalid or missing "type" attribute, defaulting to "line".');
      this.set('type', 'line');
    }

    if (this.get('customElement')) {
      this.set('classNameBindings', []);
      this.set('customClassNames', this.get('classNames'));
      this.set('classNames', []);
    }
  }.on('init')
});
