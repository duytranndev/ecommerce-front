import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageView } from '../../../../common/image';
import { HeartFilled } from '@ant-design/icons';
import { ButtonAdd } from '../../../../common/buttonAction';
import { ComponentAddToCart } from '../../../../common/buttonAddCart';
import { ContactSocical } from '../../../../common/contact';
import formatMoney from '../../../../handle/formatMoney';
import { ProductInterface } from '../../../../interface/product.interface';
import './css/product.css';

type DetailProps = {
    dataProduct?: ProductInterface,
    onAddedCart?: () => void,
    onAddToCart?: () => void
}

const localStorageKey: string = 'Wishlist'
let itemLike: string[] = []
itemLike = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey) as string) : []

function addToWishlist(item: string, callback: any): any {
    itemLike.push(item)
    localStorage.setItem(localStorageKey, JSON.stringify(itemLike))
    callback()
}


export function DetailProduct({ dataProduct }: DetailProps): JSX.Element {
    const [count, setCount] = useState<number>(0)
    const [isLike, setLike] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    const changeLike = () => { setLike(true) }
    function handleFormData(value?: number) {
        setCount(value as number);
    }
    const handleOnclickModal = () => {
        modalRef.current?.classList.add('show')
    }
    const handelOnCloseModal = () => {
        modalRef.current?.classList.remove('show')
    }

    let check: boolean = itemLike.some((item) => item === dataProduct?.id)
    return (
        <div className="box-detail" >
            <div className="image" >
                <div className="box-image" onClick={handleOnclickModal}>
                    <ImageView srcUrl={dataProduct?.image} alt="" className="img-product" />
                    <i className="fas fa-search-plus icon-zoom" onClick={handleOnclickModal}></i>
                </div>
                <div className="modal-image" ref={modalRef} onClick={handelOnCloseModal}>
                    <ImageView srcUrl={dataProduct?.image} alt="" className="img-product" />
                    <i className="fas fa-times-circle close" onClick={handelOnCloseModal}></i>
                </div>
                <div className="product-likes" >
                    {
                        check ? <>
                            <HeartFilled className="love" />
                            <Link to="/wishlist" className="product-desciptions">
                                <span>Browse Wishlist</span>
                            </Link>
                        </> : <>
                                <HeartFilled className="love" onClick={() => addToWishlist(dataProduct?.id as string, changeLike)} />
                                <div className="product-desciptions">
                                    <span>Add to Wishlist</span>
                                </div>
                            </>
                    }
                </div>
            </div>
            <div className="detail">
                <h2>{dataProduct?.name}</h2>
                <h2>{formatMoney(dataProduct?.price as unknown as number)}</h2>
                <p>Đặt hàng: 0969.789.683 (zalo/imess) – 0989.330.683 (zalo/imess) – 0967.388.718 (zalo)</p>
                <a href="https://apps.apple.com/us/app/thucphamplaza/id1483553211?ls=1">Link tải IOS app thucphamplaza</a>
                <a href="https://www.youtube.com/channel/UCWwM1WYSezBjuf8o9BTwZrQ/videos">Hướng dẫn pha chế online : youtube</a>
                <p>Bạn sẽ có {dataProduct?.point} điểm khi mua sản phẩm này</p>

                <ComponentAddToCart onChange={handleFormData} >
                    <ButtonAdd data={dataProduct} count={count} action={'ADD_CART_COUNT'} />
                </ComponentAddToCart>

                <p>Danh mục: <a className="category" href=""><span>{dataProduct?.category}</span></a></p>
                <ContactSocical />
            </div>

        </div>
    )
}
