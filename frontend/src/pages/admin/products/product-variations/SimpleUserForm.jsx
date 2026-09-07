import { useState } from "react";

const ProductVariation = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [age, setAge] = useState("")
   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: ""
   })
  const handleChangeValue = (event) => {
    const{name , value} = event.target;

    setFormData((prevData) => (
      {
        ...prevData,
        [name]: value
      }
    ))
    

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked")
  };
  console.log(formData);
  console.log("Component Render")
  return (
    <>
      <div className="w-full w-max-4xl mx-auto mt-3 mb-3 ">
        <div className="card w-96 bg-base-100 card-xs shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="flex flex-col card">
              <input
                type="text"
                placeholder="firstName"
                name="firstName"
                value={formData?.firstName}
                onChange={handleChangeValue}
                className="input mb-3"
              />
              <input
                type="text"
                placeholder="lastName"
                name="lastName"
                value={formData.lastName}
               onChange={handleChangeValue}
                className="input mb-3"
              />
              <input
                type="email"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChangeValue}
                className="input mb-3"
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                 onChange={handleChangeValue}
                className="input mb-3"
              />
              <input
                type="number"
                placeholder="age"
                name="age"
                value={formData.age}
                 onChange={handleChangeValue}
                className="input mb-3"
              />
              <button type="submit" className="btn btn-secondary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          {formData.firstName}
        </li>
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          {formData.lastName}
        </li>
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">{formData.email}</li>
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          {formData.password}
        </li>
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">{formData.age}</li>
      </ul>
    </>
  );
};

export default ProductVariation;
