
import {
  ImageIcon,
  PlayCircle,
} from "lucide-react";
import { useWatch } from "react-hook-form";

const MediaPreviewCard = ({ control }) => {
  const images = useWatch({
    control,
    name: "images",
  }) || [];

  const videoUrl = useWatch({
    control,
    name: "videoUrl",
  });

  const primaryImage =
    images.find((image) => image.isPrimary) || images[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Media Preview
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        Preview how product media will appear.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <div className="flex aspect-4/3 items-center justify-center">
          {primaryImage ? (
            <img
              src={primaryImage.previewUrl}
              alt={primaryImage.altText || primaryImage.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center">
              <ImageIcon className="mx-auto h-14 w-14 text-slate-300" />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                No image selected
              </p>
            </div>
          )}
        </div>

        {images.length > 0 && (
          <div className="flex gap-2 overflow-x-auto border-t border-slate-200 bg-white p-3">
            {images.slice(0, 5).map((image) => (
              <img
                key={image.imageId}
                src={image.previewUrl}
                alt={image.altText || image.name}
                className={`h-14 w-14 flex-none rounded-xl border object-cover ${
                  image.isPrimary
                    ? "border-primary"
                    : "border-slate-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {videoUrl && (
        <div className="mt-5 rounded-xl border border-violet-100 bg-violet-50 p-4">
          <div className="flex items-start gap-3">
            <PlayCircle className="mt-0.5 h-5 w-5 text-primary" />

            <div className="min-w-0">
              <p className="text-sm font-bold text-primary">
                Product video attached
              </p>

              <p className="mt-1 truncate text-xs font-medium text-slate-500">
                {videoUrl}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPreviewCard;