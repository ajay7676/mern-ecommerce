import { useState } from "react";
import ToolbarButton from "./ToolbarButton";
import SortButton from "./SortButton";
import {SORT_OPTIONS} from './sortOptions'


const ActionButtons = ({
  onDownload,
  onUpload,
  onAction,
}) => {

  const [sortBy, setSortBy] = useState("newest");
  const handleSort = (sort) => {
    setSortBy(sort);

    // React Query
    // refetch()

    // API
    // GET /products?sort=newest
  };

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
      <SortButton
        value={sortBy}
      options={SORT_OPTIONS}
      onChange={handleSort}
        />

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