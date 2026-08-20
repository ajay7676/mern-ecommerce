# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



Add New Product Popup



 ---------------------------------------------------------
| Header                                                  |
|---------------------------------------------------------|
| Left (65%)                 | Right (35%)                |
|                            |                            |
| Basic Information          | Product Preview            |
|                            |                            |
| Pricing & Inventory        | Product Status             |
|                            |                            |
| Product Images             | SEO Information            |
|                            |                            |
| Additional Information     |                            |
 ---------------------------------------------------------


 Build Order

I recommend building it in this order.


Phase 1

AddProductPage.jsx
ProductEditorLayout.jsx
AddProductHeader.jsx
HeaderActions.jsx
Card.jsx

Phase 2 

BasicInformationCard.jsx
ProductNameField.jsx
ShortDescriptionField.jsx
DescriptionEditor.jsx
CategorySelect.jsx
BrandSelect.jsx
SKUField.jsx
BarcodeField.jsx

Phase 3 

PricingInventoryCard.jsx
PriceField.jsx
DiscountField.jsx
CostPriceField.jsx
CurrencySelect.jsx
StockField.jsx
LowStockField.jsx
InventorySwitches.jsx

Phase 4 

ProductImagesCard.jsx
ImageUploader.jsx
ImageThumbnail.jsx
ImageDropzone.jsx

AdditionalInformationCard.jsx
WeightField.jsx
DimensionFields.jsx

Phase 5 

AdditionalInformationCard.jsx
WeightField.jsx
DimensionFields.jsx

Phase 6 

ProductPreviewCard.jsx
PreviewGallery.jsx
PreviewPrice.jsx
PreviewInfo.jsx

Phase 7 

ProductStatusCard.jsx
StatusSelect.jsx
VisibilitySelect.jsx
FeatureSwitches.jsx

Phase 8 

SeoCard.jsx
SeoTitleField.jsx
SeoDescriptionField.jsx
SeoKeywords.jsx

Phase 9 

useAddProduct()
Validation
API Integration
Image Upload
Autosave Draft
Publish Product


Features included
✅ Fully responsive (mobile, tablet, desktop)
✅ React Hook Form ready
✅ Zod/Yup validation ready
✅ React Query integration ready
✅ Image drag & drop
✅ Character counters
✅ Live product preview
✅ SEO score support
✅ Loading and skeleton states
✅ Accessible keyboard navigation
✅ Reusable UI components
✅ Production-ready architecture




// Brands


features/
└── admin/
    └── brands/
        ├── api/
        │   └── brands.api.js
        │
        ├── hooks/
        │   ├── useBrands.js
        │   ├── useBrand.js
        │   ├── useBrandStats.js
        │   ├── useBrandOverview.js
        │   ├── useTopBrands.js
        │   ├── useBrandOptions.js
        │   ├── useCreateBrand.js
        │   ├── useUpdateBrand.js
        │   ├── useDeleteBrand.js
        │   └── useToggleFeaturedBrand.js
        │
        ├── components/
        │   ├── BrandsHeader.jsx
        │   ├── BrandFilters.jsx
        │   ├── BrandStats.jsx
        │   ├── BrandStatCard.jsx
        │   ├── BrandTableCard.jsx
        │   ├── BrandTable.jsx
        │   ├── BrandRow.jsx
        │   ├── BrandStatusBadge.jsx
        │   ├── BrandPagination.jsx
        │   ├── BrandOverview.jsx
        │   ├── TopBrands.jsx
        │   ├── BrandQuickTips.jsx
        │   ├── BrandTableSkeleton.jsx
        │   ├── BrandEmptyState.jsx
        │   ├── AddBrandModal.jsx
        │   ├── EditBrandModal.jsx
        │   └── DeleteBrandModal.jsx
        │
        ├── utils/
        │   ├── brandQueryKeys.js
        │   ├── brandValidation.js
        │   ├── brandApiError.js
        │   └── generateBrandSlug.js
        │
        └── pages/
            └── BrandsPage.jsx


Phase 1   Brand domain/model + API design
Phase 2   Static responsive Brands page
Phase 3   GET brands + server pagination/filter/search
Phase 4   Brand stats API
Phase 5   Brand overview + top-brands APIs
Phase 6   Add Brand modal + POST API
Phase 7   Edit Brand modal + PATCH API
Phase 8   Delete Brand + dependency protection
Phase 9   Featured brand toggle
Phase 10  Logo upload with Cloudinary
Phase 11  Loading/empty/error states
Phase 12  Export + polish + responsive testing            
