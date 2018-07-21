import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chartist chart', function(hooks) {
  setupRenderingTest(hooks);

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

  test('it should not error when the data property or attribute is not provided', async function(assert) {
    await render(hbs`{{chartist-chart}}`);

    let component = this.$('.ct-chart');

    assert.ok(component.length);
  });

  test('it can be a line chart', async function(assert) {
    assert.expect(1);

    this.set('data', chartData);

    await render(hbs`{{chartist-chart data=data type="line"}}`);

    return settled().then(() => {
      let chart = this.$('.ct-chart .ct-chart-line');

      assert.ok(chart.length);
    });
  });

  test('it can be a bar chart', async function(assert) {
    assert.expect(1);

    this.set('data', chartData);

    await render(hbs`{{chartist-chart data=data type="bar"}}`);

    return settled().then(() => {
      let chart = this.$('.ct-chart .ct-chart-bar');

      assert.ok(chart.length);
    });
  });

  test('it can be a pie chart', async function(assert) {
    assert.expect(1);

    this.set('data', pieChartData);

    await render(hbs`{{chartist-chart data=data type="pie"}}`);

    return settled().then(() => {
      let chart = this.$('.ct-chart .ct-chart-pie');

      assert.ok(chart.length);
    });
  });

  test('it can have different ratios', async function(assert) {
    const ratio = 'ct-minor-second';

    assert.expect(1);

    this.set('data', chartData);
    this.set('ratio', ratio);

    await render(hbs`{{chartist-chart
      data=data
      ratio=ratio
    }}`);

    return settled().then(() => {
      let chart = this.$('.ct-chart');

      assert.ok(chart.hasClass(ratio));
    });
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

    this.set('data', chartData);
    this.set('hook', bumpCounter);

    await render(hbs`{{chartist-chart
      data=data
      type='line'
      _createdEventHook=hook
    }}`);

    return settled().then(() => {
      this.set('data', newData);

      assert.equal(createdEventWasCalled, 2);
    });
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

    this.set('data', chartData);
    this.set('hook', bumpCounter);

    await render(hbs`{{chartist-chart
      data=data
      type='line'
      _createdEventHook=hook
      updateOnData=false
    }}`);

    return settled().then(() => {
      this.set('data', newData);

      assert.equal(
        createdEventWasCalled,
        1
      );
    });
  });
});
