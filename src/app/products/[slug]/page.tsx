"use client";

import { useState } from "react";
import Link from "next/link";
import { productCatalog } from "@/lib/brand-data";
import { useCartStore } from "@/store/cart-store";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedVariant, setSelectedVariant] = useState("Signature edition");

  const product = productCatalog.find((item) => item.id === params.slug);
  if (!product) {
    return <div className="min-h-screen bg-[#050505] p-12 text-white">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#fffaf4]">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#0b090b] p-5">
            <div className="rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(150,129,222,0.32),_transparent_26%),linear-gradient(180deg,#171319,#050505)] p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-2 py-1 text-[8px] uppercase tracking-[0.28em] text-white/65">{product.badge}</span>
                <span className="rounded-full bg-violet-500/20 px-2 py-1 text-[8px] uppercase tracking-[0.28em] text-violet-100">{product.category}</span>
              </div>
              <div className="mt-10 flex h-72 items-center justify-center rounded-[30px] border border-white/10 bg-black/30">
                <div className="h-44 w-16 rounded-full bg-gradient-to-b from-[#fefcf9] via-[#c3aa8d] to-[#3b2924]" />
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#060607] p-6">
            <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Product detail</p>
            <h1 className="mt-3 font-serif text-5xl text-white">{product.name}</h1>
            <p className="mt-4 text-sm leading-7 text-white/60">{product.description}</p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                ["Availability", "Made to order"],
                ["Lead time", "4–6 days"],
                ["Packaging", "Luxury box + satin wrap"],
                ["Gift note", "Included"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-white/45">{label}</p>
                  <p className="mt-2 text-sm text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">Variant</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Signature edition", "Wedding suite", "Private client"] .map((variant) => (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.24em] ${selectedVariant === variant ? "bg-violet-500 text-black" : "border border-white/10 bg-white/5 text-white/60"}`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Starting price</p>
                <p className="mt-2 font-serif text-4xl text-white">{product.price} AED</p>
              </div>
              <button
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    variant: selectedVariant,
                  })
                }
                className="rounded-full bg-violet-500 px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-black"
              >
                Add to cart
              </button>
            </div>

            <div className="mt-5 flex gap-3">
              <Link href="/collections" className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/70">Back to collection</Link>
              <Link href="/checkout" className="rounded-full bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white">Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
