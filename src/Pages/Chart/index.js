import React,{ useState, useEffect } from 'react'
import { render } from "react-dom";

import GlobalStats from "@Components/GlobalStats.js";
import CountriesChart from '@Components/Chart/CountriesChart.js';
import SelectDataKey from '@Components/Chart/SelectDataKey.js';

const BASE_URL = "https://corona.lmao.ninja";

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
    },[])


    return <h1>hello world</h1>
}

render(<App/>,document.querySelector("#app"))
