import { FiCheck } from "react-icons/fi";

const VerifiedValue = ({
  children,
  verified = true,
}) => {
  return (
    <div className="flex items-center gap-1.5">
      <span>{children}</span>

      {verified && (
        <span
          title="Verified"
          className="
            flex
            h-4.25
            w-4.25
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#8dd6a4]
            text-[#42b76b]
          "
        >
          <FiCheck size={11} strokeWidth={3} />
        </span>
      )}
    </div>
  );
};

export default VerifiedValue;