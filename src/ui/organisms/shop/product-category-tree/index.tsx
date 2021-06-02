import { Pagination } from 'antd'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ProductInterface } from '../../../../interface/product.interface'
import { Shop } from '../../../../pages/shop'
import { AppState } from '../../../../store/types'
import { fetchData } from '../../home/header/cp-search/api'
import { MenuInterface } from '../../home/menu/interface'
import BannerAddProduct from '../banner'
import '../product-category-tree/category_tree.css'
import Category from './category'
import CategorySmallProduct from './category-small-product'
let r = 0
export default function ShopList(): JSX.Element {
  let { id } = useParams<any>()
  const [product, setProduct] = useState<ProductInterface>()
  const [productCategory, setProductCategory] = useState<ProductInterface[]>([])
  const listCategory = useSelector<AppState, MenuInterface[]>((state) => state.category.list)
  const listProduct = useSelector<AppState, ProductInterface[]>((state) => state.product.data)
  const path = window.location.pathname
  const slug = path.split('/').length >= 3
  const length = path.split('/').length
  const arrContentPath = path.split('/')
  let history = useHistory()
  // let value: React.SetStateAction<ProductInterface | undefined>
  if (slug) {
    id = path.split('/').pop()
  }

  useEffect(() => {
    if (slug && id) {
      return setProduct(listProduct.find((item) => item.id === id))
    }
  }, [id])

  useEffect(() => {
    if (id) {
      switch (length) {
        case 3:
        case 5:
        case 6:
          return setProductCategory(listProduct.filter((item) => item.parentID === id))
        case 4:
          return setProductCategory(listProduct.filter((item) => item.categoryId === id))
        default:
          break
      }
    }
  }, [id])

  const [filteredProduct, setFilteredProduct] = useState<ProductInterface[]>([])
  const [tempProduct, setTempProduct] = useState<ProductInterface[]>([])

  const numItemEachPage = 15
  const [page, setPage] = useState({ minValue: 0, maxValue: 15 })
  const [slider, setSlider] = useState({ sliderValues: [0, 100000000] })
  const [selectBox, setSelectBox] = useState('date')
  const [label, setLabel] = useState(' ')
  const [categoryChecked, setCategoryChecked] = useState<boolean[] | undefined>([])
  const [currentPage, setCurrentPage] = useState({ current: 1 })

  const filter = localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter') as string) : []
  const subCategory: MenuInterface | undefined = listCategory?.find((item) => item.name === 'DANH MUC CATEGORY')
  const queryString = require('query-string')
  const { sliderValues } = slider
  const params = queryString.parse(window.location.search)

  //

  useEffect(() => {
    if (params.name !== undefined) {
      fetchData(params.name?.replace(/-/g, ' '), listProduct).then((response) => {
        setFilteredProduct(response)
        setCategoryChecked(subCategory?.subMenus?.map(() => false))
      })
    }
  }, [window.location.search, listProduct])

  useEffect(() => {
    if (params.name !== undefined) {
      const copyArray = filteredProduct.map((item) => {
        return item.id
      })
      localStorage.setItem('filter', JSON.stringify(copyArray))
    }
  }, [filteredProduct])

  useEffect(() => {
    if (params.name === undefined) {
      if (filter.length > 0) {
        let temp = listProduct.filter(({ id }) => filter.includes(id))
        setFilteredProduct(temp)
        setTempProduct(temp)
      } else {
        setFilteredProduct([])
      }
    }
    setPage({ minValue: 0, maxValue: 15 })
    setCurrentPage({ current: 1 })
  }, [filter[0], filter.length, window.location.search, listProduct])

  const handleCategoryChange = (item: MenuInterface, index: number) => {
    const initialButtonsClicked: boolean[] | undefined = subCategory?.subMenus?.map(() => false)
    setCategoryChecked(initialButtonsClicked)
    setCategoryChecked((prev: boolean[] | undefined) =>
      prev?.map((item: boolean, buttonIndex: number) =>
        buttonIndex === index ? !categoryChecked![index] : !categoryChecked
      )
    )
    setLabel(item.name!)
  }

  let max = filteredProduct.reduce(function (prev, current) {
    return prev.price! > current.price! ? prev : current
  }, {})

  const handleSliderChange = (sliderValues: number[]) => {
    if (id === undefined) {
      history.push('products')
      setSlider({ sliderValues })
    }
  }

  const handlePageChange = (page: number) => {
    setPage({ minValue: (page - 1) * numItemEachPage, maxValue: page * numItemEachPage })
    setCurrentPage({ current: page })
  }

  const handleSelectBoxChange = (value: string) => {
    switch (value) {
      case 'price-asc':
        filteredProduct.sort((a: ProductInterface, b: ProductInterface) => {
          return a.price! - b.price!
        })
        break
      case 'price-des':
        filteredProduct.sort((a: ProductInterface, b: ProductInterface) => {
          return b.price! - a.price!
        })
        break
      case 'date':
        filteredProduct.sort((a: ProductInterface, b: ProductInterface) => {
          return parseFloat(a.insertTime!) - parseFloat(b.insertTime!)
        })
    }
    setSelectBox(value)
  }

  console.log(id)

  const handleSliderButton = (sliderValues: number[]) => {
    if (id === undefined) {
      const temp: ProductInterface[] = []
      if (filter.length > 0) {
        tempProduct.map((item: ProductInterface) => {
          if (item.price! >= sliderValues[0] && item.price! <= sliderValues[1]) {
            temp.push(item)
          }
        })
      }
      setFilteredProduct(temp)
    }
  }

  const callBackLabel = (childData: string) => {
    setLabel(childData)
  }

  return (
    <div className='container-fluid'>
      <div className='container main-category'>
        <div className='category-header'>
          <div className='flex-col category-text'>
            <div className='is-small'>
              <div className='breadcum-upper'>
                <a href=''>Trang chủ</a>
                <span className='dividers'>/</span>
                <a href=''>Shop</a>
              </div>
            </div>
          </div>
          <div className='flex-col select-box'>
            <div className='select-box-wrapper'>
              {id ? null : (
                <select onChange={(event) => handleSelectBoxChange(event.target.value)} value={selectBox}>
                  <option value='date'>Mới nhất</option>
                  <option value='price-asc'>Thứ tự theo giá: thấp đến cao</option>
                  <option value='price-des'>Thứ tự theo giá: cao xuống thấp</option>
                </select>
              )}
            </div>
          </div>
        </div>
        <div className='category-page-row'>
          <div className='col category-tree'>
            <div className='shop-sidebar'>
              <div className='category-tree-wrap'>
                <span className='widget-title'>Danh mục sản phẩm</span>
                <div className='divider-small'></div>
                <div className='product-category'>
                  {subCategory?.subMenus?.map((item: MenuInterface | undefined, index: number) => {
                    return (
                      <Category
                        key={index}
                        dataSource={item}
                        parentCallBack={callBackLabel}
                        handleCategoryChange={() => handleCategoryChange(item!, index)}
                        categoryState={categoryChecked![index]}
                        slug={''}
                      />
                    )
                  })}
                </div>
              </div>
              <div className='price-filter'>
                <span className='widget-title'>Lọc theo giá</span>
                <div className='divider-small'></div>
                <div className='price-slider-wrapper'>
                  <Range
                    allowCross={false}
                    min={0}
                    max={max.price}
                    defaultValue={sliderValues}
                    onChange={handleSliderChange}
                  />
                  <div className='price-slider-amount'>
                    <button type='submit' className='button' onClick={() => handleSliderButton(sliderValues)}>
                      Lọc
                    </button>
                    <div className='price-label' style={{ paddingTop: '6px' }}>
                      Giá &nbsp; <span className='from'>{Number(sliderValues[0]).toLocaleString('en-US')}</span> —{' '}
                      <span className='to'>{Number(sliderValues[1]).toLocaleString('en-US')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col list-c-view'>
            <div className='list-category-container'>
              <div className='cate-description'>
                <p>{label}</p>
              </div>
              {filteredProduct && filteredProduct.length > 0 && (
                <div className='list-cate'>
                  {filteredProduct?.slice(page.minValue, page.maxValue).map((item: ProductInterface, index: number) => {
                    return (
                      <CategorySmallProduct
                        key={index}
                        name={item.name!}
                        price={item.price!}
                        id={item.id}
                        image={item.image!}
                      />
                    )
                  })}
                </div>
              )}
              <ShowProduct
                product={product}
                productCategory={productCategory}
                filteredProduct={filteredProduct}
                id={id}
                slug={slug}
              />
            </div>
            <div className='pagination'>
              {filteredProduct.length > 0 && (
                <div
                  className='page-number text-center'
                  style={{ marginLeft: 'auto', marginRight: 'auto', display: 'table' }}>
                  <Pagination
                    defaultCurrent={1}
                    current={currentPage.current}
                    defaultPageSize={numItemEachPage} //default size of page
                    onChange={handlePageChange}
                    total={filteredProduct.length} //total number of items data available
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {product && <BannerAddProduct data={product} />}
    </div>
  )
}

type ShowProductProps = {
  product?: ProductInterface
  filteredProduct?: ProductInterface[]
  productCategory?: ProductInterface[]
  id?: string | undefined
  slug?: string | boolean
}

export const ShowProduct = ({ product, filteredProduct, productCategory, id, slug }: ShowProductProps): JSX.Element => {
  if (id) {
    if (filteredProduct?.length === 0) {
      if (productCategory?.length === 0) {
        if (slug) {
          if (product) {
            return <Shop product={product} />
          } else {
            return <p>Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.</p>
          }
        } else {
          return <p>Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.</p>
        }
      } else {
        return (
          <div className='list-cate'>
            {productCategory?.map((item: ProductInterface, index: number) => {
              return (
                <CategorySmallProduct
                  key={index}
                  name={item.name!}
                  price={item.price!}
                  id={item.id}
                  image={item.image!}
                />
              )
            })}
          </div>
        )
      }
    }
  } else {
    if (filteredProduct?.length === 0) {
      if (productCategory?.length == 0) {
        return <p>Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.</p>
      } else {
        return <p>Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.</p>
      }
    }
  }
  return <></>
}
