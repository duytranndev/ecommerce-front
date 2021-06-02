import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

type CategorySmallProductProps = {
  name: string
  image: string
  price: number
  id: string | undefined
}

export default function CategorySmallProduct(props: CategorySmallProductProps) {
  return (
    <div className='cate-small-product col'>
      <div className='csp-col-inner'>
        <div className='csp-small-product boxes'>
          <div className='box-image'>
            <div className='image-fade-back'>
              <Link to={`/products/detail/${props?.id}`} onClick={() => localStorage.removeItem('filter')}>
                <img width='300' height='247' src={props.image} alt='' />
              </Link>
            </div>
          </div>
          <div className='box-text'>
            <div className='title-wrapper'>
              <p className='name' style={{ height: '61px', overflow: 'hidden' }}>
                <Link to={`/products/detail/${props?.id}`} onClick={() => localStorage.removeItem('filter')}>
                  {props.name}
                </Link>
                {/* <a href='' style={{ color: '#3348C0' }}>
                  {props.name}
                </a> */}
              </p>
            </div>
            <div className='price-wrapper' style={{ height: '14px' }}>
              <span className='price'>
                <span className='amount'>
                  <bdi>{Number(props.price).toLocaleString('en-US')}</bdi>
                  <span className='small-font'>₫</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
