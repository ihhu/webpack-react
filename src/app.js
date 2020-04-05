import React,{Component,lazy,Suspense} from "react";
import {HashRouter,Switch,Route,NavLink} from "react-router-dom";
import {css} from "linaria";


import Common from "@Components/Common.js";
const A = lazy(()=>import(/* webpackChunkName:"views" */"@Views/A.js"));
const B = lazy(()=>import(/* webpackChunkName:"views" */"@Views/B.js"));

let h1 = css`font-size:50px;color:red;display:flex;transform:translate(20%);`
let img = css`width:500px;margin-bottom: 10px;
    img{display: block;width:100%;}` 
let bgImg = css`width:500px;min-height:275px;background:url(~@Style/Images/12.jpg) no-repeat left top;background-size:500px auto;`

class App extends Component{
    state={
        text:212323213,

    }
    constructor(){
        super();
    }
    componentDidMount(){
        console.log("1331223321");
        let a = new Promise(function(resolve, reject) {
            resolve();
        });

        a.then(()=>{
            console.log("Promise aa")
        });
        const b =new Map()
        b.set(a,"Promise");
        console.log("map",b.get(a));
        console.log([1, 4, -5, 10].find((n) => n < 0));
    }
    render(){
        let {text} = this.state;
        return (
            <HashRouter>
                <NavLink to="/" exact>根路由</NavLink>
                <NavLink to="/a">a路由</NavLink>
                <NavLink to="/b">b路由</NavLink>
                <hr/>
                <hr/>
                <hr/>
                {/* 懒加载 */}
                <Suspense fallback={""}>
                    <Switch>
                        <Route exact path="/">
                            <Common/>
                        </Route>
                        <Route path="/a"><A/></Route>
                        <Route path="/b" component={B}/>
                    </Switch>
                </Suspense>
                <hr/><hr/><hr/>
                <h1 className={h1}>
                    {text}
                </h1>
                <div className={img}>
                    <img src={require("@Style/Images/11.jpg")} alt="" />
                </div>
                <div className={bgImg}>
                    img background
                </div>

            </HashRouter>
        )
    }
}
export default App;
