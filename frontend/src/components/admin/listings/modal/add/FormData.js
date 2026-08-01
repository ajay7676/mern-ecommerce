// const formData = new FormData();

// formData.append(
//   "weight",
//   JSON.stringify({
//     value:
//       productData.weight.value === ""
//         ? undefined
//         : Number(productData.weight.value),
//     unit: productData.weight.unit,
//   })
// );

// formData.append(
//   "dimensions",
//   JSON.stringify({
//     length:
//       productData.dimensions.length === ""
//         ? undefined
//         : Number(productData.dimensions.length),

//     width:
//       productData.dimensions.width === ""
//         ? undefined
//         : Number(productData.dimensions.width),

//     height:
//       productData.dimensions.height === ""
//         ? undefined
//         : Number(productData.dimensions.height),

//     unit: productData.dimensions.unit,
//   })
// );

// productData.images.forEach((image) => {
//   if (image.file) {
//     formData.append("images", image.file);
//   }
// });

// const remoteImageUrls = productData.images
//   .filter((image) => image.source === "url")
//   .map((image) => image.url);

// formData.append(
//   "remoteImageUrls",
//   JSON.stringify(remoteImageUrls)
// );