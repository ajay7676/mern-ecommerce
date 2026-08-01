import { useReducer } from "react";

const UseReducerComp = () => {
    const intialValue  = {count : 0};
    const reducer = (state, action) => {

        switch(action.type) {
            case "increase" : {
                return {count : state.count + 1}
            }
            case "decrease" : {
                if(state.count <= 1) {
                    alert("Now number will not decrese");
                    return state

                }
                return {count : state.count - 1}
            }
            case "input" : {
                return {count : action.payload}
            }
            default: {
                 return state
            }
        }

    }
    const [state, dispatch] = useReducer(reducer, intialValue)
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="card bg-base-100 h-55 p-5 w-96 shadow-sm flex flex-col">
        <span className=" pb-5  flex justify-center w-full">
          <span
            className="text-center w-full text-2xl"
          >
             {state.count}
          </span>
        </span>
        <div className="flex items-center justify-between px-4">
          <button className="btn" onClick={() => dispatch({type : "increase"})}>Increase</button>
          <button className="btn" onClick={() => dispatch({type: "decrease"})}>Decrease</button>
        </div>
        <input 
        value={state.count}
        onChange={(e) => dispatch({type: "input" , payload: Number(e.target.value)})}
        type="number" 
        placeholder="Enter here number"
         className="input mt-5 mx-4 text-center" />
      </div>
    </div>
  );  
};

export default UseReducerComp;
