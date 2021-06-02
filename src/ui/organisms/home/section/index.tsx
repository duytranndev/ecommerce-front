import React from 'react'
import './css/section.css'

export default function DeliverySection() {
  return (
    <div className='sectionn'>
      <div className='wrap-sc-content'>
        <div className='sc-content'>
          <div className='sc-item'>
            <img
              width='400'
              height='260'
              src='https://thucphamplaza.com/tpplaza_content/uploads/products_img/dummy-1-medium.jpg'
              className='attachment-medium size-medium'
              alt=''></img>
            <p>
              <span>
                <strong>Giao hàng miễn phí từ 500k</strong>
              </span>
            </p>
          </div>
          <div className='sc-item'>
            <img
              width='400'
              height='260'
              src='https://thucphamplaza.com/tpplaza_content/uploads/products_img/dummy-1-medium.jpg'
              className='attachment-medium size-medium'
              alt=''></img>
            <p>
              <span>
                <strong>Giao hàng siêu tốc trong 2h (tính phí)</strong>
              </span>
            </p>
          </div>
          <div className='sc-item'>
            <img
              width='400'
              height='260'
              src='https://thucphamplaza.com/tpplaza_content/uploads/products_img/dummy-1-medium.jpg'
              className='attachment-medium size-medium'
              alt=''></img>
            <p>
              <span>
                <strong>Khách hàng là trọng tâm!</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
