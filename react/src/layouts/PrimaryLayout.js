import { PureComponent } from 'react'
import { MyLayout } from '@/components'
import styles from './PrimaryLayout.less'

const { Header } = MyLayout

class PrimaryLayout extends PureComponent {
    render() {
        const { children } = this.props;

        return (
            <div>
                <Header />
                <div className={styles['g-bd-list']}>
                    <div className={styles['g-row']}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default PrimaryLayout