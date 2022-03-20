import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, Upload, message } from 'antd';
import { connect } from 'umi'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import globalCountries from '@/utils/globalCountries'
import { publicPrefix, apiPrefix } from '@/utils/config'
import dayjs from "dayjs";

const { Option } = Select;

const Info = ({ userInfo, dispatch }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (userInfo) {

            setImageUrl(userInfo.avatar)

            form.setFieldsValue({
                avatar: userInfo.avatar,
            });
        }
    }, [])

    const onFinish = (values) => {
        dispatch({
            type: "userInfo/editUserInfo",
            payload: { id: userInfo.id, ...values, birth_date: values.birth_date.format('YYYY-MM-DD') }
        })
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

            setImageUrl('')
            return;
        }
        if (info.file.status === 'done') {
            const { md5 } = info.file.response.data

            setLoading(true);

            setImageUrl(md5)

            form.setFieldsValue({
                avatar: md5
            });
        }
    };

    return (<div>
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ ...userInfo, birth_date:userInfo.birth_date?dayjs(userInfo.birth_date):dayjs() }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
        >
            <Form.Item
                label="avatar"
                name="avatar"
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
                label="username"
                name="username"
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="birth_date"
                name="birth_date"
            >
                <DatePicker style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="city"
                name="city"
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="email"
                name="email"
                rules={[{ type: 'email' }]}
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="phone"
                name="phone"
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="address"
                name="address"
            >
                <Input style={{ width: "250px" }} />
            </Form.Item>

            <Form.Item
                label="country"
                name="country"
            >
                <Select style={{ width: "250px" }}>
                    {
                        globalCountries.map(item => (<Option value={item.en} key={item.code}>{item.en}</Option>))
                    }
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button type="primary" htmlType="submit" style={{ width: "100px" }}>
                    save
                </Button>
            </Form.Item>
        </Form>
    </div>)
}

export default connect(({ app }) => ({ ...app }))(Info)