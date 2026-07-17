import {
  Archive,
  Copy,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import RowActionsMenu from "./menu/RowActionsMenu";

const ActionsCell = () => {
  return (
    <RowActionsMenu
  actions={[
    {
      id: "view",
      label: "View",
      icon: Eye,
      onClick: () => console.log("View"),
    },

    {
      id: "edit",
      label: "Edit",
      icon: Pencil,
      onClick: () => console.log("Edit"),
    },

    {
      id: "duplicate",
      label: "Duplicate",
      icon: Copy,
      onClick: () => console.log("Duplicate"),
    },

    {
      id: "archive",
      label: "Archive",
      icon: Archive,
      onClick: () => console.log("Archive"),
    },

    {
      id: "delete",
      label: "Delete",
      icon: Trash2,
      danger: true,
      onClick: () => console.log("Delete"),
    },
  ]} />
  )
}

export default ActionsCell