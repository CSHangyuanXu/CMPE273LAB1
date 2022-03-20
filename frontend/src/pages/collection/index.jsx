import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import { connect, history } from 'umi'
import { publicPrefix } from '@/utils/config'
import { DeleteFilled } from '@ant-design/icons';
import store from 'store'

const Home = ({ collectionList: { list }, dispatch }) => {

    const handleRmove = (id) => {
        dispatch({
            type: "collectionList/deleteCollectionList",
            payload: {
                id
            }
        })
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

    const handleGoodsDetails = (id) => {
        history.push('/goodsDetails?id=' + id)
    }

    return (<div className={styles['home-page']}>
        <h1 style={{ textAlign: "center", margin: 0 }}>my favorite</h1>
        <div className={styles['main']}>
            <div className={styles['goods-list']}>
                {
                    list.map(item => (
                        <div className={styles['list']} key={item.id} onClick={() => handleGoodsDetails(item.goods_id)}>
                            <div className={styles['hd']}>
                                <img src={publicPrefix + item.cover} alt="" />
                            </div>
                            <div className={styles['goods-info']}>
                                <h1 className={styles['goods-title']}>{item.name}</h1>
                                <p className={styles['goods-dec']}>{item.goods_dec}</p>
                                <p className={styles['goods-price']}>¥{item.price}</p>
                                <p className={styles['goods-volume']}>already selled: {item.volume}</p>
                                <div className={styles['buttons']}>
                                    <Button type="primary" onClick={(e) => handleAddCart(e, item.goods_id)}>add to cart</Button>
                                    <Button type="primary" danger onClick={() => handleRmove(item.id)}>
                                        <DeleteFilled />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>)
}

export default connect(({ collectionList }) => ({ collectionList }))(Home)