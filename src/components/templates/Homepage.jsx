import React, { useEffect, useState } from 'react'
import Tablecoin from '../modules/Tablecoin';
import { getcoinlist } from '../../services/cryptoApi';

function Homepage() {
  const[coins,setcoins]=useState()
    useEffect(()=>{
     
      
      const getdata= async()=>{
        const res=await fetch(getcoinlist())
        const json=await res.json()
        setcoins(json)
      }      
      getdata()
    },[])
  return (
    <div><Tablecoin coins={coins}/></div>
  )
}

export default Homepage