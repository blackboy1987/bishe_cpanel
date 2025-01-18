import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { list, remove } from './serivice';
import { Button, DatePicker, Form, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Add from './compnents/Add';
import { useRef, useState } from 'react';

export default () => {
  const actionRef = useRef<ActionType>(null);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [values, setValues] = useState<Record<string, any>>({});
  return (
    <PageContainer title={false}>
      <ProTable
        actionRef={actionRef}
        options={false}
        bordered
        size="small"
        rowKey="id"
        search={false}
        pagination={false}
        tableAlertRender={false}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            renderText: (_, record) => (
              <span style={{ paddingLeft: record.grade * 16 }}>{record.name}</span>
            ),
          },
          {
            title: '排序',
            dataIndex: 'order',
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
          {
            title: '操作',
            dataIndex: 'opt',
            valueType: 'option',
            width: 90,
            render: (_, record) => [
              <a
                key="edit"
                onClick={() => {
                  setAddModalVisible(true);
                  setValues(record);
                }}
              >
                编辑
              </a>,
              <a
                key="remove"
                onClick={() => {
                  Modal.confirm({
                    title: '提醒',
                    content: '您正在删除数据',
                    onOk: () => {
                      remove({
                        id: record.id,
                      }).then((result) => {
                        if (result.code === 0) {
                          message.success(result.msg).then();
                          actionRef.current?.reload();
                        } else {
                          message.error(result.msg).then();
                        }
                      });
                    },
                  });
                }}
              >
                删除
              </a>,
            ],
          },
        ]}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => setAddModalVisible(true)}>
            <PlusOutlined />
            新增
          </Button>,
        ]}
        request={list}
      />
      {addModalVisible ? (
        <Add
          values={values}
          open={addModalVisible}
          onClose={() => {
            setAddModalVisible(false);
            setValues({});
            actionRef.current?.reload();
          }}
        />
      ) : null}
    </PageContainer>
  );
};
