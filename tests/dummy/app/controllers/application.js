import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked
  deferredComponentData = null;

  chartResOptions = [
    [
      'screen and (min-width: 640px)',
      {
        showArea: true,
        lineSmooth: false,

        axisX: {
          showLabel: false,
        },
      },
    ],
  ];

  pieData = {
    labels: ['Chocolate', 'Apple', 'Pumpkin'],
    series: [30, 15, 65],
  };

  @task
  *loadAsyncData() {
    const labels = ['Salmon', 'Yellowtail', 'Dolphin', 'Cow'];

    yield timeout(500);

    this.deferredComponentData = {
      labels,
      series: [['2', '8', '3', '9']],
    };

    yield timeout(4000);

    this.deferredComponentData = {
      labels,
      series: [['22', '18', '0', '19']],
    };
  }
}
