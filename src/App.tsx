import React, { useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { Button, Tooltip } from 'antd';

import { Home, About } from './Router/exportFile'

const App: React.FC<any> = () => {

    const useLocation = useNavigate();

    const handleJumpHome = (jumpType) => {
        useLocation(jumpType)
    }

    useEffect(() => {
        console.log(PROCESS.a);

    }, [])

    return <main>
        hello react

        {/* @ts-ignore */}
        <Button type="primary" onClick={() => handleJumpHome('home')}>home</Button>
        {/* @ts-ignore */}
        <Button type="primary" onClick={() => handleJumpHome('about')}>about</Button>

        <section style={{ height: '100px' }} ></section>
        <Routes>
            <Route path='/home' element={<Home />} />
        </Routes>

        <Routes>
            <Route path='/about' element={<About />} />
        </Routes>

    </main>
}
export default App
