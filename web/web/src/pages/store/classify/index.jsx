import React from "react";
import { Table, Button } from 'antd';

const Classify = () => {
    const columns = [
        {
            title: '商品分类',
            dataIndex: 'age',
            key: 'age',
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

export default Classify