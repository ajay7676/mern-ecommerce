import { useState } from "react";

const UseStateComponent = () => {
     const [count, setCount] = useState(0)

    const increaseCount = () => {

        // setCount (count + 1)
        // setCount (count + 1)
        // setCount (count + 1)
        // setCount (count + 1)

        setCount ((count) => count + 1)
        // setCount ((count) => count + 1)
        // setCount ((count) => count + 1)
        // setCount ((count) => count + 1)

    }

    const decreaseCount = () => {
            if(count <= 1 ) return alert("Sorry , We don't have enough number to decrease counter")
            setCount ((count) => count - 1)

    }

     const resetCounter = () => {
         setCount(0)
     }
  return (
    <>
     <h1>Count : {count}</h1>
     <div className="flex justify-start gap-4">
         <button className="btn" onClick={increaseCount}>Increase</button>
         <button className="btn" onClick={decreaseCount}>Decrease</button>
         <button className="btn" onClick={resetCounter}>Reset</button>
     </div>
    
    </>
  )
}

export default UseStateComponent