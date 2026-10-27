# Optional quiz result submission

## Setup status — 27 October 2026

- The result Worker is deployed at
  `https://mr-d-quiz-results.sebd469.workers.dev` with an EU D1 database,
  initialized results table, rate limiter, allowed site origins, encrypted
  teacher access key and Turnstile secret. Application logging is disabled.
- A daily maintenance trigger runs at 03:00 UTC. A managed Turnstile widget
  was created for the maths domain.
- The teacher notification destination was added and verified. Its Verified
  status was confirmed in the Cloudflare dashboard.
  The teacher changed the Namecheap nameservers to Cloudflare's assigned pair,
  and Cloudflare confirmed the domain active. Free Email Routing is enabled
  with generated MX/SPF/DKIM records replacing the unused Namecheap mail
  records. The website's A/CNAME records remain DNS only and point to GitHub
  Pages. See `docs/quiz-results-dns-plan.md`.
- The EMAIL binding and encrypted sender/recipient settings are configured.
  A protected setup test email was accepted and its receipt confirmed by the
  teacher. No paid plan was purchased.
- A real ten-question quiz was completed in a local browser preview using
  actual Turnstile verification and the deployed service. Exactly one fictional
  result with 3 correct out of 10 was saved and exported through the protected
  CSV endpoint. The teacher confirmed receipt of the matching notification.
  Temporary localhost access was removed after the test. The fictional row was
  removed and a database count confirmed zero matching setup-test rows remain.
- Forty backend regression checks passed, covering submission validation,
  private exports, protected email diagnostics, retries and retention. The
  SQLite constraints, quiz script syntax, unchanged question arrays, relative
  asset links and retained analytics tags were also checked.
- Live HTTP checks passed: unauthenticated export 401, authenticated empty CSV
  export 200, wrong-origin submission 403 and incomplete submission 400.
- The teacher approved publication across all 15 current quizzes on
  27 October 2026: "ok publish so I can test it online". The release includes
  the local-preview explanation and narrow-screen layout fix. Deployment and
  public-page verification follow the approved commit/push.

The actual database ID is retained in the ignored local
`cloudflare/quiz-results/wrangler.jsonc`. The generated teacher access key and
Turnstile secret are in the ignored, owner-readable `.dev.vars` beside it.
Store the teacher key in a password manager before activating the feature.
The private teacher download page is `/teacher` on the Worker address.

## Student experience

The 15 active quizzes have a shared optional form at the end of the page.
Students check all questions, enter their name and class and press **Send result
to Mr D**. They stay on the quiz page. The quiz remains usable anonymously.
Nothing is sent automatically. Identity fields are held in memory, not browser
storage, and are cleared on reset. A submission contains the name, class, quiz
path, correct count, attempted count, total and random attempt reference. The
server assigns its own UTC timestamp and canonical quiz title.

`assets/quiz-results-config.js` now contains the tested service endpoint and
public widget key, ready for the reviewed release. Leaving the endpoint blank
disables the form for future maintenance without affecting anonymous practice.

Local files and other preview origins show a local-preview explanation instead
of attempting Cloudflare verification. Name/class entry and sending are
disabled there; quiz practice, scores and reset continue to work. Real sending
is enabled only on HTTPS at `mr-d-maths.com` or `www.mr-d-maths.com`. Turnstile
does not support `file://`; use the published quiz for actual submissions.
The local guard also prevents localhost previews from showing a misleading
connection error after temporary integration-test access has been removed.

## Components

- `assets/quiz-results.js` and `.css`: accessible form, bot verification, score
  display, send/retry confirmation and reset handling.
- `templates/quiz-page.template.html`: common score/reset hooks and asset links.
  `scripts/render-quiz.py` calculates relative asset paths at render time.
- `cloudflare/quiz-results/worker.mjs`: submission endpoint, validation,
  notifications, protected CSV export and scheduled maintenance.
- `cloudflare/quiz-results/schema.sql`: private D1 table; no public read API.
- `cloudflare/quiz-results/quizzes.mjs`: quiz paths, titles and totals only.
  Rebuild with `python3 scripts/build-results-registry.py` when quizzes change.
- `cloudflare/quiz-results/teacher.mjs`: teacher access-key form at `/teacher`.
  The key is used in an Authorization header and cleared from the input. It is
  never stored in browser storage, placed in a URL or embedded in public code.

## Cloudflare setup

Keep the existing GitHub Pages hosting. The result service can use a separate
Cloudflare `workers.dev` address. Do not change public site DNS just to host it.
Use the Workers Free plan and D1 free allowance; do not enable paid upgrades.

Using current Node.js and Wrangler 4.36 or later, from
`cloudflare/quiz-results/`:

```sh
npx wrangler login
cp wrangler.example.jsonc wrangler.jsonc
npx wrangler d1 create mr-d-quiz-results --jurisdiction=eu
```

If the database was already created in the dashboard, reuse it rather than
creating another one. Copy its actual ID and EU jurisdiction into the private
`wrangler.jsonc` D1 binding (add `"jurisdiction": "eu"`), then initialise it:

```sh
npx wrangler d1 execute mr-d-quiz-results --remote --jurisdiction=eu --file=schema.sql
```

