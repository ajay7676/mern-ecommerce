
import {
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

const guidelines = [
  "Use clear product images with white or clean background.",
  "Upload at least 1 primary product image.",
  "Recommended size: 1000 x 1000 px or higher.",
  "Keep image size below 2MB for faster loading.",
  "Use WEBP format for better performance.",
];

const ImageGuidelinesCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-5 w-5 text-primary" />

        <h3 className="text-lg font-bold text-slate-950">
          Image Guidelines
        </h3>
      </div>

      <div className="mt-5 space-y-4">
        {guidelines.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />

            <p className="text-sm font-medium text-slate-600">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGuidelinesCard;