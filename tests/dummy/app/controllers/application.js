import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default class ApplicationController extends Controller {
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

  @task
  *loadAsyncData() {
    const labels = ['Salmon', 'Yellowtail', 'Dolphin', 'Cow'];

    yield timeout(500);

    this.set('deferredComponentData', {
      labels,
      series: [['2', '8', '3', '9']],
    });

    yield timeout(4000);

    this.set('deferredComponentData', {
      labels,
      series: [['22', '18', '0', '19']],
    });
  }
}
