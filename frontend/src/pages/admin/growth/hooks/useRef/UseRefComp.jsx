// import { useEffect, useRef, useState } from "react"

import { useRef } from "react";

const UseRefComp = () => {

    const currElement =  useRef();

    const btnClicked = () => {
        console.log(currElement.current)

        currElement.current.style.border = "1px solid blue"
    }
  return (

    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="flex flex-col p-4 gap-10">
          <input type="text" ref={currElement} placeholder="Type here" className="input" />
          <button className="btn" onClick={btnClicked}>Click Me Here</button>
        </div>
      </div>
    </>
  );
};

export default UseRefComp;

// const UseRefComp = () => {
//     const [value, setValue] = useState(0);
//     // const [count, setCount] = useState(0);
//     const count = useRef(0)
//     useEffect(() => {
//         count.current = count.current + 1
//          console.log(`Render Count : ${count.current}`)
//     });

//   return (
//     <>
//      <div className="flex flex-col">
//         <button className="btn" onClick={()  => setValue((prev) => prev - 1)}>-1</button>
//         <p>{value}</p>
//         <button className="btn" onClick={()  => setValue((prev) => prev + 1)}>+1</button>

//         {/* <p>Render Count : {count.current}</p> */}

//      </div>
//     </>
//   )
// }

// export default UseRefComp
