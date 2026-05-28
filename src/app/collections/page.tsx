"use client";

import Link from "next/link";
import { productCatalog } from "@/lib/brand-data";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#fffaf4]">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-6">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Collections</p>
          <h1 className="mt-3 font-serif text-5xl text-white">The curated gifting universe.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Explore scent-led luxury, floral couture, and occasion-ready gifting moments crafted with editorial precision.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {productCatalog.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group rounded-[30px] border border-white/10 bg-[#0b0a0c] p-4 transition hover:-translate-y-1"
            >
              <div className="rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(150,129,222,0.32),_transparent_26%),linear-gradient(180deg,#19161f,#080808)] p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[8px] uppercase tracking-[0.28em] text-white/65">{product.badge}</span>
                  <span className="rounded-full bg-violet-500/20 px-2 py-1 text-[8px] uppercase tracking-[0.28em] text-violet-100">{product.category}</span>
                </div>
                <div className="mt-8 flex h-24 items-center justify-center">
                  <div className="h-16 w-8 rounded-full bg-gradient-to-b from-[#fefcf9] via-[#c6a98d] to-[#3f2a24]" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-serif text-2xl text-white">{product.name}</h2>
                  <p className="text-sm text-white/70">{product.price} AED</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/60">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
