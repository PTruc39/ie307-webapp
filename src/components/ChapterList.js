import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import "./MangaList.module.css"
import {Host} from "../Host"
import { Link,useNavigate } from 'react-router-dom';


const ChapterList = () => {
  const [ID, setID] = useState();

  const [inputs, setInputs] = useState({
    ChapterName: "",
  });
  const [inputs2, setInputs2] = useState({
    ChapterName2: "",
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
const handleSubmit = async(e) => {
  console.log(inputs);
  const res = await axios
    .post(Host.host+`api/manga/AddChapter`,{
      ChapterName:String(inputs.ChapterName),
      MangaID:parseInt(id)
    })
    .catch((err)=>console.log(err))
    await sendRequest();
    await setShow(!show);

};
const handleSubmit2 = async(e) => {
  console.log(parseInt(id));
  const res = await axios
  .post(Host.host+`api/chapter/EditChapter`,{
    ChapterName:String(inputs2.ChapterName2),
    ChapterID:ID,
    MangaID:parseInt(id)
  })
  .catch((err)=>console.log(err))
  await sendRequest();
  await setShow2(!show2);
};
const handleEdit = (props) => {
  setShow2(!show2)
  setInputs2({
    ChapterName2: props.ChapterName,
  })
  setID(props.ChapterID);

};

    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)

    const navigate = useNavigate();
  const{id}  = useParams();
  console.log(id);
  const [chapters, setChapters] = useState();
    const sendRequest = async()=>{
      const res = await axios
      .get(Host.host+"api/chapter/GetChapterByManga?MangaID="+String(id))
      .catch((err)=>console.log(err))
      const data = await res.data;
      console.log(data)
      return data;
    }
    useEffect(()=>{
        sendRequest().then(data=>setChapters(data))
      },[])

      return (<>
      <article>
        <div style={{display:"flex"}}>
        <h3 className="list-header">Chapters List</h3>
        <input style={{height:"20px",margin:"20px 0 0 80px"}}
          type="button"
          value="Add new chapter"
          onClick={() => setShow(!show)}
          />
          {show &&<div style={{margin:"0 0 10px 80px", backgroundColor:"gray",padding:"0 10px 10px 10px"}}>
            <h3 style={{color:"white"}}>Chapter Name</h3>
            <input value={inputs.ChapterName}
                        name="ChapterName"
                        onChange={handleChange}></input>
            <input
              type="button"
              value="Add"
              onClick={() => handleSubmit()}
            />
          </div>}
          {show2 &&<div style={{margin:"0 0 10px 80px", backgroundColor:"gray",padding:"0 10px 10px 10px"}}>
            <h3 style={{color:"white"}}>Chapter Name</h3>
            <input value={inputs2.ChapterName2}
                        name="ChapterName2"
                        onChange={handleChange2}></input>
            <input
              type="button"
              value="Edit"
              onClick={() => handleSubmit2()}
            />
          </div>}
        </div>
      </article>
        {chapters && <div>
          <table>
    
            <tr>
              <th >Chapter ID</th>
              <th>Chapter Name</th>
              <th>Manga ID</th>
              <th>Action</th>
            </tr>
            {chapters.map((manga,index) => {
              return (
                <tr key={manga.id}>
                  <td>{manga.ChapterID}</td>
                  <td>{manga.ChapterName}</td>
                  <td>{manga.MangaID}</td>
                  <td>
                    <div>
                      <input
                        type="button"
                        value="View Chapter of this manga"
                        onClick={() => {navigate(`/images/${manga.ChapterID}`)}}
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

export default ChapterList