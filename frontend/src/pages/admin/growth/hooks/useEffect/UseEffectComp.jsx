import { useEffect, useState } from "react";

const UseEffectComp = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);
  return <div>{count}</div>;
};

export default UseEffectComp;
