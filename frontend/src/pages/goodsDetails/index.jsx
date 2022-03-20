import React, { useState } from "react";
import { Descriptions, InputNumber, Row, Col, Button, message } from 'antd';
import styles from './index.less';
import { HeartOutlined } from '@ant-design/icons';
import { connect, Link } from 'umi'
import { publicPrefix } from '@/utils/config'
import store from 'store'

const goodsDetails = ({ details, dispatch }) => {
    const [goodsNum, setGoodsNum] = useState(1)

    const handleAddUserCollection = (goods_id) => {
        const userInfo = store.get('userInfo') || {}

        dispatch({
            type: "goodsDetails/addUserCollection",
            payload: {
                goods_id,
                user_id: userInfo.id
            }
        })
    }

    const handleAddCart = (goods_id) => {
        const userInfo = store.get('userInfo') || {}
        dispatch({
            type: "goodsDetails/addUserCart",
            payload: {
                goods_id,
                user_id: userInfo.id,
                amount: Number(goodsNum)
            }
        })
    }

    const submit = () => {
        const userInfo = store.get('userInfo') || {}

        dispatch({
            type: "cartList/addUserOrder",
            payload: {
                price: Number(details.price),
                goods: JSON.stringify([{ ...details, amount: 1 }]),
                user_id: userInfo.id,
            }
        })
    }

    return (<div className={styles['goods-details-page']}>
        <div className={styles['cover-box']}>
            <img src={publicPrefix + details.cover} alt="cover" />
        </div>
        <div className={styles['goods-info']}>
            <h1 className={styles['goods-info-tile']}>{details.name}</h1>
            <p className={styles['goods-info-dec']}>{details.goods_dec}</p>
            <div className={styles['goods-info-sku']}>
                <Descriptions column={1}>
                    <Descriptions.Item label="price"><span className={styles['price']}>¥{details.price}</span></Descriptions.Item>
                    <Descriptions.Item label="category">{details.cate_name}</Descriptions.Item>
                    <Descriptions.Item label="stock">{details.stock}</Descriptions.Item>
                    <Descriptions.Item label="price">{details.volume}</Descriptions.Item>
                </Descriptions>
            </div>
            <Row align="middle" style={{ marginBottom: "30px" }}>
                <Col span={2}>
                    <div className={styles['goods-num']}>shop</div>
                </Col>
                <Col span={4}>
                    <Link to={'/storePage?id='+details.store_id}>{details.store_name}</Link>
                </Col>
            </Row>
            <Row align="middle" style={{ marginBottom: "30px" }}>
                <Col span={2}>
                    <div className={styles['goods-num']}>number</div>
                </Col>
                <Col span={4}>
                    <InputNumber value={goodsNum} min={1} onChange={val => setGoodsNum(val)} />
                </Col>
            </Row>
            <Row align="middle" gutter={16}>
                <Col span={6}>
                    <Button style={{ width: "100%" }} type="primary" onClick={submit}>buy now</Button>
                </Col>
                <Col span={3}>
                    <Button style={{ width: "100%" }} onClick={() => handleAddUserCollection(details.id)}><HeartOutlined /></Button>
                </Col>
                <Col span={6}>
                    <Button style={{ width: "100%" }} onClick={() => handleAddCart(details.id)}>add to cart</Button>
                </Col>
            </Row>
        </div>
    </div>)
}

export default connect(({ goodsDetails }) => ({ ...goodsDetails }))(goodsDetails)