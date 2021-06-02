import { CloseOutlined } from '@ant-design/icons';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import formatMoney from '../../handle/formatMoney';
import './ProductLike.css';



interface IProps {
    image?: string,
    name?: string,
    price?: number,
    stock?: boolean,
    onClickRemove?: any,
    onAddToCart?: any,
    onAddedCart?: any,
    id: string
}
function ProductLike(props: IProps): JSX.Element {
    return (
        <div className="product_like">
            <CloseOutlined className="product_like-icon" onClick={props.onClickRemove} />
            <a href="#">
                <img src={props.image} alt="photo" />
            </a>
            <Link to={`/products/detail/${props.id}`} className="product_like-name">{props.name}</Link>
            <span className="product_like-price">{formatMoney(props.price as number)}</span>
            <span className="product_like-stock">{props.stock ? "In stock" : "Out of stock"}</span>
            <button onClick={props.onAddToCart} onMouseUp={props.onAddedCart} className="product_like-btn" type="button">ADD TO CART</button>
        </div >
    )
}

export default memo(ProductLike)