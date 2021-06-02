import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import formatMoney from '../../handle/formatMoney';
import './ProductSmall.css';

interface IProps {
    id?: string,
    image?: string,
    name?: string,
    price?: number,
    amount?: number,
    aDD?: any,
    addSuccess?: any
}
const localStorageKey: string = 'Wishlist';
let itemLike: string[] = [];
itemLike = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey) as string) : [];

function addToWishlist(item: string, callback: any): any {
    itemLike.push(item);
    localStorage.setItem(localStorageKey, JSON.stringify(itemLike));
    callback();
}

function ProductSmall(props: IProps): JSX.Element {
    const [isLike, setLike] = useState(false);
    const changeLike = (): any => { setLike(true) }

    let check: boolean = itemLike.some((item) => item === props.id);
    return (
        <div className="product_small">
            <div className="product_small-img">
                <Link to={`/detail/${props?.id}`}><img src={props.image} alt="" /></Link>
            </div>
            <div className="product_small-text">

                <Link to={`/detail/${props?.id}`}>{props.name}</Link>
                <span className="product_small-price">{formatMoney(props.price as number)}</span>
            </div>
            <div className="product_small-like">
                {check ? <>
                    <HeartFilled />
                    <Link to="/wishlist" className="product_small-desciption">
                        <span>Browse Wishlist</span>
                    </Link>
                </>
                    : <>
                        <HeartFilled onClick={() => addToWishlist(props.id as string, changeLike)} />
                        <div className="product_small-desciption">
                            <span>Add to Wishlist</span>
                        </div>
                    </>
                }
            </div>
            <div className="product_small-cart">
                <ShoppingCartOutlined className="icon-shop" onClick={props.aDD} onMouseUp={props.addSuccess} />
                <div className="product_small-desciption">
                    <span>Add to Cart</span>
                </div>
            </div>
        </div>
    )
}
export default memo(ProductSmall, (prev, next) => next.id === prev.id)
