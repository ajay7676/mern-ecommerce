import { useCallback, useState } from "react";
import Header from "./Header";

const UseCallbackComp = () => {
  const [counter, setCounter] = useState(0);
  const [number, setNumber] = useState(0);
  const newFn = useCallback(() => {
    console.log(number);
  }, [number]);

  return (
    <>
      <Header newFn={newFn} />
      <button
        className="btn"
        onClick={() => setCounter((counter) => counter + 1)}
      >
        Counter ++
      </button>
      <p className="text-xl">Counter : {counter}</p>
      <button className="btn" onClick={() => setNumber((num) => num + 1)}>
        Number ++
      </button>
      <p className="text-xl">Number : {number}</p>
    </>
  );
};

export default UseCallbackComp;
