import React from 'react'

export default function CheckoutCartItem(props: any) {
  return (
    <tr className='checkout-cart-item'>
      <td className='product-remove'>
        <a
          href='#'
          className='remove'
          aria-label='Xóa sản phẩm này'
          onClick={props.DeleteCart}
          onMouseUp={props.removeSuccess}>
          x
        </a>
      </td>
      <td className='product-thumbnail'>
        <a href=''>
          <img
            width='300'
            height='247'
            src={props.image}
            className='attachment-woocommerce_thumbnail size-woocommerce_thumbnail'
            alt=''></img>
        </a>
      </td>
      <td className='product-name'>
        <a href=''>{props.name}</a>
      </td>
      <td className='product-price'>
        <span className='amount'>
          <bdi>
            {props.price}
            <span className='small-font'>đ</span>
          </bdi>
        </span>
      </td>
      <td className='product-quantity'>
        <div className='quantity-change'>
          <input type='button' defaultValue='-' className='minus button is-form' onClick={props.DecreaseQuantity} />
          <input type='number' step='1' className='qty' min='0' value={props.quantity} readOnly />
          <input type='button' defaultValue='+' className='plus button is-form' onClick={props.IncreaseQuantity} />
        </div>
      </td>
      <td className='product-subtotal'>
        <span className='amount'>
          <bdi>
            {props.TotalPrice}
            <span className='small-font'>đ</span>
          </bdi>
        </span>
      </td>
    </tr>
  )
}
