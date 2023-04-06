import Vue from 'vue'
import Router from 'vue-router'
import GameList from '@/GameList';
import AddGame from '@/AddGame';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GameList',
      component: GameList,
    },
    {
      path: '/addGame',
      name: 'addGame',
      component: AddGame,
    }
  ]
})
