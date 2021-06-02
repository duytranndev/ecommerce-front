import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators'
import { ProductInterface } from '../../../../../interface/product.interface'
import { PRODUCT_URL } from '../../../../../share/common/api/api-constants'
import { toSlug } from '../../../../../share/common/slug'
import { fetchData } from './api'
import './index.css'

export default function Search() {
  const [searchKey, setSearchKey] = useState('')
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [productAPI, setProductAPI] = useState<ProductInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const dataRef = useRef<HTMLDivElement>(null)
  const optionFocus = useRef<number>(-1)
  const subjectRef = useRef<any>()
  let history = useHistory()

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = event.key
    if (key === 'Enter') {
      if (optionFocus.current > -1) {
        removeClassActive()
        setSearchKey(products[optionFocus.current].name!)
        getProductID(products[optionFocus.current].id!)
        history.push('/products/detail/' + products[optionFocus.current].id!)
        optionFocus.current = -1
        onBlur()
      } else {
        history.push('/products?name=' + toSlug(searchKey))
        // localStorage.removeItem('filter')
        onBlur()
      }
    }
    if (dataRef.current?.getAttribute('class')?.includes('focuses') && (key === 'ArrowUp' || key === 'ArrowDown')) {
      optionFocus.current > -1 && optionFocus.current < products.length && removeClassActive()
      if (key === 'ArrowUp') {
        optionFocus.current = optionFocus.current - 1 < 0 ? products.length - 1 : optionFocus.current - 1
      }
      if (key === 'ArrowDown') {
        optionFocus.current = optionFocus.current + 1 === products.length ? 0 : optionFocus.current + 1
      }
      setClassOption()
      return
    }
  }

  const onClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const dataIndex = Number(event.currentTarget.getAttribute('data-index'))
    setSearchKey(products[dataIndex].name!)
  }

  const onBlur = (): void => {
    if (dataRef.current) {
      setTimeout(() => {
        dataRef.current!.style.display = 'none'
      }, 100)
    }
  }

  const removeClassActive = (): void => {
    const childNode = dataRef.current?.childNodes[optionFocus.current] as HTMLDivElement
    if (childNode) {
      const classOld = childNode.className.includes('active')
        ? 'autocomplete-suggestion'
        : 'autocomplete-suggestion active'
      childNode?.setAttribute('class', classOld)
    }
  }

  function setClassOption(): void {
    if (dataRef.current) {
      const childNode = dataRef.current.childNodes[optionFocus.current] as HTMLDivElement
      const heightScroll = childNode?.offsetHeight * optionFocus.current
      childNode.setAttribute('class', `${childNode.className} active`)
      dataRef.current.scrollTo(0, heightScroll)
    }
  }

  const onChangeSearchKey = (e: any) => {
    const searchKey = e.target.value
    setSearchKey(searchKey)
    subjectRef.current.next(searchKey)
  }

  useEffect(() => {
    const fetchAPI = async () => {
      await fetch(PRODUCT_URL)
        .then((res) => res.json())
        .then((data) => {
          return setProductAPI(data.data)
        })
    }
    fetchAPI()
  }, [])

  useEffect(() => {
    subjectRef.current = new Subject()
    const subscription = subjectRef.current
      .pipe(
        filter(function (text: string) {
          return text.length >= 1
        }),
        debounceTime(750),
        distinctUntilChanged(),
        switchMap((keyword: string) => {
          setIsLoading(true)
          return fetchData(keyword, productAPI)
        })
      )
      .subscribe((data: ProductInterface[]) => {
        setTimeout(() => {
          setProducts(data)
          setIsLoading(false)
          removeClassActive()
          dataRef.current!.style.display = 'block'
          optionFocus.current = -1
          dataRef.current!.scrollTo(0, 0)
        }, 300)
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [productAPI])

  const getProductID = (id: string) => {
    localStorage.setItem('selectItem', JSON.stringify(id))
    localStorage.removeItem('filter')
  }

  return (
    <div className='wrap-search'>
      <div id='search'>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            value={searchKey}
            onChange={onChangeSearchKey}
            onBlur={() => onBlur()}
            onKeyDown={onKeyDownHandler}></input>
        </div>
        <div className='search-button'>
          <button type='submit'>
            {isLoading ? (
              <i className='fa fa-circle-o-notch fa-spin'></i>
            ) : (
              <i className='fas fa-search' aria-hidden='true'></i>
            )}
          </button>
        </div>
      </div>
      <div className='live-search-results text-left z-top'>
        <div className='autocomplete-suggestions focuses' ref={dataRef}>
          {searchKey.length ? (
            products.length > 0 ? (
              products.map((item: ProductInterface, index: number) => {
                return (
                  <div className='autocomplete-suggestion' key={index} onMouseDown={onClick} data-index={index}>
                    <Link to={`/products/detail/${item?.id}`}>
                      <img className='search-image' src={item.image} alt='' onClick={() => getProductID(item.id!)} />
                    </Link>
                    <div className='search-name'>
                      <Link to={`/products/detail/${item?.id}`} onClick={() => getProductID(item.id!)}>
                        {item.name}
                      </Link>
                    </div>
                    <span className='search-price'>
                      <span className='amount'>
                        <bdi>
                          {Number(item.price).toLocaleString('en-US')}
                          <span className='small-font'>₫</span>
                        </bdi>
                      </span>
                    </span>
                  </div>
                )
              })
            ) : (
              <div className='autocomplete-suggestion'>
                <div className='search-name'>Không có sản phẩm nào.</div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  )
}
