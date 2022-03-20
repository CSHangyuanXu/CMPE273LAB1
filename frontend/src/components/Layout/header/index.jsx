import React, { useEffect } from "react";
import { Input } from 'antd';
import { connect, history } from 'umi'
import styles from './index.less';

const { Search } = Input;

const Header = ({ isLogin, dispatch }) => {

    const onSearch = value => {
        dispatch({
            type: "goodsList/getAllGoods",
            payload: {
                work_key: value
            }
        })

        history.push('/home?type=search')
    };

    const handleUserSignOut = () => {
        dispatch({
            type: "app/signOut",
            payload: {}
        })
    }

    return (<div className={styles['header']}>
        <div className={styles['content']}>
            <div className={styles['left-logo']}>
                <img src={require("@/assets/etsy-logo.png")} alt="etsy-logo.png" />
            </div>
            <div className={styles['right-menu']}>
                <div className={styles['menu-list']}>
                    {
                        !isLogin && <div className={styles['site-nav-item']} onClick={() => history.push('/login')}>log in/register</div>
                    }
                    <div className={styles['site-nav-item']} onClick={() => history.push('/')}>shopping page</div>
                    {
                        isLogin && (<>
                            <div className={styles['site-nav-item']} onClick={() => history.push('/user/info')}>Proile</div>
                            <div className={styles['site-nav-item']} onClick={() => history.push('/collection')}>Favorites</div>
                            <div className={styles['site-nav-item']} onClick={() => history.push('/cart')}>Cart</div>
                        </>)
                    }
                    {
                        isLogin && <div className={styles['site-nav-item']} onClick={handleUserSignOut}>Logout</div>
                    }
                </div>
            </div>
        </div>
        <div className={styles['search-box']}>
            <Search
                placeholder="Item name"
                allowClear
                onPressEnter
                size="large"
                onSearch={onSearch}
                style={{ width: 304 }}
            />
        </div>
    </div>)
}

export default connect(({ app }) => ({ ...app }))(Header)