window.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (event) {
    var toggler = event.target.closest("[data-nano-trigger=\"navbar\"]");
    if (toggler) {
      var nav = toggler.nextElementSibling;
      if (nav && nav.classList.contains("nano-navbar__nav")) {
        nav.classList.toggle("nano-navbar__nav--open");
        return;
      }
    }
    var link = event.target.closest(".nano-navbar__nav .nano-navbar__link");
    if (link) {
      var openNav = link.closest(".nano-navbar__nav.nano-navbar__nav--open");
      if (openNav) openNav.classList.remove("nano-navbar__nav--open");
    }
  });
});
