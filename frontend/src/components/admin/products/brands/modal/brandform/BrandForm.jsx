import BrandBannerSection from "./BrandBannerSection"
import BrandInformationSection from "./BrandInformationSection"
import BrandLogoSection from "./BrandLogoSection"
import BrandPreview from "./BrandPreview"
import BrandSeoSection from "./BrandSeoSection"
import BrandVisibilitySection from "./BrandVisibilitySection"

const BrandForm = ({
  mode="create",
  values,errors,handleChange,islogoUploading,handleLogoUpload,onRemoveLogo,
 isbannerUploading,onUploadBanner ,onRemoveBanner,onSeoChange
}
    
) => {
  return (
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
              {/* LEFT SIDE */}

              <main className="space-y-5">
                <BrandInformationSection
                  values={values}
                  errors={errors}
                  onChange={handleChange}
                />
                <BrandLogoSection
                  logo={values?.logo}
                  error={errors.logo}
                  isUploading={islogoUploading}
                  onUpload={handleLogoUpload}
                  onRemove={onRemoveLogo}
                />
                <BrandBannerSection
                  banner={values?.banner}
                  error={errors.banner}
                  isUploading={isbannerUploading}
                  onUpload={onUploadBanner}
                  onRemove={onRemoveBanner}
                />
                <BrandVisibilitySection
                  values={values}
                  onChange={handleChange}
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
                <BrandPreview values={values} />
                <BrandSeoSection
                  seo={values.seo}
                  errors={errors}
                  onChange={onSeoChange}
                />
              </aside>
            </div>
  )
}

export default BrandForm