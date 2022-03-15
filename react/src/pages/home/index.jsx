import React from 'react';
import { Button, Checkbox, InputNumber } from 'antd';
import styles from './index.less';

const Home = () => {

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    return (<div className={styles['home-page']}>
        <div className={styles['header']}>
            <div className={styles['filter-body']}>
                <div className={styles['title']}>分类:</div>
                <div className={styles['list-body']}>
                    <div className={styles['list']}>居家生活</div>
                    <div className={styles['list']}>美食酒水</div>
                </div>
            </div>
            <div className={styles['filter-body']}>
                <div className={styles['title']}>排序:</div>
                <div className={styles['list-body']} style={{ alignItems: "center" }}>
                    <div className={styles['list']}>默认</div>
                    <div className={styles['list']}>价格</div>
                    <div className={styles['list']}>
                        <InputNumber
                            defaultValue={0}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                        <span className={styles['list-zhi']}>-</span>
                        <InputNumber
                            defaultValue={0}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                        <Button type="primary">确认</Button>
                        <Button>清除</Button>
                    </div>
                    <div className={styles['list']}>数量</div>
                    <div className={styles['list']}>销售数量</div>
                    <div className={styles['list']}><Checkbox onChange={onChange}>有货</Checkbox></div>

                </div>
            </div>
        </div>
        <div className={styles['main']}>
            <div className={styles['goods-list']}>
                <div className={styles['list']}>
                    <div className={styles['hd']}>
                        <img src={require("@/assets/d8fc14d80eedd12e76fd79a06921612f.webp")} alt="" />
                    </div>
                    <div className={styles['goods-info']}>
                        <h1 className={styles['goods-title']}>婴儿纸尿裤</h1>
                        <p className={styles['goods-dec']}>薄至2.5mm，海量鲸吸婴儿纸尿裤单片便携装</p>
                        <p className={styles['goods-price']}>¥3.3</p>
                        <Button type="primary">加入购物车</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Home