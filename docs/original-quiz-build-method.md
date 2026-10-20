# Building an original quiz

Use this method when the user requests new questions without supplying a
worksheet. Read `AGENTS.md`, `prompts/01-create-quiz.md` and
`docs/quiz-template-reference.md` first. Use `prompts/02-review-quiz.md` for review.

Do not use this original-question method merely because no new source was
attached to a follow-up request. For source-derived 2iec work, the established
sources are the Edexcel M1 book for Mechanics and Solomon Press worksheets
for Pure; see `docs/2iec-source-reference.md`. Use `Original` only when original
questions were actually requested and authored.

## Files and navigation

Create `<class>/<chapter, unit or topic>/<quiz name>/quiz-data.json` and render
`index.html` beside it. Use the same names in folders, headings and menu labels.
Keep a teacher review copy under
`Source Files/<class>/<chapter, unit or topic>/<quiz name>/teacher-review.md`.
No source PDF is needed or invented for original questions.

Add a link from the topic menu to each quiz. Use relative links with spaces
encoded as `%20`. The quiz links back to its topic; the topic links back to the
class; the class links back to the main menu.

## Authoring and checking

1. Record the requested count, topic split and difficulty assumptions before
   authoring. Draft the questions and concise working.
2. Follow `templates/quiz-data.template.json`. Use stable unique IDs and set
   both the quiz source reference and each question's `source_ref` to `Original`.
   Add quiz metadata `topic`, plain-text `instructions`, and
   `review_status: "Draft — awaiting teacher review"` while review is pending.
3. Give each question four plausible options with one defensible answer. Vary
   correct-answer positions. Avoid equivalent distractors, especially different
   fractions representing the same value.
4. Solve independently. For fractions, use exact rational arithmetic, common
   denominators and highest common factors. Verify all answer indices and
   check comparison/order questions as well as calculations. Do not describe
   this as a comparison against an external answer key when none exists.
5. Use MathJax `\frac{a}{b}` notation and `\lt`/`\gt` for inequalities. JSON
   requires doubled backslashes. Do not use floating-point values to decide
   fraction equality. Label improper-fraction expectations in the instructions.
6. Validate, then render:

   ```sh
   scripts/validate-quiz-data.sh "<class>/<topic>/<quiz name>/quiz-data.json"
   python3 scripts/render-quiz.py "<class>/<topic>/<quiz name>/quiz-data.json"
   ```

   The renderer validates before writing. It uses
   `templates/quiz-page.template.html`, embeds the data, and produces a
   standalone page with the established appearance. MathJax loads from the
   existing CDN. Keep changes to reusable behaviour in the template; rerender
   affected quizzes afterwards. Do not edit generated pages as the source of
   truth. Worked solutions are trusted authored HTML and need manual review.
7. Prepare a teacher review copy of every prompt, all options, the correct
   option and working. Keep comparison signs and fraction grouping legible in
   the plain-text copy. Verify it against the JSON after any content revision.
8. Check forward/back links and test both quizzes in a browser: initial score,
   unanswered check, selection, correct/incorrect feedback, answer locking,
   score counted once, solution reveal and reset. Check mathematical rendering
   on narrow and wide screens. Record unavailable checks as pending.
9. Present the questions to the teacher. If review before publishing was
   requested, keep everything local until approval. After approval, incorporate
   requested changes, repeat affected checks, remove the draft notice only
   when justified, then commit, push and publish: under the standing instruction
   in `AGENTS.md`, approval of this quiz supplies that release authorisation
   unless the user expressly restricts it. Resolve actual blockers and verify
   deployment, without asking for another release instruction. Do not include source
   PDFs, extracted text or unrelated changes in the commit.

## 6iec Unit 01 Numbers quizzes

The first use of this method creates these original quizzes:

| Quiz | Count and scope |
|---|---|
| Equivalent Simplifying and Comparing Fractions Quiz | 2 equivalent fractions, 4 simplifications, 2 comparisons and 2 ordering questions |
| Adding and Subtracting Fractions Quiz | 5 additions and 5 subtractions, from common to unlike denominators |

Assumptions: Year 8 practice, four-option multiple choice, positive fractions,
no mixed-number input, simplest-form answers for calculations, and one
addition with an improper-fraction answer. Ordering is from smallest to largest.
No external sources were supplied or copied. Teacher approval and publication
authorisation were given on 13 October 2026. Classroom testing has not occurred.

Each quiz has its JSON and rendered page under `6iec/Unit 01 Numbers/`, plus a
matching teacher review file under `Source Files/6iec/Unit 01 Numbers/`.
The unit menu links to both quizzes. Their draft notices have been removed
following teacher approval. For Adding and Subtracting Fractions question 9,
the teacher confirmed both 17/12 and the mixed number 1 5/12; the review copy's
ambiguous `15/12` notation has been corrected without changing the quiz answer.

Checks completed: both datasets pass the repository validator; exact rational
arithmetic confirms all 20 answers and distinct options; topic counts and local
links are checked. Browser rendering and interaction checks remain pending
because no browser connection is available in the current session. These checks
must not be represented as completed; update this status when they occur.

