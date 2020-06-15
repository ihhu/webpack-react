import useReduxStore from "@Store/useReduxStore.js";
import reducer from "@Store/reducer.js";
import initState from "@Store/state.js";

export const {inject,useReduxState} = useReduxStore(reducer,initState);