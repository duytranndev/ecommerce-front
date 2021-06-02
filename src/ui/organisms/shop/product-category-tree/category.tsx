import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProductInterface } from '../../../../interface/product.interface'
import { AppState } from '../../../../store/types'
import { MenuInterface } from '../../home/menu/interface'

type MenuProps = {
  dataSource?: MenuInterface
  parentCallBack: (e: string) => void
  handleCategoryChange: () => void
  categoryState: boolean
  slug: string
}

type Button = {
  handleClick: () => void
}

export default function Category(props: MenuProps): JSX.Element {
  const [filterCategory, setFilterCategory] = useState<ProductInterface[]>([])
  const product = useSelector<AppState, ProductInterface[]>((state) => state.product.data)
  const [categoryChecked, setCategoryChecked] = useState<boolean[] | undefined>([])
  let countCategoryItem = 0
  const param = window.location.pathname.split('/')

  useEffect(() => {
    const initialMenuLv1Clicked: boolean[] | undefined = props.dataSource?.subMenus?.map(() => false)
    setCategoryChecked(initialMenuLv1Clicked)
  }, [props.categoryState])

  product.forEach((value: any, index: number) => {
    props.dataSource?.subMenus?.map((firstmenu: MenuInterface) => {
      firstmenu?.subMenus?.map((secondmenu: MenuInterface) => {
        if (product[index].category === secondmenu.name) {
          countCategoryItem += 1
        }
      })
      if (product[index].category === firstmenu.name) {
        countCategoryItem += 1
      }
    })
    if (product[index].category === props.dataSource?.name) {
      countCategoryItem += 1
    }
  })

  const filterProduct = (name: string | undefined) => {
    if (props.categoryState === true) {
      let temp: ProductInterface[] = []
      product.map((item: ProductInterface) => {
        if (item.category === name) {
          temp.push(item)
        }
      })
      props.dataSource?.subMenus?.map((item: MenuInterface) => {
        item.subMenus?.map((items: MenuInterface) => {
          product.map((product: ProductInterface) => {
            if (product.category === items.name) {
              temp.push(product)
            }
          })
        })
        product.map((product: ProductInterface) => {
          if (product.category === item.name) {
            temp.push(product)
          }
        })
      })
      let filterProducts = []
      for (let i = 0; i < temp.length; i++) {
        filterProducts.push(temp[i].id!)
      }
      localStorage.setItem('filter', JSON.stringify(filterProducts))
    }
  }

  const handleCategoryChange = (item: MenuInterface, index: number) => {
    setCategoryChecked((prev: boolean[] | undefined) =>
      prev?.map((item: boolean, buttonIndex: number) =>
        buttonIndex === index ? !categoryChecked![index] : !categoryChecked
      )
    )
    props.parentCallBack(item.name!)
  }

  const slug = `${props.slug}/${props.dataSource?.slug}`

  return (
    <div className='cat-item unit-1'>
      <Link
        // to={`/danh-muc${props.slug}/${props.dataSource?.slug}`}
        to={'/products'}
        onClick={() => filterProduct(props.dataSource?.name)}
        onMouseUp={props.handleCategoryChange}
        style={{
          fontWeight: props.categoryState ? 'bolder' : 'normal'
        }}>
        {props.dataSource?.name}
      </Link>
      <span className='count'>({countCategoryItem})</span>
      {props.dataSource?.subMenus ? <Button handleClick={props.handleCategoryChange} /> : null}
      {props.categoryState ? (
        <div className='category-children'>
          {props.dataSource?.subMenus?.map((item: MenuInterface, index: number) => {
            return (
              <Category
                key={index}
                dataSource={item}
                parentCallBack={props.parentCallBack}
                handleCategoryChange={() => handleCategoryChange(item, index)}
                categoryState={categoryChecked![index]}
                slug={slug}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function Button(props: Button): JSX.Element {
  return (
    <button className='toggle' onClick={props.handleClick}>
      <i className='fas fa-chevron-down rotate'></i>
    </button>
  )
}
