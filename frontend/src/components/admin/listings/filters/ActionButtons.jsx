
import ToolbarButton from "./ToolbarButton";
import SortButton from "./SortButton";

const ActionButtons = ({
  onSort,
  onDownload,
  onUpload,
  onAction,
}) => {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        justify-end
        gap-2
        w-full
        lg:w-auto
      "
    >
      <SortButton onClick={onSort} />

      <ToolbarButton onClick={onDownload}>
        Downloads
      </ToolbarButton>

      <ToolbarButton onClick={onUpload}>
        Uploads
      </ToolbarButton>

      <ToolbarButton onClick={onAction}>
        Actions
      </ToolbarButton>
    </div>
  );
};

export default ActionButtons;