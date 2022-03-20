import React from "react";
import { Table, Image } from 'antd';
import { publicPrefix } from '@/utils/config'
import { connect } from 'umi'
import dayjs from "dayjs";

const Order = ({userOrder:{list}}) => {
    const columns = [
        {
            title: 'Picture',
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
            title: 'Store name',
            dataIndex: 'store_name',
            key: 'store_name',
        },
        {
            title: 'amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Purchase data',
            dataIndex: 'create_time',
            key: 'create_time',
            render:text=>dayjs(text).format('YYYY-MM-DD')
        },
    ];

    return (<div>
        <Table dataSource={list} columns={columns} />
    </div>)
}

export default connect(({ userOrder }) => ({ userOrder }))(Order)