import React,{Component,lazy,Suspense} from "react";
import {Switch,Route,NavLink} from "react-router-dom";

import Common from "@Components/Common.js";
const A = lazy(()=>import(/* webpackChunkName:"views" */"@Views/A.js"));
const B = lazy(()=>import(/* webpackChunkName:"views" */"@Views/B.js"));



class App extends Component{
    state={
        text:21232,

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
            <>
                <NavLink to="/" exact>根路由</NavLink>
                <NavLink to="/a">a路由</NavLink>
                <NavLink to="/b">b路由</NavLink>
                <hr/>
                <hr/>
                <hr/>
                {/* 懒加载 */}
                <Suspense fallback={""}>
                    <Switch>
                        <Route exact path="/" component={Common}/>
                        <Route path="/a" component={A}/>
                        <Route path="/b" component={B}/>
                    </Switch>
                </Suspense>
                <hr/><hr/><hr/>
                <h1>
                    {text}
                </h1>
                <div className="img">
                    <img src={require("@Style/Images/11.jpg")} alt="" />
                </div>
                <div className="bg-img">
                    img background
                </div>

            </>
        )
    }
}
export default App;

// <template>
//     <div id="app">
//     </div>
// </template>
// <script>
//     export default {
//         data(){
//             const text=21232
//             return {
//                 text
//             }
//         },
//         methods:{
//             test(){
//                 let a=data=>console.log(data);
//                 return a
//             }
//         },
//         mounted(){
//             console.log("1331223321");
//             let a = new Promise(function(resolve, reject) {
//                 resolve();
//             });

//             a.then(()=>{
//                 console.log("Promise aa")
//             });
//             const b =new Map()
//             b.set(a,"Promise");
//             console.log("map",b.get(a));
//             console.log([1, 4, -5, 10].find((n) => n < 0));
//         }
//     }
// </script>
// <style lang="scss" scoped>
//     h1{font-size:50px;color:red;display:flex;transform:translate(50%)}
    
//     .img{width:500px;margin-bottom: 10px;;
//         img{display: block;width:100%;}
//     }
//     .bg-img{width:500px;min-height:275px;background:url(~@Style/Images/12.jpg) no-repeat left top;background-size:500px auto;}
// </style>