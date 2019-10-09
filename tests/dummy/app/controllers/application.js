import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  chartResOptions =  [
    ['screen and (min-width: 640px)', {
      showArea: true,
      lineSmooth: false,

      axisX: {
        showLabel: false
      }
    }]
  ];
}
