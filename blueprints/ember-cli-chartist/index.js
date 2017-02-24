/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  beforeInstall: function(options) {
    return this.addPackageToProject('chartist', '^0.10.1');
  }
};
