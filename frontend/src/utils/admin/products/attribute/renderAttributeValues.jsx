export const renderAttributeValues = (attribute) => {
  const values = attribute?.values || [];

  if (attribute.type === "switch") {
    return (
      <div className="flex items-center gap-2">
        {values.slice(0, 5).map((item) => (
          <span
            key={item.value}
            title={item.label}
            className="h-4 w-4 rounded-full border border-slate-300"
            style={{
              backgroundColor:
                item.colorCode || "#000000",
            }}
          />
        ))}

        {values.length > 5 && (
          <span className="text-xs text-slate-500">
            +{values.length - 5} more
          </span>
        )}

        {values.length === 0 && (
          <span className="text-slate-400">
            —
          </span>
        )}
      </div>
    );
  }

  if (values.length > 0) {
    return (
      <span>
        {values
          .slice(0, 5)
          .map((item) => item.label)
          .join(", ")}

        {values.length > 5 && (
          <span className="text-slate-500">
            {" "}
            +{values.length - 5} more
          </span>
        )}
      </span>
    );
  }

  if (attribute.type === "text") {
    return attribute.placeholder || "Text input";
  }

  if (attribute.type === "number") {
    return attribute.unit
      ? `Number (${attribute.unit})`
      : "Number input";
  }

  if (attribute.type === "boolean") {
    return "Yes / No";
  }

  return "—";
};