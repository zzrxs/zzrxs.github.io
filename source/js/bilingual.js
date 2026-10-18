(() => {
  const STORAGE_KEY = "bilingual-display-mode";
  const VALID_MODES = ["en", "zh", "both"];
  const DEFAULT_MODE = "both";

  function initializeBilingualArticles() {
    document.querySelectorAll(".markdown-body").forEach((article) => {
      if (!article.querySelector(".bi-pair")) {
        return;
      }

      if (article.querySelector(".bi-toolbar")) {
        return;
      }

      const toolbar = document.createElement("div");
      toolbar.className = "bi-toolbar";
      toolbar.setAttribute("role", "group");
      toolbar.setAttribute("aria-label", "Language display mode");

      const modes = [
        { value: "en", label: "English" },
        { value: "zh", label: "中文" },
        { value: "both", label: "中英对照" }
      ];

      modes.forEach(({ value, label }) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "bi-mode-button";
        button.dataset.mode = value;
        button.textContent = label;

        toolbar.appendChild(button);
      });

      article.prepend(toolbar);

      function setMode(mode) {
        if (!VALID_MODES.includes(mode)) {
          mode = DEFAULT_MODE;
        }

        article.dataset.biMode = mode;

        toolbar.querySelectorAll(".bi-mode-button").forEach((button) => {
          const active = button.dataset.mode === mode;

          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", String(active));
        });

        try {
          localStorage.setItem(STORAGE_KEY, mode);
        } catch {
          // The page still works when localStorage is unavailable.
        }
      }

      toolbar.addEventListener("click", (event) => {
        const button = event.target.closest(".bi-mode-button");

        if (button) {
          setMode(button.dataset.mode);
        }
      });

      let initialMode = DEFAULT_MODE;

      try {
        const savedMode = localStorage.getItem(STORAGE_KEY);

        if (VALID_MODES.includes(savedMode)) {
          initialMode = savedMode;
        }
      } catch {
        // Use the default mode.
      }

      setMode(initialMode);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeBilingualArticles
    );
  } else {
    initializeBilingualArticles();
  }
})();