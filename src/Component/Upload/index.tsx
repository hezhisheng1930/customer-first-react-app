import React, {useRef, useState} from 'react';
import {Button} from 'antd'

const Upload = () => {

  const [img, setImg] = useState<boolean>('');
  const fileNode = useRef<HTMLInputElement>();

  const handleUpload = (e, v) => {
    if (!e.target.files.length) return;

    const file = new FileReader();

    file.onload = (e) => {
      setImg(e.target.result)
    }

    file.readAsDataURL(e.target.files[0]);

  }

  const handleDelete = () => {
    fileNode.current.value = ''
    setImg('');
  }

  return <section style={{paddingTop: '10px'}}>
    <img src={img} alt=""/>
    <input ref={fileNode} onChange={handleUpload} type="file" multiple accept=".jpg, .jpeg, .png"/>
    <Button onClick={handleDelete} type="primary">删除图片</Button>
  </section>
}

export default Upload;