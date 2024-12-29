import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { list, menu, remove } from './serivice';
import { Button, Card, Col, DatePicker, Form, message, Modal, Row, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Add from './compnents/Add';
import React, { useEffect, useRef, useState } from 'react';

export default () => {
  const actionRef = useRef<ActionType>();
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [values, setValues] = useState<Record<string, any>>({});
  const [menuInfo, setMenuInfo] = useState<Record<string, any>>({});
  const [treeMenus, setTreeMenus] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    menu().then((result) => {
      setTreeMenus(result.data || []);
    });
  }, []);

  return (
    <PageContainer title={false}>
      <Row gutter={8}>
        <Col span={4}>
          <Card title="菜单列表" size="small">
            <Tree
              showLine
              fieldNames={{ title: 'name', key: 'id' }}
              treeData={treeMenus}
              onSelect={(e, info) => {
                if (e.length > 0) {
                  setMenuInfo(info.node);
                } else {
                  setMenuInfo({});
                }
              }}
            />
          </Card>
        </Col>
        <Col span={20}>
          <ProTable
            headerTitle={menuInfo.name || '全部权限'}
            actionRef={actionRef}
            options={false}
            bordered
            size="small"
            rowKey="id"
            search={false}
            params={{
              menuId: menuInfo.id,
            }}
            tableAlertRender={false}
            columns={[
              {
                title: '菜单',
                dataIndex: 'menuName',
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
                title: '标识符',
                dataIndex: 'action',
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
                width: 90,
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
                    key="remove"
                    onClick={() => {
                      Modal.confirm({
                        title: '提醒',
                        content: '您正在删除数据',
                        onOk: () => {
                          remove({
                            id: record.id,
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
              <Button type="primary" key="add" onClick={() => actionRef.current?.reload()}>
                刷新
              </Button>,
            ]}
            request={list}
          />
        </Col>
      </Row>
      {addModalVisible ? (
        <Add
          menuId={values.menuId || menuInfo.id}
          values={values}
          open={addModalVisible}
          onClose={() => {
            setAddModalVisible(false);
            setValues({});
            actionRef.current?.reload();
          }}
        />
      ) : null}
    </PageContainer>
  );
};
