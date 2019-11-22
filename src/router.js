import Vue from 'vue'
import Router from 'vue-router'
var firebase = require("firebase/app");
//import { auth } from "@/firebase";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/ingreso',
      name: 'ingreso',
      component: () => import(/* webpackChunkName: "about" */ './views/Ingreso.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "about" */ './views/Admin.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/camion',
      name: 'camion',
      component: () => import(/* webpackChunkName: "about" */ './views/Camion.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/soporte',
      name: 'soporte',
      component: () => import(/* webpackChunkName: "about" */ './views/Soporte.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/chofer',
      name: 'chofer',
      component: () => import(/* webpackChunkName: "about" */ './views/Chofer.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import(/* webpackChunkName: "about" */ './views/Registro.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/salida',
      name: 'salida',
      component: () => import(/* webpackChunkName: "about" */ './views/Salida.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/ficha',
      name: 'ficha',
      component: () => import(/* webpackChunkName: "about" */ './views/Ficha.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/crearqr/:id',
      name: 'crearqr',
      component: () => import(/* webpackChunkName: "about" */ './views/Crearqr.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/readqr/:id',
      name: 'readqr',
      component: () => import(/* webpackChunkName: "about" */ './views/Readqr.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/fichainf/:id',
      name: 'fichainf',
      component: () => import(/* webpackChunkName: "about" */ './views/FichaInf.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/scanqr/',
      name: 'scanqr',
      component: () => import(/* webpackChunkName: "about" */ './views/Scanqr.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/chat/',
      name: 'chat',
      component: () => import(/* webpackChunkName: "about" */ './views/Chat.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/corte/',
      name: 'corte',
      component: () => import(/* webpackChunkName: "about" */ './views/CorteCaja.vue'),
      meta: {requiresAuth: true}
    },
  ]
})

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
  const user = firebase.auth().currentUser;

  if(rutaProtegida === true && user === null){
    next({name:'ingreso'})
  }else{
    next()
  }

})

export default router;