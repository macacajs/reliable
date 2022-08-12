'use strict';

const path = require('path');
const { EOL } = require('os');
const program = require('commander');

const _ = require('./helper');
const getEnv = require('./environment');
const getCommitInfo = require('./git-info');
const getPackages = require('./package-info');
const postFileToStatic = require('./move-files');

const { chalk, postToGW } = _;

const DEFAULT_OPTIONS = {
  directory: program.directory || process.cwd(),
  remote: {
    server: null,
  },
  files: [],
  packages: [],
  testInfo: {},
  extraInfo: {},
};

class ReportCommand {
  constructor (options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this.context = {
      environment: {},
      gitCommitInfo: {},
      files: [],
      packages: [],
      testInfo: {},
      extraInfo: {},
    };

    this._initCommand();
  }

  _initCommand () {
    this.program = program
      .option('--verbose', 'show more debugging information')
      .option('-d, --directory <path>', 'Set project directory')
      .option('-c, --config <s>', 'set configuration file')
      .option('-o, --optionstr <s>', 'set options string');
    this.addCommand();
    this.program.parse(process.argv);
  }

  addCommand () {}

  async run () {
    await this._run();
  }

  async _run () {
    await this.parseOptions();
    this.context = Object.assign({}, this.context, {
      environment: await this.getEnvironment(),
      gitCommitInfo: await this.getGitCommitInfo(),
      testInfo: await this.getTestInfo(),
      extraInfo: await this.getExtraInfo(),
      files: await this.getFiles(),
      packages: await this.getPackages(),
      args: await this.getArgs(),
    });

    try {
      const response = await this.pushToWebhook();
      await this.handleWebhookResponse(response);
    } catch (e) {
      console.log(chalk.red('[FAILED] Upload ci result.'));
      console.error('request:', JSON.stringify(this.context, null, 2));
      console.error('error:', e);
      process.exit(1);
    }
  }

  async parseOptions () {
    if (program.config) {
      const configFile = path.resolve(program.config);

      if (_.isExistedFile(configFile)) {
        console.log(`${EOL}configuration file: ${chalk.cyan(configFile)}`);
        const mod = require(configFile);
        if (typeof mod === 'function') {
          this.options = await mod(this.options);
        } else {
          this.options = Object.assign(this.options, mod);
        }
      }
    }

    if (program.optionstr) {
      try {
        this.options = Object.assign(this.options,
          JSON.parse(program.optionstr));
      } catch (e) {
        console.log(e);
      }
    }
  }

  async getGitCommitInfo () {
    return await getCommitInfo(this.options.directory);
  }

  async getFiles () {
    return await postFileToStatic(this.options);
  }

  async getPackages () {
    return await getPackages(this.options);
  }

  async getTestInfo () {
    return this.options.testInfo;
  }

  async getExtraInfo () {
    return this.options.extraInfo;
  }

  async getArgs () {
    return this.options.args || {};
  }

  async getEnvironment () {
    const defaultEnv = await getEnv();
    return Object.assign(defaultEnv, this.options.environment);
  }

  async pushToWebhook () {
    return await postToGW(this.options, this.context);
  }

  async handleWebhookResponse (response) {
    if (response.status === 200 && response.data.success) {
      console.log(chalk.green('[DONE] Upload ci result.'));
      console.log('response data: \n', JSON.stringify(response.data, null, 2));
    } else {
      console.log(chalk.red('[FAILED] Upload ci result.'));
      console.log('response:', response);
      console.log('request:', JSON.stringify(this.context, null, 2));
      process.exit(1);
    }
  }
}

module.exports = ReportCommand;
