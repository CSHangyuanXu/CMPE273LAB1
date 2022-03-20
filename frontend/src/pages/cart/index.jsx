import React, { useState } from 'react';
import { Button, Checkbox, Row, Col, InputNumber, message } from 'antd';
import styles from './index.less';
import { connect, history } from 'umi'
import { publicPrefix } from '@/utils/config'
import store from 'store'

const Home = ({ cartList: { list }, dispatch }) => {
    const [countPrice, setCountPrice] = useState(0)
    const [buyList, setBuyList] = useState([])

    const onChange = (checkedValues) => {
        if (checkedValues.length) {
            let price = 0;
            let _list = []

            checkedValues.forEach(item => {
                const data = list.find(p => p.id === Number(item));

                price += Number(data.price * data.amount)

                _list = _list.concat([data])
            });

            setCountPrice(price)

            setBuyList(_list)
        } else {
            setCountPrice(0)
        }
    }

    const handleNumberChange = (val, id) => {
        dispatch({
            type: "cartList/editUserCart",
            payload: {
                carts_id: id,
                amount: val
            }
        })
    }

    const submit = () => {
        const userInfo = store.get('userInfo') || {}

        if (countPrice === 0) {
            return message.warning("didn't choose item!")
        }

        dispatch({
            type: "cartList/addUserOrder",
            payload: {
                price: countPrice,
                goods: JSON.stringify(buyList),
                user_id: userInfo.id,
                type: 'cart'
            }
        })
    }

    return (<div className={styles['cart-page']}>
        <h1 style={{ textAlign: "center", margin: 0 }}>cart</h1>
        <div className={styles['main']}>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                    {
                        list.map(item => (
                            <Col span={24} key={item.id}>
                                <Checkbox value={item.id} className={styles['check-box-list']}>
                                    <div className={styles['list']}>
                                        <img className={styles['cover']} src={publicPrefix + item.cover} alt="cover" />
                                        <div className={styles['goods-info']}>
                                            <p className={styles['title']}>{item.name}</p>
                                            <div className={styles['active-list']}>
                                                <p>{item.price}</p>
                                                <InputNumber value={item.amount} min={0} onChange={(val) => handleNumberChange(val, item.id)} />
                                            </div>
                                        </div>
                                    </div>
                                </Checkbox>
                            </Col>
                        ))
                    }
                </Row>
            </Checkbox.Group>

            <div className={styles['count-price']}>total:<span className={styles['price']}>¥{countPrice}</span></div>
            <div className={styles['submit-box']}>
                <Button type="primary" onClick={submit}>submit</Button>
            </div>
        </div>
    </div>)
}

export default connect(({ cartList }) => ({ cartList }))(Home)