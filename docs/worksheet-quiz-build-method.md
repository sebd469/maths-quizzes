# Building a quiz from supplied textbook or worksheet sources

Use this method with `AGENTS.md`, `prompts/01-create-quiz.md`,
`prompts/02-review-quiz.md` and `docs/quiz-template-reference.md`. Reuse the
existing extraction helper, data validator, page template and renderer rather
than creating another copy of the quiz behaviour.

For 2iec, read `docs/2iec-source-reference.md`: Mechanics uses the Edexcel M1
book with its Solutionbank, and Pure uses Solomon Press worksheets with their
worked answers. The workflow filename is retained for compatibility; this
method applies to both textbooks and worksheets.

## 1. Establish the exact scope and sources

Record the class, subject, source family, chapter or topic, quiz title,
textbook chapter or worksheet, exercise and part
range. Inspect the existing menus and reuse their folder names. Do not include
neighbouring exercises merely because they share the same page.

Keep shared source PDFs under `Source Files/<class>/<topic>/`; do not copy them
into public quiz folders or move them into each quiz's source folder. Record
the question PDF and answer PDF, their one-based PDF page numbers and any
printed answer-page label. Do not confuse a printed page label with the PDF
page number.

When only a question count is specified, choose a spread across the entire
exercise, including later harder problems, rather than taking the first items.
Record the exact selection and difficulty rationale. Multipart source questions
may remain single scored cards with complete-answer choices; state that choice
explicitly and preserve all parts. For the mechanics example and modelling
checks, see `docs/mechanics-quiz-build-notes.md`.

## 2. Extract, then visually verify

Use the existing helper and an external scratch directory so extracted source
text does not become part of the static website or a future quiz commit:

```sh
scratch=$(mktemp -d /tmp/maths-quiz-review.XXXXXX)
scripts/extract-pdf-text.sh "Source Files/<class>/<topic>/questions.pdf" "$scratch/questions.txt"
scripts/extract-pdf-text.sh "Source Files/<class>/<topic>/answers.pdf" "$scratch/answers.txt"
```

Locate the exact worksheet heading and exercise. Render the relevant PDF pages
locally, for example with `pdftoppm`, and compare them with the extraction.
Pay particular attention to fraction bars, denominators, superscripts, signs
and bracket grouping. An extracted `32` may actually mean `3/2`; it is not
safe to guess. Never modify source PDFs.

## 3. Author and independently verify the data

Copy `templates/quiz-data.template.json` into
`<class>/<topic>/<quiz name>/quiz-data.json`. Supply `title`, `course`, `topic`,
plain-text `instructions`, `source_reference` and a draft `review_status`.
Use stable question IDs and retain source labels such as `6(a)` through `6(l)`.
Each `source_ref` must identify the matching question and worked-answer pages.

Preserve the original equations. Use MathJax delimiters and explicit fraction
grouping, remembering to double backslashes in JSON. Use `\lt` and `\gt` for
inequalities instead of inserting raw angle brackets into authored HTML.

Follow the supplied worked-answer method, but independently solve each item.
Record discrepancies or assumptions for the teacher rather than silently
changing the source. For equation solving:

- State whether real or complex solutions are expected, using the answer key
  and course context; record the interpretation in the teacher review.
- Record excluded denominator values before clearing fractions. Check final
  roots in the original equation, not only the multiplied-out polynomial.
- Retain zero roots when taking out a common factor; do not divide them away.
- Treat quartics in `x^2` as quadratics in that quantity, then return to `x`.
- Take both square-root signs and reject negative square values only when
  solving over the reals.
- Check that the chosen option is the complete solution set. Distractors may
  contain a subset of valid roots, but cannot be another complete correct set.
- Give four mathematically distinct options and vary correct-answer positions.

## 4. Render and prepare the teacher review

```sh
scripts/validate-quiz-data.sh "<class>/<topic>/<quiz name>/quiz-data.json"
python3 scripts/render-quiz.py "<class>/<topic>/<quiz name>/quiz-data.json"
```

The renderer validates again and produces `index.html` beside the data, using
the existing template. Treat JSON as the content source of truth; re-render
after changing data. Keep reusable interaction changes in the template.

Place `teacher-review.md` under
`Source Files/<class>/<topic>/<quiz name>/`. Include all prompts, options,
correct choices, working, exact sources, assumptions and outstanding checks.
Preserve mathematical notation; do not flatten `1\frac{5}{12}` to `15/12`.
Keep the review copy synchronised with the JSON after every content change.

Add the quiz link to the chapter menu and retain back links at each level.
URL-encode spaces in links and verify every local target exists.

## 5. Review and release separately

Data validation checks structure, not mathematics or public reproduction
permission. Verify maths and answer-key agreement independently. Test initial
state, unanswered checks, selection, correct and incorrect feedback, locking,
score counted once, worked-solution reveal and reset in a browser. Check
keyboard use and mathematical rendering on narrow and wide screens. Mark
unavailable checks as pending; do not claim classroom testing without evidence.

Record copyright notices and ask for publication-rights confirmation when
permission is unclear. Local possession of a worksheet does not establish
permission to reproduce it on a public website. Keep new content in draft
until teacher review and rights are resolved; commit or publish only when the
user explicitly asks. Earlier approval of another quiz does not carry over.

## Worked example: 2iec Solving Equations

Prepared on 13 October 2026 using the existing scripts and shared template.
Title and folder: `Solving Equations`, under
`2iec/Pure Chapt 01 Quadratics/`.

| Item | Exact reference |
|---|---|
| Scope | C1 Algebra, Worksheet E, Exercise 6(a)–(l), exactly 12 questions |
| Source family | Solomon Press worksheets for 2iec Pure; not the M1 mechanics book |
| Questions | `Source Files/2iec/Pure Chapt 01 Quadratics/C1 Algebra - Questions.pdf`, PDF page 8 |
| Worked answers | `Source Files/2iec/Pure Chapt 01 Quadratics/C1 Algebra - Answers.pdf`, PDF page 13, headed `Answers - Worksheet E`, page 3 |
| Teacher review | `Source Files/2iec/Pure Chapt 01 Quadratics/Solving Equations/teacher-review.md` |

The key treats solutions as real: 6(h) rejects `x^2 = -1`, and 6(i) rejects
`x^2 = -2`. Its factorisations and real solution sets agree with independent
exact-arithmetic verification. The quiz adds explicit denominator restrictions
and checks without changing the source equations or their answers.

Coverage: 6(a), 6(b), 6(e), 6(f), 6(g), 6(h), 6(j), 6(k) and 6(l) have original
denominator restrictions; 6(c) has three roots including zero; 6(d) has four
real roots; 6(h) and 6(i) discard non-real branches. Correct options are balanced
across A–D, with three of each.

Validation, source-page visual verification, exact solution checks and local
navigation checks pass. Browser rendering and interaction tests remain pending
because no browser connection is available. Both PDFs carry a Solomon Press
copyright notice. On 13 October 2026 the user requested that the 2iec changes be
committed and published, and explicitly confirmed permission to publish the
source questions and worked solutions publicly. The draft notice was removed
following this authorisation. Browser checks and classroom testing must not be
represented as completed.

Published on 13 October 2026 in commit `08624c1`; the live quiz and chapter menu
were checked against the approved release. This confirms deployment, not
browser interaction or classroom testing. See `docs/2iec-source-reference.md`
for the source register and consolidated 2iec publication history.
