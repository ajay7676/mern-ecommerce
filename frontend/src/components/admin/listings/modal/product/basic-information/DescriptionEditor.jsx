import {
  FiBold,
  FiChevronDown,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
} from "react-icons/fi";
import { MdFormatListNumbered } from "react-icons/md";

const DESCRIPTION_MAX_LENGTH = 5000;

const toolbarActions = [
  {
    id: "bold",
    label: "Bold",
    icon: FiBold,
  },
  {
    id: "italic",
    label: "Italic",
    icon: FiItalic,
  },
  {
    id: "underline",
    label: "Underline",
    content: (
      <span className="text-base font-semibold underline">
        U
      </span>
    ),
  },
  {
    id: "unordered-list",
    label: "Bulleted list",
    icon: FiList,
  },
  {
    id: "ordered-list",
    label: "Numbered list",
    icon: MdFormatListNumbered,
  },
  {
    id: "link",
    label: "Insert link",
    icon: FiLink,
  },
  {
    id: "image",
    label: "Insert image",
    icon: FiImage,
  },
];

const DescriptionEditor = ({
  value = "",
  error = "",
  disabled = false,
  onChange,
}) => {
  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  const handleToolbarAction = (actionId) => {
    console.log("Description toolbar action:", actionId);
  };

  const isNearLimit =
    value.length >= DESCRIPTION_MAX_LENGTH * 0.9;

  return (
    <div>
      <label
        htmlFor="product-description"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        Description
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
        <span className="sr-only"> required</span>
      </label>

      <div
        className={`
          overflow-hidden rounded-lg border bg-white
          transition
          ${
            error
              ? "border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100"
              : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"
          }
        `}
      >
        <div
          className="
            flex min-h-11 flex-wrap items-center
            border-b border-slate-200 bg-white
          "
        >
          <button
            type="button"
            disabled={disabled}
            aria-label="Select text format"
            className="
              flex h-11 min-w-29.5 items-center
              justify-between border-r border-slate-200
              px-3 text-sm text-slate-700
              transition hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:text-slate-400
            "
          >
            <span>Paragraph</span>
            <FiChevronDown className="h-4 w-4" />
          </button>

          <div
            role="toolbar"
            aria-label="Description formatting options"
            className="flex flex-wrap items-center px-1"
          >
            {toolbarActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.id}
                  type="button"
                  disabled={disabled}
                  title={action.label}
                  aria-label={action.label}
                  onClick={() =>
                    handleToolbarAction(action.id)
                  }
                  className="
                    flex h-9 w-9 items-center
                    justify-center rounded-md
                    text-slate-600 transition
                    hover:bg-slate-100
                    hover:text-slate-950
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-indigo-500
                    disabled:cursor-not-allowed
                    disabled:text-slate-300
                    disabled:hover:bg-transparent
                  "
                >
                  {Icon ? (
                    <Icon className="h-4 w-4" />
                  ) : (
                    action.content
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <textarea
            id="product-description"
            name="description"
            value={value}
            maxLength={DESCRIPTION_MAX_LENGTH}
            disabled={disabled}
            required
            placeholder="Enter a detailed product description"
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? "product-description-error" : undefined
            }
            onChange={handleChange}
            className="
              min-h-29.5 w-full resize-y
              bg-white px-3 py-4 pb-9
              text-sm leading-6 text-slate-700
              outline-none placeholder:text-slate-400
              disabled:cursor-not-allowed
              disabled:bg-slate-100
              disabled:text-slate-500
            "
          />

          <span
            className={`
              pointer-events-none absolute
              bottom-3 right-3 text-xs font-medium
              ${
                isNearLimit
                  ? "text-amber-600"
                  : "text-slate-400"
              }
            `}
          >
            {value.length}/{DESCRIPTION_MAX_LENGTH}
          </span>
        </div>
      </div>

      {error && (
        <p
          id="product-description-error"
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default DescriptionEditor;