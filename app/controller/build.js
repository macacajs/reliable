'use strict';

const {
  Controller,
} = require('egg');

const UPDATE_FIELDS = [
  'extendInfo',
];

class BuildController extends Controller {
  async show() {
    const ctx = this.ctx;
    const uniqId = ctx.params.uniqId;
    const res = await ctx.service.build.queryBuildByUniqId({
      uniqId,
    });
    ctx.success(res);
  }

  async query() {
    const ctx = this.ctx;
    const page = Number(ctx.query.page) || 1;
    const num = Number(ctx.query.num) || ctx.app.config.modelQueryConfig.pagination.num;

    const { jobName, buildNumber, gitBranch } = ctx.query;

    let res;
    if (jobName) {
      if (buildNumber) {
        res = await ctx.service.build.queryByJobNameAndBuildNumber({
          jobName,
          buildNumber,
        });
        // 如果没有git提交时间，用报告创建时间替代
        if (!res.data.data.gitCommitInfo.date) {
          res.data.data.gitCommitInfo.date = res.data.createdAt;
        }
      } else {
        res = await ctx.service.build.queryByJobName({
          jobName,
          gitBranch,
          page,
          num,
        });
      }
    } else {
      res = await ctx.service.build.queryAllBuilds({ page, num });
    }

    if (res.success === false) {
      ctx.fail(res.code);
      return;
    }
    ctx.body = res;
  }

  /**
   * 查询最近的报告
   */
  async queryLatest() {
    const { ctx } = this;
    const Sequelize = ctx.app.Sequelize;
    const Op = Sequelize.Op;
    const { jobName, gitBranch, subJobName } = ctx.request.body;
    const query = {
      limit: 5,
      where: {},
      order: [
        [
          'createdAt',
          'DESC',
        ],
      ],
    };
    if (jobName) {
      query.where.jobName = jobName.replace('__', '/');
    }
    if (gitBranch) {
      query.where.gitBranch = gitBranch;
    }
    if (subJobName) {
      // "subJobName": xxx
      query.where.extendInfo = {
        [Op.like]: Sequelize.literal(`\'%"${subJobName}"%\'`),
      };
    }
    const result = await this.ctx.model.Build.findAll(query);
    ctx.success({
      result,
    });
  }

  async queryLatestByJobNameAndGitBranch() {
    const jobName = this.ctx.params.jobName;
    const gitBranch = this.ctx.params.gitBranch;
    const result = await this.ctx.model.Build.findAll({
      limit: 5,
      where: {
        jobName: jobName.replace('__', '/'),
        gitBranch,
      },
      order: [
        [
          'createdAt',
          'DESC',
        ],
      ],
    });
    this.ctx.success({
      result,
    });
  }

  async queryLatestByJobName() {
    const jobName = this.ctx.params.jobName;
    const result = await this.ctx.model.Build.findAll({
      limit: 3,
      where: {
        jobName: jobName.replace('__', '/'),
      },
      order: [
        [
          'createdAt',
          'DESC',
        ],
      ],
    });
    this.ctx.success({
      result,
    });
  }

  async update() {
    const ctx = this.ctx;
    const uniqId = ctx.params.uniqId;

    const requestData = ctx.request.body;
    const payload = {};
    for (const key of UPDATE_FIELDS) {
      if (!(key in requestData)) continue;
      payload[key] = requestData[key];
    }
    const queryRes = await ctx.service.build.queryBuildByUniqId({
      uniqId,
    });
    if (!queryRes) {
      ctx.fail('ERR_RELIABLE_BUILD_RECORD_NOT_FOUND');
      return;
    }
    if (!Object.keys(payload).length) {
      ctx.fail('ERR_RELIABLE_INVALID_PARAM_ERROR');
      return;
    }
    const res = await ctx.service.build.updateBuild({
      uniqId,
      payload,
    });
    ctx.success(res);
  }

  async patch() {
    const ctx = this.ctx;
    const uniqId = ctx.params.uniqId;

    const requestData = ctx.request.body;
    const currentData = await ctx.service.build.queryBuildByUniqId({
      uniqId,
    });
    if (!currentData) {
      ctx.fail('ERR_RELIABLE_BUILD_RECORD_NOT_FOUND');
      return;
    }

    const payload = {};
    for (const key of UPDATE_FIELDS) {
      if (!(key in requestData)) continue;
      const currentValue = currentData[key];
      if (!currentValue) {
        payload[key] = requestData[key];
        continue;
      }
      if (Array.isArray(currentValue)) {
        payload[key] = [
          ...currentValue,
          ...requestData[key],
        ];
        continue;
      }
      if (typeof currentValue === 'object') {
        payload[key] = Object.assign({},
          currentValue,
          requestData[key]
        );
        continue;
      }
      payload[key] = requestData[key];
    }
    if (!Object.keys(payload).length) {
      ctx.fail('ERR_RELIABLE_INVALID_PARAM_ERROR');
      return;
    }
    const res = await ctx.service.build.updateBuild({
      uniqId,
      payload,
    });
    ctx.success(res);
  }
}

module.exports = BuildController;
