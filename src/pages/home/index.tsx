import React, { memo } from 'react'
import Banner from '../../ui/organisms/home/banner'
import DeliverySection from '../../ui/organisms/home/section'
import ProductHomeScreen from '../../ui/organisms/product/ProductHomeScreen'

const HomePage = memo(
  () => {
    return (
      <div className='container-fluid main '>
        <Banner />
        <DeliverySection />
        <ProductHomeScreen />
      </div>
    )
  },
  (p, n) => {
    return p === n ? false : true
  }
)

export default HomePage
