(function () {
    function copyCode(btn) {
        var block = btn.closest(".nano-code-block");
        if (!block) return;
        var target = block.querySelector("pre.nano-pre, samp.nano-samp");
        if (!target) return;
        var text = target.textContent || "";
        var label = btn.getAttribute("aria-label") || btn.textContent;
        navigator.clipboard.writeText(text).then(function () {
            var orig = btn.textContent;
            btn.textContent = "Copied!";
            btn.setAttribute("aria-label", "Copied!");
            setTimeout(function () {
                btn.textContent = orig;
                btn.setAttribute("aria-label", label);
            }, 1500);
        });
    }
    function init() {
        document.querySelectorAll("[data-nano-trigger=\"copy-code\"]").forEach(function (btn) {
            if (btn._nanoCopyCode) return;
            btn._nanoCopyCode = true;
            btn.addEventListener("click", function () { copyCode(btn); });
        });
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
