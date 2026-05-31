"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Gift, Menu, Sparkles, ArrowRight } from "lucide-react";
import { collectionHighlights, howItWorks, productCatalog, testimonials } from "@/lib/brand-data";
import { useCartStore } from "@/store/cart-store";

const perfumeColorOptions = [
  { label: "Amber Halo", value: "#ae8d62" },
  { label: "Midnight Bloom", value: "#402a47" },
  { label: "Moonlit Pearl", value: "#d4d0cb" },
  { label: "Onyx Black", value: "#111111" },
];

const flowerOptions = [
  { key: "rose", label: "Rose Petal", price: 68 },
  { key: "orchid", label: "Orchid Velvet", price: 74 },
  { key: "lily", label: "White Lily", price: 72 },
  { key: "peony", label: "Peony Silk", price: 80 },
];

const chocolateOptions = [
  { key: "none", label: "No Chocolates", price: 0 },
  { key: "truffles", label: "Artisan Truffles", price: 45 },
  { key: "pralines", label: "Gold Pralines", price: 55 },
  { key: "dates", label: "Stuffed Dates", price: 65 },
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
  { key: "black", label: "Noir Ribbon", price: 15 },
];

const cardOptions = [
  { key: "oat", label: "Oat Ledger", price: 12 },
  { key: "marble", label: "Marble Note", price: 15 },
  { key: "crystal", label: "Crystal Card", price: 17 },
  { key: "ebony", label: "Ebony Black", price: 16 },
];

