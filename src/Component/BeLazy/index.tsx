import React, {useEffect, useRef} from 'react';
import Style from './index.module.less';

const BeLazy: React.FC<any> = () => {

  const wrapperNode = useRef<HTMLElement>();

  const moveImage = () => {

    const inter = new IntersectionObserver(data => {

      data.forEach(item => {
        if (item.isIntersecting) {
          (item.target as any).src = (item.target as any).dataset.src;
          inter.unobserve(item.target)
        }
      })

    }, {
      threshold: 0,
      root: wrapperNode.current
    });

    const NodeList: NodeListOf<HTMLImageElement> = document.querySelectorAll('img[data-src]');

    NodeList.forEach(item => inter.observe(item))

  }

  useEffect(() => {

    moveImage();

  }, [wrapperNode])

  return <section ref={wrapperNode} className={Style.wrapper}>
    {
      Array(100).fill(1).map((item, idx) =>
        <img
          key={idx}
          data-src="https://img2.baidu.com/it/u=1590651170,4065727123&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
          src={require('../../assets/yj_cheliang@2x.png')}
        />
      )
    }
  </section>
}

export default BeLazy;