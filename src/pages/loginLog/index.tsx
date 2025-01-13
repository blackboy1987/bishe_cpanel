import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { list } from './serivice';
import { DatePicker, Form } from 'antd';
import React, { useRef } from 'react';

export default () => {
  const actionRef = useRef<ActionType>(null);
  return (
    <PageContainer title={false}>
      <ProTable
        actionRef={actionRef}
        options={false}
        bordered
        size="small"
        rowKey="id"
        tableAlertRender={false}
        columns={[
          {
            title: '用户名',
            dataIndex: 'username',
          },
          {
            title: '密码',
            dataIndex: 'password',
          },
          {
            title: 'IP',
            dataIndex: 'ip',
          },
          {
            title: 'sec-ch-ua',
            dataIndex: 'ua',
          },
          {
            title: 'user-agent',
            dataIndex: 'userAgent',
          },
          {
            title: '登录结果',
            dataIndex: 'result',
          },
          {
            title: '登录时间',
            dataIndex: 'createdDate',
            valueType: 'dateTime',
            width: 150,
            renderFormItem: () => (
              <Form.Item name="rangeDate">
                <DatePicker.RangePicker />
              </Form.Item>
            ),
          },
          {
            title: '操作',
            dataIndex: 'action',
          },
        ]}
        request={list}
      />
    </PageContainer>
  );
};
