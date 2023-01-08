import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import "./MangaList.module.css"
import {Host} from "../Host"
import { Link,useNavigate } from 'react-router-dom';


const MangaList = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState();
  const [inputs, setInputs] = useState({
    MangaName: "",
    MangaImg: "",
    Description: "",
  });
  const [inputs2, setInputs2] = useState({
    MangaName2: "",
    MangaImg2: "",
    Description2: "",
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
const  handleSubmit = async(e) => {
  console.log(inputs);
  const res = await axios
  .post(Host.host+`api/manga/AddManga`,{
    MangaName:String(inputs.MangaName),
    MangaImage: String(inputs.MangaImg),
    Description: String(inputs.Description)
  })
  .catch((err)=>console.log(err))
  await sendRequest();
  await setShow(!show);
};
const handleSubmit2 = async(e) => {
  console.log(inputs2);
  const res = await axios
  .post(Host.host+`api/manga/EditManga`,{
    MangaID:ID,
    MangaName:String(inputs2.MangaName2),
    MangaImage: String(inputs2.MangaImg2),
    Description: String(inputs2.Description2)
  })
  .catch((err)=>console.log(err))
  await sendRequest();
  await setShow2(!show2);
};
const handleEdit = (props) => {
  setShow2(!show2)
  setInputs2({
    MangaName2: props.MangaName,
    MangaImg2: props.MangaImage,
    Description2: props.Description,
  })
  setID(props.MangaID);
};

    const [mangas, setMangas] = useState();
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const sendRequest = async()=>{
      const res = await axios
      .get(Host.host+"api/manga/GetMangaList")
      .catch((err)=>console.log(err))
      const data = await res.data;
      console.log(data)
      return data;
    }
    useEffect(()=>{
        sendRequest().then(data=>setMangas(data))
      },[])
  return (<>
  <article>
        <div style={{display:"flex"}}>
        <h3 className="list-header">Mangas List</h3>
        <input style={{height:"20px",margin:"20px 0 0 80px"}}
          type="button"
          value="Add new manga"
          onClick={() => setShow(!show)}
          />
          {show &&<div style={{margin:"0 0 10px 80px", backgroundColor:"gray",padding:"0 10px 10px 10px"}}>
            <h3 style={{color:"white"}}>Manga Name</h3>
            <input value={inputs.MangaName}
                        name="MangaName"
                        onChange={handleChange}></input>
            <h3 style={{color:"white"}}>Manga Image</h3>
            <input value={inputs.MangaImg}
                        name="MangaImg"
                        onChange={handleChange}></input>
            <h3 style={{color:"white"}}>Description</h3>
            <input value={inputs.Description}
                        name="Description"
                        onChange={handleChange}></input>
            <input
              type="button"
              value="Add"
              onClick={() => handleSubmit()}
            />
          </div>}
          {show2 &&<div style={{margin:"0 0 10px 80px", backgroundColor:"gray",padding:"0 10px 10px 10px"}}>
            <h3 style={{color:"white"}}>Manga Name</h3>
            <input value={inputs2.MangaName2}
                        name="MangaName2"
                        onChange={handleChange2}></input>
            <h3 style={{color:"white"}}>Manga Image</h3>
            <input value={inputs2.MangaImg2}
                        name="MangaImg2"
                        onChange={handleChange2}></input>
            <h3 style={{color:"white"}}>Description</h3>
            <input value={inputs2.Description2}
                        name="Description2"
                        onChange={handleChange2}></input>
            <input
              type="button"
              value="Edit"
              onClick={() => handleSubmit2()}
            />
          </div>}
        </div>
      </article>
    {mangas && <div>
      <table>

        <tr>
          <th >Name</th>
          <th>IMG</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        {mangas.map((manga,index) => {
          return (
            <tr key={manga.id}>
              <td>{manga.MangaName}</td>
              <td><img src={manga.MangaImage} height="50px" /></td>
              <td>{manga.Description}</td>
              <td>
                <div>
                  <input
                    type="button"
                    value="View Chapter of this manga"
                    onClick={() => {navigate(`/chapters/${manga.MangaID}`)}}
                  />
                  <input
                    type="button"
                    value="Edit"
                    onClick={() => handleEdit(manga)}
                  />
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => console.log('delete')}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      
    </div>}
    </>
  );
};

export default MangaList