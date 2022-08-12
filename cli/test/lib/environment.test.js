'use strict';

const assert = require('power-assert');

const enviroment = require('../../lib/environment');

describe('lib/enviroment', () => {
  let env;

  before(() => {
    env = Object.assign({}, process.env);
  });

  afterEach(() => {
    process.env = env;
  });

  it('should get env', () => {
    process.env.JOB_NAME = 'task_force';
    process.env.BUILD_NUMBER = '141';

    const envData = enviroment();
    console.log(envData.ci)

    assert(envData.ci.JOB_NAME === 'task_force');
    assert(envData.ci.BUILD_NUMBER === '141');
    assert(envData.ci.RUNNER_TYPE === 'JENKINS');
    assert(envData.platform);
    assert(envData.os.nodeVersion);
    assert(envData.os.platform);
  });
});
