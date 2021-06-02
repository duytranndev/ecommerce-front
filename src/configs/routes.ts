export default [
  {
    title: 'Home Page',
    component: 'home',
    path: '/',
    exact: true
  },
  {
    title: 'Products Page',
    component: 'product-category-tree',
    path: '/products',
    exact: true
  },
  {
    title: 'Products Detail',
    component: 'product-category-tree',
    path: '/products/detail/:id',
    exact: true
  },
  {
    title: 'Order Complete Page',
    component: 'orderComplete',
    path: '/ordercomplete',
    exact: true
  },
  {
    title: 'Cart Page',
    component: 'cart',
    path: '/cart',
    exact: true
  },
  {
    title: 'Checkout Page',
    component: 'checkout',
    path: '/checkout',
    exact: true
  },
  {
    title: 'Wishlist Page',
    component: 'wishlist',
    path: '/wishlist',
    exact: true
  },
  {
    title: 'My Account',
    component: 'account-management',
    path: '/my-account',
    exact: true
  },
  {
    title: 'My Account',
    component: 'account-management',
    path: '/orders',
    exact: true
  }
]
