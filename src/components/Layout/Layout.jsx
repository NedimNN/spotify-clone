import React, { Fragment } from 'react'
import Header from '../Header/Header'
import Routers from '../../routers/Routers'
import Player from '../UI/Player'

const Layout = () => {
  return <Fragment>
    <Header />
    <div>
      <Routers />
    </div>
    <Player/>
  </Fragment>

}

export default Layout