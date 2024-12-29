import { Form, Input, message, Modal, TreeSelect } from 'antd';
import { menu, save } from '../serivice';
import { useEffect, useState } from 'react';

interface AddProps {
  onClose: () => void;
  open: boolean;
  values?: Record<string, any>;
  menuId?: number;
}

export default ({ onClose, open, values, menuId }: AddProps) => {
  const [form] = Form.useForm();
  const [treeMenus, setTreeMenus] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    menu().then((result) => {
      setTreeMenus(result.data || []);
    });
    if (values && Object.keys(values).length > 0) {
      form.setFieldsValue(values);
    } else {
      form.setFieldsValue({
        menuId,
      });
    }
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
        <Form.Item
          label="菜单"
          name="menuId"
          rules={[
            {
              required: true,
              message: '请选择菜单',
            },
          ]}
        >
          <TreeSelect
            disabled={!!menuId}
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
          label="标识符"
          name="action"
          rules={[
            {
              required: true,
              message: '请输入权限标名称',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="memo">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
