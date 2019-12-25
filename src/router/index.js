import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    redirect: '/movie'
  },
  {
    path: '/movie',
    redirect: '/movie/hot',
    component: Movie,
    children: [
      {
        path: 'hot', // 子路由前面不需要斜杠
        name: '正在热映',
        component: () => import('../views/HotMovie.vue')
      },
      {
        path: 'expected',
        name: '即将上映',
        component: () => import('../views/ExpectedMovie.vue')
      }
    ]
  },
  {
    path: '/movie/movie-detail',
    name: '电影详情',
    component: () => import('../views/MovieDetail.vue')
  },
  {
    path: '/cinema',
    name: '影院',
    component: () => import('../views/Cinema.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
