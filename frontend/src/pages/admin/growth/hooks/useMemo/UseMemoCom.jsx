import { useMemo, useState } from "react"

const UseMemoCom = () => {
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(0)

  function cubeNum(num) {

    console.log("Calculation Done !");

    return Math.pow(num,3)

  }

  const result = useMemo(() => {
      return cubeNum(number)
  } , [number]);
  return (
     <div className="card bg-base-100 w-96 shadow-sm">
        <div className="flex flex-col p-4 gap-10">
          <input type="number" value={number} onChange={(e) => setNumber(e.target.value)}  placeholder="Enter number here" className="input" />
          <h1 className="bth">Cube of the number : {result}</h1>

          <button className="btn" onClick={() => setCounter((counter) => counter +1)}>Counter ++</button>

          <p className="text-xl">Counter  : {counter}</p>
        </div>
      </div>
  )
}

export default UseMemoCom