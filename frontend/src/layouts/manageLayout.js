import React, { useEffect, useState } from "react";
import { Menu, Row, Col } from 'antd';
import menuList from '@/utils/menuList'
import { history } from 'umi';

const ManageLayout = ({ children }) => {
    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleClick = e => {
        history.push(e.key);

        setSelectedKeys([e.key])
    };

    useEffect(() => {
        const pathname = location.pathname;

        setSelectedKeys([pathname])
    }, [])

    return (<div>
        <Row gutter={16}>
            <Col span={4}>
                <Menu
                    onClick={handleClick}
                    selectedKeys={selectedKeys}
                    mode="inline"
                >
                    {
                        menuList.map(item => (
                            <Menu.ItemGroup key={item.path} title={item.title}>
                                {
                                    item.children.map(p => (<Menu.Item key={p.path}>{p.title}</Menu.Item>))
                                }
                            </Menu.ItemGroup>
                        ))
                    }
                </Menu>
            </Col>

            <Col span={20}>
                {children}
            </Col>
        </Row>
    </div>)
}

export default ManageLayout