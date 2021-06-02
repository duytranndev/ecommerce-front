import React, { memo } from 'react'
import { ImageView } from '../../../../common/image'
import { ProductInterface } from '../../../../interface/product.interface'
import Comment from '../comment'
import SimilarProduct from '../similar-product'
import Tabs, { TabItemProps } from '../tabs'

type DescribeProps = {
  data?: ProductInterface
}
const DescribeProduct = memo(
  ({ data }: DescribeProps) => {
    const ComponentValue = (): JSX.Element => {
      return (
        <>
          <h5 className='title'>{data?.species}</h5>
          <h5 className='name'>{data?.name}</h5>
          {data?.isEvent ? (
            <div className='container-describe'>
              <p className='about'>Hộp quà sang trọng, lịch sự phù hợp làm quà biếu trong ngày Tết, hộp bao gồm:</p>
              <ul>
                {data?.description?.subDescribes?.map((item, index) => {
                  return (
                    <li key={index}>
                      {item?.title}: <span className='price'>{item?.price}</span>{' '}
                      <span className={`other other${index}`}>{item?.other}</span>
                    </li>
                  )
                })}
              </ul>
              <ImageView className='image' srcUrl={data?.image} />

              <p className='dark'>
                Giá trên chưa bao gồm VAT <br />
              </p>
              <p className='dark'>Hotline thiết kế Hộp quà, Giỏ quà theo yêu cầu:</p>
              <p>0962.609.639 (zalo) – 0969.789.683 (zalo/imess) – 0989.330.683 (zalo/imess) – 0967.388.718 (zalo)</p>
              <p className='dark'>Các mẫu hộp quà tham khảo</p>
              <div className='container-image'>
                {data?.description?.subImages?.map((item, index) => (
                  <div key={index} className={`block-image ${item?.tag}`}>
                    <ImageView className='image' srcUrl={item?.image} />
                    <div className={`image-banner banner-${index + 1}`}>{item?.title}</div>
                  </div>
                ))}
              </div>
              <div className='box-contact'>
                <h6>Hotline thiết kế Hộp quà, Giỏ quà theo yêu cầu: </h6>
                <h6>
                  0962.609.639 (zalo) – 0969.789.683 (zalo/imess) – 0989.330.683 (zalo/imess) – 0967.388.718 (zalo)
                </h6>
              </div>
            </div>
          ) : (
            <div className='container-describe'>
              <h5>Xuất xứ: {data?.description?.address}</h5>
              <ImageView srcUrl={data?.image} />
            </div>
          )}
          {/* <ImageView srcUrl={data?.image} /> */}
          <SimilarProduct parentId={data?.parentID} />
        </>
      )
    }
    const ComponentFormValue = (): JSX.Element => {
      return (
        <>
          <Comment productId={data?.id} productName={data?.name} />
        </>
      )
    }
    const TabContentDetail = (): JSX.Element => {
      return (
        <div className='container-item'>
          <ComponentValue />
        </div>
      )
    }
    const TabEvaluate = (): JSX.Element => {
      return (
        <div className='container-item'>
          <ComponentFormValue />
        </div>
      )
    }
    const tabContent = [
      {
        name: 'Mô tả',
        content: <TabContentDetail />
      },
      {
        name: 'Đánh giá',
        content: <TabEvaluate />
      }
    ]

    const tabs: TabItemProps[] = tabContent.map((data) => {
      return {
        title: data.name,
        tabContent: data.content
      }
    })

    return (
      <div className='box-describe'>
        <Tabs tabList={tabs} />
      </div>
    )
  },
  (prev, next) => {
    return prev.data?.id === next.data?.id ? true : false
  }
)

export default DescribeProduct
