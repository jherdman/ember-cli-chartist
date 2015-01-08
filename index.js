/* jshint node: true */
'use strict';

var path = require('path'),
  path_join = function () {
  // fix path with windows back slash with path_join
  return path.join.apply(this, arguments).replace(/\\/g, '/');
};

module.exports = {
  name: 'ember-cli-chartist',

  included: function included(app) {
    this.app = app;

    var options = app.options['ember-cli-chartist'] || {},
      modulePath = path.relative(app.project.root, __dirname),
      chartistPath = 'vendor/chartist';
    
    if (options.useDefaultCSS) {
      app.import('vendor/chartist/chartist.css');
    } else {
      // NOTE: This is not working currently. apps are not recognizing the
      // includePaths set here.
      app.options.sassOptions = app.options.sassOptions || {};
      app.options.sassOptions.includePaths = app.options.sassOptions.includePaths || [];

      app.options.sassOptions.includePaths.push(path_join(modulePath,
        chartistPath, 'scss'));

      app.options.sassOptions.includePaths.push(path_join(modulePath,
        chartistPath, 'scss/settings'));
    }

    app.import('vendor/chartist/chartist.js');
  }
};
