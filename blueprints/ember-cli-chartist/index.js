'use strict';

module.exports = {
  /*
    This prevents an error when the entityName is
    not specified (since that doesn't actually matter
    to us.
  */
  normalizeEntityName: function() {
  },

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      {name: 'chartist', target: '~0.9.1'}
    ]);
  }
};
