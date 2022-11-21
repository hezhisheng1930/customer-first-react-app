
import {
  About,
  Home,
  App,
} from './exportFile';

const routes = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/:id',
        component: About
      }
    ]
  },
]

export default routes;