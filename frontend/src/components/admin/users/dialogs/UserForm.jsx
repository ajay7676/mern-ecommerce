const inputClass = `
  h-11
  w-full
  rounded-lg
  border
  border-slate-200
  bg-white
  px-3
  text-sm
  text-slate-800
  outline-none
  transition
  placeholder:text-slate-400
  focus:border-violet-500
  focus:ring-2
  focus:ring-violet-100
`;

const UserForm = ({ values, errors = {}, onChange, disabled = false }) => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  console.log(errors)
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Full Name
        </label>

        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Enter full name"
          className={inputClass}
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          disabled={disabled}
          placeholder="user@example.com"
          className={inputClass}
        />

        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Phone
        </label>

        <input
          name="phone"
          value={values.phone}
          onChange={handleChange}
          disabled={disabled}
          placeholder="+91 98765 43210"
          className={inputClass}
        />
         {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Role
        </label>

        <select
          name="role"
          value={values.role}
          onChange={handleChange}
          disabled={disabled}
          className={inputClass}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
};

export default UserForm;
