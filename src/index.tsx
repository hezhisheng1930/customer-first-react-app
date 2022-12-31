import React  from 'react'
import './style/index.less';
import ReactDOM from 'react-dom/client';
import { renderRoutes } from "react-router-config";
import routes from './Router';
import { BrowserRouter } from 'react-router-dom';

const app = <BrowserRouter>
        {renderRoutes(routes)}
    </BrowserRouter>

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(app);


