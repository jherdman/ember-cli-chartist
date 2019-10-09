import Route from '@ember/routing/route';

import { task, timeout } from 'ember-concurrency';

export default Route.extend({
  model() {
    return {
      chartData: {
        labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
        series: [
          [5, 4, 3, 7, 5, 10],
          [3, 2, 9, 5, 4, 6],
          [2, 1, -3, -4, -2, 0],
          [8, -2, 1, 7, -3, 1]
        ]
      }
    };
  },

  deferredComponentData: task(function * () {
    const labels = [
      'Salmon',
      'Yellowtail',
      'Dolphin',
      'Cow',
    ];

    yield timeout(500);

    this.controller.set('data', {
      labels,
      series: [
        ['2', '8', '3', '9']
      ]
    });

    yield timeout(4000);

    this.controller.set('data', {
      labels,
      series: [
        ['22', '18', '0', '19']
      ],
    });
  }).on('activate'),
});
