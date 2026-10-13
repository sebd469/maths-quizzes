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
   when justified, and publish only with authorisation. Do not include source
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
