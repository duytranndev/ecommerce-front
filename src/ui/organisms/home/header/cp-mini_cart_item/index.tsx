import React from 'react';

export default function MiniCartItem(props: any) {

    return (
        <div className="mini-cart-item">
            <a href="#"
                onClick={props.reMove}
                onMouseUp={props.removeSuccess}
                className="remove"
                aria-label="Xóa sản phẩm này">×</a>
            <a className="mini-cart-text" href="">
                <img width="300"
                    height="247"
                    src={props.image}
                    alt=""></img> {props.name} </a>
            <span className="quantity"> {props.amount} × <span className="amount">
                <bdi>{props.price}<span className="">₫</span></bdi></span></span>
        </div>
    )

}