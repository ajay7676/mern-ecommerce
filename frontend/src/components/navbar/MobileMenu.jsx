import { FiX } from "react-icons/fi";

const navLinks = [
  "New In",
  "Women",
  "Men",
  "Kids",
  "Footwear",
  "Bags & Accessories",
  "Beauty",
  "Home & Living",
  "Deals",
];

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 lg:hidden ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-72 h-full bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Valid India</h2>
          <button onClick={onClose}>
            <FiX className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-semibold text-slate-700 hover:text-red-500"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;