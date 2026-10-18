(() => {
  const PASSWORD_HASH = "f48ade059deb8df96530de475610ba59333547de84853d13c17031b6ee2c921e";
  const SESSION_KEY = "blog-unlocked-v1";

  function isUnlocked() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      return false;
    }
  }

  function rememberUnlock() {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // sessionStorage 不可用时，本次页面仍然可以解锁。
    }
  }

  async function sha256(value) {
    const data = new TextEncoder().encode(value.normalize("NFKC"));
    const digest = await crypto.subtle.digest("SHA-256", data);

    return [...new Uint8Array(digest)]
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function unlock(overlay) {
    rememberUnlock();
    document.documentElement.classList.remove("blog-is-locked");
    overlay.remove();
  }

  function createLockScreen() {
    if (isUnlocked()) {
      return;
    }

    document.documentElement.classList.add("blog-is-locked");

    const overlay = document.createElement("div");
    overlay.className = "blog-lock";
    overlay.innerHTML = `
        <main class="blog-lock__card" aria-labelledby="blog-lock-title">
            <img
            class="blog-lock__avatar"
            src="/img/avatar.jpg"
            alt=""
            width="64"
            height="64"
            >

            <p class="blog-lock__eyebrow">XNSNZTB</p>
            <h1 id="blog-lock-title">Welcome Back</h1>

            <p class="blog-lock__description">
            Please enter the password to continue.
            </p>

            <form class="blog-lock__form">
            <label for="blog-lock-password">Password</label>

            <div class="blog-lock__input-row">
                <input
                id="blog-lock-password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Enter password"
                required
                >
                <button type="submit">Continue</button>
            </div>

            <p class="blog-lock__message" aria-live="polite"></p>
            </form>
        </main>
        `;

    document.body.appendChild(overlay);

    const form = overlay.querySelector(".blog-lock__form");
    const input = overlay.querySelector("#blog-lock-password");
    const message = overlay.querySelector(".blog-lock__message");
    const button = overlay.querySelector("button");

    input.focus();

    form.addEventListener("submit", async event => {
      event.preventDefault();

      button.disabled = true;
      message.textContent = "Verifying…";
      message.classList.remove("is-error");

      try {
        const inputHash = await sha256(input.value);

        if (inputHash === PASSWORD_HASH) {
          unlock(overlay);
          return;
        }

        message.textContent = "Incorrect password. Please try again.";
        message.classList.add("is-error");
        input.value = "";
        input.focus();
      } catch {
        message.textContent = "Unable to verify the password. Please use a modern browser.";
        message.classList.add("is-error");
      } finally {
        button.disabled = false;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createLockScreen);
  } else {
    createLockScreen();
  }
})();