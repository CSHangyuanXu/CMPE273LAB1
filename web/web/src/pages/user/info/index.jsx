import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

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
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="头像"
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
                label="姓名"
                name="username"
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="出生日期"
                name="username"
            >
                <DatePicker style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="城市"
                name="username"
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="电子邮件"
                name="username"
                rules={[{ type: 'email' }]}
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="电话号码"
                name="username"
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="地址"
                name="address"
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="国家"
                name="address"
            >
                <Select style={{ width: "250px" }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                </Select>
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