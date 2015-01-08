/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-chartist',

  included: function included(app) {
    this.app = app;
    this._super.included(app);

    app.import('vendor/chartist/chartist.js');
    app.import('vendor/chartist/chartist.css');
  }
};
