import React,{ useState, useEffect } from 'react'
import { render } from "react-dom";

import GlobalStats from "@Components/GlobalStats.js";
import CountriesChart from '@Components/Chart/CountriesChart.js';
import SelectDataKey from '@Components/Chart/SelectDataKey.js';

const BASE_URL = "https://corona.lmao.ninja/v2";

function App(){
    const [globalStats,setGlobalStats] = useState({})
    const [countries,setCountries] = useState([])
    const [key,setKey] = useState("cases");

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

    useEffect(()=>{
        const fetchCountries = async ()=>{
            const response = await fetch(`${BASE_URL}/countries?sore=${key}`);
            const data = await response.json();
            setCountries(data.slice(0,10))
        }

        fetchCountries();

    },[key])

    return (
        <>
            <h1>COVID-19</h1>
            <GlobalStats stats = {globalStats}/>
            <SelectDataKey onChange = {e => setKey(e.target.value)} />
            <CountriesChart data = {countries} dataKey = {key}/>
        </>
    )
}

render(<App/>,document.querySelector("#app"))
