import React, { useState } from "react";
import { Table, Button, Alert, Modal, Form, Input } from 'antd';
import { connect } from 'umi'

const Classify = ({ isOpen, userInfo, dispatch, storeClassify: { list } }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Categorys',
            dataIndex: 'cat_name',
            key: 'cat_name',
        }
    ];

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                dispatch({
                    type: "storeClassify/addUserStoreClassifyList",
                    payload: { user_id: userInfo.id, ...values }
                }).then(res => {
                    handleCancel()
                })
            })
    }

    const handleCancel = () => {
        setVisible(false)

        form.resetFields()
    }

    return (<div>
        {
            !isOpen && <Alert style={{ marginBottom: "10px" }} message="did open shop!" type="warning" showIcon closable />
        }
        <div style={{ marginBottom: "25px" }}>
            <Button type="primary" disabled={!isOpen} onClick={() => setVisible(true)}>add</Button>
        </div>
        <Table rowKey={(item) => item.id} dataSource={list} columns={columns} />
        <Modal title='add' visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                autoComplete="off"
            >
                <Form.Item
                    label="Category name"
                    name="cat_name"
                    rules={[{ required: true }]}
                >
                    <Input style={{ width: "250px" }} />
                </Form.Item>
            </Form>
        </Modal>
    </div>)
}

export default connect(({ storeInfo, app, storeClassify }) => ({ ...storeInfo, ...app, storeClassify }))(Classify)