import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const variant = product.variants?.[0];

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(20,35,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,35,60,0.10)]"
    >
      {/* Image */}

      <div className="relative flex h-[330px] items-center justify-center bg-[#f1f4f8]">

        <span className="absolute left-5 top-5 rounded-full bg-[#ffe4de] px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#ff614d]">
          NEW
        </span>

        <img
          src={variant?.image}
          alt={product.name}
          className="h-[260px] w-[210px] object-contain transition duration-300 group-hover:scale-105"
        />

      </div>

      {/* Content */}

      <div className="relative p-6">

        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#7085a2]">
          {product.brand}
        </p>

        <h2 className="mt-1.5 text-[24px] font-bold tracking-tight text-[#080b20]">
          {product.name}
        </h2>

        <p className="mt-1 text-[15px] text-[#7186a3]">
          {product.description || "Premium smartphone experience."}
        </p>

        <p className="mt-6 text-[13px] text-[#7b8ba2]">
          Starting at
        </p>

        <p className="text-[29px] font-bold tracking-tight text-[#080b20]">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        {/* Color dots */}

        <div className="absolute bottom-7 right-6 flex gap-2">
          {product.variants?.map((item) => {
            const color = item.color?.toLowerCase();

            const colorMap = {
              silver: "#e2e8f0",
              orange: "#f97316",
              black: "#111827",
              gray: "#9ca3af",
              grey: "#9ca3af",
              green: "#10b981",
              blue: "#3b82f6",
              red: "#ef4444",
              white: "#ffffff",
            };

            return (
              <span
                key={item._id}
                title={item.color}
                className="h-[18px] w-[18px] rounded-full border border-slate-300"
                style={{
                  backgroundColor:
                    colorMap[color] || "#cbd5e1",
                }}
              />
            );
          })}
        </div>

      </div>
    </Link>
  );
}