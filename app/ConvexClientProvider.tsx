"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// جلب العنوان من الـ environment variable
const address = process.env.NEXT_PUBLIC_CONVEX_URL;

// حماية إضافية لو المتغير مش موجود
if (!address) {
  throw new Error(
    "❌ NEXT_PUBLIC_CONVEX_URL is not defined. تأكد من إضافة المتغير داخل Vercel Environment Variables."
  );
}

// إنشاء عميل Convex
const convex = new ConvexReactClient(address);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
