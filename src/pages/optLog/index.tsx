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
            title: '操作人',
            dataIndex: 'username',
          },
          {
            title: 'IP',
            dataIndex: 'ip',
          },
          {
            title: '操作',
            dataIndex: 'action',
          },
          {
            title: '创建时间',
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
