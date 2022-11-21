import { lazy } from 'react';

const App = lazy(() => import('../App'));
const Home = lazy(() => import('../Component/Home'));
const About = lazy(() => import('../Component/Three/[taskId]'));

export {
    App,
    Home,
    About
}