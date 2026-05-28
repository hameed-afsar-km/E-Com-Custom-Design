export default function AdminPage() {
  const metrics = [
    ["Orders", "148"],
    ["Customizations", "64"],
    ["Revenue", "182K AED"],
    ["Conversion", "6.8%"],
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-[#fffaf4]">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Admin dashboard</p>
          <h1 className="mt-3 font-serif text-5xl text-white">Luxury operations control center.</h1>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {metrics.map(([label, value]) => (
            <div key={label} className="rounded-[26px] border border-white/10 bg-[#070707] p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{label}</p>
              <p className="mt-3 font-serif text-4xl text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#070707] p-5">
            <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Product management</p>
            <div className="mt-4 space-y-3">
              {['Aurora Bottle', 'Safra Bloom', 'Royal Constellation', 'Hadid Vow Box'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
                  <span>{item}</span>
                  <span className="rounded-full bg-violet-500/20 px-2 py-1 text-[9px] uppercase tracking-[0.24em] text-violet-100">Live</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#070707] p-5">
            <p className="text-[10px] uppercase tracking-[0.36em] text-violet-100">Inventory & media</p>
            <div className="mt-4 space-y-3 text-sm text-white/60">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">Cloudinary asset sync: online</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">Customization requests: 19 active</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">Campaign banners: curated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