export default function Home() {
  const [isAndroid, setIsAndroid] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [perfumeName, setPerfumeName] = useState("Amina El Noor");
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const [fontStyle, setFontStyle] = useState("serif");
  const [bottleTone, setBottleTone] = useState("#111111");
  const [placement, setPlacement] = useState("front");
  const [giftNote, setGiftNote] = useState("For the moments that carry perfume in silence.");
  const [flower, setFlower] = useState("rose");
  const [chocolate, setChocolate] = useState("truffles");
  const [wrapper, setWrapper] = useState("silk");
  const [ribbon, setRibbon] = useState("black");
  const [card, setCard] = useState("ebony");
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
  const selectedChocolate = chocolateOptions.find((item) => item.key === chocolate) ?? chocolateOptions[0];
  const selectedWrapper = wrapperOptions.find((item) => item.key === wrapper) ?? wrapperOptions[0];
  const selectedRibbon = ribbonOptions.find((item) => item.key === ribbon) ?? ribbonOptions[0];
  const selectedCard = cardOptions.find((item) => item.key === card) ?? cardOptions[0];

  const bouquetPrice = useMemo(() => {
    return 240 + selectedFlower.price + selectedChocolate.price + selectedWrapper.price + selectedRibbon.price + selectedCard.price;
  }, [selectedFlower, selectedChocolate, selectedWrapper, selectedRibbon, selectedCard]);

  const perfumePrice = useMemo(() => {
    return 420 + (placement === "front" ? 24 : placement === "side" ? 36 : 44);
  }, [placement]);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
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
              className="absolute inset-0 h-full w-full object-cover"
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
              <Link href="/checkout" onClick={() => setMobileMenuOpen(false)} className="rounded-none bg-black px-4 py-3 text-center text-white">Book a set</Link>
            </div>
          </div>
        )}

        <main id="home" className="pt-32 pb-16">
          <section className="px-4 md:px-8 max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-0 border border-black">
              <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-black relative bg-white">
                <div className="line-decoration"></div>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-black tracking-tight uppercase">
                  Modern<br/>Arabic<br/>Gifting.
                </h1>
                <p className="mt-8 max-w-md text-base leading-relaxed text-black/70 font-sans">
                  A luxury gifting atelier where bespoke fragrances and artisan blooms converge into a single cinematic ritual. Sharp, intentional, unforgettable.
                </p>
                <div className="mt-12 flex flex-wrap gap-4">
                  <Link href="#customize" className="bg-black text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] border border-black hover:bg-white hover:text-black transition-colors duration-300">
                    Bespoke Engraving
                  </Link>
                  <Link href="#bouquets" className="bg-white text-black px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] border border-black hover:bg-black hover:text-white transition-colors duration-300">
                    Artisan Bouquets
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[500px] lg:min-h-full bg-black flex items-center justify-center p-8 overflow-hidden group">
                <div className="absolute inset-0 diag-pattern opacity-20"></div>
                <div className="relative z-10 w-64 h-64 border border-white/20 rotate-45 flex items-center justify-center transition-transform duration-700 group-hover:rotate-90">
                  <div className="w-48 h-48 border border-white/40 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white flex items-center justify-center -rotate-45 transition-transform duration-700 group-hover:-rotate-90">
                      <span className="font-serif text-3xl text-black tracking-widest uppercase">Kaisaa</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-8 right-8 text-white/50 text-[10px] uppercase tracking-[0.3em]">
                  Edition 26
                </div>
              </div>
            </div>
          </section>

          <section id="collections" className="px-4 md:px-8 max-w-[1400px] mx-auto mt-24">
            <div className="border-t border-black pt-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-black/50 font-semibold mb-4 block">Archive</span>
                <h2 className="font-serif text-4xl md:text-5xl text-black uppercase tracking-wide">Curated<br/>Collections</h2>
              </div>
              <p className="max-w-md text-sm text-black/60 leading-relaxed font-sans">
                Each collection is presented with uncompromising precision, crafted for momentous occasions and enduring memories.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-black border border-black">
              {productCatalog.map((product) => (
                <div key={product.id} className="bg-white p-6 group hover:bg-black hover:text-white transition-colors duration-300 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-1 border border-black group-hover:border-white transition-colors">{product.badge}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-serif text-2xl mb-2">{product.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-4 opacity-60">{product.category}</p>
                    <p className="text-sm leading-relaxed opacity-80 mb-8">{product.description}</p>
                  </div>
                  <div className="mt-auto border-t border-black group-hover:border-white transition-colors pt-4 flex justify-between items-center">
                    <span className="text-sm font-semibold">{product.price} AED</span>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="customize" className="px-4 md:px-8 max-w-[1400px] mx-auto mt-24">
            <div className="border border-black flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-black bg-white">
                <div className="line-decoration"></div>
                <h2 className="font-serif text-4xl md:text-5xl text-black uppercase tracking-wide mb-6">Bespoke<br/>Engraving</h2>
                <p className="text-sm leading-relaxed text-black/70 mb-10">
                  Sculpt your fragrance bottle with custom typography and poetic intent. A meticulous process ensuring absolute uniqueness.
                </p>
                
                <div className="space-y-6 font-sans">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black">Engraving Text</label>
                    <input 
                      value={perfumeName}
                      onChange={(e) => setPerfumeName(e.target.value)}
                      className="w-full border border-black bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-shadow rounded-none"
                      placeholder="Enter name or phrase"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black">Typography</label>
                      <select
                        value={fontStyle}
                        onChange={(e) => setFontStyle(e.target.value)}
                        className="w-full border border-black bg-transparent px-4 py-3 text-sm focus:outline-none appearance-none rounded-none"
                      >
                        <option value="serif">Luxe Serif</option>
                        <option value="sans">Quiet Sans</option>
                        <option value="arabic">Arabic Calligraphy</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black">Placement</label>
                      <select
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                        className="w-full border border-black bg-transparent px-4 py-3 text-sm focus:outline-none appearance-none rounded-none"
                      >
                        <option value="front">Front Face</option>
                        <option value="side">Side Profile</option>
                        <option value="full">Full Wrap</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black">Bottle Finish</label>
                    <div className="grid grid-cols-4 gap-2">
                      {perfumeColorOptions.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setBottleTone(color.value)}
                          className={`h-12 border ${bottleTone === color.value ? 'border-black border-[2px]' : 'border-black/20 hover:border-black'} transition-colors relative rounded-none`}
                          style={{ backgroundColor: color.value }}
                          title={color.label}
                        >
                          {bottleTone === color.value && (
                            <span className="absolute inset-0 m-auto w-2 h-2 bg-white border border-black"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black">Private Note</label>
                    <textarea 
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      rows={3}
                      className="w-full border border-black bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none rounded-none"
                    />
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 bg-[#fafaf9] flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black">Preview</span>
                  <span className="text-sm font-semibold border-b border-black pb-1">{perfumePrice} AED</span>
                </div>
                
                <div className="flex-grow flex items-center justify-center py-12 relative">
                  <div className="w-32 h-64 border-2 border-black flex flex-col items-center justify-end p-4 relative shadow-2xl transition-colors duration-500" style={{ backgroundColor: bottleTone === '#111111' ? '#222' : bottleTone }}>
                    <div className="absolute -top-8 w-12 h-8 border-2 border-black bg-white"></div>
                    <div className="absolute -top-12 w-8 h-4 border-2 border-black bg-black"></div>
                    
                    <div className="w-full bg-white/90 border border-black p-4 text-center shadow-sm">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-black/50 mb-2">{fontStyle}</p>
                      <p 
                        className={`text-black text-lg leading-tight ${fontStyle === 'serif' ? 'font-serif' : fontStyle === 'sans' ? 'font-sans' : 'font-serif italic'}`}
                        style={{ fontFamily: fontStyle === "arabic" ? "Georgia, serif" : undefined }}
                      >
                        {perfumeName || "Your Name"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() =>
                    addItem({
                      id: "custom-perfume",
                      name: `Bespoke Engraving: ${perfumeName}`,
                      price: perfumePrice,
                      quantity: 1,
                      variant: `Finish: ${bottleTone} | ${placement}`,
                    })
                  }
                  className="w-full bg-black text-white px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-black border border-black transition-colors duration-300 mt-8 flex justify-between items-center group rounded-none"
                >
                  <span>Add to Atelier Cart</span>
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </button>
              </div>
            </div>
          </section>

          <section id="bouquets" className="px-4 md:px-8 max-w-[1400px] mx-auto mt-24">
            <div className="border border-black flex flex-col lg:flex-row-reverse">
              <div className="lg:w-[55%] p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-l border-black bg-white">
                <div className="line-decoration"></div>
                <h2 className="font-serif text-4xl md:text-5xl text-black uppercase tracking-wide mb-6">Artisan<br/>Bouquets</h2>
                <p className="text-sm leading-relaxed text-black/70 mb-10">
                  Compose your floral arrangement paired with fine chocolates. Sharp presentation, pure emotion.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 font-sans">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black border-b border-black pb-2 block">Florals</label>
                    <div className="space-y-2">
                      {flowerOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => setFlower(opt.key)}
                          className={`w-full flex justify-between items-center p-3 text-xs uppercase tracking-[0.1em] border ${flower === opt.key ? 'border-black bg-black text-white' : 'border-black/20 hover:border-black text-black'} transition-colors rounded-none`}
                        >
                          <span>{opt.label}</span>
                          <span className={flower === opt.key ? 'opacity-80' : 'opacity-50'}>+{opt.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black border-b border-black pb-2 block">Chocolates</label>
                    <div className="space-y-2">
                      {chocolateOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => setChocolate(opt.key)}
                          className={`w-full flex justify-between items-center p-3 text-xs uppercase tracking-[0.1em] border ${chocolate === opt.key ? 'border-black bg-black text-white' : 'border-black/20 hover:border-black text-black'} transition-colors rounded-none`}
                        >
                          <span>{opt.label}</span>
                          <span className={chocolate === opt.key ? 'opacity-80' : 'opacity-50'}>+{opt.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black border-b border-black pb-2 block">Presentation</label>
                    <select
                      value={wrapper}
                      onChange={(e) => setWrapper(e.target.value)}
                      className="w-full border border-black bg-transparent px-4 py-3 text-sm focus:outline-none appearance-none rounded-none uppercase tracking-[0.1em] text-xs mb-2"
                    >
                      {wrapperOptions.map(opt => (
                        <option key={opt.key} value={opt.key}>{opt.label} (+{opt.price} AED)</option>
                      ))}
                    </select>
                    <select
                      value={ribbon}
                      onChange={(e) => setRibbon(e.target.value)}
                      className="w-full border border-black bg-transparent px-4 py-3 text-sm focus:outline-none appearance-none rounded-none uppercase tracking-[0.1em] text-xs"
                    >
                      {ribbonOptions.map(opt => (
                        <option key={opt.key} value={opt.key}>{opt.label} (+{opt.price} AED)</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black border-b border-black pb-2 block">Stationery</label>
                    <div className="grid grid-cols-2 gap-2">
                      {cardOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => setCard(opt.key)}
                          className={`p-3 text-[10px] uppercase tracking-[0.1em] border text-center ${card === opt.key ? 'border-black bg-black text-white' : 'border-black/20 hover:border-black text-black'} transition-colors rounded-none`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-[45%] p-8 md:p-12 lg:p-16 bg-black text-white flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 diag-pattern opacity-10"></div>
                <div className="relative z-10 flex justify-between items-start mb-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50">Composition</span>
                  <span className="text-sm font-semibold border-b border-white pb-1">{bouquetPrice} AED</span>
                </div>
                
                <div className="flex-grow flex items-center justify-center py-12 relative z-10">
                  <div className="w-56 h-72 border border-white/20 flex flex-col p-4 bg-black/40 backdrop-blur-sm">
                    <div className="flex-grow border border-white/40 mb-4 flex items-center justify-center p-4">
                       <span className="font-serif text-2xl text-center capitalize text-white">{flower} Floral</span>
                    </div>
                    {chocolate !== 'none' && (
                      <div className="h-16 border border-white/40 flex items-center justify-center bg-white/5 mb-4">
                         <span className="text-xs uppercase tracking-[0.1em] text-white">{chocolate}</span>
                      </div>
                    )}
                    <div className="mt-auto pt-4 border-t border-white/20 text-[8px] uppercase tracking-[0.2em] text-center text-white/50">
                      {wrapper} Wrap • {ribbon} Ribbon • {card} Card
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() =>
                    addItem({
                      id: "custom-bouquet",
                      name: `Artisan Bouquet: ${selectedFlower.label}`,
                      price: bouquetPrice,
                      quantity: 1,
                      variant: `Chocolates: ${selectedChocolate.label} | ${selectedWrapper.label}`,
                    })
                  }
                  className="relative z-10 w-full bg-white text-black px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white border border-white transition-colors duration-300 mt-8 flex justify-between items-center group rounded-none"
                >
                  <span>Confirm Arrangement</span>
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </button>
              </div>
            </div>
          </section>

          <section id="story" className="px-4 md:px-8 max-w-[1400px] mx-auto mt-24">
            <div className="border border-black">
              <div className="p-8 border-b border-black bg-black text-white">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold mb-2 block">Process</span>
                <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide">The Ritual</h2>
              </div>
              <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-black bg-white">
                {howItWorks.map((step, index) => (
                  <div key={step.step} className="p-6 md:p-8 hover:bg-black hover:text-white transition-colors duration-300 group">
                    <span className="text-[10px] font-semibold border border-black px-2 py-1 mb-6 inline-block group-hover:border-white transition-colors">{step.step}</span>
                    <h3 className="font-serif text-xl mb-3">{step.title}</h3>
                    <p className="text-xs leading-relaxed opacity-70 font-sans">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 md:px-8 max-w-[1400px] mx-auto mt-24 mb-24">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-black/50 font-semibold mb-2 block">Echoes</span>
                <h2 className="font-serif text-3xl md:text-4xl text-black uppercase tracking-wide">Clientele</h2>
                <p className="mt-6 text-sm text-black/60 font-sans max-w-sm leading-relaxed">Words from our discerning patrons across the globe, experiencing the pinnacle of Arabic gifting.</p>
              </div>
              <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
                {testimonials.slice(0, 2).map((item, i) => (
                  <div key={i} className="border border-black p-8 bg-white hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between">
                    <p className="text-sm italic font-serif leading-relaxed text-black/80 mb-8">"{item.quote}"</p>
                    <div className="border-t border-black/20 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em]">{item.name}</p>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-black/50 mt-1">{item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-12 border-t border-black bg-black text-white pt-16 overflow-hidden">
          <div className="px-4 md:px-8 max-w-[1400px] mx-auto pb-16 grid md:grid-cols-3 gap-12 border-b border-white/20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 font-semibold">Atelier</p>
              <p className="max-w-xs text-sm leading-relaxed text-white/70 font-sans">
                A sharp, modern intersection of Arabic hosting rituals and uncompromising presentation. Every detail considered, every edge defined.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 font-semibold">Navigation</p>
              <div className="space-y-3 text-sm text-white/80 font-sans">
                <Link href="#collections" className="block hover:text-white transition-colors hover:translate-x-1 duration-300 w-fit">Archive Collections</Link>
                <Link href="#customize" className="block hover:text-white transition-colors hover:translate-x-1 duration-300 w-fit">Bespoke Engraving</Link>
                <Link href="#bouquets" className="block hover:text-white transition-colors hover:translate-x-1 duration-300 w-fit">Artisan Bouquets</Link>
                <Link href="/cart" className="block hover:text-white transition-colors hover:translate-x-1 duration-300 w-fit">Atelier Cart</Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 font-semibold">Connect</p>
              <div className="space-y-3 text-sm text-white/80 font-sans">
                <p>studio@kaisaa.ae</p>
                <p>+971 4 000 0000</p>
                <p>Dubai Design District, UAE</p>
              </div>
            </div>
          </div>
          
          <div className="border-b border-white/20 py-4 bg-black overflow-hidden flex whitespace-nowrap">
            <div className="marquee-track flex-shrink-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center mx-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                  <span>Premium Engraving</span>
                  <span className="w-1.5 h-1.5 bg-white rotate-45 mx-6"></span>
                  <span>Artisan Floral Design</span>
                  <span className="w-1.5 h-1.5 bg-white rotate-45 mx-6"></span>
                  <span>Luxury Chocolates</span>
                  <span className="w-1.5 h-1.5 bg-white rotate-45 mx-6"></span>
                  <span>Worldwide Concierge</span>
                  <span className="w-1.5 h-1.5 bg-white rotate-45 mx-6"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative pt-16 pb-8 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col items-center justify-center">
            <h2 className="font-serif text-[18vw] leading-[0.75] tracking-tighter text-white select-none relative z-10" style={{ animation: 'shimmer-text 8s infinite ease-in-out' }}>
              KAISAA
            </h2>
            <div className="mt-12 flex w-full justify-between items-end relative z-20 text-[10px] uppercase tracking-[0.3em] text-white/40 font-sans">
              <span>© 2026 KAISAA.</span>
              <span>All Rights Reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}