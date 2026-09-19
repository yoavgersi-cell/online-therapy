// Mobile promo-popup registry. Each entry ties a provider to a full-bleed
// creative that appears once per session on comparison pages where that
// provider is featured. Kept in code (not the blob CMS) so it ships and
// resolves without a config round-trip; the resolver below is the single place
// that decides which popup wins when a page features more than one.
//
// `priority` breaks ties: when two featured providers both have a popup (e.g.
// TrimRx vs. Embody), the higher priority shows and the other is suppressed -
// so TrimRx's popup appears on every TrimRx comparison EXCEPT against Embody.
export interface PromoPopupTimer {
  // Evergreen countdown seconds at load; ticks down live from here each session.
  startSeconds: number;
  // Left offsets (% of image width) of the dd/hh/mm/ss boxes, plus their shared
  // top/size/fill - measured against the creative so they overlay its printed
  // timer exactly.
  boxes: { left: string }[];
  top: string;
  width: string;
  height: string;
  background: string;
  // Digit size override - the mobile default scales with vw against a 430px
  // card; landscape desktop creatives render wider and need their own clamp.
  fontSize?: string;
}

export interface PromoPopupSpec {
  providerId: string;
  providerName: string;
  image: string;
  alt: string;
  priority: number;
  timer?: PromoPopupTimer;
  // Optional landscape creative for sm+ screens. Without one the popup stays
  // mobile-only, exactly as before. Timer coordinates are per-creative.
  desktop?: { image: string; timer?: PromoPopupTimer };
}

// Empty on this single-vertical build - no code-default promo creatives.
// Each provider drives its own popup from config (provider.promoPopup) when
// set; add a code default here only with a real, operator-supplied creative.
export const PROMO_POPUPS: PromoPopupSpec[] = [];

// Minimal provider shape the resolver needs - id, name, and the CMS popup
// control. Kept local so this module doesn't depend on the full config type.
export interface PromoPopupProvider {
  id: string;
  name: string;
  promoPopup?: {
    enabled: boolean;
    image?: string;
    alt?: string;
    priority?: number;
  };
}

// Highest-priority popup among the providers featured on the current page, or
// null when none of them has one. Each provider's popup comes from the CMS
// (provider.promoPopup) when set, otherwise the code default in PROMO_POPUPS -
// so a CMS entry can turn a popup on/off or swap its creative, while the timer
// (an advanced, per-creative overlay) always stays code-defined by provider id.
export function resolvePromoPopup(providers: PromoPopupProvider[]): PromoPopupSpec | null {
  const candidates: PromoPopupSpec[] = [];

  for (const p of providers) {
    const codeSpec = PROMO_POPUPS.find((s) => s.providerId === p.id);
    const cms = p.promoPopup;

    if (cms) {
      if (!cms.enabled) continue; // CMS explicitly turned this popup off
      const image = cms.image || codeSpec?.image;
      if (!image) continue; // enabled but no creative to show
      candidates.push({
        providerId: p.id,
        providerName: codeSpec?.providerName ?? p.name,
        image,
        alt: cms.alt ?? codeSpec?.alt ?? p.name,
        priority: cms.priority ?? codeSpec?.priority ?? 1,
        timer: codeSpec?.timer,
        // Desktop creative only applies when the CMS didn't swap the mobile
        // image for a different one (mismatched creatives would look broken).
        desktop: cms.image && cms.image !== codeSpec?.image ? undefined : codeSpec?.desktop,
      });
    } else if (codeSpec) {
      candidates.push(codeSpec); // no CMS entry → code default
    }
  }

  if (candidates.length === 0) return null;
  return candidates.sort((a, b) => b.priority - a.priority)[0];
}
