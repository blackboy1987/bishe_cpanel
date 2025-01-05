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
      title="新增部门"
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
        <Form.Item label="上级部门" name="parentId">
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
              message: '请输入部门名称',
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
              message: '请设置部门排序',
            },
          ]}
        >
          <InputNumber min={0} precision={0} step={1} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
