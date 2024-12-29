import { save } from '@/pages/admin/service';
import { Form, Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';

interface AddProps {
  open: boolean;
  onClose: () => void;
  values?: Record<string, any>;
}

export default ({ open, onClose, values }: AddProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values]);

  return (
    <Modal
      open={open}
      title="添加账号"
      onCancel={onClose}
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
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item label="ID" name="id" style={{ display: 'none' }}>
          <Input autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input disabled={values?.id} autoComplete="new-password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
