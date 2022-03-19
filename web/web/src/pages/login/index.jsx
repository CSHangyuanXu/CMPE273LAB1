import React from 'react';
import { Card, Form, Input, Button } from 'antd'
import { connect } from 'umi'
import styles from './index.less'
import config from '@/utils/config'

const login = ({ dispatch }) => {

    const onFinish = (values) => {
        console.log('Success:', values);

        dispatch({
            type: "login/login",
            payload: {
                ...values
            }
        })
    };

    return (<div className={styles['login-page']}>
        <div className={styles['bg']}>
            <Card className={styles['card-box']}>
                <div className={styles['logo']}>
                    <span>{config.siteName}</span>
                </div>
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
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Sign in                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    </div>)
}

export default connect((login) => ({ login }))(login)