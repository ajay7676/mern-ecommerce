import { useEffect, useState } from "react";

import { defaultAttributeFormValues } from "../../../../../../utils/admin/products/attribute/attributeForm.helpers";
import { DEFAULT_ATTRIBUTE_VALUES } from "../../../../../../constants/admin/products/attribute.constants";
import AttributeForm from "../form/AttributeForm";
import AttributeDrawerHeader from "../AttributeDrawerHeader";

const AddAttributeModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState(defaultAttributeFormValues);
  const [errors, setErrors] = useState({});



  console.log(form);

  // useEffect(() => {
  //   if (!open) return;

  //   setForm({
  //     ...defaultAttributeFormValues(),
  //     values: DEFAULT_ATTRIBUTE_VALUES.map((item) => ({
  //       ...item,
  //       id: crypto.randomUUID(),
  //     })),
  //   });

  //   setErrors({});
  // }, [open]);
  // ESC key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  if (!open) return null;

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => {
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];

      return next;
    });
  };

  const handleSubmit = (event) => {
    console.log("Add Attribute Clicked");
    event.preventDefault();

    // Validation will be added in the next phase.
    onSubmit?.(form);
  };

  return (
    <div
      className={`
        fixed
        inset-0
        z-50
        ${open ? "pointer-events-auto" : "pointer-events-none"}
      `}
      aria-hidden={!open}
    >
      {/* Overlay */}

      <button
        type="button"
        aria-label="Close add attribute drawer"
        onClick={onClose}
        className={`
          absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Drawer */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-attribute-title"
        className={`absolute right-0 top-0 flex h-dvh w-full flex-col
             bg-white shadow-[-12px_0_40px_rgba(15,23,42,0.12)] 
            transition-transform duration-300 ease-out max-w-7xl
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <AttributeDrawerHeader onClose={onClose} onSubmit={handleSubmit} />
        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="mx-auto max-w-350 p-4 sm:p-6 lg:p-8">
            {/* <AttributeForm
              initialValues={form}
              onSubmit={onSubmit}
              errors={errors}
              updateField={updateField}
            /> */}
            <div
              className="grid gap-5 
    xl:grid-cols-[minmax(0,1fr)_350px]"
            >
              {/* LEFT */}
              <div className="space-y-5"></div>{" "}
            </div>
          </div>
        </form>
      </aside>
    </div>
  );
};

export default AddAttributeModal;
