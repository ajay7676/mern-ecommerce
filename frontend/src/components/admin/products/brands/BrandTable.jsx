import { useState } from "react";
import BrandRow from "./BrandRow";
import DeleteBrandModal from "./modal/delete/DeleteBrandModal";

const BrandTable = ({
  brands=[],
  page,
  limit,
  onEdit,
  onToggleFeatured,
}) => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteOpenModal = (brand) => {
     setSelectedBrand(brand)
    setIsDeleteOpen(true);
  };
  const handleDeleteCloseModal = () => {
    setIsDeleteOpen(false);
    setSelectedBrand(null)
  };

  return (
    <>
      {isDeleteOpen ? (
        <>
          <DeleteBrandModal
            isOpen={isDeleteOpen}
            onClose={handleDeleteCloseModal}
            brand={selectedBrand}
          />
        </>
      ) : null}
      <div className="overflow-x-auto">
        <table
          className="
          w-full
          min-w-212.5
          border-collapse
        "
        >
          <thead>
            <tr
              className="
              h-11
              border-b
              border-slate-200
              bg-slate-50/60
              text-left
              text-[11px]
              font-semibold
              text-slate-900
            "
            >
              <th className="w-8 px-2" />

              <th className="px-2">#</th>

              <th className="px-2">Brand</th>

              <th className="px-2">Slug</th>

              <th className="px-2">Products</th>

              <th className="px-2">Status</th>

              <th className="px-2">Featured</th>

              <th className="px-2">Sort Order</th>

              <th className="px-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand, index) => (
              <BrandRow
                key={brand._id}
                brand={brand}
                rowNumber={(page - 1) * limit + index + 1}
                onEdit={onEdit}
                onDelete={handleDeleteOpenModal}
                onToggleFeatured={onToggleFeatured}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BrandTable;
