import React from 'react'
import { Link } from 'react-router-dom'
import { ImageView } from '../../../../common/image'
import { BrandInterface } from '../../../../interface/brand.interface'

type BrandProps = {
  data?: BrandInterface
}

export default function Brand({ data }: BrandProps) {
  return (
    <Link to={`/danh-muc/${data?.parentId}`} onClick={() => localStorage.removeItem('filter')}>
      <ImageView srcUrl={data?.image} className='logo-brand' />
    </Link>
  )
}
