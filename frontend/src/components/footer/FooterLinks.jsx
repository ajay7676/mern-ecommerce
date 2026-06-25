
const FooterLinks = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-sm font-bold text-slate-900 uppercase mb-4">
        {title}
      </h3>

      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-slate-600 hover:text-red-500 transition"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;