import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";

const SocialIcons = () => {
  const icons = [
    { icon: <FaInstagram />, label: "Instagram" },
    { icon: <FaFacebookF />, label: "Facebook" },
    { icon: <FaYoutube />, label: "YouTube" },
    { icon: <FaPinterestP />, label: "Pinterest" },
    { icon: <FaXTwitter />, label: "X" },
  ];

  return (
    <div className="flex items-center gap-4 mt-5">
      {icons.map((item) => (
        <button
          key={item.label}
          aria-label={item.label}
          className="text-xl text-slate-700 hover:text-red-500 transition"
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default SocialIcons;