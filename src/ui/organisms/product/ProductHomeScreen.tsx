import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { convertListTitle } from '../../../handle/convertArray'
import { AppState } from '../../../store/types'
import { MenuInterface } from '../home/menu/interface'
import BlockProductHome from './BlockProductHome/BlockProduct'
import './ProductHomeScreen.css'

const ProductHomeScreen = memo(
  () => {
    const category = useSelector<AppState, MenuInterface[]>((state) => state.category.list)
    // const brand = useSelector<AppState, BrandInterface[]>((state) => state.brand.list)
    // console.log('brand :>> ', brand)

    // const [category, setCategory] = useState<MenuInterface[]>([])
    // useEffect(() => {
    //     getAPIGlobal(CATEGORY_URL).then(response => {
    //         setCategory(response?.data.data)
    //     })
    // }, [])
    function cutArr(arr: MenuInterface[]) {
      return arr?.filter((item) => {
        return item.id !== '60054c8029a3e52537fd3d63'
      })
    }
    const categorys = convertListTitle(cutArr(category))

    return (
      <div className='container block-product'>
        {categorys?.map((item: MenuInterface, index: number) => {
          return <BlockProductHome key={item.id} className={`block block-${index + 1}`} data={item} />
        })}
      </div>
    )
  },
  (p, n) => p === n
)

export default ProductHomeScreen
