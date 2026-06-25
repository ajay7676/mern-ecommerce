
import './App.css'
import { useProducts } from './hooks/useProducts';

function App() {
 const {
  data,
  isPending,
  isSuccess,
  isError,
  error,
} = useProducts();

console.log({
  data,
  isPending,
  isSuccess,
  isError,
  error,
});
 console.log(data?.products)

  return (
    <>
    {/* <button
      className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
      Button
    </button> */}
    </>
  )
}

export default App
