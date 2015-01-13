import Ember from 'ember';
/* global Chartist */

// This is a custom "undefined", just a safety measure to make sure someone else
// doesn't override undefined.
var UNDEF;

export default Ember.Component.extend({
  chart: UNDEF,

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
  chartType: function () {
    return this.get('type').capitalize();
  }.property('type'),

  // This is the structure that chartist is expecting
  data: {labels: [], series: []},

  options: UNDEF,
  responsiveOptions: UNDEF,

  // This is where the business happens. This will only run if checkForReqs
  // doesn't find any problems.
  renderChart: function () {
    var chart = new Chartist[this.get('chartType')](
      this.get('element'),
      this.get('data'),
      this.get('options'),
      this.get('responsiveOptions')
    );

    this.set('chart', chart);
  }.on('didInsertElement'),

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
      throw new Error('The value of the "data" attribute on chartist-chart should be an object, it\'s a string.');
    }

    // Make sure the type attribute has a quoted value. It's a common mistake
    // to forget to.
    if (!type) {
      throw new Error('If you\'re providing a "type" attribute on chartist-chart, make sure it\'s a string.');
    } else {
      if (!Chartist[this.get('chartType')]) {
        throw new Error('Invalid "type" attribute to chartist-chart. It can be; "bar", "line", or "pie".');
      }
    }
  }.on('init')
});
