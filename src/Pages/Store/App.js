import React from "react";
import {inject,useReduxState} from "@Store/index.js";

const App = inject((props)=>{
    const [{count},dispatch] = useReduxState();
    return (
        <div>
            <p>props:{props.name}</p>
            <p>count:{count}</p>
            <button onClick = {()=>setTimeout(()=>dispatch({type:"increment"}),1000)}>+</button>
            <button onClick = {()=>dispatch({type:"decrement"})}>-</button>
        </div>
    )
})
export default App;