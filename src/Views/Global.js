import React,{useState,useEffect} from "react";
import {styled} from "linaria/react";

import logo from "@Style/Images/logo.svg";
import GlobalStats from "@Components/GlobalStats.js";


const BASE_URL = "https://corona.lmao.ninja";

const GlobalApp = styled.div`width:100%;margin:auto;text-align:center;
    table,th,td {border: 1px solid #ccc;border-collapse: collapse;}
    th,td {padding: 5px;text-align: left;}
    .global-logo{width:200px;margin:0 auto;}
    .global-stats > table {margin: auto;margin-top: 0.5rem;margin-bottom: 1rem;}
`


function Global(){
    const [globalStats,setGlobalStats] = useState({});

    useEffect(()=>{
        const fetchGlobalStats = async ()=>{
            const response = await fetch(`${BASE_URL}/all`);
            const data = await response.json();
            setGlobalStats(data);
        };
        fetchGlobalStats();
        const intervalId = setInterval(fetchGlobalStats,5000)

        return ()=>clearInterval(intervalId)
    },[])

    return (
        <GlobalApp>
            <h1>COVID-19</h1>
            <p className="global-logo"><img src={logo} /></p>
            <GlobalStats stats = {globalStats}/>
        </GlobalApp>
    )
}

export default Global;