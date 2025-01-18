import {Form, Input, message, Modal, Tree, TreeSelect} from 'antd';
import {save, permission, savePermission} from '../serivice';
import React, {useEffect, useState} from 'react';

interface AddProps {
  onClose: () => void;
  open: boolean;
  values: Record<string, any>;
}

export default ({ onClose, open, values }: AddProps) => {
  const [form] = Form.useForm();
  const [permissionTree, setPermissionTree] = useState<Record<string, any>[]>([]);
  const [selectedPermissionIds, setSelectedPermissionId] = useState<React.Key[]>([]);
  useEffect(() => {
    permission({
      roleId: values.id,
    }).then((result) => {
      setPermissionTree(result.data.menuList || []);
      setSelectedPermissionId(result.data.selectedPermissionIds || []);
    });
    form.setFieldsValue(values);
  }, []);
  console.log('selectedPermissionIds',selectedPermissionIds);
  return (
    <Modal
      title={`${values.name} 权限管理`}
      open={open}
      onOk={() => {
        form.validateFields().then((formValues) => {
          const params = {
            ...formValues,
            roleId: values.id,
            permissionIds:selectedPermissionIds.join(","),
          };
          delete params.id;
          savePermission(params).then((result) => {
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
        <Form.Item>
          <Tree
            checkable
            showLine
            checkedKeys={selectedPermissionIds}
            fieldNames={{title:'name',key:'id',children:"permissions"}}
            treeData={permissionTree}
            onCheck={(ids)=>{
              setSelectedPermissionId(ids as React.Key[]);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
