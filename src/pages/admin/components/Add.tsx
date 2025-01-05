import { departmentTree, save } from '@/pages/admin/service';
import {Button, Form, Input, message, Modal, Tag, TreeSelect} from 'antd';
import React, { useEffect, useState } from 'react';
import RoleModal from "@/components/RoleModal";
import styles from './index.less';

interface AddProps {
  open: boolean;
  onClose: () => void;
  values?: Record<string, any>;
}

export default ({ open, onClose, values }: AddProps) => {
  const [form] = Form.useForm();
  const [treeDepartments, setTreeDepartments] = useState<Record<string, any>[]>([]);
  const [roleModalVisible, setRoleModalVisible] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    departmentTree().then((result) => {
      setTreeDepartments(result.data || []);
    });
    form.setFieldsValue(values);
  }, []);

  return (
    <>
      <Modal
        style={{ top: '5%' }}
        width={800}
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
          <Form.Item label="角色" required>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                onClick={() => {
                  setRoleModalVisible(true);
                }}
              >
                选择角色
              </Button>
            </Form.Item>
            <Form.Item
              name="roleIds"
              className={styles.hiddenInput}
              style={{ marginBottom: 0,height:0 }}
              rules={[
                {
                  required: true,
                  message: '至少选择一个角色',
                },
              ]}
            >
              <Input />
            </Form.Item>
            {
              departments.length > 0 && (
                <Form.Item style={{ marginBottom: 0 }}>
                  {departments.map((item: Record<string, any>) => (
                    <Tag
                      closable
                      onClose={() => {
                        setDepartments(departments.filter((item1) => item.id !== item1.id));
                      }}
                      key={item.id}
                    >
                      {item.name}
                    </Tag>
                  ))}
                </Form.Item>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
      {roleModalVisible && (
        <RoleModal
          selectedList={departments}
          open={open}
          onClose={() => {
            setRoleModalVisible(false);
          }}
          onSelect={(departmentList: Record<string, any>[]) => {
            setDepartments(departmentList);
            setRoleModalVisible(false);
            form.setFieldValue("roleIds", departmentList.map(item=>item.id).join(","));
          }}
        />
      )}
    </>
  );
};
