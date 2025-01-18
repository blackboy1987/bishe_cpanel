import {Button, DatePicker, Form, message, Modal, TreeSelect} from 'antd';
import React, {act, useEffect, useRef, useState} from 'react';
import {departmentTree, loadData, remove, unLock} from './service';
import { ActionType, ProTable } from '@ant-design/pro-components';
import Add from './components/Add';
import {LockOutlined} from '@ant-design/icons';

export default () => {
  const actionRef = useRef<ActionType>(null);
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
            title: '锁定',
            dataIndex: 'isLocked',
            valueEnum:{
              true:{
                text:'锁定'
              },
              false:{
                text:'未锁定'
              },
            }
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
              record.isLocked && <Button
                key="unLock"
                type="primary"
                onClick={() => {
                  Modal.confirm({
                    title:'提醒',
                    content:'您正在进行账户解锁操作',
                    onOk: () => {
                      // 调用接口执行解锁操作
                      unLock({
                        id:record.id,
                      }).then(result=>{
                        if(result.code==0){
                          message.success(result.msg).then()
                        }else{
                          message.error(result.msg).then();
                        }
                        actionRef.current?.reload();
                      })
                    }
                  })
                }}
                danger
                icon={<LockOutlined />}
              >
                解锁
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
