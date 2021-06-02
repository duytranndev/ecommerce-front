import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ProductInterface } from '../../../../interface/product.interface'
import { AppState } from '../../../../store/types'
import Product from '../../product/Product/Product'
import './product-slider.css'
type SimilarProductProps = {
  parentId?: string | undefined
  data?: ProductInterface
}

const SimilarProduct = ({ parentId, data }: SimilarProductProps) => {
  const listProduct = useSelector<AppState, ProductInterface[]>((state) => state.product.data)
  // const [products, setProducts] = useState<ProductInterface[]>([])
  const [productIndex, setProductIndex] = useState(0)

  let products: ProductInterface[] = listProduct.filter((item) => item.parentID === parentId)

  // useEffect(() => {
  //   getAPIGlobal(PRODUCT_BY_PARENT_URL, parentId)
  //     .then((response) => setProducts(response?.data.data))
  //     .catch((error) => console.log(error))
  // }, [parentId])

  // useEffect(() => {
  //   let value = listProduct.filter((item) => item.parentID === parentId)
  //   setProducts(value)
  // }, [parentId])

  let firstFiveProducts = products.slice(productIndex, productIndex + 6)

  const nextProduct = () => {
    setProductIndex(productIndex == products.length - 1 ? 0 : productIndex + 1)
  }
  const prevProduct = () => {
    setProductIndex(productIndex == products.length - 1 ? 0 : productIndex - 1)
  }
  useEffect(() => {
    const interval = setInterval(() => nextProduct(), 3000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productIndex])
  return (
    <>
      <h1>Sản phẩm tương tự</h1>
      <div className='similar-product'>
        {firstFiveProducts.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
      <div className='button-group'>
        <button type='button' className='btn' onClick={prevProduct}>
          Prev
        </button>
        <button type='button' className='btn' style={{ float: 'right' }} onClick={nextProduct}>
          Next
        </button>
      </div>
    </>
  )
}

export default SimilarProduct