Published on 13 October 2026 in commit `458a853`. The two live quiz pages and
unit menu were verified against the release. This is deployment verification,
not browser interaction or classroom testing.

## 6iec Laws of indices 1

Prepared on 14 October 2026 under
`6iec/Unit 01 Numbers/Laws of indices 1/`, with a matching teacher review
under `Source Files/6iec/Unit 01 Numbers/Laws of indices 1/`. The teacher
approved the quiz, requested commit and publication, and specified the exact
title and clickable menu label `Laws of indices 1` on that date. The earlier
local draft name was replaced before publication.

The requested 10-question split is five numerical bases and five variable
bases (a or x). The laws are same-base multiplication (add indices), same-base
division (subtract indices), and power of a power (multiply indices).

| Law | Numerical-base questions | Variable-base questions | Total |
|---|---|---|---|
| Multiplication | 1, 2 | 3, 4 | 4 |
| Division | 5, 6 | 7 | 3 |
| Power of a power | 8 | 9, 10 | 3 |

Use positive integer indices and single-power answers with the same base.
Assume variables are non-zero so division is defined. Do not ask students to
evaluate numerical powers; the focus is applying the index laws. Distractors
target confusing addition, subtraction and multiplication of indices.

These are original questions, not copied from a worksheet, M1 or Solomon
sources. Data and every `source_ref` are marked `Original`. The shared renderer
and template supply the established interaction and analytics beacon; no
unrelated quiz or analytics changes are needed.

Checks cover all 10 indices, exact numerical powers, distinct options, both
requested topic/base splits, generated-page consistency and navigation.
Teacher approval and publication authorisation were given on 14 October 2026,
and the draft notice was removed. The Unit 01 Numbers menu links directly to
`Laws%20of%20indices%201/index.html`; the quiz links back to the unit menu.
Browser rendering/interaction and classroom testing remain pending and must
not be represented as completed.

## 6iec Laws of Indices 2

Prepared on 15 October 2026 at
`6iec/Unit 01 Numbers/Laws of Indices 2/`, with its matching teacher review at
`Source Files/6iec/Unit 01 Numbers/Laws of Indices 2/teacher-review.md`.

This original 10-question follow-up uses the existing renderer and template.
It includes the requested examples `(3x)^3`, `(2x^2)^4` and
`2x^3 × 3x^2 = 6x^5`, then progresses to coefficients and fractional monomial
expressions combining two or more index laws. Questions 9–10 combine all
three laws. All question sources and quiz provenance are `Original`.

Unlike Laws of indices 1, numerical coefficients are evaluated. The five/five
base split from the first quiz is not assumed for this follow-up: the examples
are algebraic terms with coefficients and variables a or x. Assume variables
are non-zero, preserve positive final indices, and remember that a lone
variable has index 1. Zero, negative and fractional-index questions are not
introduced here.

Verify exact coefficients as well as indices: a power applies to every factor
inside brackets, including the coefficient. In fractions, combine numerator
and denominator products separately, then divide coefficients and subtract
indices. Reject algebraically equivalent distractors, not merely duplicate
strings. Use formal monomial checks plus independent numerical substitutions
to confirm all answers. Keep the teacher review synchronised with the JSON.

The unit menu links to `Laws%20of%20Indices%202/index.html`. The generated page
retains the existing interaction and analytics beacon. Dataset, generated
page, mathematics and navigation checks pass for this build.
The teacher separately approved Laws of Indices 2 on 15 October 2026 and
requested commit, push and publication. The draft notice was removed following
this authorisation. Browser visual/interaction checks and classroom testing
remain pending and must not be represented as completed.

## 6iec Multiplying Fractions Quiz

Prepared as a local draft on 16 October 2026 at
`6iec/Unit 01 Numbers/Multiplying Fractions Quiz/`, with the matching review at
`Source Files/6iec/Unit 01 Numbers/Multiplying Fractions Quiz/teacher-review.md`.
The Unit 01 Numbers menu places it immediately below Adding and Subtracting
Fractions Quiz. Existing quiz order, back links and analytics are preserved.

Use 10 original questions, following the existing quiz length. All given
fractions and correct final answers are proper fractions; no mixed numbers
or conversions are included. Questions progress from simple products to
reducing input fractions and cancelling common factors before multiplication.
Question 6 is the requested `13/80 × 20/39 = 1/12`. Questions 4, 7 and 10 also
contain reducible input fractions. Worked solutions demonstrate cancellation
between a numerator and a denominator, never between two numerators or two
denominators. Multiplying first and then reducing remains a valid alternative;
multiple choice cannot enforce the student's calculation order.

Verify products and intermediate equalities with exact rational arithmetic;
check that each correct option is in lowest terms and that no distractor is an
equivalent form of the correct answer. Keep the teacher review synchronised
with the JSON and use the existing validator, renderer and template.

Teacher approval was received on 20 October 2026. Under the standing instruction
in `AGENTS.md`, this authorises commit, push and publication without another
release request. The draft notice was removed and the release checks repeated.
Publish only related files and verify deployment/live content. Browser and
classroom checks remain pending and must not be represented as completed.