Create a **managed Turnstile widget** allowing `www.mr-d-maths.com` and
`mr-d-maths.com`. Put its public site key in the frontend configuration later.
Put the secret only in the Worker:

```sh
npx wrangler secret put TURNSTILE_SECRET
npx wrangler secret put ADMIN_TOKEN
```

Generate a random teacher access key of at least 32 characters, save it in a
password manager and set it as `ADMIN_TOKEN`. Use the dashboard secrets UI or
interactive commands; never paste secrets into Git, screenshots or chat.

### Notification email prerequisite

Web Analytics alone does not enable email. Cloudflare requires an onboarded
Email Service sending domain and a verified teacher destination. The account
initially inspected on 27 October 2026 had no domain added. Domain/DNS onboarding
has now been completed for this installation. For a fresh installation,
preserve existing website and email records. Do not replace MX records used by
an existing mailbox service.

The previous authoritative nameservers were Namecheap's
`dns1.registrar-servers.com` and `dns2.registrar-servers.com`. Initial public DNS showed
the four GitHub Pages A records (`185.199.108.153` through `185.199.111.153`),
`www` pointing to `sebd469.github.io`, and Namecheap forwarding MX/SPF records.
[Cloudflare Email Service requires Cloudflare DNS](https://developers.cloudflare.com/email-service/get-started/send-emails/).
[Namecheap forwarding stops on custom nameservers](https://www.namecheap.com/support/api/methods/domains-dns/),
so preserve or explicitly retire any forwarding addresses before switching.
The teacher confirmed that no domain email addresses were used and performed
the nameserver switch. The paid Email Sending dashboard
is not needed for sends restricted to a verified destination through Email
Routing; do not purchase Workers Paid for this setup.

Once the sending domain is configured and the teacher has verified their
destination address, enable the `EMAIL` send-email binding in the private
Wrangler configuration. Set addresses using secrets:

```sh
npx wrangler secret put NOTIFY_FROM
npx wrangler secret put NOTIFY_TO
npx wrangler deploy --config wrangler.jsonc
```

`NOTIFY_FROM` must belong to the onboarded domain. `NOTIFY_TO` must be the
teacher's verified destination. Neither belongs in public source files.
Sending to verified destination addresses is free according to the current
[Cloudflare email pricing](https://developers.cloudflare.com/email-service/platform/pricing/).
The code uses the documented
[structured send-email binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).

The service saves results before starting a notification. A mail failure does
not discard the result. The daily job retries up to three total attempts per
result, at most 50 pending notifications per run. A rare interruption after
sending but before recording success can cause a duplicate email. The CSV's
`notified` field means accepted by the sending service, not confirmed inbox
delivery. Without configured email, results remain saved with `notified = 0`.

The protected teacher page also offers **Send a test notification**. It uses
the same access key and a fixed recipient configured privately in Cloudflare;
no pupil data is included. A successful response means the mail service
accepted the message. Confirm inbox receipt separately.

## Activation and release

1. Deploy the Worker with the D1, Turnstile and rate-limit bindings, secrets and
   daily cron. Inspect its deployed configuration; dashboard changes and
   Wrangler configuration must agree.
2. Test with a fictional pupil: save a result, confirm its single database row,
   receive the notification, and download it through `/teacher` using the key.
   Confirm unauthenticated `/api/export` returns 401 and wrong-origin
   submissions fail. Never test with real pupil data.
3. Set `endpoint` to the actual deployed `https://…/api/results` URL and
   `turnstileSiteKey` to the public widget key in
   `assets/quiz-results-config.js`.
4. Obtain the requested release approval under `AGENTS.md`, commit only the
   related code/docs and public assets, then publish to the existing GitHub
   Pages branch. Keep private configs, exports and unrelated files out.
5. Test a live quiz: incomplete quiz cannot send, blank identity cannot send,
   correct score is included, only an explicit Send submits, confirmation is
   shown after save, repeat clicks are disabled, failure allows retry, and reset
   clears identity and score. Confirm Cloudflare Analytics remains present.

Initial interaction tests used a simulated widget and HTTP receiver. The final
integration test used real Turnstile verification, live Cloudflare storage and
email, and the protected CSV export. Public GitHub Pages checks remain pending
until the frontend release is approved and published.

## Privacy and maintenance

Records in the new database are deleted after 90 days by the daily job. Email
copies and downloaded files are separate copies for the teacher to manage.
Cloudflare backups/Time Travel may retain deleted data within their configured
recovery window; the 90-day rule refers to the active database table.
No pupil identity is included in analytics events, application log messages or
the public repository. Cloudflare still handles network metadata as part of
providing its service. CSV cells are escaped to prevent spreadsheet formulas.
Browser scores and self-entered identities are unverified practice records.

Run backend regression tests with Node.js:

```sh
node --input-type=module -e "import('./tests/quiz-results.test.mjs').then(async m => console.log(await m.runTests()))"
```

The tests use fictional data and fake D1/email bindings. Check the SQL schema
with SQLite as well; repeat deployed integration checks after configuration
changes. The public quiz registry must match actual quiz titles and totals.
