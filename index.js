'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    this.chartistPath = path.dirname(require.resolve('chartist'));
    this.appOptions = app.options['ember-cli-chartist'] || {};

    if (!this.appOptions.useCustomCSS) {
      app.import('vendor/chartist.css');
    }
  },

  treeForVendor(vendorTree) {
    const chartistTree = new Funnel(this.chartistPath, {
      files: ['chartist.css'],
    });

    return vendorTree ? mergeTrees([vendorTree, chartistTree]) : chartistTree;
  },

  treeForStyles(stylesTree) {
    if (this.appOptions.useCustomCSS) {
      const chartistTree = new Funnel(this.chartistPath, {
        srcDir: 'scss',
        destDir: 'chartist',
      });

      return stylesTree ? mergeTrees([stylesTree, chartistTree]) : chartistTree;
    }
  },
};
