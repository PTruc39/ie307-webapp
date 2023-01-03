import { useParams,Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import style from './ImageList.module.css'

import {Host} from "../Host"

const ImageList = () => {
  const [inputs, setInputs] = useState({
    ImageUrl: "",
  });
  const [inputs2, setInputs2] = useState({
    ImageUrl2: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => {
        return {
            ...prev,
            [e.target.name]: e.target.value,
        };
    });
};
const handleChange2 = (e) => {
  setInputs2((prev) => {
      return {
          ...prev,
          [e.target.name]: e.target.value,
      };
  });
};
const handleSubmit = (e) => {
  console.log(inputs);
};
const handleSubmit2 = (e) => {
  console.log(inputs2);
};
const handleEdit = (props) => {
  setShow2(!show2)
  setInputs2({
    ImageUrl2: props.ListImage,
  })
};
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)

    const{id}  = useParams();
    console.log(id);
    const [images, setImages] = useState();
    const sendRequest = async()=>{
      const res = await axios
      .get(Host.host+"api/chapter/GetListByChapter?ChapterID="+String(id))
      .catch((err)=>console.log(err))
      const data = await res.data;
      console.log(data)
      return data;
    }
    useEffect(()=>{
        sendRequest().then(data=>setImages(data))
      },[])
  return (<>
    <article>
        <div style={{display:"flex"}}>
        <h3 className="list-header">Images List</h3>
        <input style={{height:"20px",margin:"20px 0 0 80px"}}
          type="button"
          value="Add new image"
          onClick={() => setShow(!show)}
          />
          {show &&<div style={{margin:"0 0 10px 80px", backgroundColor:"gray",padding:"0 10px 10px 10px"}}>
            <h3 style={{color:"white"}}>Image Url</h3>
            <input value={inputs.ImageUrl}
                        name="ImageUrl"
                        onChange={handleChange}></input>
            <input
              type="button"
              value="Add"
              onClick={() => handleSubmit()}
            />
          </div>}
          {show2 &&<div style={{margin:"0 0 10px 80px", backgroundColor:"gray",padding:"0 10px 10px 10px"}}>
            <h3 style={{color:"white"}}>Image Url</h3>
            <input value={inputs2.ImageUrl2}
                        name="ImageUrl2"
                        onChange={handleChange2}></input>
            <input
              type="button"
              value="Edit"
              onClick={() => handleSubmit2()}
            />
          </div>}
        </div>
        
      </article>
    <div className={style.MainSearch} style={{display:"flex",padding:"20px",flexWrap:"wrap"}}>
        {images && images.map((list,index)=>
        <div className={style.carContainer}>
        <div className={style.carName}>{list.ListID}</div>
        <img className={style.carImg} src="https://i.pinimg.com/564x/dd/52/69/dd5269a0cedf7e2cf85289f14e9a61ba.jpg" alt={list.ListID} />
        <button className={style.carLink} onClick={() => handleEdit(list)} >Edit</button>
        <button className={style.carLink} >Delete</button>
    </div>)}
    </div>
    </>)
}

export default ImageList