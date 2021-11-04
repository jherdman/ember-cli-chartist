import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | smoke tests', function (hooks) {
  setupApplicationTest(hooks);

  test('three charts are rendered', async function (assert) {
    await visit('/');

    assert.dom('[data-test-selector="chart"]').exists({ count: 3 });
  });
});
