import CategoryRow from "./CategoryRow";

const CategoryTable = ({
  categories,
  page,
  limit,
  onEdit,
  onDelete,
  onToggle,
}) => {
  return (
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
              h-10.75
              border-b
              border-slate-200
              bg-slate-50/50
              text-left
              text-[11px]
              font-semibold
              text-slate-900
            "
          >
            <th className="w-7 px-3" />

            <th className="px-2">
              #
            </th>

            <th className="px-2">
              Category Name
            </th>

            <th className="px-2">
              Parent Category
            </th>

            <th className="px-2">
              Products
            </th>

            <th className="px-2">
              Status
            </th>

            <th className="px-2">
              Sort Order
            </th>

            <th className="px-2">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map(
            (category , index) => (
              <CategoryRow
                key={category._id}
                index={index}
                page={page}
                limit={limit}
                category={category}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
                
              />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;