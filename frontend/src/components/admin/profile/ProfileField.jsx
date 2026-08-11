const ProfileField = ({
  label,
  children,
  className = "",
}) => {
  return (
    <div className={className}>
      <p className="mb-1 text-[12px] font-normal text-[#b1b5b9]">
        {label}
      </p>

      <div className="text-[13px] font-medium leading-[1.45] text-[#43484d]">
        {children}
      </div>
    </div>
  );
};

export default ProfileField;