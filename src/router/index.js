import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/frontend/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop/:category',
    name: 'Shop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/frontend/Shop.vue')
  },
  {
    path: '/product/:id',
    component: () => import('../views/frontend/SingleProduct.vue')
  },
  {
    path: '/post/:id',
    component: () => import('../views/frontend/SinglePost.vue')
  },
  {
    path: '/blog/:tag',
    component: () => import('../views/frontend/Blog.vue')
  },
  {
    path: '/cart',
    component: () => import('../views/frontend/Cart.vue')
  },
  {
    path: '/finishorder/:id',
    component: () => import('../views/frontend/FinishOrder.vue')
  },
  {
    path: '/checkout',
    component: () => import('../views/frontend/Checkout.vue')
  },
  {
    path: '/login',
    component: () => import('../views/backend/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/backend/Admin.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/backend/ProductList.vue')
      },
      {
        path: 'order',
        component: () => import('../views/backend/Order.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/backend/Coupon.vue')
      },
      {
        path: 'posts',
        component: () => import('../views/backend/PostsList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
