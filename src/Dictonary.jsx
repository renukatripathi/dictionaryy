import React, { useState } from 'react'
import './Dictonary.css'
import Meaning from './Meaning';
import axios from 'axios';

const Dictonary = () => {


  const[userInput,setUserInput]=useState('');
  const[meaning,setMeaning]=useState([]);
  let tempMeaning=[];
  // const[myresponse,setMyresponse]=useState([])
  const[loading,setLoading]=useState(false)
  const setMyInput=(e)=>{
   setUserInput(e.target.value)
}
const searchWord=async() =>{
  setLoading(true)
  let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`
  const res=await axios.get(url);
  let myresponse=res.data;
  console.log(res);
  tempMeaning=[];
      for(const object of myresponse){
      for(const obj of object.meanings){
        for(const def of obj.definitions ) {
          let mydefinition=def.definition
          tempMeaning.push(mydefinition)
        }
      }
    }
    setMeaning([...tempMeaning])
    setLoading(false)
  }
  return (
    <div className='container'>
      <h1 className='heading'> The Great Dictonary</h1>
      <div className="input">
        <input type="text"  name="userInput" id="userInput" className="userInput" placeholder="search word here" onChange={setMyInput}/>
         <button className='search-btn' onClick={searchWord}>Search</button>
      </div>
      <div className="response-container">
        <hr className='h-line'></hr>
        <h1>
          {
            (loading)  ? 'LOADING......' : ''
          }
        </h1>
       <ul>
        {
          meaning.map((m,index)=>(<Meaning key={index} meaning={m}/>))
        }
       </ul>
      </div>
    </div>
  )
}

export default Dictonary
