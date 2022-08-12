'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('xutil');
const urllib = require('urllib');
const iosUtils = require('ios-utils');
const istanbul = require('macaca-istanbul');
const g2js = require('gradle-to-js/lib/parser');

const iosGen = require('./ios/gen');

const _ = utils.merge({}, utils);

/**
 * is path a regular file
 * @type Node.js
 * @returns {boolean} returns true if the path is regular file, otherwise false
 * @method isExistedFile
 */

/**
 * is path a file system directory
 * @type Node.js
 * @returns {boolean} returns true if the path is a directory, otherwise false
 * @method isExistedDir
 */

/**
 * A `rm -rf` util for nodejs
 * @see {@link https://github.com/isaacs/rimraf#rimrafsync}
 * @method rimraf
 */

/**
 * Node.js implementation of port detector
 * @see {@link https://github.com/node-modules/detect-port}
 * @method detectPort
 */

/**
 * Portable Unix shell commands for Node.js
 * @see {@link https://github.com/shelljs/shelljs}
 * @method shelljs
 */


/**
 * Synchronously create a new directory and any necessary subdirectories at dir with octal permission string opts.mode. If opts is a non-object, it will be treated as the opts.mode.
 * @see {@link https://github.com/substack/node-mkdirp#mkdirpsyncdir-opts}
 * @method mkdir
 */

/**
 * Parse, validate, manipulate, and display dates and times
 * @see {@link https://momentjs.com/}
 * @class moment
 */

/**
 * get reliable home path
 * @type Node.js
 * @returns {String} reliable home path
 * @method getReliableHome
 */
_.getReliableHome = () => {
  return path.join(process.env.HOME, 'reliable_home');
};

/**
 * get static server path
 * @type Node.js
 * @returns {String} static server path
 * @method getStaticServerRoot
 */
_.getStaticServerRoot = () => {
  const home = _.getReliableHome();
  return path.join(_.isInDocker() ? '/' : home, 'static');
};


/**
 * get reliable is running in docker
 * @type Node.js
 * @returns {boolean} returns true, if reliable is running in docker; otherwise false
 * @method isInDocker
 */
_.isInDocker = () => {
  if (process.env.NOT_IN_DOCKER) {
    return false;
  }
  return _.getPlatformType() !== 'ios';
};

/**
 * post data to gateway
 * @type Node.js
 * @param {object} options request options
 * @param {string} options.remote.server remote server host
 * @param {object} content the data will to post
 * @returns {Promise.<object>} promised http response
 * @method postToGW
 */
_.postToGW = async function (options, content) {
  const server = process.env.RELIABLE_SERVER_URL || options.remote.server;
  return urllib.request(`${server}/api/gw`, {
    method: 'POST',
    data: content,
    contentType: 'json',
    dataType: 'json',
  });
};

/**
 * get platform type
 * @type Node.js
 * @returns {String} 'ios' | 'android' | 'web' | 'unknown'
 * @method getPlatformType
 */
_.getPlatformType = () => {
  const {
    ANDROID_HOME,
    GRADLE_HOME,
    RELIABLE_ANDROID,
    RELIABLE_IOS,
    RELIABLE_WEB,
    ELECTRON_MIRROR,
  } = process.env;

  if (RELIABLE_IOS) {
    return 'ios';
  } else if (RELIABLE_ANDROID) {
    return 'android';
  } else if (RELIABLE_WEB) {
    return 'web';
  }

  if (ANDROID_HOME || GRADLE_HOME) {
    return 'android';
  } else if (ELECTRON_MIRROR) {
    return 'web';
  }

  return 'unknown';
};

/**
 * get dependence package version by name
 * @param {String} name name of package
 * @type Node.js
 * @returns {String} package version
 * @method getDepsPkgVersion
 */
_.getDepsPkgVersion = name => {
  let version;

  try {
    const pkg = path.join(process.cwd(), 'node_modules', name, 'package.json');
    version = JSON.parse(fs.readFileSync(pkg, 'utf8')).version;
  } catch (_) {
  }
  return version;
};

/**
 * ios utils namespace
 * @namespace {object} iosUtils
 */
_.iosUtils = iosUtils;
/**
 * ios file genertors namespace
 * @namespace iosGen
 * @memberof iosUtils
 */
iosUtils.iosGen = iosGen;

/**
 * generate the ios plist.info file content
 * @type Node.js
 * @returns {String} plist.info file string
 * @method genPlist
 * @memberof iosUtils.iosGen
 * @param {Object} options
 * @param {string} options.url assets url
 * @param {string} options.bundleIdentifier metadata bundle-identifier
 * @param {string} options.bundleVersion meatadata bundle-version
 * @param {string} options.title meatadata bundle-title
 */

/**
 * generate the download HTML file content string
 * @type Node.js
 * @returns {String} HTML doc string containing a download link
 * @method genDownloadHtml
 * @memberof iosUtils.iosGen
 * @param {Object} options
 * @param {string} options.url download url
 */

/**
 * android utils
 * @namespace
 */
_.androidUtils = {
  /**
   * parse gradle config
   * @param {String} content gradle config text content
   * @type Node.js
   * @returns {Object} gradle config js object
   */
  parseGradle: content => {
    return new Promise((resolve) => {
      g2js.parseText(content)
        .then(representation => {
          resolve(representation);
        });
    });
  },
};

/**
 * web utils
 * @namespace
 */
_.webUtils = {
  /**
   * add a coverage object to the collector, and summary coverage
   * @param {Object} coverageResult coverage object
   * @type Node.js
   * @returns {Object} the coverage summary for a single coverage object
   */
  summarizedCoverage: coverageResult => {
    const collector = new istanbul.Collector();
    collector.add(coverageResult);
    return istanbul
      .utils
      .summarizeCoverage(collector.getFinalCoverage());
  },
};

/**
 * normalize job name, replace / to _
 * @type Node.js
 * @param {String} jobName the job name contains /
 * @returns {String} normal job name, replace / to _
 * @method normalizeJobName
 */
_.normalizeJobName = (jobName = '') => jobName.replace(/\//g, '_');

module.exports = _;
