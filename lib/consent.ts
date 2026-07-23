// Cookie consent + Google Consent Mode v2 client-side state. Loaded before
// any tracking script fires so denied-by-default (for opt-in jurisdictions)
// is the browser's starting state and tags only run after a user choice is
// stored.

export type Category = 'necessary' | 'analytics' | 'marketing';

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export const CONSENT_COOKIE = 'bmg_consent';
export const CONSENT_VERSION = '1.0';
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

declare global {
  interface Window {
    __consent?: ConsentState | null;
    __consentGeo?: { euLike: boolean; gpc: boolean; tz: string };
  }
}

export function readConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie
    .split('; ')
    .find((row) => row.startsWith(CONSENT_COOKIE + '='));
  if (!raw) return null;
  try {
    const value = decodeURIComponent(raw.split('=')[1] || '');
    const parsed = JSON.parse(value) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean, marketing: boolean): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics,
    marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  if (typeof document !== 'undefined') {
    document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(state))}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax; Secure`;
    updateGoogleConsentMode(state);
    window.dispatchEvent(new CustomEvent('consent:change', { detail: state }));
  }
  return state;
}

export function updateGoogleConsentMode(state: ConsentState): void {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
  const payload = {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied',
  };
  if (typeof w.gtag !== 'function') {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push('consent', 'update', payload);
    return;
  }
  w.gtag('consent', 'update', payload);
}

export function defaultConsentSnippet(): string {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var __tz = '';
try { __tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch(e) {}
var __euLike = /^(Europe|Atlantic\\/(Azores|Canary|Faroe|Madeira|Reykjavik)|Africa\\/Ceuta)/.test(__tz);
var __gpc = false;
try { __gpc = navigator.globalPrivacyControl === true; } catch(e) {}
var __def = (__euLike || __gpc) ? 'denied' : 'granted';
gtag('consent', 'default', {
  analytics_storage: __def,
  ad_storage: __def,
  ad_user_data: __def,
  ad_personalization: __def,
  security_storage: 'granted',
  wait_for_update: 500
});
window.__consentGeo = { euLike: __euLike, gpc: __gpc, tz: __tz };
try {
  var raw = document.cookie.split('; ').find(function(r){return r.indexOf('${CONSENT_COOKIE}=') === 0;});
  if (raw) {
    var s = JSON.parse(decodeURIComponent(raw.split('=')[1] || ''));
    if (s && s.version === '${CONSENT_VERSION}') {
      gtag('consent', 'update', {
        analytics_storage: s.analytics ? 'granted' : 'denied',
        ad_storage: s.marketing ? 'granted' : 'denied',
        ad_user_data: s.marketing ? 'granted' : 'denied',
        ad_personalization: s.marketing ? 'granted' : 'denied'
      });
      window.__consent = s;
    }
  }
} catch (e) {}
`.trim();
}

export function isOptInJurisdiction(): boolean {
  if (typeof window === 'undefined') return false;
  const g = window.__consentGeo;
  return g ? g.euLike || g.gpc : false;
}

export function isConsented(category: Exclude<Category, 'necessary'>): boolean {
  const state = readConsent();
  if (!state) return false;
  return state[category] === true;
}
