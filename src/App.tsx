import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { getAPIGlobal } from './api/get_products'
import './App.css'
import { convertMenu } from './handle/convertArray'
import { NewsInterface } from './interface/news.interface'
import AccountManagement from './pages/account-management'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import HomePage from './pages/home'
import OrderComplete from './pages/orderComplete'
import WishList from './pages/wishlist'
import { BRAND_URL, CATEGORY_URL, ORDER_URL, PRODUCT_URL, USER_URL } from './share/common/api/api-constants'
import { setLogin, setUserInfo } from './store/actions/auth.action'
import { GET_BRAND } from './store/actions/brand.action'
import { GET_PRODUCT } from './store/actions/cart.action'
import { GET_CATEGORY } from './store/actions/category.action'
import { setListOrder } from './store/actions/order.action'
import store from './store/store'
import { AppState } from './store/types'
import Footer from './ui/organisms/home/footer'
import Header from './ui/organisms/home/header'
import ThanhMenu from './ui/organisms/home/menu'
import { MenuInterface } from './ui/organisms/home/menu/interface'
import OrderDetail from './ui/organisms/management/order-detail'
import ShopList from './ui/organisms/shop/product-category-tree'
import { notifiError } from './untils/notification'

function App() {
  const category = useSelector<AppState, MenuInterface[]>((state) => state.category.list)

  const [news, setNews] = useState<NewsInterface[]>([])
  const itemRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const { user, isLogged } = useSelector((state: any) => state.authUser)

  useEffect(() => {
    getAPIGlobal(CATEGORY_URL).then((response) => {
      dispatch({ type: GET_CATEGORY, payload: response?.data.data })
    })
  }, [])

  useEffect(() => {
    getAPIGlobal(PRODUCT_URL).then((response) => {
      dispatch({ type: GET_PRODUCT, payload: response?.data.data })
    })
  }, [])

  useEffect(() => {
    getAPIGlobal(BRAND_URL).then((response) => {
      dispatch({ type: GET_BRAND, payload: response?.data.data })
    })
  }, [])

  useEffect(() => {
    axios.get(ORDER_URL).then((res) => dispatch(setListOrder(res.data.data)))
  }, [])

  function cutArr(arr: MenuInterface[]) {
    return arr?.filter((item) => {
      return item.id !== '60054c8029a3e52537fd3d63'
    })
  }

  const menu = convertMenu(cutArr(category))

  console.log(menu)

  useEffect(() => {
    const userLogged = localStorage.getItem('userLogged')
    if (userLogged) {
      dispatch(setLogin())
      axios
        .get(`${USER_URL}${userLogged}`)
        .then((res) => dispatch(setUserInfo(res.data.data)))
        .catch(() => notifiError('Error', 'Internal server error'))
    }
  }, [isLogged, dispatch])

  return (
    <Provider store={store}>
      <Router>
        <div className='App' ref={itemRef}>
          <div className='container-fluid top' style={{ position: 'sticky', zIndex: 3, top: 0 }}>
            <Header />
            <nav className='menu'>
              <ul>
                {menu?.map((item: MenuInterface | undefined, index: number) => {
                  return <ThanhMenu key={index} className={`khoi khoi${index + 1}`} dataSource={item}></ThanhMenu>
                })}
              </ul>
            </nav>
          </div>
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route exact path='/wishlist/' component={WishList}></Route>
            <Route exact path='/checkout/' component={Checkout}></Route>
            <Route exact path='/cart' component={Cart}></Route>
            <Route path='/products/detail/:id' component={ShopList}></Route>

            <Route path='/danh-muc/:slug/:id' component={ShopList}></Route>
            <Route path='/danh-muc/:id' component={ShopList}></Route>

            <Route path='/products/' component={ShopList}></Route>
            <Route path='/ordercomplete' component={OrderComplete}></Route>
            <Route path='/management' exact component={AccountManagement}></Route>
            <Route path='/management/:id' exact component={AccountManagement}></Route>
            <Route path='/management/my-orders/:id' exact component={OrderDetail}></Route>
          </Switch>
          <Footer dataNews={news} />
        </div>
      </Router>
    </Provider>
  )
}

export default App
