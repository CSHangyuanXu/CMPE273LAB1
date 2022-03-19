import React from "react";
import { Table } from 'antd';

const Order = () => {
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
            title: '商店名称',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '数量',
            dataIndex: 'num',
            key: 'num',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '购买日期',
            dataIndex: 'dete',
            key: 'dete',
        },
    ];
    
    return (<div>
        <Table dataSource={[]} columns={columns} />
    </div>)
}

export default Order