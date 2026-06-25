import { FiBox, FiCreditCard } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { RiBankCardLine } from "react-icons/ri";

import FooterLinks from "./FooterLinks";
import Newsletter from "./Newsletter";
import SocialIcons from "./SocialIcons";

const footerSections = [
  {
    title: "Shop",
    links: [
      "Women",
      "Men",
      "Kids",
      "Footwear",
      "Bags & Accessories",
      "Beauty",
      "Home & Living",
      "Deals",
    ],
  },
  {
    title: "Customer Service",
    links: [
      "Help & Support",
      "Track Order",
      "Returns & Refunds",
      "Shipping Info",
      "Size Guide",
      "Store Locator",
      "Contact Us",
    ],
  },
  {
    title: "About StyleHive",
    links: [
      "About Us",
      "Careers",
      "StyleHive Promise",
      "Press",
      "Sustainability",
      "Corporate Information",
    ],
  },
  {
    title: "Popular Searches",
    links: [
      "Polo T-Shirts",
      "Casual Shirts",
      "A-Line Dresses",
      "White Sneakers",
      "Smart Watches",
      "Backpacks",
      "Sunglasses",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-10">
      <div className="max-w-8xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center text-white">
                <FiBox className="text-xl" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Valid India
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-6">
              Your style. Your vibe. Your hive. Stay ahead with the latest in
              fashion, beauty and lifestyle.
            </p>

            <SocialIcons />
          </div>

          {footerSections.map((section) => (
            <FooterLinks
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}

          <Newsletter />
        </div>

        <div className="border-t border-slate-200 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 Valid India. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500">
            <a href="#" className="hover:text-red-500">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-red-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-500">
              Cookie Policy
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span>We accept</span>
            <FiCreditCard className="text-xl" />
            <span>Cards</span>
            <BsWallet2 className="text-xl" />
            <span>UPI</span>
            <RiBankCardLine className="text-xl" />
            <span>NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;