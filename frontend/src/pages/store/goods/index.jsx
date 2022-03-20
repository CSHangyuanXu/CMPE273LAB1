import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Modal, Form, Input, Upload, Select, InputNumber, Image } from 'antd';
import { connect } from 'umi'
import { publicPrefix, apiPrefix } from '@/utils/config'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input

const Goods = ({
    isOpen,
    storeClassify: { list: classifyList },
    storeInfo,
    dispatch,
    storeGoods: { list: storeGoodsList }
}) => {
    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false)
    const [selectData, setSelectData] = useState(true)
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch({
            type: "storeGoods/getUserStoreGoodsList",
            payload: {
                store_id: storeInfo.id
            }
        })
    }, []);

    const columns = [
        {
            title: 'Item Picture',
            dataIndex: 'cover',
            key: 'cover',
            render: text => (<Image
                width={100}
                src={publicPrefix + text}
            />)
        },
        {
            title: 'Item name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'cate_name',
            key: 'cate_name',
        },
        {
            title: 'Discribe',
            dataIndex: 'goods_dec',
            key: 'goods_dec',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Sell amount',
            dataIndex: 'volume',
            key: 'volume',
        },
        {
            title: 'Edit',
            dataIndex: 'other',
            render: (text, record) => (<div>
                <Button onClick={handleEdit.bind(null, record)}>Edit</Button>
            </div>)
        },
    ];

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);

            setImageUrl('')
            return;
        }
        if (info.file.status === 'done') {
            const { md5 } = info.file.response.data

            setLoading(true);

            setImageUrl(md5)

            form.setFieldsValue({
                cover: md5
            });
        }
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                if (selectData.id) {
                    // Edit
                    dispatch({
                        type: "storeGoods/editUserStoreGoodsList",
                        payload: { ...selectData, ...values, store_id: storeInfo.id }
                    }).then(res => {
                        handleCancel()
                    })
                } else {
                    // Add
                    dispatch({
                        type: "storeGoods/addUserStoreGoodsList",
                        payload: { ...values, store_id: storeInfo.id }
                    }).then(res => {
                        handleCancel()
                    })
                }
            })
    }

    const handleCreate = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)

        setSelectData({})

        form.resetFields()
    }

    const handleEdit = (data) => {
        setSelectData(data)

        setVisible(true)

        form.setFieldsValue({
            cover: data.cover,
        });

        setImageUrl(data.cover)
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (<div>
        {
            !isOpen && <Alert style={{ marginBottom: "10px" }} message="Didn't open shop!" type="warning" showIcon closable />
        }
        <div style={{ marginBottom: "25px" }}>
            <Button type="primary" disabled={!isOpen} onClick={handleCreate}>Add</Button>
        </div>
        <Table rowKey={(item) => item.id} dataSource={storeGoodsList} columns={columns} />
        <Modal title={selectData.id ? 'Edit' : 'Add'} visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={selectData}
                autoComplete="off"
            >
                <Form.Item
                    label="Item Picture"
                    name="cover"
                    rules={[{ required: true }]}
                >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={apiPrefix + '/upload'}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={publicPrefix + imageUrl} alt="cover" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Item Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input style={{ width: "250px" }} />
                </Form.Item>
                <Form.Item
                    label="Item Category"
                    name="cate_name"
                    rules={[{ required: true }]}
                >
                    <Select style={{ width: "250px" }}>
                        {
                            classifyList.map(item => (<Option value={item.cat_name} key={item.id}>{item.cat_name}</Option>))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Item discribe"
                    name="goods_dec"
                    rules={[{ required: true }]}
                >
                    <TextArea style={{ width: "250px" }} rows={4} />
                </Form.Item>
                <Form.Item
                    label="Item Price"
                    name="price"
                    rules={[{ required: true }]}
                >
                    <InputNumber min={1} style={{ width: "250px" }} />
                </Form.Item>
                <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[{ required: true }]}
                >
                    <InputNumber min={1} style={{ width: "250px" }} />
                </Form.Item>
            </Form>
        </Modal>
    </div>)
}

export default connect(({ storeInfo, app, storeClassify, storeGoods }) => ({ ...storeInfo, ...app, storeClassify, storeGoods }))(Goods)