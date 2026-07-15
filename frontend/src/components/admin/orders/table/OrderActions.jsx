import { Eye, Pencil, Printer, Trash2, MoreVertical } from "lucide-react";

const OrderActions = () => {
  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost btn-sm btn-circle">
        <MoreVertical size={18} />
      </button>

      <ul className="menu dropdown-content z-50 mt-2 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow">
        <li>
          <button>
            <Eye size={16} />
            View
          </button>
        </li>

        <li>
          <button>
            <Pencil size={16} />
            Edit
          </button>
        </li>

        <li>
          <button>
            <Printer size={16} />
            Print
          </button>
        </li>

        <li>
          <button className="text-error">
            <Trash2 size={16} />
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default OrderActions;