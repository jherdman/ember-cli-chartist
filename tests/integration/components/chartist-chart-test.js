import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const later = Ember.run.later;

moduleForComponent('chartist-chart', 'Integration | Component | chartist chart', {
  integration: true
});

const chartData = {
  labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
  series: [
    [5, 4, 3, 7, 5, 10],
    [3, 2, 9, 5, 4, 6],
    [2, 1, -3, -4, -2, 0]
  ]
};

const pieChartData = {
  labels: ['Pizza', 'Fish', 'Puppies'],
  series: [
    [40, 25, 25]
  ]
};

test('it should not error when the data property or attribute is not provided', function(assert) {
  this.render(hbs`{{chartist-chart}}`);

  let component = this.$('.ct-chart');

  assert.ok(component.length);
});

test('it can be a line chart', function(assert) {
  const done = assert.async();

  assert.expect(1);

  this.set('data', chartData);

  this.render(hbs`{{chartist-chart data=data type="line"}}`);

  later(this, function() {
    let chart = this.$('.ct-chart .ct-chart-line');

    assert.ok(chart.length);
    done();
  });
});

test('it can be a bar chart', function(assert) {
  const done = assert.async();

  assert.expect(1);

  this.set('data', chartData);

  this.render(hbs`{{chartist-chart data=data type="bar"}}`);

  later(this, function() {
    let chart = this.$('.ct-chart .ct-chart-bar');

    assert.ok(chart.length);
    done();
  });
});

test('it can be a pie chart', function(assert) {
  const done = assert.async();

  assert.expect(1);

  this.set('data', pieChartData);

  this.render(hbs`{{chartist-chart data=data type="pie"}}`);

  later(this, function() {
    let chart = this.$('.ct-chart .ct-chart-pie');

    assert.ok(chart.length);
    done();
  });
});

test('it can have different ratios', function (assert) {
  const done = assert.async();
  const ratio = 'ct-minor-second';

  assert.expect(1);

  this.set('data', chartData);
  this.set('ratio', ratio);

  this.render(hbs`{{chartist-chart data=data ratio=ratio}}`);

  later(this, function() {
    let chart = this.$('.ct-chart');

    assert.ok(chart.hasClass(ratio));
    done();
  });
});

test('it should update the chart when data is changed', function (assert) {
  const done = assert.async;

  assert.expect(1);

  let createdEventWasCalled = 0;

  let newData = {
    labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
    series: [
      [8, 10, 31, 17, 25, 11]
    ]
  };

  function bumpCounter() {
    createdEventWasCalled++;
  }

  this.set('data', chartData);
  this.set('hook', bumpCounter);

  this.render(hbs`{{chartist-chart data=data type="line" _createdEventHook=hook}}`);

  later(this, function() {
    this.set('data', newData);

    assert.equal(createdEventWasCalled, 2);

    done();
  });
});

test('it should not automatically update when updateOnData is false', function (assert) {
  const done = assert.async;

  assert.expect(1);

  let createdEventWasCalled = 0;

  let newData = {
    labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
    series: [
      [8, 10, 31, 17, 25, 11]
    ]
  };

  function bumpCounter() {
    createdEventWasCalled++;
  }

  this.set('data', chartData);
  this.set('hook', bumpCounter);

  this.render(hbs`{{chartist-chart data=data type="line" _createdEventHook=hook updateOnData=false}}`);

  later(this, function() {
    this.set('data', newData);

    assert.equal(createdEventWasCalled, 1);

    done();
  });
});
