import {Form, Input, message, Modal, TreeSelect} from 'antd';
import { save,departmentTree } from '../serivice';
import React, {useEffect, useState} from 'react';

interface AddProps {
  onClose: () => void;
  open: boolean;
  values?: Record<string, any>;
}

export default ({ onClose, open, values }: AddProps) => {
  const [form] = Form.useForm();
  const [treeDepartments, setTreeDepartments] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    departmentTree().then((result) => {
      setTreeDepartments(result.data || []);
    });
    console.log(values);
    form.setFieldsValue(values);
  }, []);
  return (
    <Modal
      title="新增角色"
      open={open}
      onOk={() => {
        form.validateFields().then((formValues) => {
          save(formValues).then((result) => {
            if (result.code === 0) {
              message.success(result.msg).then();
              onClose();
            } else {
              message.error(result.msg).then();
            }
          });
        });
      }}
      onCancel={onClose}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item
          label="所属部门"
          name="departmentId"
          rules={[
            {
              required: true,
              message: '请选择部门',
            },
          ]}
        >
          <TreeSelect
            treeLine
            allowClear
            showSearch
            fieldNames={{ label: 'name', value: 'id' }}
            treeDefaultExpandAll
            treeData={treeDepartments}
          />
        </Form.Item>
        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入角色名称',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="memo">
          <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
