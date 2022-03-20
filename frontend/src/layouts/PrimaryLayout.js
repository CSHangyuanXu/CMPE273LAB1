import { PureComponent } from 'react'
import { MyLayout } from '@/components'
import styles from './PrimaryLayout.less'
import ManageLayout from './manageLayout'
import menuList from '@/utils/menuList'

const { Header,Footer } = MyLayout

class PrimaryLayout extends PureComponent {
    render() {
        const { children } = this.props;

        const lastPath = location.pathname.split('/');

        const isMenuPage = menuList.findIndex(p => p.path === `/${lastPath[1]}`) !== -1;

        return (
            <div>
                <Header />
                <div className={styles['g-bd-list']}>
                    <div className={styles['g-row']}>
                        {
                            isMenuPage ? <ManageLayout children={children} /> : children
                        }
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default PrimaryLayout