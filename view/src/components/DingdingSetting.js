'use strict';

import React, { useEffect, useState } from 'react';
import safeGet from 'lodash.get';
import uniqBy from 'lodash.uniqby';
import { FormattedMessage } from 'react-intl';
import {
  Form,
  Spin,
  Input,
  Button,
  Select,
  message,
} from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import request from '../util/request';

const Option = Select.Option;

const webhookFormItemLayout = {
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

const DingdingSetting = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchWebhooks = async () => {
    setLoading(true);
    const res = await request('getWebhooks', 'GET');
    setLoading(false);
    if (!res.success) return;

    const webhooks = safeGet(res, 'data.webhooks');
    if (!Array.isArray(webhooks) || !webhooks.length) {
      form.setFieldsValue({
        webhooks: [{
          url: '',
        }]
      });
      return;
    }

    form.setFieldsValue({ webhooks })
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const postWebhooks = async (webhooks) => {
    const res = await request('postWebhooks', 'POST', {
      webhooks,
    });
    if (res.success) {
      await fetchWebhooks();
      message.success('Update webhooks successfully!');
    } else {
      message.error('Update webhooks failed.');
      console.error('postWebhooks', res);
    }
  };

  const updateWebhooks = values => {
    const uniqWebhooks = uniqBy(values.webhooks, value => `${value.tag}${value.url}`);
    postWebhooks(uniqWebhooks);
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        onFinish={updateWebhooks}
        autoComplete="off"
      >
        <Form.List name="webhooks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <div key={field.key}>
                  <Form.Item
                    {...field}
                    {...webhookFormItemLayout}
                    name={[field.name, 'url']}
                    fieldKey={[field.fieldKey, 'url']}
                    validateTrigger={['onBlur']}
                    rules={[{
                      required: true,
                      type: 'url',
                      whitespace: true,
                      message: 'Please input DingTalk webhook url.',
                    }]}
                  >
                    <Input
                      addonBefore={
                        <Form.Item
                          name={[field.name, 'tag']}
                          initialValue="build"
                          noStyle
                        >
                          <Select style={{ width: 88 }}>
                            <Option value="build"><FormattedMessage id="setting.notification.build" /></Option>
                          </Select>
                        </Form.Item>
                      }
                      placeholder="webhook"
                      addonAfter={
                        <DeleteOutlined
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => remove(field.name)}
                        />
                      }
                    />
                  </Form.Item>
                </div>
              ))}

              <Form.Item
                {...webhookFormItemLayout}
              >
                <Button
                  type="dashed"
                  data-accessibilityid="add-notification"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  <FormattedMessage id='setting.addDingMessage' />
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item {...buttonFormItemLayout}>
          <Button
            htmlType="submit"
            type="primary"
            style={{ width: '100%' }}
          >
            <FormattedMessage id='setting.submit' />
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default DingdingSetting;
