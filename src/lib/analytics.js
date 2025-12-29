// src/lib/analytics.js

const GA4_ID = import.meta.env.VITE_GA4_ID;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID;

// Helper funkcija - check if demo path
const isDemoPath = () => {
  const path = window.location.pathname;
  return (
    path.startsWith("/demo") ||
    path.startsWith("/landing-page") ||
    path.startsWith("/app") ||
    path.startsWith("/homepage") ||
    path.startsWith("/profile") ||
    path.startsWith("/movies") ||
    path.startsWith("/discover") ||
    path.startsWith("/browse") ||
    path.startsWith("/settings") ||
    path.startsWith("/watchlater") ||
    path.startsWith("/watched") ||
    path.startsWith("/collections") ||
    path.startsWith("/watch-together")
  );
};

// Initialize all pixels/analytics
export const initAnalytics = () => {
  // Ne inicijaliziraj ako je demo path
  if (isDemoPath()) {
    return;
  }

  // Google Analytics 4
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA4_ID);

  // Meta Pixel (samo ako je definiran)
  if (META_PIXEL_ID) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
  }

  // TikTok Pixel (samo ako je definiran)
  if (TIKTOK_PIXEL_ID) {
    !(function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = (w[t] = w[t] || []);
      (ttq.methods = [
        "page",
        "track",
        "identify",
        "instances",
        "debug",
        "on",
        "off",
        "once",
        "ready",
        "alias",
        "group",
        "enableCookie",
        "disableCookie",
      ]),
        (ttq.setAndDefer = function (t, e) {
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        });
      for (var i = 0; i < ttq.methods.length; i++)
        ttq.setAndDefer(ttq, ttq.methods[i]);
      (ttq.instance = function (t) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
          ttq.setAndDefer(e, ttq.methods[n]);
        return e;
      }),
        (ttq.load = function (e, n) {
          var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
          (ttq._i = ttq._i || {}),
            (ttq._i[e] = []),
            (ttq._i[e]._u = i),
            (ttq._t = ttq._t || {}),
            (ttq._t[e] = +new Date()),
            (ttq._o = ttq._o || {}),
            (ttq._o[e] = n || {});
          var o = document.createElement("script");
          (o.type = "text/javascript"),
            (o.async = !0),
            (o.src = i + "?sdkid=" + e + "&lib=" + t);
          var a = document.getElementsByTagName("script")[0];
          a.parentNode.insertBefore(o, a);
        });

      ttq.load(TIKTOK_PIXEL_ID);
      ttq.page();
    })(window, document, "ttq");
  }
};

// Unified event tracking
export const trackEvent = (eventName, params = {}) => {
  // Ne prati ako je demo path
  if (isDemoPath()) return;

  // Google Analytics
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq("trackCustom", eventName, params);
  }

  // TikTok Pixel
  if (window.ttq) {
    window.ttq.track(eventName, params);
  }
};

// Specific events
export const trackWaitlistSignup = (source = "unknown") => {
  trackEvent("generate_lead", {
    source: source,
    form_type: "waitlist",
    value: 1,
  });
};

export const trackButtonClick = (buttonName) => {
  trackEvent("button_click", {
    button_name: buttonName,
  });
};
