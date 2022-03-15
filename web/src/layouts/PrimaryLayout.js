import { PureComponent } from 'react'

class PrimaryLayout extends PureComponent {
    render() {
        const { children } = this.props;

        return (
            <div>
                <h1 >Page layouts</h1>
                <div>
                    {children}
                </div>
            </div>
        );
    }
}

export default PrimaryLayout