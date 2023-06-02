import { lazy } from 'react';

const App = lazy(() => import('../App'));
const Home = lazy(() => import('../Component/Home'));
const About = lazy(() => import('../Component/Three/[taskId]'));
const BeLazy = lazy(() => import('../Component/BeLazy/index'))

export {
    App,
    Home,
    About,
    BeLazy
}