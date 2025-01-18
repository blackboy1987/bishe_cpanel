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
            hideInSearch:true,
          },
          {
            title: 'IP',
            dataIndex: 'ip',
            hideInSearch:true,
          },
          {
            title: '操作',
            dataIndex: 'action',
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
