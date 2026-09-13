

import {
  PRODUCT_WIZARD_STEPS,
  CompletedStepIcon,
} from '../../../../../constants/admin/products/productWizardSteps'

const ProductStepIndicator = ({
  activeStep,
  onStepClick,
}) => {
  return (
    <div className="flex-none border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
      <div className="w-full overflow-x-auto pb-1">
        <div className="flex min-w-262.5 items-center gap-4">
          {PRODUCT_WIZARD_STEPS.map((step, index) => {
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;

            const StepIcon = isCompleted
              ? CompletedStepIcon
              : step.icon;

            return (
              <div
                key={step.id}
                className="flex flex-1 items-center"
              >
                <button
                  type="button"
                  onClick={() => onStepClick(step.id)}
                  className="flex items-center gap-3 whitespace-nowrap"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : isCompleted
                          ? "bg-primary text-white"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {isCompleted ? (
                      <StepIcon className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      isActive
                        ? "text-slate-950"
                        : isCompleted
                          ? "text-primary"
                          : "text-slate-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>

                {index !== PRODUCT_WIZARD_STEPS.length - 1 && (
                  <div className="mx-4 h-px flex-1 border-t border-dashed border-slate-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductStepIndicator;