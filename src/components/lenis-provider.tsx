"use client";

import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, wheelMultiplier: 1, touchMultiplier: 1.5 }}>
      {children}
    </ReactLenis>
  );
}
