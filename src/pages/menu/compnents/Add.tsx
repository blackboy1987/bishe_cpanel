import { Form, Input, InputNumber, message, Modal, TreeSelect } from 'antd';
import { save, tree } from '../serivice';
import { useEffect, useState } from 'react';

interface AddProps {
  onClose: () => void;
  open: boolean;
  values?: Record<string, any>;
}

export default ({ onClose, open, values }: AddProps) => {
  const [form] = Form.useForm();
  const [treeMenus, setTreeMenus] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    tree().then((result) => {
      setTreeMenus(result.data || []);
    });
    form.setFieldsValue(values);
  }, []);
  return (
    <Modal
      title="新增菜单"
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
        <Form.Item label="上级菜单" name="parentId">
          <TreeSelect
            treeLine
            allowClear
            showSearch
            fieldNames={{ label: 'name', value: 'id' }}
            treeDefaultExpandAll
            treeData={treeMenus}
          />
        </Form.Item>
        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入菜单名称',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="路由"
          name="url"
          rules={[
            {
              required: true,
              message: '请输入菜单路由',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="组件"
          name="component"
          rules={[
            {
              required: true,
              message: '请输入菜单组件',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="排序"
          name="order"
          rules={[
            {
              required: true,
              message: '请设置菜单排序',
            },
          ]}
        >
          <InputNumber min={0} precision={0} step={1} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
