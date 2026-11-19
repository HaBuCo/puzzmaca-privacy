// Dil seçimi: ?lang=tr|en|es > kayıtlı tercih > tarayıcı dili (tr → Türkçe, es → Español, diğerleri → English).
// Mağaza kayıtlarındaki bağlantılar ?lang=en / ?lang=es kullanır. Bir öğenin o dilde metni yoksa İngilizcesi gösterilir.
(function () {
  var LANGS = ["tr", "en", "es"];
  var nav = (navigator.language || "tr").toLowerCase().slice(0, 2);
  var lang = LANGS.indexOf(nav) >= 0 ? nav : "en";
  try { var saved = localStorage.getItem("puzzmaca_web_lang"); if (LANGS.indexOf(saved) >= 0) lang = saved; } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  if (LANGS.indexOf(q) >= 0) lang = q;

  function text(el, l) { return el.getAttribute("data-" + l) || el.getAttribute("data-en") || el.getAttribute("data-tr"); }
  function apply(l) {
    // sayfada o dilin bloğu yoksa İngilizce gösterilir
    var hasBlock = document.querySelector('[data-lang-block="' + l + '"]');
    var block = hasBlock || !document.querySelector("[data-lang-block]") ? l : "en";
    document.documentElement.lang = l;
    document.querySelectorAll("[data-lang-block]").forEach(function (el) { el.hidden = el.getAttribute("data-lang-block") !== block; });
    document.querySelectorAll("[data-tr]").forEach(function (el) { el.textContent = text(el, l); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-set") === l); });
    var t = document.querySelector("title");
    if (t && t.getAttribute("data-en")) t.textContent = text(t, l);
    try { localStorage.setItem("puzzmaca_web_lang", l); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-set")); });
    });
    apply(lang);
  });
})();
