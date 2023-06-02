
import {
  About,
  Home,
  App,
  BeLazy,
  Thread,
  Upload
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
        path: '/imageBeLazy',
        component: BeLazy
      },
      {
        path: '/thread',
        component: Thread
      },
      {
        path: '/upload',
        component: Upload
      },
      {
        path: '/:id',
        component: About
      }
    ]
  },
]

export default routes;