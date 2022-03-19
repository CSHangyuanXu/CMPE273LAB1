import React from "react";
import { Table, Button } from 'antd';

const Goods = () => {
    const columns = [
        {
            title: '商品图片',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '商品名称',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '分类',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '描述',
            dataIndex: 'num',
            key: 'num',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '库存',
            dataIndex: 'dete',
            key: 'dete',
        },
        {
            title: '操作',
            dataIndex: 'other',
            render: text => (<div>
                <Button>编辑</Button>
            </div>)
        },
    ];

    return (<div>
        <div style={{ marginBottom: "25px" }}>
            <Button type="primary">新增</Button>
        </div>
        <Table dataSource={[]} columns={columns} />
    </div>)
}

export default Goods