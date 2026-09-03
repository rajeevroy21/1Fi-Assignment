export default function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}) {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold tracking-[1.5px] text-[#7185a2]">
        AVAILABLE IN {variants.length} FINISHES
      </p>

      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const color = variant.color?.toLowerCase();

          let bgColor = "#cbd5e1";

          if (color === "silver") {
            bgColor = "#e2e8f0";
          } else if (color === "orange") {
            bgColor = "#f97316";
          } else if (color === "black") {
            bgColor = "#111827";
          } else if (color === "gray" || color === "grey") {
            bgColor = "#9ca3af";
          } else if (color === "green") {
            bgColor = "#10b981";
          } else if (color === "blue") {
            bgColor = "#3b82f6";
          } else if (color === "red") {
            bgColor = "#ef4444";
          } else if (color === "white") {
            bgColor = "#ffffff";
          }

          const isSelected =
            selectedVariant?._id === variant._id;

          return (
            <button
              key={variant._id}
              onClick={() => onSelect(variant)}
              className={`flex items-center gap-3 rounded-full border px-5 py-3 text-[16px] transition ${
                isSelected
                  ? "border-[#080b20] bg-[#080b20] text-white"
                  : "border-[#9aaac0] bg-white text-[#172033]"
              }`}
            >
              {/* Color circle */}
              <span
                className="h-6 w-6 rounded-full border border-slate-300 shadow-sm"
                style={{
                  backgroundColor: bgColor,
                }}
              />

              {/* Color + Storage */}
              <span>
                {variant.color} · {variant.storage}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}