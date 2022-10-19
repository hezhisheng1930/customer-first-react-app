import React from 'react'
import { Route, BrowserRouter, Routes } from "react-router-dom";

import {
  About,
  App,
  Home
} from './exportFile';

const router: React.ReactNode = <BrowserRouter>
  <Routes>
    <Route path="*" element={<App />}>
      <Route path="*/home" element={<Home />} />
      <Route path="*/about" element={<About />} />
    </Route>
  </Routes>

</BrowserRouter>

export default router