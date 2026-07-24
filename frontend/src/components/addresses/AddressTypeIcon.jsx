import {
  FiBriefcase,
  FiHome,
} from "react-icons/fi";
import clsx from "clsx";

const typeConfig = {
  home: {
    icon: FiHome,
    wrapper: "bg-indigo-50 text-indigo-600",
  },
  office: {
    icon: FiBriefcase,
    wrapper: "bg-emerald-50 text-emerald-600",
  },
  "parents-home": {
    icon: FiHome,
    wrapper: "bg-rose-50 text-rose-500",
  },
};

const AddressTypeIcon = ({ type }) => {
  const config = typeConfig[type] ?? typeConfig.home;
  const Icon = config.icon;

  return (
    <div
      className={clsx(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-md",
        config.wrapper,
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
};

export default AddressTypeIcon;