'use strict';

const sinon = require('sinon');
const urllib = require('urllib');
const assert = require('power-assert');

const helper = require('../../lib/helper');

describe('lib/helper', () => {
  it('should get reliable home', () => {
    const res = helper.getReliableHome();
    assert(res.endsWith('/reliable_home'));
  });

  it('should get static server root', () => {
    const _env = process.env;

    process.env.HOME = '/home/docker';
    process.env.NOT_IN_DOCKER = true;
    let res = helper.getStaticServerRoot();
    assert(res === '/home/docker/reliable_home/static');

    delete process.env.NOT_IN_DOCKER;
    process.env.RELIABLE_WEB = true;
    res = helper.getStaticServerRoot();
    assert(res === '/static');

    delete process.env.NOT_IN_DOCKER;
    delete process.env.RELIABLE_WEB;
    process.env.RELIABLE_IOS = true;
    res = helper.getStaticServerRoot();
    assert(res === '/home/docker/reliable_home/static');

    process.env = _env;
  });

  it('should post data to server', () => {
    const stub = sinon.stub(urllib, 'request').callsFake(function (...args) {
      assert.deepStrictEqual(args, [
        'http://example/api/gw',
        {
          method: 'POST',
          data: 'new message',
          contentType: 'json',
          dataType: 'json',
        },
      ]);
      stub.restore();
      return Promise.resolve({});
    });
    return helper.postToGW({
      remote: {
        server: 'http://example',
      },
    }, 'new message');
  });

  it('should get platform type', () => {
    const _env = process.env;

    process.env.RELIABLE_IOS = true;
    assert(helper.getPlatformType() === 'ios');
    delete process.env.RELIABLE_IOS;

    process.env.RELIABLE_ANDROID = true;
    assert(helper.getPlatformType() === 'android');
    delete process.env.RELIABLE_ANDROID;

    process.env.RELIABLE_WEB = true;
    assert(helper.getPlatformType() === 'web');
    delete process.env.RELIABLE_WEB;
    process.env = _env;
  });

  it('should get package version', () => {
    assert(helper.getDepsPkgVersion('last-commit-log').match(/^\d+.\d+\.\d+$/));
    assert(helper.getDepsPkgVersion('no-deps-last-commit-log') === undefined);
  });

  it('should normalize jobName', () => {
    assert(helper.normalizeJobName('group/project') === 'group_project');
    assert(helper.normalizeJobName('project') === 'project');
  });
});
