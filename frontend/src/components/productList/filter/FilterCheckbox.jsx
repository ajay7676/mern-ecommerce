const FilterCheckbox = ({ label, count, checked, onChange }) => {
  return (
    <label className="flex items-center justify-between text-sm text-slate-600 mb-2 cursor-pointer">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="checkbox checkbox-xs w-4 h-4 rounded-none"
        />
        {label}
      </span>

      {count !== undefined && <span>{count}</span>}
    </label>
  );
};

export default FilterCheckbox;