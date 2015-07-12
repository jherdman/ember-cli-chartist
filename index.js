/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-chartist',

  included: function included(app) {
    this.app = app;

    var options = app.options['ember-cli-chartist'] || {},
      chartistPath = path.join(app.bowerDirectory, 'chartist', 'dist');

    if (options.useCustomCSS) {
      app.options.sassOptions = app.options.sassOptions || {};
      app.options.sassOptions.includePaths = app.options.sassOptions.includePaths || [];

      app.options.sassOptions.includePaths.push(path.join(
        chartistPath, 'scss'));

      app.options.sassOptions.includePaths.push(path.join(
        chartistPath, 'scss', 'settings'));
    } else {
      app.import(path.join(chartistPath, 'chartist.min.css'));
    }

    app.import(path.join(chartistPath, 'chartist.js'));
  }
};
