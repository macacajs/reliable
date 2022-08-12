'use strict';

const assert = require('power-assert');

const getGitInfo = require('../../lib/git-info');

describe('lib/git-info', () => {
  it('should get git info', () => {
    const data = getGitInfo();
    assert(data.gitRemote.endsWith('macacajs/reliable-cli.git'));
    assert(data.gitUrl.endsWith('://github.com/macacajs/reliable-cli'));
    assert(data.shortHash);
    assert(data.hash);
    assert(data.subject);
    assert(data.sanitizedSubject);
    assert(typeof data.body === 'string');
    assert(data.committer.date.match(/\d+/));
    assert(data.committer.relativeDate);
    assert(data.committer.name);
    assert(data.committer.email);
    assert(data.author.date.match(/\d+/));
    assert(data.author.relativeDate);
    assert(data.author.name);
    assert(data.author.email);
  });
});
