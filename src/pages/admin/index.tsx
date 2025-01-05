import {Button, DatePicker, Form, message, TreeSelect} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {departmentTree, loadData, remove} from './service';
import { ActionType, ProTable } from '@ant-design/pro-components';
import Add from './components/Add';

export default () => {
  const actionRef = useRef<ActionType>();
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [values, setValues] = useState<Record<string, any>>({});
  const [treeDepartments, setTreeDepartments] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    departmentTree().then((result) => {
      setTreeDepartments(result.data || []);
    });
  }, []);
  return (
    <div>
      <ProTable
        actionRef={actionRef}
        bordered
        size="small"
        rowKey="id"
        columns={[
          {
            title: '部门',
            dataIndex: 'departmentName',
            renderFormItem: () => (
              <Form.Item name='departmentId'>
                <TreeSelect
                  treeLine
                  allowClear
                  showSearch
                  fieldNames={{ label: 'name', value: 'id' }}
                  treeDefaultExpandAll
                  treeData={treeDepartments}
                />
              </Form.Item>
            ),
          },
          {
            title: '用户名',
            dataIndex: 'username',
          },
          {
            title: '创建时间',
            dataIndex: 'createdDate',
            width: 150,
            valueType: 'dateTime',
            renderFormItem: () => (
              <Form.Item name="rangeDate">
                <DatePicker.RangePicker />
              </Form.Item>
            ),
          },
          {
            title: '操作',
            dataIndex: 'opt',
            width: 170,
            valueType: 'option',
            render: (text, record) => [
              <Button
                key="edit"
                type="primary"
                onClick={() => {
                  setAddModalVisible(true);
                  setValues(record);
                }}
              >
                修改
              </Button>,
              <Button
                key="delete"
                type="primary"
                danger
                onClick={() => {
                  remove({
                    id: record.id,
                  }).then((res) => {
                    if (res.code === 0) {
                      message.success(res.msg).then();
                      actionRef.current?.reload();
                    } else {
                      message.error(res.msg).then();
                    }
                  });
                }}
              >
                删除
              </Button>,
            ],
          },
        ]}
        request={loadData}
        options={false}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setAddModalVisible(true);
            }}
          >
            新增
          </Button>,
        ]}
      />
      {addModalVisible ? (
        <Add
          open={addModalVisible}
          values={values}
          onClose={() => {
            setAddModalVisible(false);
            setValues({});
            actionRef.current?.reload();
          }}
        />
      ) : null}
    </div>
  );
};
