import {
  FiShield,
  FiRefreshCcw,
  FiTruck,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";

const features = [
  {
    title: "100% Original",
    text: "Handpicked Styles",
    icon: FiShield,
  },
  {
    title: "Easy 14-Day Returns",
    text: "No questions asked",
    icon: FiRefreshCcw,
  },
  {
    title: "Free Delivery",
    text: "On orders above ₹999",
    icon: FiTruck,
  },
  {
    title: "Secure Payments",
    text: "100% safe & secure",
    icon: FiCheckCircle,
  },
  {
    title: "Valid Super Store Promise",
    text: "We’ve got your back",
    icon: FiAward,
  },
];

const FeatureStrip = () => {
  return (
    <section className="mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm overflow-hidden">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className={`flex items-center gap-4 px-5 py-4 ${
                index !== features.length - 1
                  ? "lg:border-r lg:border-slate-200"
                  : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <Icon className="text-xl" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {feature.title}
                </h4>
                <p className="text-xs text-slate-500">{feature.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureStrip;