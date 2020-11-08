
import React from "react";
import {render} from "react-dom";
import "@Style/Scss/Style.scss";

import App from "./App.js";
console.log("IS_DEV:::",IS_DEV)
console.log("app start 1");
// console.log("app",App);

render(<App/>,document.querySelector("#app"));

var oApp=document.querySelector("#app")
var oImg=require("@/Style/Images/13.jpg");
var oImgEle=document.createElement("img");
oImgEle.src=oImg;
oImgEle.style.width="500px";
oImgEle.style.backgroundImage=`url(${oImg})`;
oApp.appendChild(oImgEle);



let a = new Promise(function(resolve, reject) {
    resolve();
});

const b =new Map()
b.set(a,"Promise");


async function cc(){
    await a.then(()=>{
        console.log("Promise aa")
    });
    console.log("await cc");
};
cc();

class D{
    b="bb";

    constructor(){
        this.a=0;
    }
    setA(){
        this.a=10;
    }
}
const d=new D()
console.log("class d",d,d.b,d.a)
d.setA();
console.log("class d.a",d.a)
console.log("map",b.get(a));
console.log([1, 4, -5, 10].find((n) => n < 0));