import React, { useEffect, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { renderRoutes } from "react-router-config";
const App: React.FC<any> = (prop) => {

    const useLocation = useHistory();

    const handleJumpHome = (jumpType) => {
        useLocation.push(`/${jumpType}`)
    }

    useEffect(() => {
        console.log(PROCESS.a);
    }, [])

    return <main>
        hello react (test tag)

        {/* @ts-ignore */}
        <Button type="primary" onClick={() => handleJumpHome('home')}>home</Button>
        {/* @ts-ignore */}
        <Button type="primary" onClick={() => handleJumpHome(13123213)}>about</Button>

        <img src={require('@/assets/customerCheck.svg')} alt="" />

        <Suspense fallback={<>loading...</>}>
            {renderRoutes(prop.route.routes)}
        </Suspense>

    </main>
}
export default App
