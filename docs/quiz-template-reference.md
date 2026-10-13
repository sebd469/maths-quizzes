# Quiz Template Reference

This document defines the expected behavior and review process for quizzes in
this repository. The 1iec Partial Fractions A and 2iec Quadratics Worksheet J
pages are the current examples. Use this reference when creating or reviewing a
quiz, whether it is hand-authored or generated.

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
| `source_ref` | Worksheet and question-part provenance, or `Original` |

Keep each question's prompt, options, answer index, solution and working
together. Do not put answer-key material in student-facing instructions.
`working` should use simple HTML fragments and MathJax, not scripts or
unreviewed markup.

## Source-to-release workflow

1. Extract the required worksheet and answer-key pages locally with
   `scripts/extract-pdf-text.sh`. Keep extracted text and source PDFs out of
   public quiz output and Git unless explicitly approved.
2. Draft structured question data from only the requested worksheet parts.
   Record the exact source reference for every item.
3. Solve each question independently, compare with the answer key, and review
   boundaries, signs, units, and strict versus inclusive inequalities.
4. Run `scripts/validate-quiz-data.sh path/to/quiz-data.json`.
5. Review the questions and worked solutions as a teacher. Validation checks
   structure, not mathematical correctness or copyright permission.
6. Render or update the quiz page, then test the full student interaction in a
   browser, including unanswered checks and reset.
7. Publish only after content and rights review. Record any remaining decisions
   rather than presenting them as resolved.

## Current automation boundary

The existing quiz pages are standalone HTML and remain the live implementation.
The extraction helper, data example, validator, and prompts establish a
repeatable preparation and review workflow. They do not yet generate HTML; a
later change can add a renderer after this data contract has been used and
reviewed.