import Vue from 'vue'
import Router from 'vue-router'
import GameList from '@/GameList';
import AddGame from '@/AddGame';
import LogIn from '@/LogIn';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/gameList',
      name: 'GameList',
      component: GameList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addGame',
      name: 'AddGame',
      component: AddGame,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {   // 哪些需要验证
    if (!localStorage.getItem("token")) {           // token存在条件
      next({
        path: '/',                        // 验证失败要跳转的页面
      })
    } else {
      next()
    }
  } else {
    next()                            // 确保一定要调用 next()
  }
})

export default router
