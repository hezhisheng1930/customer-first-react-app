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

        <Button type="primary" onClick={() => handleJumpHome('home')}>home</Button>&nbsp;

        <Button type="primary" onClick={() => handleJumpHome(13123213)}>about</Button>&nbsp;

        <Button type="primary" onClick={() => handleJumpHome("imageBeLazy")}>图片懒加载</Button>&nbsp;

        <Button type="primary" onClick={() => handleJumpHome("thread")}>多线程</Button>&nbsp;

        <Button type="primary" onClick={() => handleJumpHome("upload")}>选择文件并预览</Button>&nbsp;

        <img src={require('@/assets/customerCheck.svg')} alt="" />

        <Suspense fallback={<>loading...</>}>
            {renderRoutes(prop.route.routes)}
        </Suspense>

    </main>
}
export default App
