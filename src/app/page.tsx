"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Gift, Menu, Sparkles } from "lucide-react";
import { collectionHighlights, howItWorks, productCatalog, testimonials } from "@/lib/brand-data";
import { useCartStore } from "@/store/cart-store";

const socialGrid = [
  { eyebrow: "Editorial drop", title: "Golden Hour Couple Set", tone: "bg-[#f5efe8]" },
  { eyebrow: "Private styling", title: "Saffron Bloom Ritual", tone: "bg-[#f0ece4]" },
  { eyebrow: "Cinematic gifting", title: "Velvet Fragrance Studio", tone: "bg-[#f2ece8]" },
  { eyebrow: "Maison note", title: "Eid Silk Wrappers", tone: "bg-[#f0ece6]" },
];

const perfumeColorOptions = [
  { label: "Amber Halo", value: "#ae8d62" },
  { label: "Midnight Bloom", value: "#402a47" },
  { label: "Moonlit Pearl", value: "#d4d0cb" },
];

const flowerOptions = [
  { key: "rose", label: "Rose Petal", price: 68 },
  { key: "orchid", label: "Orchid Velvet", price: 74 },
  { key: "lily", label: "White Lily", price: 72 },
  { key: "peony", label: "Peony Silk", price: 80 },
];

const wrapperOptions = [
  { key: "silk", label: "Silk Wrap", price: 28 },
  { key: "linen", label: "Linen Wrap", price: 24 },
  { key: "velvet", label: "Velvet Wrap", price: 32 },
];

const ribbonOptions = [
  { key: "violet", label: "Royal Violet", price: 18 },
  { key: "gold", label: "Gold Dust", price: 20 },
  { key: "ivory", label: "Ivory Halo", price: 16 },
];

const cardOptions = [
  { key: "oat", label: "Oat Ledger", price: 12 },
  { key: "marble", label: "Marble Note", price: 15 },
  { key: "crystal", label: "Crystal Card", price: 17 },
];

