/* Optional result submission. Names and classes stay in memory until Send is pressed. */
(() => {
  "use strict";
  const config = window.MR_D_RESULTS_CONFIG;
  if (!config?.endpoint || !config?.turnstileSiteKey) return;
  const endpoint = new URL(config.endpoint);
  if (endpoint.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(endpoint.hostname)) return;
  if (typeof window.getQuizResult !== "function") return;
  const section = document.createElement("section");
  section.className = "quiz-results";
  section.setAttribute("aria-labelledby", "quiz-results-title");
  section.innerHTML = `
    <h2 id="quiz-results-title">Send your result to Mr D <small>Optional</small></h2>
    <p>You can use this quiz without sending a result.</p>
    <p data-result-summary aria-live="polite"></p>
    <form>
      <label>Name<input name="studentName" maxlength="80" required autocomplete="off"></label>
      <label>Class<input name="studentClass" maxlength="40" required autocomplete="off" placeholder="For example, 6iec4"></label>
      <small>Pressing Send shares your name, class, quiz title and score privately with Mr D using Cloudflare. Results are kept for 90 days; Mr D may retain downloaded copies and notification emails.</small>
      <div data-result-verification></div>
      <button type="submit" disabled>Send result to Mr D</button>
    </form>
    <p class="quiz-results-status" role="status" aria-live="polite"></p>`;
  document.querySelector("main").appendChild(section);
  const form = section.querySelector("form");
  const button = section.querySelector("button");
  const status = section.querySelector('[role="status"]');
  const summary = section.querySelector("[data-result-summary]");
  // Turnstile does not support file://, and the live service intentionally
  // accepts only the production website. Keep local quiz practice usable.
  const localPreview = location.protocol !== "https:" ||
    !["www.mr-d-maths.com", "mr-d-maths.com"].includes(location.hostname);
  const previewMessage = "Local preview: sending results is disabled here. It will be available on the published quiz at mr-d-maths.com. You can still complete the quiz and view your score.";
  let attemptId = localPreview ? "" : crypto.randomUUID();
  let widgetId;
  let token = "";
  let sending = false;
  let sent = false;
  let generation = 0;
  let ready = false;
  let lastPayload = "";
  function refresh() {
    const result = window.getQuizResult();
    ready = result.total > 0 && result.attempted === result.total;
    summary.textContent = ready
      ? `Your score: ${result.correct} / ${result.total}.`
      : `Check every question to send your final result (${result.attempted} / ${result.total} checked).`;
    button.disabled = localPreview || !ready || !token || sending || sent;
    form.elements.studentName.disabled = localPreview || sending || sent;
    form.elements.studentClass.disabled = localPreview || sending || sent;
  }
  async function loadVerification() {
    if (!window.turnstile) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    widgetId = window.turnstile.render(section.querySelector("[data-result-verification]"), {
      sitekey: config.turnstileSiteKey,
      action: "quiz-result",
      size: section.clientWidth < 380 ? "compact" : "flexible",
      callback(value) { token = value; refresh(); },
      "expired-callback"() { token = ""; refresh(); },
      "error-callback"() { token = ""; status.textContent = "Verification could not load. Check your connection and reload to try again."; refresh(); }
    });
  }
  // Load bot protection only when the optional form is approached.
  if (localPreview) {
    status.textContent = previewMessage;
  } else {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      loadVerification().catch(() => {
        status.textContent = "Verification could not load. Check your connection and reload to try again.";
      });
    }, { rootMargin: "200px" });
    observer.observe(section);
  }
  document.addEventListener("quiz-score-change", refresh);
  document.addEventListener("quiz-reset", () => {
    generation += 1;
    attemptId = localPreview ? "" : crypto.randomUUID();
    lastPayload = "";
    sending = false;
    sent = false;
    token = "";
    form.reset();
    status.textContent = localPreview ? previewMessage : "";
    if (widgetId !== undefined) window.turnstile.reset(widgetId);
    refresh();
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    refresh();
    if (button.disabled || !form.reportValidity()) return;
    const studentName = form.elements.studentName.value.trim();
    const studentClass = form.elements.studentClass.value.trim();
    if (!studentName || !studentClass) {
      status.textContent = "Please enter your name and class.";
      return;
    }
    const thisGeneration = generation;
    const result = window.getQuizResult();
    const signature = JSON.stringify({ ...result, studentName, studentClass });
    if (lastPayload && lastPayload !== signature) attemptId = crypto.randomUUID();
    lastPayload = signature;
    const body = { ...result, id: attemptId, studentName, studentClass, turnstileToken: token };
    sending = true;
    status.textContent = "Sending your result…";
    refresh();
    try {
      const response = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "omit", referrerPolicy: "no-referrer",
        body: JSON.stringify(body), signal: AbortSignal.timeout(20000)
      });
      const data = await response.json();
      if (!response.ok || data.saved !== true) throw new Error("Submission failed");
      if (generation !== thisGeneration) return;
      sent = true;
      status.textContent = "Your result has been sent to Mr D. Thank you!";
    } catch {
      if (generation !== thisGeneration) return;
      status.textContent = "We could not confirm your result was sent. Please check your connection and try again.";
      token = "";
      if (widgetId !== undefined) window.turnstile.reset(widgetId);
    } finally {
      if (generation === thisGeneration) { sending = false; refresh(); }
    }
  });
  refresh();
})();
