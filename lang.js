// Dil seçimi: ?lang=tr|en > kayıtlı tercih > tarayıcı dili. Mağaza kayıtlarındaki İngilizce bağlantılar ?lang=en kullanır.
(function () {
  var lang = (navigator.language || "tr").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  try { var saved = localStorage.getItem("puzzmaca_web_lang"); if (saved === "tr" || saved === "en") lang = saved; } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  if (q === "tr" || q === "en") lang = q;

  function apply(l) {
    document.documentElement.lang = l;
    document.querySelectorAll("[data-lang-block]").forEach(function (el) { el.hidden = el.getAttribute("data-lang-block") !== l; });
    document.querySelectorAll("[data-tr]").forEach(function (el) { el.textContent = el.getAttribute(l === "en" ? "data-en" : "data-tr"); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-set") === l); });
    var t = document.querySelector("title");
    if (t && t.getAttribute("data-en")) t.textContent = t.getAttribute(l === "en" ? "data-en" : "data-tr");
    try { localStorage.setItem("puzzmaca_web_lang", l); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-set")); });
    });
    apply(lang);
  });
})();
