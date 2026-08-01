import { useMemo, useRef, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

const normalizeKeyword = (keyword = "") => {
  return String(keyword).trim().replace(/\s+/g, " ");
};

const SeoKeywords = ({
  value = [],
  error = "",
  onChange,
  suggestions = [],
  disabled = false,
  maxKeywords = 10,
  maxKeywordLength = 30,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [localError, setLocalError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);

  const keywords = useMemo(() => {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map(normalizeKeyword)
      .filter(Boolean);
  }, [value]);

  const availableSuggestions = useMemo(() => {
    const selectedKeywords = new Set(
      keywords.map((keyword) => keyword.toLowerCase()),
    );

    return suggestions
      .map(normalizeKeyword)
      .filter(Boolean)
      .filter(
        (keyword, index, list) =>
          list.findIndex(
            (item) => item.toLowerCase() === keyword.toLowerCase(),
          ) === index,
      )
      .filter(
        (keyword) => !selectedKeywords.has(keyword.toLowerCase()),
      );
  }, [keywords, suggestions]);

  const addKeywords = (rawKeywords) => {
    const candidates = Array.isArray(rawKeywords)
      ? rawKeywords
      : String(rawKeywords).split(/[,\n]/);

    const nextKeywords = [...keywords];
    let validationMessage = "";

    candidates.forEach((candidate) => {
      const normalizedKeyword = normalizeKeyword(candidate);

      if (!normalizedKeyword) {
        return;
      }

      if (normalizedKeyword.length > maxKeywordLength) {
        validationMessage = `Each keyword must be ${maxKeywordLength} characters or less`;
        return;
      }

      const alreadyExists = nextKeywords.some(
        (keyword) =>
          keyword.toLowerCase() === normalizedKeyword.toLowerCase(),
      );

      if (alreadyExists) {
        return;
      }

      if (nextKeywords.length >= maxKeywords) {
        validationMessage = `Maximum ${maxKeywords} keywords are allowed`;
        return;
      }

      nextKeywords.push(normalizedKeyword);
    });

    setLocalError(validationMessage);
    setInputValue("");

    if (nextKeywords.length !== keywords.length) {
      onChange(nextKeywords);
    }
  };

  const removeKeyword = (keywordIndex) => {
    if (disabled) return;

    setLocalError("");

    onChange(
      keywords.filter((_, index) => index !== keywordIndex),
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      if (inputValue.trim()) {
        addKeywords(inputValue);
      }
    }

    if (
      event.key === "Backspace" &&
      !inputValue &&
      keywords.length > 0
    ) {
      removeKeyword(keywords.length - 1);
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handlePaste = (event) => {
    const pastedValue = event.clipboardData.getData("text");

    if (pastedValue.includes(",") || pastedValue.includes("\n")) {
      event.preventDefault();
      addKeywords(pastedValue);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addKeywords(inputValue);
    }
  };

  const displayedError = error || localError;

  return (
    <div>
      <label
        htmlFor="seoKeywords"
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        SEO Keywords
      </label>

      <div className="relative">
        <div
          onClick={() => inputRef.current?.focus()}
          className={`flex min-h-12 flex-wrap items-center gap-2 rounded-lg
            border bg-white px-2 py-2 pr-12 transition
            focus-within:border-violet-500 focus-within:ring-2
            focus-within:ring-violet-100
            ${
              displayedError
                ? "border-red-400"
                : "border-slate-300"
            }
            ${disabled ? "cursor-not-allowed bg-slate-100" : ""}`}
        >
          {keywords.map((keyword, index) => (
            <span
              key={`${keyword}-${index}`}
              className="inline-flex items-center gap-1 rounded-md
                bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {keyword}

              <button
                type="button"
                disabled={disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  removeKeyword(index);
                }}
                aria-label={`Remove ${keyword}`}
                className="rounded text-slate-400 transition
                  hover:text-red-500 disabled:cursor-not-allowed"
              >
                <FiX />
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            id="seoKeywords"
            name="seoKeywords"
            type="text"
            value={inputValue}
            disabled={disabled || keywords.length >= maxKeywords}
            placeholder={
              keywords.length === 0
                ? "Type keyword and press Enter"
                : ""
            }
            onChange={(event) => {
              setInputValue(event.target.value);
              setLocalError("");
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={handleBlur}
            aria-invalid={Boolean(displayedError)}
            className="min-w-40 flex-1 border-none bg-transparent
              px-1 py-1 text-sm text-slate-800 outline-none
              placeholder:text-slate-400 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="button"
          disabled={disabled || availableSuggestions.length === 0}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setShowSuggestions((current) => !current)}
          aria-label="Show keyword suggestions"
          aria-expanded={showSuggestions}
          className="absolute right-0 top-0 flex h-12 w-11 items-center
            justify-center border-l border-slate-200 text-slate-500
            hover:text-violet-600 disabled:cursor-not-allowed
            disabled:text-slate-300"
        >
          <FiChevronDown
            className={`transition ${
              showSuggestions ? "rotate-180" : ""
            }`}
          />
        </button>

        {showSuggestions && availableSuggestions.length > 0 && (
          <div
            className="absolute left-0 right-0 top-full z-20 mt-1
              max-h-48 overflow-y-auto rounded-lg border border-slate-200
              bg-white p-1 shadow-lg"
          >
            {availableSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  addKeywords(suggestion);
                  setShowSuggestions(false);
                }}
                className="block w-full rounded-md px-3 py-2 text-left
                  text-sm text-slate-700 hover:bg-violet-50
                  hover:text-violet-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-1.5 flex justify-between gap-4">
        <div>
          {displayedError && (
            <p className="text-xs text-red-500">
              {displayedError}
            </p>
          )}
        </div>

        <p className="shrink-0 text-xs text-slate-400">
          {keywords.length}/{maxKeywords} keywords
        </p>
      </div>
    </div>
  );
};

export default SeoKeywords;