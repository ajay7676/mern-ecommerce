import {
  ArrowLeft,
  ArrowRight,
  Save,
} from "lucide-react";

const AddProductDrawerFooter = ({
  activeStep,
  totalSteps,
  onPrevious,
  onNext,
  onSaveDraft,
}) => {
  const isFirstStep = activeStep === 1;
  const isLastStep = activeStep === totalSteps;

  return (
    <div className="flex flex-none flex-col gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="btn btn-outline h-11 min-h-11 rounded-xl disabled:opacity-40"
      >
        <ArrowLeft className="h-4 w-4" />
        Previous
      </button>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onSaveDraft}
          className="btn h-11 min-h-11 rounded-xl border-slate-200 bg-white px-6 text-slate-900 shadow-sm hover:bg-slate-50"
        >
          <Save className="h-4 w-4" />
          Save as Draft
        </button>

        <button
          type="button"
          onClick={onNext}
          className="btn btn-primary h-11 min-h-11 rounded-xl px-6 text-white shadow-md"
        >
          {isLastStep ? "Publish Product" : "Save & Next"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AddProductDrawerFooter;