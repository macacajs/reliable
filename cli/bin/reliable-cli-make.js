#!/usr/bin/env node

'use strict';

const _ = require('../lib/helper');
const childProcess = require('child_process');

const platformType = _.getPlatformType();

let cmd = '';
const args = [];

if (platformType === 'ios') {
  console.log('executing make process for ios');
  console.log(process.argv);

  // args should be; [0]node, [1]js-file, [2]make-action....[3]configuration args
  if (process.argv.length < 3) {
    console.error('invalid arguments');
    process.exit(0);
  }

  // check make action: 'build', 'release', 'test', 'pack' etc
  if (process.argv[2].indexOf('=') > 0) {
    console.error('invalid action');
    console.log(process.argv[2]);
    process.exit(0);
  }

  cmd = process.argv[2];
  args.push(cmd);

  // formalize extra args
  if (process.argv.length > 3) {
    args.push(`ARGS="--${process.argv.slice(3).join(' --')}"`);
  }

  console.log(`make ${args}`);
} else if (platformType === 'android') {

} else {

}

// execute cmd
const buildProcess = childProcess.spawn('make', args, {
  stdio: [
    process.stdin,
    process.stdout,
    2,
    'ipc',
  ],
});

buildProcess.on('close', code => {
  process.exit('process exited with code ' + code);
});

buildProcess.on('exit', code => {
  process.exit(code);
});

buildProcess.on('message', e => {
  if (e.signal === 'kill') {
    buildProcess.kill();
  }
});
