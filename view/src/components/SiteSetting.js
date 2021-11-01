'use strict';

import React, { useEffect, useState } from 'react';
import safeGet from 'lodash.get';
import { FormattedMessage } from 'react-intl';
import {
  Form,
  Spin,
  Input,
  Button,
  message,
} from 'antd';

import request from '../util/request';

const siteConfigFormItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { offset: 4, span: 16 },
  },
};
const buttonFormItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { offset: 10, span: 4 },
  },
};

const SiteSetting = () => {
  const [form]  = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchSite = async () => {
    setLoading(true);
    const res = await request('getSite', 'GET');
    setLoading(false);
    if (!res.success) return;

    const assetsUrl = safeGet(res, 'data.site.assetsUrl');
    form.setFieldsValue({
      assetsUrl
    });
  };

  useEffect(() => {
    fetchSite();
  }, []);

  const postSite = async (siteConfig) => {
    const res = await request('postSite', 'POST', {
      site: siteConfig,
    });
    if (res.success) {
      await fetchSite();
      message.success('Update siteConfig successfully!');
    } else {
      message.error('Update siteConfig failed.');
      console.error('postSite', res);
    }
  };

  const updateSite = () => {
    form.validateFields().then(values => {
      postSite(values);
    }).catch(errorInfo => {
      return;
    });
  };

  return (
    <Form
      form={form}
    >
      <Spin spinning={loading}>
        <Form.Item
          {...siteConfigFormItemLayout}
          name="assetsUrl"
        >
          <Input />
        </Form.Item>
        <Form.Item {...buttonFormItemLayout}>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            onClick={updateSite}
          >
            <FormattedMessage id='setting.submit' />
          </Button>
        </Form.Item>
      </Spin>
    </Form>
  );
}

export default SiteSetting;

