'use strict';

const assert = require('power-assert');

const reliableCli = require('..');

describe('test', () => {
  it('should be ok', () => {
    assert.ok(reliableCli);
  });
});
