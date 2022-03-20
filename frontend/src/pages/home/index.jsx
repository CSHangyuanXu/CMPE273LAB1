import React, { useState } from 'react';
import { Button, Checkbox, InputNumber,message } from 'antd';
import styles from './index.less';
import { connect, history } from 'umi'
import { publicPrefix } from '@/utils/config'
import SortText from './SortText'
import store from 'store'

const Home = ({ goodsList: { list }, dispatch }) => {

    const [priceType, setPriceType] = useState('')
    const [stockType, setStockType] = useState('')
    const [volumeType, setVolumeType] = useState('')
    const [startPrice, setStartPrice] = useState(0)
    const [endPrice, setEndPrice] = useState(0)

    const [index, setIndex] = useState('def')

    const onChange = (e) => {
        if (e.target.checked) {
            dispatch({
                type: "goodsList/getAllGoods",
                payload: {
                    isStock: 1,
                }
            })
        } else {
            dispatch({
                type: "goodsList/getAllGoods",
                payload: {}
            })
        }
    }

    const handleDef = (type) => {
        setIndex(type)

        setPriceType('')

        setPriceType('')

        setVolumeType('')

        dispatch({
            type: "goodsList/getAllGoods",
            payload: {}
        })
    }

    const handleSort = (type) => {
        switch (type) {
            case "price":
                if (priceType === 'sheng') {
                    setPriceType('jiang')

                    dispatch({
                        type: "goodsList/getAllGoods",
                        payload: {
                            price: 'desc'
                        }
                    })
                } else {
                    setPriceType('sheng')

                    dispatch({
                        type: "goodsList/getAllGoods",
                        payload: {
                            price: 'asc'
                        }
                    })
                }

                setStockType('')

                setVolumeType('')

                break;
            case "stock":
                if (stockType === 'sheng') {
                    setStockType('jiang')

                    dispatch({
                        type: "goodsList/getAllGoods",
                        payload: {
                            stock: 'desc'
                        }
                    })
                } else {
                    setStockType('sheng')

                    dispatch({
                        type: "goodsList/getAllGoods",
                        payload: {
                            stock: 'asc'
                        }
                    })
                }

                setPriceType('')

                setVolumeType('')
                break;
            case "volume":
                if (volumeType === 'sheng') {
                    setVolumeType('jiang')

                    dispatch({
                        type: "goodsList/getAllGoods",
                        payload: {
                            volume: 'desc'
                        }
                    })
                } else {
                    setVolumeType('sheng')

                    dispatch({
                        type: "goodsList/getAllGoods",
                        payload: {
                            volume: 'asc'
                        }
                    })
                }

                setPriceType('')

                setStockType('')
                break;
            default:
                break;
        }

        setIndex(type)
    }

    const handlePriceSection = () => {
        dispatch({
            type: "goodsList/getAllGoods",
            payload: {
                start_price: startPrice,
                end_price: endPrice
            }
        })
    }

    const handleDelete = () => {
        setStartPrice(0)

        setEndPrice(0)

        dispatch({
            type: "goodsList/getAllGoods",
            payload: {}
        })
    }

    const handleGoodsDetails = (id) => {
        const userInfo = store.get('userInfo') || {}

        if (userInfo.id) {
            history.push('/goodsDetails?id=' + id)
        } else {
            message.warning('Please log in first')
        }
    }

    const handleAddCart = (e,goods_id) => {
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

    return (<div className={styles['home-page']}>
        <div className={styles['header']}>
            <div className={styles['filter-body']}>
                <div className={styles['list-body']} style={{ alignItems: "center" }}>
                    <div className={styles['list']} style={{ color: index === 'def' ? "#1890ff" : '' }} onClick={() => handleDef('def')}>default</div>
                    <div className={styles['list']} style={{ color: index === 'price' ? "#1890ff" : '' }}>
                        <SortText title='price' type={priceType} onClick={() => handleSort('price')} />
                    </div>
                    <div className={styles['list']}>
                        <InputNumber
                            value={startPrice}
                            onChange={(val) => setStartPrice(val)}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                        <span className={styles['list-zhi']}>-</span>
                        <InputNumber
                            value={endPrice}
                            onChange={(val) => setEndPrice(val)}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                        <Button type="primary" onClick={handlePriceSection}>ok</Button>
                        <Button onClick={handleDelete}>delete</Button>
                    </div>
                    <div className={styles['list']} style={{ color: index === 'stock' ? "#1890ff" : '' }}>
                        <SortText title='stock' type={stockType} onClick={() => handleSort('stock')} />
                    </div>
                    <div className={styles['list']} style={{ color: index === 'volume' ? "#1890ff" : '' }}>
                        <SortText title='selled amount' type={volumeType} onClick={() => handleSort('volume')} />
                    </div>
                    <div className={styles['list']}><Checkbox onChange={onChange}>isStock</Checkbox></div>

                </div>
            </div>
        </div>
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
                                <Button type="primary" onClick={(e) => handleAddCart(e,item.id)}>add to cart</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>)
}

export default connect(({ goodsList }) => ({ goodsList }))(Home)