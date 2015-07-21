/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-chartist',

  included: function included(app, parentAddon) {
    var target = (parentAddon || app);

    var options = target.options['ember-cli-chartist'] || {};
    var chartistPath = path.join(target.bowerDirectory, 'chartist', 'dist');

    if (options.useCustomCSS) {
      target.options.sassOptions = target.options.sassOptions || {};
      target.options.sassOptions.includePaths = target.options.sassOptions.includePaths || [];

      target.options.sassOptions.includePaths.push(
        path.join(chartistPath, 'scss')
      );

      target.options.sassOptions.includePaths.push(
        path.join(chartistPath, 'scss', 'settings')
      );

    } else {
      target.import(path.join(chartistPath, 'chartist.min.css'));
    }

    app.import(path.join(chartistPath, 'chartist.js'));
  }
};
