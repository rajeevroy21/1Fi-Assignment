import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../services/api";

import EmiPlan from "../components/EmiPlan";
import VariantSelector from "../components/VariantSelector";

export default function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const data = await getProduct(slug);

        console.log("API RESPONSE:", data);

        setProduct(data.product);

        setEmiPlans(data.emiPlans || []);

        setSelectedVariant(
          data.product?.variants?.[0] || null
        );

        setSelectedPlan(
          data.emiPlans?.[0] || null
        );
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg text-slate-500">
          Loading product...
        </p>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // ================= NO PRODUCT =================

  if (!product) {
    return null;
  }

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  return (
    <main className="mx-auto max-w-[1220px] px-5 pb-36 pt-12">

      {/* ================= BREADCRUMB ================= */}

      <div className="mb-7 flex items-center gap-3 text-[15px]">
        <span className="text-[#7185a2]">
          Products
        </span>

        <span className="text-slate-400">
          /
        </span>

        <span className="text-[#172033]">
          {product.name}
        </span>
      </div>

      {/* ================= MAIN ================= */}

      <div className="grid gap-7 lg:grid-cols-2">

        {/* ================= LEFT PRODUCT ================= */}

        <section className="rounded-[28px] bg-white p-9 shadow-[0_10px_35px_rgba(20,35,60,0.06)]">

          {/* New */}

          <p className="text-sm font-semibold tracking-[1.5px] text-[#ff624e]">
            NEW
          </p>

          {/* Product name */}

          <h1 className="mt-1 text-[40px] font-bold leading-tight tracking-[-1.5px]">
            {product.name}
          </h1>

          {/* Variant */}

          <h2 className="mt-1 text-[23px] font-medium text-[#637b9b]">
            {selectedVariant?.storage}
            {" · "}
            {selectedVariant?.color}
          </h2>

          {/* Product image */}

          <div className="flex h-[390px] items-center justify-center">
            <img
              src={selectedVariant?.image}
              alt={product.name}
              className="h-[370px] w-[350px] object-contain"
            />
          </div>

          {/* Variants */}

          {product.variants?.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />
          )}

          {/* Description */}

          <p className="mt-8 max-w-[560px] text-[16px] leading-7 text-[#7185a2]">
            {product.description ||
              `Experience the ${product.name} with premium design, powerful performance and advanced technology.`}
          </p>
        </section>

        {/* ================= RIGHT EMI ================= */}

        <section className="rounded-[28px] bg-white p-9 shadow-[0_10px_35px_rgba(20,35,60,0.06)]">

          {/* Price */}

          <div className="flex items-center gap-4">

            <div>
              <div className="text-[54px] font-bold leading-none tracking-[-2px]">
                ₹{product.price.toLocaleString("en-IN")}
              </div>

              <div className="mt-2 text-[15px] text-[#7185a2] line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </div>
            </div>

            <span className="rounded-full bg-[#d8f6e4] px-3 py-1.5 text-sm font-semibold text-[#078b4b]">
              {discount}% off
            </span>

          </div>

          {/* EMI heading */}

          <h2 className="mt-9 text-[25px] font-bold">
            EMI plans backed by mutual funds
          </h2>

          <p className="mt-2 text-[15px] text-[#7185a2]">
            Your funds stay invested. Pick a tenure that suits you.
          </p>

          {/* ================= EMI PLANS ================= */}

          <div className="mt-6 flex flex-col gap-3">

            {emiPlans.length > 0 ? (
              emiPlans.map((plan) => (
                <EmiPlan
                  key={plan._id}
                  plan={plan}
                  selected={
                    selectedPlan?._id === plan._id
                  }
                  onSelect={setSelectedPlan}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-slate-500">
                No EMI plans available
              </div>
            )}

          </div>

        </section>
      </div>

      {/* ================================================= */}
      {/*              SELECTED PLAN BAR                    */}
      {/* ================================================= */}

      {selectedPlan && (
        <div
          className="
            fixed
            bottom-5
            left-1/2
            z-50
            flex
            w-[calc(100%-40px)]
            -translate-x-1/2
            items-center
            justify-between
            gap-6
            rounded-[25px]
            border
            border-slate-200
            bg-white
            px-6
            py-4
            shadow-[0_15px_45px_rgba(10,20,40,0.18)]
            lg:left-[calc(50%+305px)]
            lg:w-[590px]
            lg:-translate-x-1/2
          "
        >

          {/* Selected plan */}

          <div className="min-w-0">

            <p className="text-[12px] font-semibold tracking-[1px] text-[#7185a2]">
              SELECTED PLAN
            </p>

            <p className="mt-1 whitespace-nowrap text-[19px] font-bold">
              ₹
              {selectedPlan.monthlyAmount?.toLocaleString(
                "en-IN"
              )}
              {" × "}
              {selectedPlan.tenure} months
            </p>

          </div>

          {/* Button */}

          <button
            onClick={() => {
              console.log(
                "Selected plan:",
                selectedPlan
              );
            }}
            className="
              shrink-0
              rounded-[14px]
              bg-[#080b20]
              px-8
              py-4
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#171b32]
            "
          >
            Proceed with this plan
          </button>

        </div>
      )}

    </main>
  );
}