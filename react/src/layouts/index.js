import { PureComponent } from 'react'
import { ConfigProvider } from 'antd'
import { defaultLanguage } from '@/utils/config'
import BaseLayout from './BaseLayout'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'

const languages = {
    zh: zh_CN,
    en: en_US,
}

class Layout extends PureComponent {
    render() {
        const { children } = this.props;

        const language = languages[defaultLanguage]

        return (
            <ConfigProvider locale={language}>
                <BaseLayout>{children}</BaseLayout>
            </ConfigProvider>
        );
    }
}

export default Layout