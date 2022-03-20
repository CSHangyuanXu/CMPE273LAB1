import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Upload, Alert, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { publicPrefix, apiPrefix } from '@/utils/config'
import { connect } from 'umi'

const Info = ({ userInfo, isOpen, dispatch, storeInfo }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (storeInfo) {

            setImageUrl(storeInfo.store_cover)

            form.setFieldsValue({
                store_cover: storeInfo.store_cover,
            });
        }
    }, [])

    const onFinish = (values) => {
        if (isOpen) {
            // edit
            dispatch({
                type: "storeInfo/editUserStoreInfo",
                payload: { id: userInfo.id, ...values }
            })
        } else {
            // add
            dispatch({
                type: "storeInfo/addUserStoreInfo",
                payload: { user_id: userInfo.id, ...values }
            })
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const hanldeQuery = () => {
        const store_name = form.getFieldValue('store_name')

        setIsDisabled(true);

        if (store_name === storeInfo.store_name) {
            setIsDisabled(false);

            message.warning('didnot change');
        } else {
            dispatch({
                type: "storeInfo/queryStoreName",
                payload: { store_name }
            }).then(res => {
                setIsDisabled(false);
            })
        }
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const { md5 } = info.file.response.data

            setLoading(true);

            setImageUrl(md5)

            form.setFieldsValue({
                store_cover: md5
            });
        }
    };

    return (<div>
        <div style={{ marginBottom: "25px" }}>
            {
                !isOpen && <Alert style={{ marginBottom: "10px" }} message="didnot open store" type="warning" showIcon closable />
            }
            <Row>
                <Col span={4} style={{ textAlign: "right" }}>
                    income:
                </Col>
                <Col span={4}>
                    {storeInfo.revenue || 0}
                </Col>
            </Row>
        </div>
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={storeInfo}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="picture"
                name="store_cover"
            >
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={apiPrefix + '/upload'}
                    onChange={handleChange}
                >
                    {imageUrl ? <img src={publicPrefix + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item
                label="name"
                name="store_name"
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button style={{ marginRight: '10px' }} onClick={hanldeQuery}>check</Button>
                <Button disabled={isDisabled} type="primary" htmlType="submit" style={{ width: "100px" }}>
                    saved
                </Button>
            </Form.Item>
        </Form>
    </div>)
}

export default connect(({ storeInfo, app }) => ({ ...storeInfo, ...app }))(Info)