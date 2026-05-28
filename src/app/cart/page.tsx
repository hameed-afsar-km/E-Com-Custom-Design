"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-[#fffaf4]">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-6">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Cart</p>
          <h1 className="mt-3 font-serif text-5xl text-white">Premium checkout ritual.</h1>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#080809] p-5">
            {items.length === 0 ? (
              <p className="text-sm text-white/60">Your curated cart is empty. Start by exploring the collections.</p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/45">{item.variant}</p>
                      </div>
                      <p className="text-sm text-white/70">{item.price * item.quantity} AED</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full bg-white/5 px-2 py-1 text-xs text-white">−</button>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full bg-white/5 px-2 py-1 text-xs text-white">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[10px] uppercase tracking-[0.28em] text-violet-100">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#060607] p-6">
            <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Summary</p>
            <div className="mt-4 space-y-3 text-sm text-white/60">
              <div className="flex items-center justify-between"><span>Subtotal</span><span className="text-white">{subtotal} AED</span></div>
              <div className="flex items-center justify-between"><span>Luxury handling</span><span className="text-white">48 AED</span></div>
              <div className="flex items-center justify-between"><span>Express concierge</span><span className="text-white">24 AED</span></div>
            </div>
            <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between text-white">
              <span className="font-serif text-2xl">Total</span>
              <span className="font-serif text-3xl">{subtotal + 72} AED</span>
            </div>
            <div className="mt-5 flex gap-2">
              <Link href="/checkout" className="flex-1 rounded-full bg-violet-500 px-4 py-3 text-center text-[10px] uppercase tracking-[0.28em] text-black">Proceed to checkout</Link>
              <button onClick={() => clearCart()} className="rounded-full border border-white/10 px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-white/70">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
