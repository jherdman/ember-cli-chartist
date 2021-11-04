import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

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

module('Integration | Component | chartist chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it can be a line chart', async function(assert) {
    assert.expect(1);

    this.set('data', chartData);

    await render(hbs`<ChartistChart @data={{this.data}} @type="line" />`);

    await settled();

    assert.dom('.ct-chart .ct-chart-line').exists();
  });

  test('it can be a bar chart', async function(assert) {
    assert.expect(1);

    this.set('data', chartData);

    await render(hbs`<ChartistChart @data={{this.data}} @type="bar" />`);

    await settled();

    assert.dom('.ct-chart .ct-chart-bar').exists();
  });

  test('it can be a pie chart', async function(assert) {
    assert.expect(1);

    this.set('data', pieChartData);

    await render(hbs`<ChartistChart @data={{this.data}} @type="pie" />`);

    await settled();

    assert.dom('.ct-chart .ct-chart-pie').exists();
  });

  test('it can have different ratios', async function(assert) {
    const ratio = 'ct-minor-second';

    assert.expect(1);

    this.setProperties({
      data: chartData,
      ratio,
    });

    await render(hbs`
      <ChartistChart
        @type="line"
        @data={{this.data}}
        @ratio={{this.ratio}}
      />
    `);

    await settled();

    assert.dom('.ct-chart').hasClass(ratio);
  });

  test('it should update the chart when data is changed', async function(assert) {
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

    this.setProperties({
      data: chartData,
      hook: bumpCounter,
    });

    await render(hbs`
      <ChartistChart
        @data={{this.data}}
        @type="line"
        @onData={{this.hook}}
      />
    `);

    await settled();

    this.set('data', newData);

    assert.equal(createdEventWasCalled, 2);
  });

  test('it should not automatically update when updateOnData is false', async function(assert) {
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

    this.setProperties({
      data: chartData,
      hook: bumpCounter,
    });

    await render(hbs`
      <ChartistChart
        @data={{this.data}}
        @type="line"
        @onCreated={{this.hook}}
        @updateOnData={{false}}
      />
    `);

    await settled();

    this.set('data', newData);

    assert.equal(
      createdEventWasCalled,
      1
    );
  });

  test('it should call onInit with chart instance', async function(assert) {
    let onInitWasCalled = 0;

    function bumpCounter(chart) {
      if (typeof chart === 'object') {
        onInitWasCalled++;
      }
    }

    this.setProperties({
      hook: bumpCounter,
      data: chartData,
    });

    await render(hbs`
      <ChartistChart
        @data={{this.data}}
        @type="line"
        @onInit={{this.hook}}
      />
    `);

    await settled();

    assert.equal(
      onInitWasCalled,
      1
    );
  });
});
