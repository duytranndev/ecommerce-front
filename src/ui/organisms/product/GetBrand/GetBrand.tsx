import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrandInterface } from '../../../../interface/brand.interface'
import { AppState } from '../../../../store/types'
import Brand from '../Brand/Brand'

type Props = {
  categoryId?: string | undefined
}
export default function GetBrandByParent({ categoryId }: Props) {
  const listBrand = useSelector<AppState, BrandInterface[]>((state) => state.brand.list)
  const [brand, setBrand] = useState<BrandInterface[]>([])

  useEffect(() => {
    let value = listBrand.filter((value) => value.categoryId === categoryId)
    setBrand(value)
  }, [listBrand, categoryId])

  return (
    <>
      {brand &&
        brand?.map((item) => {
          return <Brand key={item.id} data={item} />
        })}
    </>
  )
}
