import React from "react";
import styles from './index.less'
import { Row, Col, Card, Button } from 'antd'
import { connect, history } from 'umi'
import { publicPrefix } from '@/utils/config'
import store from 'store'

const storePage = ({ details, storeGoods: { list }, dispatch }) => {

    const handleGoodsDetails = (id) => {
        history.push('/goodsDetails?id=' + id)
    }

    const handleAddCart = (e, goods_id) => {
        e.stopPropagation();
        const userInfo = store.get('userInfo') || {}
        dispatch({
            type: "goodsDetails/addUserCart",
            payload: {
                goods_id,
                user_id: userInfo.id,
                amount: 1
            }
        })
    }

    return (<div className={styles['store-page-conter']}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>shopping page</h1>
        <Row gutter={8}>
            <Col span={5}>
                <div style={{ width: "100%" }}>
                    <Card size="small" title="details" style={{ width: '100%', marginBottom: "20px" }}>
                        <div className={styles['info']}>
                            <img src={publicPrefix + details.store_cover} alt="cover" />
                            <p>{details.store_name}</p>
                        </div>
                    </Card>
                    <Card size="small" title="onwer" style={{ width: '100%' }}>
                        <div className={styles['info']}>
                            <img src={publicPrefix + details.avatar} alt="cover" />
                            <p>{details.username}</p>
                        </div>
                    </Card>
                </div>
            </Col>
            <Col span={19}>
                <div className={styles['main']}>
                    <div className={styles['goods-list']}>
                        {
                            list.map(item => (
                                <div className={styles['list']} key={item.id} onClick={() => handleGoodsDetails(item.id)}>
                                    <div className={styles['hd']}>
                                        <img src={publicPrefix + item.cover} alt="" />
                                    </div>
                                    <div className={styles['goods-info']}>
                                        <h1 className={styles['goods-title']}>{item.name}</h1>
                                        <p className={styles['goods-dec']}>{item.goods_dec}</p>
                                        <p className={styles['goods-price']}>¥{item.price}</p>
                                        <p className={styles['goods-volume']}>already selled:{item.volume}</p>
                                        <Button type="primary" onClick={(e) => handleAddCart(e, item.id)}>add to cart</Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Col>
        </Row>
    </div>)
}

export default connect(({ storePageDetails, storeGoods }) => ({ ...storePageDetails, storeGoods }))(storePage)