import {useContext} from 'react';
import AppContext from './AppContext';

const UseConextComp = () => {
  const value = useContext(AppContext);
    console.log(value)

  return (
    <div>
      {value ? value : "Growth Page" }
    </div>
  )
}

export default UseConextComp