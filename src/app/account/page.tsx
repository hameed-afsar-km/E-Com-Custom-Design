import Link from "next/link";

const orders = [
  { id: "ORD-2248", status: "Packed", amount: "320 AED" },
  { id: "ORD-2249", status: "Delivered", amount: "480 AED" },
];

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#fffaf4]">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-6">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Account</p>
          <h1 className="mt-3 font-serif text-5xl text-white">Personal gifting memory.</h1>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#070707] p-5">
            <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Saved profiles</p>
            <div className="mt-4 space-y-3 text-sm text-white/60">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">Wishlist: 6 bespoke curation favorites</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">Saved addresses: 2 luxury delivery locations</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">Customization templates: 4 recurring ceremony styles</div>
            </div>
            <Link href="/checkout" className="mt-5 inline-block rounded-full bg-violet-500 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-black">Continue gifting</Link>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#060607] p-5">
            <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Order history</p>
            <div className="mt-4 space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-white">{order.id}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/45">{order.status}</p>
                  </div>
                  <p className="text-sm text-white/70">{order.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
