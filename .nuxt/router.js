import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _43bd06ce = () => interopDefault(import('../client/pages/ket-qua/index.vue' /* webpackChunkName: "pages/ket-qua/index" */))
const _1449501d = () => interopDefault(import('../client/pages/nap-danh-sach/index.vue' /* webpackChunkName: "pages/nap-danh-sach/index" */))
const _8be6ba5a = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/ket-qua",
    component: _43bd06ce,
    name: "ket-qua"
  }, {
    path: "/nap-danh-sach",
    component: _1449501d,
    name: "nap-danh-sach"
  }, {
    path: "/",
    component: _8be6ba5a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
