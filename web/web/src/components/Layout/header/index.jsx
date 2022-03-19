import React from "react";
import { Input } from 'antd';
import styles from './index.less';

const { Search } = Input;

const Header = () => {

    const onSearch = value => console.log(value);

    return (<div className={styles['header']}>
        <div className={styles['content']}>
            <div className={styles['left-logo']}>
                <img src={require("@/assets/etsy-logo.png")} alt="etsy-logo.png" />
            </div>
            <div className={styles['right-menu']}>
                <div className={styles['menu-list']}>
                    <div className={styles['site-nav-item']}>登录/注册</div>
                    <div className={styles['site-nav-item']}>商品页</div>
                    <div className={styles['site-nav-item']}>个人资料</div>
                    <div className={styles['site-nav-item']}>我的收藏</div>
                    <div className={styles['site-nav-item']}>购物车</div>
                </div>
            </div>
        </div>
        <div className={styles['search-box']}>
            <Search
                placeholder="商品名称"
                allowClear
                onPressEnter
                size="large"
                onSearch={onSearch}
                style={{ width: 304 }}
            />
        </div>
    </div>)
}

export default Header