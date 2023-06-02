
import {
  About,
  Home,
  App,
  BeLazy
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
        path: '/:id',
        component: About
      }
    ]
  },
]

export default routes;