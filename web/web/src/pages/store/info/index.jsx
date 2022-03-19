import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const Info = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log(info)
        }
    };

    return (<div>
        <div style={{ marginBottom: "25px" }}>
            <Row>
                <Col span={4} style={{ textAlign: "right" }}>
                    店铺总收益：
                </Col>
                <Col span={4}>
                    200
                </Col>
            </Row>
        </div>
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="商店图片"
                name="avatar"
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2"
                    onChange={handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item
                label="商店名称"
                name="username"
            >
                <Input style={{ width: "250px" }} />
                <Button type="primary" style={{marginLeft:'10px'}} >检测</Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button type="primary" htmlType="submit" style={{ width: "100px" }}>
                    保存
                </Button>
            </Form.Item>
        </Form>
    </div>)
}

export default Info