import Vue from 'vue'
import Router from 'vue-router'
import chess from '../components/chess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chess',
      component: chess
    }
  ]
})
