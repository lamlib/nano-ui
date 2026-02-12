(function () {
    function init() {
        document.querySelectorAll("[data-nano-trigger=\"accordion\"]").forEach(function (btn) {
            if (btn._nanoAccordion) return;
            btn._nanoAccordion = true;
            btn.addEventListener("click", function () {
                var item = btn.closest(".nano-accordion__item");
                if (!item) return;
                var container = item.closest("[data-nano-accordion]");
                var isGroup = container && container.getAttribute("data-nano-accordion") === "group";
                if (isGroup) {
                    (container.querySelectorAll(".nano-accordion__item") || []).forEach(function (other) {
                        if (other !== item) other.classList.remove("nano-accordion__item--open");
                    });
                }
                item.classList.toggle("nano-accordion__item--open");
                btn.setAttribute("aria-expanded", item.classList.contains("nano-accordion__item--open"));
            });
        });
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
