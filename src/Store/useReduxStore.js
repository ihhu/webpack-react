import React,{useContext,useReducer} from "react";

const Store = React.createContext();
const useReduxState = ()=>useContext(Store);

export default function useReduxStore(reducer,initState){
    const inject = function(TargetComponent){
        return props => (
            <Store.Provider value = {useReducer(reducer,initState)}>
                <TargetComponent {...props} />
            </Store.Provider>
        )
    };
    return  {inject,useReduxState}
}