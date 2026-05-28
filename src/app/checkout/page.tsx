"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string().min(10),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) });

  const onSubmit = () => setStep(2);

  return (
    <div className="min-h-screen bg-[#050505] text-[#fffaf4]">
      <div className="mx-auto max-w-5xl px-4 py-24 md:px-6">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Checkout</p>
          <h1 className="mt-3 font-serif text-5xl text-white">Luxury, secure, and intentionally layered.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Personalized delivery details, concierge scheduling, and Razorpay-ready payment architecture in a polished premium flow.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#070707] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Flow</p>
                <h2 className="mt-2 font-serif text-3xl text-white">Live order steps</h2>
              </div>
              <div className="rounded-full bg-violet-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-violet-100">Step {step}/2</div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-white/60">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">1. Secure delivery details and gifting note.</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">2. Confirm payment method and schedule luxury delivery.</div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#060607] p-6">
            {step === 1 ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-white/55">Full name</label>
                  <input {...register("name")} className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none" />
                  {errors.name && <p className="mt-1 text-xs text-rose-200">Enter your full name.</p>}
                </div>
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-white/55">Email</label>
                  <input {...register("email")} className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none" />
                  {errors.email && <p className="mt-1 text-xs text-rose-200">Enter a valid email.</p>}
                </div>
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-white/55">Phone</label>
                  <input {...register("phone")} className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none" />
                  {errors.phone && <p className="mt-1 text-xs text-rose-200">Enter a valid phone.</p>}
                </div>
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-white/55">Delivery address</label>
                  <textarea {...register("address")} rows={4} className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none" />
                  {errors.address && <p className="mt-1 text-xs text-rose-200">Add your delivery address.</p>}
                </div>
                <button type="submit" className="w-full rounded-full bg-violet-500 px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-black">Continue to payment</button>
              </form>
            ) : (
              <div className="space-y-4 text-sm text-white/60">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-violet-100">Payment gateway</p>
                  <p className="mt-2 text-white">Razorpay integration structure ready. Stripe architecture prepared for expansion.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-violet-100">Delivery preview</p>
                  <p className="mt-2 text-white">Luxury concierge schedule: 48-hour artisanal packing window, international shipping support, and live status updates.</p>
                </div>
                <button className="w-full rounded-full bg-violet-500 px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-black">Place order</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