export default function Home() {
  const [isAndroid, setIsAndroid] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [perfumeName, setPerfumeName] = useState("Amina El Noor");
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const [fontStyle, setFontStyle] = useState("serif");
  const [bottleTone, setBottleTone] = useState("#ae8d62");
  const [placement, setPlacement] = useState("front");
  const [giftNote, setGiftNote] = useState("For the moments that carry perfume in silence.");
  const [flower, setFlower] = useState("rose");
  const [wrapper, setWrapper] = useState("silk");
  const [ribbon, setRibbon] = useState("violet");
  const [card, setCard] = useState("oat");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setIsAndroid(/android/i.test(navigator.userAgent));
    const timeout = window.setTimeout(() => setShowSplash(false), 3600);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedFlower = flowerOptions.find((item) => item.key === flower) ?? flowerOptions[0];
  const selectedWrapper = wrapperOptions.find((item) => item.key === wrapper) ?? wrapperOptions[0];
  const selectedRibbon = ribbonOptions.find((item) => item.key === ribbon) ?? ribbonOptions[0];
  const selectedCard = cardOptions.find((item) => item.key === card) ?? cardOptions[0];

  const bouquetPrice = useMemo(() => {
    return 240 + selectedFlower.price + selectedWrapper.price + selectedRibbon.price + selectedCard.price;
  }, [selectedFlower, selectedWrapper, selectedRibbon, selectedCard]);

  const perfumePrice = useMemo(() => {
    return 420 + (placement === "front" ? 24 : placement === "side" ? 36 : 44);
  }, [placement]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1a1a1a]">
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
          >
            <video
  className={`absolute inset-0 h-full w-full ${
    isAndroid
      ? "object-contain scale-[0.82]"
      : "object-cover"
  }`}
  autoPlay
  muted
  playsInline
  key={isAndroid ? "vertical" : "horizontal"}
  src={isAndroid ? "/vertical-splash.webm" : "/horizontal-splash.webm"}
  onEnded={() => setShowSplash(false)}
/>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative isolate">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-[-10%] top-24 h-64 w-64 rounded-full bg-black/5 blur-3xl" />
          <div className="absolute right-[-8%] top-72 h-72 w-72 rounded-full bg-stone-200/10 blur-3xl" />
        </div>

        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed inset-x-0 top-3 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-6xl rounded-full border border-black/10 px-4 py-3 backdrop-blur-xl transition-all duration-300 ${scrolled ? "bg-white/90 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.15)]" : "bg-white/75"}`}
        >
          <div className="flex items-center">
            <Link href="/" className="flex-1">
              <Image src="/logo-no-bg.png" alt="KAISAA" width={70} height={70} />
            </Link>

            <div className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.24em] text-black/50 md:flex">
              <Link href="#home" className="transition hover:text-black">Home</Link>
              <Link href="#collections" className="transition hover:text-black">Collections</Link>
              <Link href="#customize" className="transition hover:text-black">Customize</Link>
              <Link href="#bouquets" className="transition hover:text-black">Bouquets</Link>
              <Link href="#story" className="transition hover:text-black">About</Link>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
              <div className="hidden items-center gap-2 md:flex">
                <Link href="/cart" className="rounded-full border border-black/10 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-black/60 transition hover:bg-black/5">
                  Cart ({cartCount})
                </Link>
                <Link href="/checkout" className="rounded-full bg-black px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-white transition hover:bg-gray-800">
                  Book a set
                </Link>
              </div>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex items-center justify-center rounded-full border border-black/10 p-2 md:hidden">
                <Menu className="h-6 w-6 text-black/60" />
              </button>
            </div>
          </div>
        </motion.nav>

        {mobileMenuOpen && (
          <div className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-black/10 bg-white/95 p-6 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.24em] text-black/60">
              <Link href="#home" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-black">Home</Link>
              <Link href="#collections" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-black">Collections</Link>
              <Link href="#customize" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-black">Customize</Link>
              <Link href="#bouquets" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-black">Bouquets</Link>
              <Link href="#story" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-black">About</Link>
              <hr className="border-black/10" />
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-black">Cart ({cartCount})</Link>
              <Link href="/checkout" onClick={() => setMobileMenuOpen(false)} className="rounded-full bg-black px-4 py-3 text-center text-white">Book a set</Link>
            </div>
          </div>
        )}

        <main id="home" className="pt-24">
          <section className="relative px-4 pb-12 pt-6 md:px-6">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-black/60">
                  <Sparkles className="h-3.5 w-3.5" />
                  Custom gifting atelier
                </div>
                <h1 className="mt-2 max-w-2xl font-serif text-5xl leading-none tracking-[0.08em] text-[#1a1a1a] md:text-7xl">
                  Crafted gifts. Eternal emotions.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-black/50 md:text-lg">
                  A luxury Arabic gifting boutique where fragrance, florals, and heirloom-grade presentation become one cinematic ritual.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="#customize" className="rounded-full bg-black px-5 py-3 text-[11px] font-medium uppercase tracking-[0.28em] text-white transition hover:bg-gray-800">
                    Customize Now
                  </Link>
                  <Link href="#collections" className="rounded-full border border-black/15 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.28em] text-black/70 transition hover:bg-black/5">
                    Explore Collections
                  </Link>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ["12k+", "gifts curated"],
                    ["24h", "concierge styling"],
                    ["Arabic + EN", "language support"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl border border-black/10 bg-black/5 px-4 py-3 backdrop-blur">
                      <p className="text-xl font-semibold text-black">{value}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-black/45">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[30px] border border-black/10 bg-black/[0.02] p-4 backdrop-blur-xl">
                  <div className="relative h-[540px] overflow-hidden rounded-[26px] border border-black/10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_30%),linear-gradient(180deg,#f0ece6,#fafaf9)]">
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_25%,rgba(0,0,0,0.02)_28%,transparent_32%,transparent_58%,rgba(0,0,0,0.01)_62%,transparent_70%)]" />
                    <div className="absolute left-3 top-4 rounded-full bg-white/80 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-black/60">Editorial preview</div>
                    <div className="absolute bottom-4 right-4 rounded-full border border-black/10 bg-white/80 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-black/60">Private atelier styling</div>
                    <div className="absolute left-8 top-16 h-24 w-24 rounded-full bg-black/5 blur-2xl" />
                    <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-black/5 blur-2xl" />
                    <div className="absolute inset-x-10 top-24 flex items-center justify-center">
                      <div className="relative flex h-64 w-44 items-end justify-center rounded-[36px] border border-black/10 bg-gradient-to-b from-[#f6d3af] via-[#b58c78] to-[#30221b] p-2 shadow-[0_30px_90px_-18px_rgba(0,0,0,0.15)]">
                        <div className="absolute inset-2 rounded-[30px] border border-black/10" />
                        <div className="absolute inset-x-10 top-6 h-8 rounded-full bg-black/10 blur-md" />
                        <div className="relative z-10 flex h-40 w-20 items-center justify-center rounded-[99px] border border-black/10 bg-[#1b1410]/90">
                          <div className="h-28 w-12 rounded-full bg-black/30" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-black/10 bg-white/80 p-4 backdrop-blur">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-black/60">Signature bouquet</p>
                          <p className="mt-2 font-serif text-2xl text-black">Safra Bloom</p>
                        </div>
                        <div className="rounded-full bg-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-black">
                          320 AED
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </section>

          <section id="story" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[28px] border border-black/10 bg-black/[0.02] p-6 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">Brand story</p>
                <h2 className="mt-4 font-serif text-4xl tracking-[0.04em] text-black">Luxury gifting as art direction.</h2>
                <p className="mt-4 text-sm leading-7 text-black/50">
                  KAISAA blends the drama of Arabic hosting rituals with a modern atelier philosophy — scent, touch, and thoughtful personalization for intimate celebrations, weddings, and prestige gifting.
                </p>
                <div className="mt-6 grid gap-3">
                  {[
                    ["Craftsmanship", "Hand-finished packaging, bespoke engraving, and story-led presentation."],
                    ["Emotion", "Every gift is designed as a ritual rather than a product."],
                    ["Global luxury", "Shipping, concierge styling, and multilingual curation."],
                  ].map(([label, copy]) => (
                    <div key={label} className="rounded-2xl border border-black/10 bg-black/5 p-3">
                      <p className="text-xs uppercase tracking-[0.26em] text-black">{label}</p>
                      <p className="mt-2 text-sm text-black/50">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {collectionHighlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-[28px] border border-black/10 bg-[#f5f5f0] p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-black/50">0{index + 1}</p>
                      <div className="rounded-full bg-black/5 px-2 py-1 text-[9px] uppercase tracking-[0.24em] text-black/45">{item.metric}</div>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl text-black">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-black/50">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="collections" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">Featured collections</p>
                <h2 className="mt-2 font-serif text-4xl text-black">Curated chapters of gifting.</h2>
              </div>
              <p className="hidden max-w-xl text-sm text-black/45 md:block">
                Every collection is styled like a capsule, blending tactile luxury with cinematic presentation and emotional clarity.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {productCatalog.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-[30px] border border-black/10 bg-[#f5f5f0] p-4"
                >
                  <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_26%),linear-gradient(180deg,#f0ece6,#fafaf9)] p-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-black/10 px-2 py-1 text-[8px] uppercase tracking-[0.28em] text-black/55">{product.badge}</span>
                      <span className="rounded-full bg-black/10 px-2 py-1 text-[8px] uppercase tracking-[0.28em] text-black/50">{product.category}</span>
                    </div>
                    <div className="mt-8 flex h-28 items-center justify-center rounded-full border border-black/10 bg-white/80">
                      <div className="h-20 w-10 rounded-full bg-gradient-to-b from-[#fefcf9] via-[#c6a98d] to-[#3f2a24]" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-black/50">{product.accent}</p>
                        <h3 className="mt-2 font-serif text-2xl text-black">{product.name}</h3>
                      </div>
                      <p className="text-sm text-black/60">{product.price} AED</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-black/50">{product.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-black/5 px-2 py-1 text-[9px] uppercase tracking-[0.24em] text-black/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="customize" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[30px] border border-black/10 bg-[#f5f5f0] p-6">
                <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">Custom perfume experience</p>
                <h2 className="mt-3 font-serif text-4xl text-black">Design a fragrance as a heirloom.</h2>
                <p className="mt-4 text-sm leading-7 text-black/50">
                  Select the bottle glow, placement, and engraving language to craft a luxury scent ritual. Every detail updates in real time like a couture atelier preview.
                </p>
                <div className="mt-5 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-black/45">Engraving name</span>
                    <input
                      value={perfumeName}
                      onChange={(e) => setPerfumeName(e.target.value)}
                      className="w-full rounded-2xl border border-black/10 bg-black/5 px-3 py-2 text-sm text-black outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-black/45">Typography</span>
                    <select
                      value={fontStyle}
                      onChange={(e) => setFontStyle(e.target.value)}
                      className="w-full rounded-2xl border border-black/10 bg-black/5 px-3 py-2 text-sm text-black outline-none"
                    >
                      <option value="serif">Luxe Serif</option>
                      <option value="sans">Quiet Sans</option>
                      <option value="arabic">Arabic Calligraphy</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-black/45">Bottle color</span>
                    <div className="grid grid-cols-3 gap-2">
                      {perfumeColorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setBottleTone(color.value)}
                          className={`rounded-2xl border px-3 py-2 text-[10px] uppercase tracking-[0.24em] ${bottleTone === color.value ? "border-black bg-black/10 text-black" : "border-black/10 bg-black/5 text-black/45"}`}
                        >
                          {color.label}
                        </button>
                      ))}
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-black/45">Placement</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        ["front", "Front"],
                        ["side", "Side"],
                        ["full", "Full Wrap"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setPlacement(value)}
                          className={`rounded-2xl border px-3 py-2 text-[10px] uppercase tracking-[0.24em] ${placement === value ? "border-black bg-black/10 text-black" : "border-black/10 bg-black/5 text-black/45"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-black/45">Gift message</span>
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      rows={3}
                      className="w-full rounded-2xl border border-black/10 bg-black/5 px-3 py-2 text-sm text-black outline-none"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-[30px] border border-black/10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_24%),linear-gradient(180deg,#f5f5f0,#fafaf9)] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">Live preview</p>
                    <p className="mt-2 font-serif text-3xl text-black">Maison bottle studio</p>
                  </div>
                  <div className="rounded-full bg-black/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-black/55">{perfumePrice} AED</div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[30px] border border-black/10 bg-[#f5f5f0]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.04),_transparent_38%)]" />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="relative flex h-64 w-28 items-end justify-center rounded-[30px] border border-black/10 shadow-[0_25px_85px_-24px_rgba(0,0,0,0.15)]"
                      style={{ background: `linear-gradient(180deg, ${bottleTone}, #e8e0d8)` }}
                    >
                      <div className="absolute inset-x-4 top-5 h-6 rounded-full bg-white/30 blur-md" />
                      <div className="absolute bottom-5 left-1/2 h-10 w-5 -translate-x-1/2 rounded-full bg-black/10" />
                    </motion.div>
                  </div>
                  <div className="rounded-[28px] border border-black/10 bg-white/80 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Preview label</p>
                      <div className="rounded-full bg-black/10 px-2 py-1 text-[9px] uppercase tracking-[0.24em] text-black/50">{fontStyle}</div>
                    </div>
                    <p
                      className="mt-4 text-left font-serif text-3xl leading-none text-black"
                      style={fontStyle === "arabic" ? { fontFamily: "Georgia, serif", fontStyle: "italic" } : undefined}
                    >
                      {perfumeName}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-black/55">{giftNote}</p>
                    <div className="mt-5 space-y-2 text-[10px] uppercase tracking-[0.26em] text-black/45">
                      <div className="flex items-center justify-between rounded-2xl bg-black/5 px-3 py-2">
                        <span>Placement</span>
                        <span className="text-black">{placement}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-black/5 px-3 py-2">
                        <span>Packaging</span>
                        <span className="text-black">Silk ritual</span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        addItem({
                          id: "custom-perfume",
                          name: `Custom ${perfumeName} Perfume`,
                          price: perfumePrice,
                          quantity: 1,
                          variant: `Engraving • ${fontStyle}`,
                        })
                      }
                      className="mt-5 w-full rounded-full bg-black px-4 py-3 text-[11px] font-medium uppercase tracking-[0.28em] text-white"
                    >
                      Add custom bottle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="bouquets" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[30px] border border-black/10 bg-[#f5f5f0] p-6">
                <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">Bouquet designer</p>
                <h2 className="mt-3 font-serif text-4xl text-black">Design the floral ritual.</h2>
                <p className="mt-4 text-sm leading-7 text-black/50">
                  Select the blooms, wrapper, ribbon, and card to build a bouquet that behaves like a fashion editorial in bloom.
                </p>
                <div className="mt-5 grid gap-3">
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-black/45">Flower selection</p>
                    <div className="grid grid-cols-2 gap-2">
                      {flowerOptions.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => setFlower(option.key)}
                          className={`rounded-2xl border px-3 py-2 text-left text-xs ${flower === option.key ? "border-black bg-black/10 text-black" : "border-black/10 bg-black/5 text-black/45"}`}
                        >
                          <p>{option.label}</p>
                          <p className="mt-1 text-[9px] uppercase tracking-[0.26em] text-black/40">{option.price} AED</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    {[{ state: wrapper, setState: setWrapper, options: wrapperOptions, label: "Wrapper" }, { state: ribbon, setState: setRibbon, options: ribbonOptions, label: "Ribbon" }, { state: card, setState: setCard, options: cardOptions, label: "Card" }].map((group) => (
                      <div key={group.label}>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-black/45">{group.label}</p>
                        <div className="space-y-2">
                          {group.options.map((option) => (
                            <button
                              key={option.key}
                              type="button"
                              onClick={() => group.setState(option.key)}
                              className={`w-full rounded-2xl border px-2 py-2 text-left text-[10px] uppercase tracking-[0.24em] ${group.state === option.key ? "border-black bg-black/10 text-black" : "border-black/10 bg-black/5 text-black/45"}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-black/10 bg-[radial-gradient(circle_at_bottom,_rgba(0,0,0,0.04),_transparent_20%),linear-gradient(180deg,#f5f5f0,#fafaf9)] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">Live bouquet preview</p>
                    <p className="mt-2 font-serif text-3xl text-black">Studio arrangement</p>
                  </div>
                  <div className="rounded-full bg-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-black/50">{bouquetPrice} AED</div>
                </div>
                <div className="mt-5 rounded-[30px] border border-black/10 bg-white/80 p-4">
                  <div className="relative mx-auto h-64 w-full max-w-xs rounded-[28px] border border-black/10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_26%),linear-gradient(180deg,#f0ece6,#fafaf9)]">
                    <div className="absolute inset-x-6 top-8 h-12 rounded-full bg-black/5 blur-md" />
                    <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute left-1/2 top-10 h-20 w-20 -translate-x-1/2 rounded-full bg-[#aa946f]/80 blur-[1px]" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute left-1/2 top-16 h-24 w-24 -translate-x-1/2 rounded-full bg-[#8b5c84]/80 blur-[1px]" />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute left-1/2 top-24 h-20 w-20 -translate-x-1/2 rounded-full bg-[#f5ece4]/70 blur-[1px]" />
                    <div className="absolute bottom-5 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#e0d8d0]" />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Arrangement note</p>
                      <p className="mt-2 text-sm leading-6 text-black/55">Layered with {selectedFlower.label.toLowerCase()}, {selectedWrapper.label.toLowerCase()}, and {selectedCard.label.toLowerCase()} moodbook styling.</p>
                    </div>
                    <button
                      onClick={() =>
                        addItem({
                          id: "custom-bouquet",
                          name: `Customized ${selectedFlower.label} Bouquet`,
                          price: bouquetPrice,
                          quantity: 1,
                          variant: `${selectedFlower.label} • ${selectedWrapper.label}`,
                        })
                      }
                      className="rounded-full bg-black px-3 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white"
                    >
                      Add bouquet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">How it works</p>
                <h2 className="mt-2 font-serif text-4xl text-black">Five thoughtful steps.</h2>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-5">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-[28px] border border-black/10 bg-[#f5f5f0] p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/5 px-2 py-1 text-[8px] uppercase tracking-[0.28em] text-black/50">Step {step.step}</span>
                    <Gift className="h-4 w-4 text-black/40" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-black">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/45">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">Testimonials</p>
              <h2 className="mt-2 font-serif text-4xl text-black">Softly unforgettable moments.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <article key={item.name} className="rounded-[28px] border border-black/10 bg-[#f5f5f0] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-sm font-semibold text-black">{item.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm text-black">{item.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">{item.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-black/55">"{item.quote}"</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <div className="rounded-[30px] border border-black/10 bg-[#f5f5f0] p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">Instagram editorial</p>
                  <h2 className="mt-2 font-serif text-4xl text-black">From atelier to social archive.</h2>
                </div>
                <p className="max-w-xl text-sm text-black/45">A cinematic social grid inspired by luxury campaign styling, curated with emotion-led details and tactile overlays.</p>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {socialGrid.map((item) => (
                  <div key={item.title} className={`group relative overflow-hidden rounded-[26px] border border-black/10 p-4 ${item.tone}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.06),_transparent_24%)]" />
                    <div className="relative flex h-44 items-end">
                      <div className="rounded-2xl border border-black/10 bg-white/80 px-3 py-2 backdrop-blur">
                        <p className="text-[8px] uppercase tracking-[0.28em] text-black/50">{item.eyebrow}</p>
                        <p className="mt-2 text-lg font-medium text-black">{item.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <div className="relative overflow-hidden rounded-[34px] border border-black/10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.05),_transparent_28%),linear-gradient(180deg,#f0ece6,#fafaf9)] p-8">
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">Design a gift they never forget</p>
                <h2 className="mt-3 max-w-2xl font-serif text-4xl text-black md:text-5xl">Design a gift they never forget.</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-black/50">A premium, emotionally led gifting ritual built for weddings, Eid, corporate prestige, and unforgettable personal moments.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/collections" className="rounded-full bg-black px-5 py-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white">Book curation</Link>
                  <Link href="/checkout" className="rounded-full border border-black/15 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.28em] text-black/70">Talk to concierge</Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mx-auto max-w-6xl px-4 pb-8 pt-2 md:px-6">
          <div className="rounded-[30px] border border-black/10 bg-white/90 p-6">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.36em] text-black/50">KAISAA</p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-black/45">Premium customized gifting with Arabic luxury cues, editorial storytelling, and concierge-style fulfillment.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-black/55">Quick links</p>
                <div className="mt-3 space-y-2 text-sm text-black/45">
                  <Link href="#collections" className="block">Collections</Link>
                  <Link href="#customize" className="block">Customize</Link>
                  <Link href="/cart" className="block">Cart</Link>
                  <Link href="/admin" className="block">Admin</Link>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-black/55">Contact</p>
                <div className="mt-3 space-y-2 text-sm text-black/45">
                  <p>hello@kaisaa.ae</p>
                  <p>+971 4 123 2258</p>
                  <p>Dubai, UAE</p>
                </div>
              </div>
            </div>
            <div className="mt-5 border-t border-black/10 pt-4 text-[10px] uppercase tracking-[0.28em] text-black/40">
              © 2026 KAISAA. Modern Arabic gifting atelier.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
