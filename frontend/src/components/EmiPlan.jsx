export default function EmiPlan({
  plan,
  selected,
  onSelect
}) {
  return (
    <button
      onClick={() => onSelect(plan)}
      className={`w-full rounded-[22px] border bg-white p-5 text-left transition ${
        selected
          ? "border-2 border-[#ff6d58] shadow-[0_5px_20px_rgba(255,109,88,0.10)]"
          : "border-slate-200 hover:border-[#ffad9f]"
      }`}
    >

      <div className="flex items-center justify-between gap-4">

        <strong className="text-[19px] font-semibold text-[#080b20]">
          ₹{plan.monthlyAmount.toLocaleString("en-IN")}
          {" × "}
          {plan.tenure} months
        </strong>

        <span
          className={`whitespace-nowrap text-sm ${
            plan.interestRate === 0
              ? "text-[#008e54]"
              : "text-[#7085a2]"
          }`}
        >
          {plan.interestRate}% interest
        </span>

      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">

        <span className="text-[15px] text-[#00945a]">
          Additional cashback of ₹
          {plan.cashback.toLocaleString("en-IN")}
        </span>

        {selected && (
          <span className="rounded-full bg-[#ffe1da] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#ff604a]">
            MOST POPULAR
          </span>
        )}

      </div>

    </button>
  );
}