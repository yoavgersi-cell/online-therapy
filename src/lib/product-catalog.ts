// ───── The product catalog ─────
// Ecommerce-style product entries for the shopping carousel. Prices are the
// same verified figures as the price index (one source of truth for numbers,
// this file adds the product framing + images). Images are provider-published
// product creatives supplied by the site operator - never generated. A null
// image renders the provider-logo tile fallback; never invent a product shot.

export type CatalogProduct = {
  id: string;
  providerId: string;
  /** Shopping-card product title, e.g. "Compounded Semaglutide Injection". */
  name: string;
  medication: "semaglutide" | "tirzepatide";
  format: "injection" | "drops" | "tablet";
  /** Headline monthly price, digits only after $ (used for sorting + schema). */
  price: string;
  /** Struck-through regular price when the headline is promotional. */
  regularPrice?: string;
  /** The honest condition attached to the price. */
  priceNote: string;
  shipping: string;
  image: string | null;
};

// Empty on this single-vertical build. The shopping carousel renders only
// from real, operator-supplied product creatives with verified prices; there
// are none for therapy platforms, so the catalog is empty and every ProductCarousel
// renders nothing (items.length === 0 -> null). Add an entry here only with a
// real product image and a verified price.
export const PRODUCT_CATALOG: CatalogProduct[] = [];

/** Numeric value for sorting ("from $179" → 179). */
export function productPriceValue(p: CatalogProduct): number {
  return Number(p.price.replace(/[^0-9]/g, "")) || 9999;
}
