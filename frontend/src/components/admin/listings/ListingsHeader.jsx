// import MarketplaceTabs from "./MarketplaceTabs";
import {
  // HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
// import AddNewProduct from "./modal/add/AddNewProduct";
import RightSideModal from "./modal/RightSideModal";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import AddNewProduct from "./modal/add/AddNewProduct";

const ListingsHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddNewPrdouct = () => {
      console.log("Clicked Plus button")
     setIsOpen(true)
  }
  const hideAddNewPrdouct = () => {
     setIsOpen(false)
  }
  return (
    <>
     
       {
        isOpen ? <RightSideModal  isOpen={handleAddNewPrdouct}
        title="Add New Product"  onClose={hideAddNewPrdouct}>

          <AddNewProduct />
        </RightSideModal> : null
       }
      <header className="space-y-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-base-content">
              All Listings
            </h1>

            {/* <MarketplaceTabs /> */}
          </div>

          {/* Right Section */}
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            {/* Search */}
            <button
              type="button"
              aria-label="Search Listings"
              className="btn btn-outline btn-square"
            >
              <HiOutlineMagnifyingGlass className="h-5 w-5" />
            </button>

            {/* Add Listing */}
            {/* <AddNewProduct /> */}
            <button
              type="button"
              onClick={handleAddNewPrdouct}
              className="btn border-none bg-indigo-600 text-white shadow-none hover:bg-indigo-700"
            >
              <FiPlus className="h-5 w-5" />
              Add New Product
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default ListingsHeader;
