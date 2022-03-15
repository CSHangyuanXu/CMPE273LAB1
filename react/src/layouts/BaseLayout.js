import React, { Fragment } from 'react'
import { withRouter } from 'umi'
import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout'

const layoutsRouter = ['/login','/register']

const BaseLayout = ({ children, location }) => {

    const Container = layoutsRouter.includes(location.pathname) ? PublicLayout : PrimaryLayout

    return (<Fragment>
        <Container>{children}</Container>
    </Fragment>)
}

export default withRouter(BaseLayout)