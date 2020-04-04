import React,{Component} from "react";
import Common from "@Components/Common.js";

class B extends Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <Common/>
                <h2>this is b view</h2>
            </div>
        )
    }
}

export default B;