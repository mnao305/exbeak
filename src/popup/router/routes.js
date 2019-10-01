import PageIndex from './pages/Index'
import Login from './pages/Login'
import Tweet from './pages/Tweet'

export default [
  {
    path: '/',
    component: PageIndex,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/tweet',
    component: Tweet,
  },
  {
    path: '*',
    component: PageIndex,
  },
]
