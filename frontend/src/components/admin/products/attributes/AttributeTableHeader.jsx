const AttributeTableHeader = () => {
  return (
    <thead>
      <tr className="border-b border-slate-100 bg-slate-50/40">
        <th className="w-10 px-3 py-3 text-left text-xs font-semibold text-slate-900">
          #
        </th>

        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-900">
          Attribute Name
        </th>

        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-900">
          Type
        </th>

        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-900">
          Values
        </th>

        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-900">
          Products Using
        </th>

        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-900">
          Status
        </th>

        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-900">
          Sort Order
        </th>

        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-900">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default AttributeTableHeader;
