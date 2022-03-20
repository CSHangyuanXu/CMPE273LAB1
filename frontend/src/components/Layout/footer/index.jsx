import React, { useEffect } from "react";
import { connect } from 'umi'
import styles from './index.less';
import { Select } from 'antd';

const { Option } = Select;

const Header = ({ userInfo }) => {

    return (<div className={styles['header']}>
        <div className={styles['content']}>
            <div className={styles['left-logo']}>
                {userInfo?userInfo.country:''}
            </div>
            <div>
                <Select defaultValue="1" style={{ width: 120 }}>
                    <Option value="1">RMB</Option>
                    <Option value="2">Japasend</Option>
                    <Option value="3">Dollar</Option>
                </Select>
            </div>
        </div>
    </div>)
}

export default connect(({ app }) => ({ ...app }))(Header)