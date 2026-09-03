import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="h-[68px] border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1220px] items-center justify-between px-5">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#080b20] text-sm font-bold text-white">
            1Fi
          </span>

          <span className="text-[18px] font-bold text-[#080b20]">
            EMI on Mutual Funds
          </span>
        </Link>

        <div className="flex items-center gap-7 text-[15px] text-[#7185a2]">
          <Link
            to="/"
            className="transition hover:text-[#080b20]"
          >
            Products
          </Link>

          <a
            href="https://onefi-assignment-0hs3.onrender.com/api/products"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[#080b20]"
          >
            API
          </a>
        </div>

      </div>
    </nav>
  );
}