import React from "react";
import { Card, Form, Input, Button } from 'antd'
import { useHistory } from 'umi'
import styles from './index.less'

const headStyle = {
    textAlign: "center",
    background: "#ffe300",
    color: "#333333"
}

const onFinish = (values) => {
    console.log('Success:', values);

};

const Register = () => {
    const history = useHistory();

    return (<div className={styles['register-page']}>
        <div className={styles['card-box']}>
            <p className={styles['title']}>已有帐号， <span onClick={() => history.push('/login')}>马上登录</span></p>
            <Card title='register' headStyle={headStyle}>
                <div className={styles['card-form-body']}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[{ type: 'email' }, { required: true, message: 'Please input your E-mail!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit                      </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div >
    </div >)
}

export default Register