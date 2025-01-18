import { Button, Modal, Tag } from 'antd';
import { list } from '@/pages/role/serivice';
import { ActionType, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (departmentList: Record<string, any>[]) => void;
  selectedList?: Record<string, any>[];
}

export default ({ open, onClose, onSelect, selectedList }: RoleModalProps) => {
  const actionRef = useRef<ActionType>(null);
  const [departmentList, setDepartmentList] = useState<Record<string, any>[]>(selectedList || []);

  useEffect(() => {
    setDepartmentList(selectedList || []);
  }, [selectedList]);

  return (
    <Modal
      width={800}
      open={open}
      title="选择角色"
      onCancel={onClose}
      onOk={() => {
        onSelect(departmentList);
      }}
    >
      <ProTable
        actionRef={actionRef}
        options={false}
        bordered
        search={false}
        size="small"
        rowKey="id"
        tableAlertRender={false}
        columns={[
          {
            title: '部门',
            dataIndex: 'departmentName',
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
            title: '操作',
            dataIndex: 'opt',
            valueType: 'option',
            width: 50,
            render: (_, record) => {
              const exist =
                departmentList.filter((item: Record<string, any>) => item.id === record.id).length >
                0;
              return (
                <>
                  {exist ? (
                    <Button
                      size="small"
                      type="primary"
                      danger
                      key="remove"
                      onClick={() => {
                        setDepartmentList(departmentList.filter((item) => item.id !== record.id));
                      }}
                    >
                      取消
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      type="primary"
                      key="edit"
                      onClick={() => {
                        setDepartmentList([
                          ...departmentList,
                          {
                            id: record.id,
                            name: record.name,
                          },
                        ]);
                      }}
                    >
                      选择
                    </Button>
                  )}
                </>
              );
            },
          },
        ]}
        request={list}
      />
      <div>
        {departmentList.map((item: Record<string, any>) => (
          <Tag
            closable
            onClose={() => {
              setDepartmentList(departmentList.filter((item1) => item.id !== item1.id));
            }}
            key={item.id}
          >
            {item.name}
          </Tag>
        ))}
      </div>
    </Modal>
  );
};
