import React, {useEffect, useState} from 'react';
import worker_script from './worker';

const Thread = () => {

  const [data, setData] = useState<string>('正在接受子线程数据...');

  useEffect(() => {

    const worker = new Worker(worker_script);

    worker.onmessage = (e) => {

      setData(e.data)
    }

  }, [worker_script])

  return <section>

    主线程接受消息：{data}

  </section>
}

export default Thread;