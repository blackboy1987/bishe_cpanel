import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { list, remove } from './serivice';
import {Button, DatePicker, Form, message, Modal, TreeSelect} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Add from './compnents/Add';
import React, {useEffect, useRef, useState} from 'react';
import {departmentTree} from "@/pages/admin/service";
import Permission from "@/pages/role/compnents/Permission";

export default () => {
  const actionRef = useRef<ActionType>(null);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState<boolean>(false);
  const [values, setValues] = useState<Record<string, any>>({});
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [treeDepartments, setTreeDepartments] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    departmentTree().then((result) => {
      setTreeDepartments(result.data || []);
    });
  }, []);
  return (
    <PageContainer title={false}>
      <ProTable
        actionRef={actionRef}
        options={false}
        bordered
        size="small"
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          columnWidth: 40,
          onChange: (selectedRowKeys) => {
            setSelectedKeys(selectedRowKeys);
          },
        }}
        tableAlertRender={false}
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
            title: '名称',
            dataIndex: 'name',
          },
          {
            title: '描述',
            dataIndex: 'memo',
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
            width: 120,
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
                key="permission"
                onClick={() => {
                  setPermissionModalVisible(true);
                  setValues(record);
                }}
              >
                权限
              </a>,
              <a
                key="remove"
                onClick={() => {
                  Modal.confirm({
                    title: '提醒',
                    content: '您正在删除数据',
                    onOk: () => {
                      remove({
                        ids: record.id,
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
          <Button
            disabled={selectedKeys.length === 0}
            type="primary"
            danger
            key="remove"
            onClick={() => {
              if (selectedKeys.length == 0) {
                message.warning('请选择需要删除的数据').then();
                return;
              }
              Modal.confirm({
                title: '提醒',
                content: '您正在删除数据',
                onOk: () => {
                  remove({
                    ids: selectedKeys.join(','),
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
          </Button>,
        ]}
        request={list}
      />
      {
        addModalVisible ? (
          <Add
            values={values}
            open={addModalVisible}
            onClose={() => {
              setAddModalVisible(false);
              setValues({});
              actionRef.current?.reload();
            }}
          />
        ) : null
      }
      {
        permissionModalVisible && Object.keys(values).length>0 ? (
          <Permission
            values={values}
            open={permissionModalVisible}
            onClose={() => {
              setPermissionModalVisible(false);
              setValues({});
              actionRef.current?.reload();
            }}
          />
        ) : null
      }
    </PageContainer>
  );
};
