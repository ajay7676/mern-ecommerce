const NavLinks = () => {
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

  return (
    <>
      <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-800">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className={`hover:text-red-500 transition ${
              link === "Deals" ? "text-red-500" : ""
            }`}
          >
            {link}
          </a>
        ))}
      </nav>
    </>
  );
};

export default NavLinks;
