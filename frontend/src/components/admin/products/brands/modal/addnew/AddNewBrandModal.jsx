import { useEffect, useState } from "react";

import AddBrandHeader from "./AddBrandHeader";
import BrandFooter from "./BrandFooter";
import BrandInformationSection from "../brandform/BrandInformationSection";
import BrandLogoSection from "../brandform/BrandLogoSection";
import BrandBannerSection from "../brandform/BrandBannerSection";
import BrandVisibilitySection from '../brandform/BrandVisibilitySection'
import BrandPreview from "../brandform/BrandPreview";
import BrandSeoSection from "../brandform/BrandSeoSection";

import {INITIAL_BRAND_FORM} from '../../../../../../constants/admin/products/brandForm.constants'

const AddNewBrandModal = ({ isOpen, onClose }) => {
    const [values, setValues] = useState(INITIAL_BRAND_FORM);
    const [errors, setErrors] = useState("")

  // ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleOnChange = () => {

  }

  const handleSubmit = () => {};
  return (
    <div
      className={`
        fixed
        inset-0
        z-50
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}

      <button
        type="button"
        aria-label="Close add brand drawer"
        onClick={onClose}
        className={`
          absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Drawer */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-brand-title"
        className={`absolute right-0 top-0 flex h-dvh w-full flex-col
             bg-white shadow-[-12px_0_40px_rgba(15,23,42,0.12)] 
            transition-transform duration-300 ease-out max-w-7xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <form
         onSubmit={handleSubmit} 
          className="flex h-full min-h-0 flex-col"
         >
          {/* Header */}

          <AddBrandHeader onClose={onClose} />

          {/* Scrollable content */}

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
            <div
              className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]"
            >
              {/* LEFT SIDE */}

              <main className="space-y-5">
                <BrandInformationSection
                   values={values}
                   errors={errors}
                   onChange={handleOnChange}
                />
                <BrandLogoSection />
                <BrandBannerSection />
                <BrandVisibilitySection
                   values={values}
                   onChange={handleOnChange}
                />

              </main>
              {/* RIGHT SIDE */}

              <aside
                className="
              space-y-5
              xl:sticky
              xl:top-0
              xl:self-start
            "
              >
                <BrandPreview
                   values={values}
                />
                <BrandSeoSection
                  seo={values.seo}
                   errors={errors}
                   onChange={handleOnChange}
                />
              </aside>
            </div>
          </div>
          {/* Footer */}

          <BrandFooter onClose={onClose} />
        </form>
      </aside>
    </div>
  );
};

export default AddNewBrandModal;
