import { HiOutlineChevronDown } from "react-icons/hi2";

const AddNewProduct = () => {
  return (
    <button
      type="button"
      htmlFor="my-drawer-5"
      className=" gap-2 normal-case drawer-button btn btn-primary"
    >
      Add Listing
      <HiOutlineChevronDown className="h-5 w-5" />
    </button>
  );
};

export default AddNewProduct;

//  <button
//             type="button"
//              htmlFor="my-drawer-5"
//             className=" gap-2 normal-case drawer-button btn btn-primary"
//           >
//             Add Listing

//             <HiOutlineChevronDown className="h-5 w-5" />
//         </button>
