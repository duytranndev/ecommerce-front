import { Link } from 'react-router-dom'
import { toSlug } from '../../../../share/common/slug'
import { MenuInterface } from '../menu/interface'
import './css/menu.css'

type MenuProps = {
  dataSource?: MenuInterface
  className?: string
}

export default function ThanhMenu({ dataSource, className }: MenuProps): JSX.Element {
  return (
    <div key={dataSource?.id} className={className}>
      <div className='tren'>
        <Link
          to={`/danh-muc/${toSlug(dataSource?.name as string)}/${dataSource?.id}`}
          onClick={() => localStorage.removeItem('filter')}
          className={`title-dm ${dataSource?.status}`}>
          {dataSource?.name}
        </Link>
        {/* <a key={dataSource?.id} href={dataSource?.path} className={`title-dm ${dataSource?.status}`}>
          
        </a> */}
        <i className='fa fa-angle-down'></i>
      </div>
      <div className='duoi' key={dataSource?.id}>
        {dataSource?.subMenus?.map((item, index) => (
          <div key={index} className={`khoiduoi khoiduoi${index + 1}`}>
            <Link
              to={`/danh-muc/${toSlug(dataSource?.name as string)}/${toSlug(item?.name as string)}/${item?.id}`}
              onClick={() => localStorage.removeItem('filter')}
              className='title'>
              {item?.name}
            </Link>
            {/* <a key={index} href={item.slug} className='title'>
              {item.name}
            </a> */}
            {item.subMenus?.map((value, index) => (
              <Link
                key={value.id}
                to={`/danh-muc/${toSlug(dataSource?.name as string)}/${toSlug(item?.name as string)}/${toSlug(
                  value.name as string
                )}/${value?.id}`}
                onClick={() => localStorage.removeItem('filter')}
                className={value.status}>
                {value?.name}
              </Link>
              // <a key={index} href={value.slug} className={value.status}>
              //   {value.name}
              // </a>
            ))}

            {/* <a className="duoi1">
                                {
                                    item.subMenus?.map((value, index) =>
                                        <ThanhMenu dataSource={value} />
                                        Sử dụng đệ quy
                                    )
                                }
                            </a>*/}
          </div>
        ))}
      </div>
    </div>
  )
}
