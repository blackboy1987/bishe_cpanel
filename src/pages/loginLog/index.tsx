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
            hideInSearch:true,
          },
          {
            title: '密码',
            dataIndex: 'password',
            hideInSearch:true,
          },
          {
            title: 'IP',
            dataIndex: 'ip',
            hideInSearch:true,
          },
          {
            title: 'sec-ch-ua',
            dataIndex: 'ua',
            hideInSearch:true,
          },
          {
            title: 'user-agent',
            dataIndex: 'userAgent',
            hideInSearch:true,
          },
          {
            title: '登录结果',
            dataIndex: 'result',
            hideInSearch:true,
          },
          {
            title: '操作时间',
            dataIndex: 'createdDate',
            valueType: 'dateTime',
            width: 150,
            renderFormItem: () => (
              <Form.Item name="rangeDate">
                <DatePicker.RangePicker />
              </Form.Item>
            ),
          },
        ]}
        request={list}
      />
    </PageContainer>
  );
};
