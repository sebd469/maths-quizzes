# Quiz Template Reference

This document defines the expected behavior and review process for quizzes in
this repository. The 1iec Partial Fractions A and 2iec Quadratics Worksheet J
pages are the current examples. Use this reference when creating or reviewing a
quiz, whether it is hand-authored or generated.

## 2iec source reference

Use `docs/2iec-source-reference.md` as the central source register for 2iec.
Mechanics is based on the Edexcel M1 textbook and matching Solutionbank worked
solutions; Pure is based on Solomon Press worksheets and worked answers.
Keep these source families distinct and record exact chapter/worksheet,
exercise, question-part and PDF page references. This applies to source-derived
content; explicitly requested original questions still use `Original`.

## Student experience

1. Show the quiz title, course/topic, concise instructions, and a link back to
   the relevant course page.
2. Present each question with clearly labelled answer options. Use a radio
   group when exactly one answer is correct.
3. Do not check or score an unanswered question. Prefer to keep its check button
   disabled until a choice is selected. If a page keeps the button enabled for
   compatibility, an early click must only ask the student to choose an answer;
   it must not lock the question, change the score, or reveal the solution.
4. After checking, give immediate correct/incorrect feedback and identify the
   correct answer. Count the question once in the checked total.
5. Lock the selected answer after checking so the score cannot be changed by
   switching choices. Show the worked solution only after the question has been
   checked, whether the student's answer was right or wrong.
6. Display progress as correct answers over checked questions. Unchecked
   questions are not included in either count.
7. Reset clears every selection, result, lock, revealed solution, and score,
   returning the page to its initial state.

## Accessibility and presentation

- Associate every radio input with its visible label and keep controls
  keyboard-operable.
- Use visible focus, readable contrast, responsive layout, and stable question
  identifiers.
- Announce score and feedback updates with an appropriate live region.
- Render mathematical notation consistently with the existing MathJax setup.
- Keep instructions brief and use the established site navigation and visual
  conventions.

## Question data contract

`templates/quiz-data.template.json` shows the starter format. Each quiz has
metadata and a non-empty `questions` array. Every question must provide:

| Field | Meaning |
|---|---|
| `id` | Stable, unique identifier within the quiz |
| `section` | Heading used to group related questions |
| `title` | Student-facing part label, such as `6(a)` |
| `prompt` | Question text, including MathJax delimiters where needed |
| `options` | At least two non-empty answer strings |
| `answer` | Zero-based index of the correct option |
| `solution` | Short answer shown in feedback |
| `working` | Worked solution shown after checking |
| `source_ref` | Source family, textbook chapter or worksheet, question-part and question/solution PDF page provenance, or `Original` |

Keep each question's prompt, options, answer index, solution and working
together. Do not put answer-key material in student-facing instructions.
`working` should use simple HTML fragments and MathJax, not scripts or
unreviewed markup.

Questions may also include an optional `diagram` object with `src` and `alt`.
Use a local SVG at `diagrams/<descriptive-name>.svg` beside the quiz page, and
write meaningful alternative text describing the given information and target.
The shared template displays it responsively between the prompt and options,
with a "Not drawn to scale" caption. Include only given values and unknown
labels in question diagrams; never reveal the calculated answer. Keep diagram
assets with the quiz release. The validator checks this optional data shape;
inspect the actual SVG and its mathematical labels separately.

## Source-to-release workflow

1. For supplied sources, extract the required textbook/worksheet and answer-key pages locally with
   `scripts/extract-pdf-text.sh`. Keep extracted text and source PDFs out of
   public quiz output and Git unless explicitly approved.
2. Draft structured question data from only the requested textbook/worksheet parts, or
   create original questions when requested without sources. Record the exact
   source reference for every item, or `Original`. For supplied worksheets,
   follow `docs/worksheet-quiz-build-method.md`; for original content, follow
   `docs/original-quiz-build-method.md`. Provide a teacher review copy in either
   case.
3. Solve each question independently, compare with the answer key, and review
   boundaries, signs, units, and strict versus inclusive inequalities.
4. Run `scripts/validate-quiz-data.sh path/to/quiz-data.json`.
5. Review the questions and worked solutions as a teacher. Validation checks
   structure, not mathematical correctness or copyright permission.
6. Render or update the quiz page, then test the full student interaction in a
   browser, including unanswered checks and reset.
7. Publish only after content and rights review. Record any remaining decisions
   rather than presenting them as resolved.

As confirmed on 16 October 2026, teacher approval of a specific quiz also
authorises commit, push and publication under the standing instruction in
`AGENTS.md`, unless the user explicitly limits that approval. Before approval,
keep the new quiz and menu changes local. Afterwards, record approval, remove
the draft notice, repeat relevant checks and publish the related release files
without asking again for a separate release instruction. Source-rights issues,
actual failures and access blockers still need resolution; incomplete browser
or classroom tests remain incomplete. Verify deployment and live content.

## Optional result submission

Every new quiz must include **Send result to Mr D**. The feature is mandatory
in the standard template; submission remains optional for each student.
Follow `docs/quiz-results-setup.md` for the shared form and Cloudflare service.
Students may enter their name and class and send their final score on the same
quiz page after checking every question. Submission is optional and requires
an explicit button press. Reset clears identity and submission state. Keep the
`window.getQuizResult` adapter and `quiz-score-change` / `quiz-reset` events
consistent with the existing score. Shared assets must use relative paths that
resolve from the generated quiz folder. Never place teacher access keys,
notification addresses, pupil results or backend secrets in public files.

Before releasing a new or renamed quiz, rebuild the public quiz registry with
`python3 scripts/build-results-registry.py` and review its exact path, title
and question count. Deploy the approved registry to the Worker before the
new quiz page is published; an unregistered quiz cannot submit results.
Keep unrelated drafts out of that deployment. After publication, verify a
fictional result, notification and private CSV entry. Local previews show a
clear explanation and disable sending while keeping ordinary practice usable.

## Cloudflare Web Analytics

Every public quiz and navigation page must contain exactly one copy of the
existing Cloudflare Web Analytics tag. Preserve this tag in hand-authored pages
and in `templates/quiz-page.template.html`:

```html
<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "f4422aa63f9d4e04b91ab57a5551ffa5"}'></script><!-- End Cloudflare Web Analytics -->
```

Check the final generated HTML before release for exactly one beacon script,
the correct script URL and the matching token. After deployment, repeat the
check against the live page source on `https://www.mr-d-maths.com/` for every
affected page. A tag found in HTML confirms inclusion only; confirming that
analytics is delivered requires a browser network check. Report inaccessible
live pages or unperformed network checks honestly.

## Current automation boundary

The existing quiz pages are standalone HTML and remain the live implementation.
New quizzes can use `templates/quiz-page.template.html` and
`scripts/render-quiz.py` to render validated `quiz-data.json` into a standalone
page. Question content stays in JSON; shared presentation and behaviour stay
in the template. Re-render each affected quiz after editing its data or the
template. Older hand-authored quizzes are not automatically migrated.

For this renderer, quiz metadata additionally requires `topic` (used by the
back link label) and `instructions` (plain text). Optional `review_status` text
appears below the course name. Its presence does not control deployment;
teacher review and publishing authorisation remain separate workflow steps.
