import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg text-slate-500">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main>

      {/* Hero */}

      <section className="mx-auto max-w-[1220px] px-5 pb-10 pt-[58px]">

        <div className="max-w-[780px]">

          <p className="text-sm font-semibold tracking-[1.5px] text-[#ff624e]">
            INVEST. DON'T LIQUIDATE.
          </p>

          <h1 className="mt-4 text-[clamp(38px,5vw,54px)] font-bold leading-[1.02] tracking-[-2.5px] text-[#080b20]">
            Buy your next phone on EMI
            <br />
            backed by mutual funds
          </h1>

          <p className="mt-6 max-w-[750px] text-[17px] leading-7 text-[#7185a2]">
            Keep your investments growing while you pay in easy
            monthly instalments — from 3 to 60 months, with 0%
            interest options and cashback on every plan.
          </p>

        </div>

      </section>

      {/* Products */}

      <section className="mx-auto grid max-w-[1220px] grid-cols-1 gap-6 px-5 pb-20 md:grid-cols-2 lg:grid-cols-3">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </section>

    </main>
  );
}