import { useEffect, useRef, useState } from "react";
import Card from "../card/Card";
import { ALLOWED_IMAGE_TYPES, DEFAULT_MAX_IMAGES, MAX_IMAGE_SIZE } from "../../../../../../constants/admin/products/product.constants";
import ImageUploader from "./ImageUploader";
import ImageThumbnail from "./ImageThumbnail";
import ImageDropzone from "./ImageDropzone";

const createImageId = () => {
  return (
    globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
};

const getFileKey = (file) => {
  return `${file.name}-${file.size}-${file.lastModified}`;
};

const ProductImagesCard = ({
  images = [],
  error = "",
  disabled = false,
  maxImages = DEFAULT_MAX_IMAGES,
  onChange,
}) => {
  const [uploadError, setUploadError] = useState("");

  const createdObjectUrlsRef = useRef(new Set());

  useEffect(() => {
    const activePreviewUrls = new Set(
      images
        .filter((image) => image.source === "file")
        .map((image) => image.previewUrl),
    );

    createdObjectUrlsRef.current.forEach((url) => {
      if (!activePreviewUrls.has(url)) {
        URL.revokeObjectURL(url);
        createdObjectUrlsRef.current.delete(url);
      }
    });
  }, [images]);

  useEffect(() => {
    const objectUrls = createdObjectUrlsRef.current;

    return () => {
      objectUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      objectUrls.clear();
    };
  }, []);

  const handleFilesSelect = (selectedFiles) => {
    setUploadError("");

    const availableSlots = maxImages - images.length;

    if (availableSlots <= 0) {
      setUploadError(`You can upload a maximum of ${maxImages} images.`);
      return;
    }

    const existingFileKeys = new Set(
      images
        .filter((image) => image.file)
        .map((image) => getFileKey(image.file)),
    );

    const acceptedFiles = [];
    const rejectedMessages = [];

    for (const file of selectedFiles) {
      if (acceptedFiles.length >= availableSlots) {
        rejectedMessages.push(
          `Only ${availableSlots} more image(s) can be added.`,
        );
        break;
      }

      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        rejectedMessages.push(`${file.name}: unsupported file format.`);
        continue;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        rejectedMessages.push(`${file.name}: file must be under 5MB.`);
        continue;
      }

      const fileKey = getFileKey(file);

      if (
        existingFileKeys.has(fileKey) ||
        acceptedFiles.some(
          (acceptedFile) => getFileKey(acceptedFile) === fileKey,
        )
      ) {
        rejectedMessages.push(`${file.name}: image already added.`);
        continue;
      }

      acceptedFiles.push(file);
    }

    const newImages = acceptedFiles.map((file, index) => {
      const previewUrl = URL.createObjectURL(file);

      createdObjectUrlsRef.current.add(previewUrl);

      return {
        id: createImageId(),
        file,
        previewUrl,
        url: "",
        source: "file",
        alt: file.name,
        isPrimary: images.length === 0 && index === 0,
      };
    });

    if (newImages.length > 0) {
      const currentPrimaryImage =
        images.find((image) => image.isPrimary) ?? newImages[0];

      const nextImages = [...images, ...newImages].map((image) => ({
        ...image,
        isPrimary: image.id === currentPrimaryImage.id,
      }));

      onChange(nextImages);
    }

    if (rejectedMessages.length > 0) {
      setUploadError(rejectedMessages.join(" "));
    }
  };

  const handleUrlAdd = (url) => {
    setUploadError("");

    if (images.length >= maxImages) {
      setUploadError(`You can upload a maximum of ${maxImages} images.`);

      return false;
    }

    if (images.some((image) => image.url === url)) {
      setUploadError("This image URL is already added.");
      return false;
    }

    const newImage = {
      id: createImageId(),
      file: null,
      previewUrl: url,
      url,
      source: "url",
      alt: "Product image",
      isPrimary: images.length === 0,
    };

    onChange([...images, newImage]);

    return true;
  };

  const handleSetPrimary = (imageId) => {
    const selectedImage = images.find((image) => image.id === imageId);

    if (!selectedImage) return;

    // Primary image is moved to the first position.
    const remainingImages = images.filter((image) => image.id !== imageId);

    const nextImages = [selectedImage, ...remainingImages].map(
      (image, index) => ({
        ...image,
        isPrimary: index === 0,
      }),
    );

    onChange(nextImages);
  };

  const handleRemove = (imageId) => {
    const removedImage = images.find((image) => image.id === imageId);

    if (removedImage?.source === "file" && removedImage.previewUrl) {
      URL.revokeObjectURL(removedImage.previewUrl);

      createdObjectUrlsRef.current.delete(removedImage.previewUrl);
    }

    const remainingImages = images.filter((image) => image.id !== imageId);

    const hasPrimaryImage = remainingImages.some((image) => image.isPrimary);

    const nextImages = remainingImages.map((image, index) => ({
      ...image,
      isPrimary: hasPrimaryImage ? image.isPrimary : index === 0,
    }));

    onChange(nextImages);
  };

  const finalError = error || uploadError;
  const uploadDisabled = disabled || images.length >= maxImages;
  return (
    <Card
      title="Product Images"
      className="overflow-visible"
      bodyClassName="pt-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mt-1 text-xs text-slate-500">
            Upload high-quality images. First image will be used as the primary
            image.
          </p>
        </div>

        <ImageUploader
          disabled={uploadDisabled}
          onFilesSelect={handleFilesSelect}
          onUrlAdd={handleUrlAdd}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-start gap-4">
        {images.map((image) => (
          <ImageThumbnail
            key={image.id}
            image={image}
            disabled={disabled}
            onSetPrimary={handleSetPrimary}
            onRemove={handleRemove}
          />
        ))}

        <ImageDropzone
          disabled={uploadDisabled}
          onFilesSelect={handleFilesSelect}
        />
      </div>

      {finalError && (
        <p
          role="alert"
          className="mt-3 text-xs font-medium text-red-500"
        >
          {finalError}
        </p>
      )}

      <p className="mt-2 text-[11px] text-slate-400">
        {images.length} of {maxImages} images added
      </p>
    </Card>
  );
};

export default ProductImagesCard;
