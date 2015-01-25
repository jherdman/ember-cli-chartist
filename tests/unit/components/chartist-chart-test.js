/* global Ember */

import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('chartist-chart', 'ChartistChartComponent', {});

var chartData = {
    labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
    series: [
      [5, 4, 3, 7, 5, 10],
      [3, 2, 9, 5, 4, 6],
      [2, 1, -3, -4, -2, 0]
    ]
  },
  pieChartData = {
    labels: ['Pizza', 'Fish', 'Puppies'],
    series: [
      [40, 25, 25]
    ]
  };

test('it renders', function() {
  expect(2);

  var component = this.subject({
    data: chartData
  });

  equal(component._state, 'preRender');

  this.append();
  equal(component._state, 'inDOM');
});

test('it should not error when the data property or attribute is not provided', function() {
  expect(1);

  var component = this.subject();

  this.append();
  equal(component._state, 'inDOM');
});

test('it can be a line chart', function() {
  expect(1);

  var component = this.subject({
    data: chartData
  });

  component.set('type', 'line');
  this.append();

  var chart = component.get('chart');
  equal(chart.options.classNames.chart, 'ct-chart-line');
});

test('it can be a bar chart', function() {
  expect(1);

  var component = this.subject({
    data: chartData
  });

  component.set('type', 'bar');
  this.append();

  var chart = component.get('chart');
  equal(chart.options.classNames.chart, 'ct-chart-bar');
});

test('it can be a pie chart', function() {
  expect(1);

  var component = this.subject({
    data: pieChartData
  });

  component.set('type', 'pie');
  this.append();

  var chart = component.get('chart');
  equal(chart.options.classNames.chart, 'ct-chart-pie');
});

test('it can have different ratios', function () {
  expect(1);

  var component = this.subject({
    data: chartData
  });

  var ratio = 'ct-minor-second';
  component.set('ratio', ratio);
  ok(this.$().hasClass(ratio));
});

test('it can be configured with the options attribute', function () {
  expect(4);

  var component = this.subject({
    data: chartData
  });

  component.set('options', {
    showArea: false,
    lineSmooth: false,
    axisX: {
      showGrid: false
    },
    axisY: {
      showLabel: false
    }
  });

  this.append();

  var chart = component.get('chart');
  var opts = chart.options;

  equal(opts.showArea, false);
  equal(opts.lineSmooth, false);
  equal(opts.axisX.showGrid, false);
  equal(opts.axisY.showLabel, false);
});

test('it can be configured with the responsiveOptions attribute', function () {
  expect(3);

  var component = this.subject({
    data: chartData
  });

  component.set('responsiveOptions', [
    ['screen and (min-width: 640px)', {
      showArea: true,
      lineSmooth: false,

      axisX: {
        showLabel: false
      }
    }]
  ]);

  this.append();

  var chart = component.get('chart');
  var resOpts = chart.responsiveOptions;

  equal(resOpts[0][1].showArea, true);
  equal(resOpts[0][1].lineSmooth, false);
  equal(resOpts[0][1].axisX.showLabel, false);
});

test('it should update the chart when data is changed', function () {
  expect(2);

  var component = this.subject({
    data: chartData
  });

  var createdEventWasCalled = 0;

  var newData = {
    labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
    series: [
      [8, 10, 31, 17, 25, 11]
    ]
  };

  component.set('type', 'line');
  this.append();

  // NOTE: Is seems strange to listen for the created event, but I couldn't
  // find an 'updated' event being emitted by Chartist.
  // This should be called when the chart is initially drawn, and then again
  // when the data updates.
  component.get('chart').on('created', function () {
    createdEventWasCalled++;
  });

  stop();

  Ember.run.later(function() {
    start();

    component.set('data', newData);

    equal(component.get('data'), newData);
    equal(createdEventWasCalled, 2);
  }, 1000);
});

test('it should not automatically update when updateOnData is false', function () {
  expect(1);

  var component = this.subject({
    data: chartData
  });

  var createdEventWasCalled = 0;

  var newData = {
    labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
    series: [
      [8, 10, 31, 17, 25, 11]
    ]
  };

  component.set('updateOnData', false);
  this.append();

  component.get('chart').on('created', function () {
    createdEventWasCalled++;
  });

  stop();

  Ember.run.later(function() {
    start();
    component.set('data', newData);
    equal(createdEventWasCalled, 1);
  }, 500);
});
