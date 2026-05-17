(function () {
  var cfg = window.LETA_CONTACT || {};
  var propertyId = (cfg.tawkPropertyId || "").trim();
  if (!propertyId) return;

  var widgetId = (cfg.tawkWidgetId || "default").trim() || "default";

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  window.Tawk_API.customStyle = {
    visibility: {
      desktop: {
        position: "br",
        xOffset: 16,
        yOffset: 16,
      },
      mobile: {
        position: "br",
        xOffset: 12,
        yOffset: 12,
      },
    },
    zIndex: 2147483640,
  };

  window.LetaOpenLiveChat = function () {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
      return true;
    }
    return false;
  };

  var s1 = document.createElement("script");
  var s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/" + encodeURIComponent(propertyId) + "/" + encodeURIComponent(widgetId);
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
