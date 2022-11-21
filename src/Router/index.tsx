
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




// const router: React.ReactNode = <BrowserRouter>
//   <Routes>
//     <Route path="*" element={<App />}>
//       <Route path="*/home" element={<Home />} />
//       <Route path="*/about" element={<About />} />
//     </Route>
//   </Routes>

// </BrowserRouter>

// export default router