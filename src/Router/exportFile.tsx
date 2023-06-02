import { lazy } from 'react';

const App = lazy(() => import('../App'));
const Home = lazy(() => import('../Component/Home'));
const About = lazy(() => import('../Component/Three/[taskId]'));
const BeLazy = lazy(() => import('../Component/BeLazy'));
const Thread = lazy(() => import('../Component/Thread'));
const Upload = lazy(() => import('../Component/Upload'))

export {
    App,
    Home,
    About,
    BeLazy,
    Upload,
    Thread
}