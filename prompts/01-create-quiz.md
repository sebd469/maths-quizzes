# Prompt: create a quiz

Read `AGENTS.md` and `docs/quiz-template-reference.md` first. Create only the
requested quiz and question parts from the supplied worksheet, or original
questions when the user requests them without supplying sources.

For 2iec, read `docs/2iec-source-reference.md` first: Mechanics uses the Edexcel
M1 textbook and matching Solutionbank; Pure uses Solomon Press worksheets and
matching worked answers. Confirm the subject before selecting sources, and
record the source family as well as the exact exercise and PDF pages. Do not
infer the textbook chapter number from a local filename or folder name.

Before creating files, identify the class, chapter/unit/topic name and quiz
name from the request and existing folders. Ask only for names that are missing
or ambiguous. Follow the folder and navigation rules in `AGENTS.md`:

```text
<class>/
  index.html
  <chapter, unit or topic>/
    index.html
    <quiz name>/
      index.html

Source Files/
  <class>/
    <chapter, unit or topic>/
      <quiz name>/
        [source worksheet and answer-key PDFs]
```

For example, a quiz named `Discriminant Quiz` belongs at
`2iec/Pure Chapt 01 Quadratics/Discriminant Quiz/index.html`, with quiz-specific
sources under `Source Files/2iec/Pure Chapt 01 Quadratics/Discriminant Quiz/`.
Shared chapter PDFs may stay at `Source Files/2iec/Pure Chapt 01 Quadratics/`.
For 6iec, reuse `6iec/Unit 01 Numbers/` and its matching source folder when
building a quiz for that unit.

Use the agreed names consistently in folders, menu labels and headings. Reuse
existing class/topic menus and add the named quiz beneath its topic. Include
back links from quiz to topic, topic to class, and class to the main menu.
URL-encode spaces in relative links and verify every forward and back link.
Do not rename unrelated folders or duplicate shared source PDFs. Keep source
PDFs and extracted text out of the public website and quiz commits; use
`.gitkeep` if an empty source folder must be retained in Git.

When creating questions from supplied worksheets and worked answers:

- Follow `docs/worksheet-quiz-build-method.md`. Confirm the exact worksheet,
  exercise, part range and PDF pages before drafting; preserve the source
  part labels rather than renumbering them.
- Visually inspect the relevant PDF pages after extraction. Fractions,
  exponents and grouping can be corrupted or flattened in extracted text.
- Base each worked solution on the matching answer-key steps, independently
  verify them, and explain any added domain restrictions. For equations,
  choose the complete real solution set and check it in the original equation.
- Record both question and answer PDF references in each `source_ref`, and
  provide a teacher review copy in the matching source folder. Preserve
  mathematical grouping and fraction notation in that copy.
- Keep new worksheet quizzes local and marked as drafts until content review,
  publication rights and publishing authorisation are resolved. Approval for
  an earlier quiz does not approve new source-derived content.

When selecting a fixed number of questions from a longer exercise:

- Select across the full exercise, including later challenge questions, unless
  the user specifies an exact range. Record the source numbers and rationale
  in the teacher review; do not default to the first requested number of items.
- State whether a multipart source question stays one scored question or is
  split into separately scored parts. Preserve every selected part and keep
  the final question count exact.
- For mechanics, distinguish signed velocity from speed and deceleration,
  convert units before substitution, handle turning points and separate stages,
  account for delayed starts, and postpone rounding until the final result.
  See `docs/mechanics-quiz-build-notes.md` for the mixed-difficulty example.

When creating original questions without source files:

- Follow the requested question count and topic split exactly. Record the
  intended difficulty and any assumptions, such as allowing improper fractions.
- Set the quiz's `source_reference` and every question's `source_ref` to
  `Original`. Do not invent a worksheet reference or external answer key.
- Solve each question independently using an appropriate exact method. For
  fractions, use exact rational arithmetic, check simplest forms, and ensure
  no distractor is equivalent to the correct answer or another distractor.
- Include plausible distractors, vary the correct option positions, and write
  concise working. Use MathJax fraction notation and `\\lt`/`\\gt` for
  inequalities that might otherwise be interpreted as HTML.
- Put a teacher review copy with all questions, options, answers and working
  in the matching `Source Files/<class>/<topic>/<quiz name>/` folder. State
  that the questions are original and teacher review is pending.
- If the user requests review before publishing, build local drafts with
  `review_status: "Draft — awaiting teacher review"` in the quiz metadata,
  present the questions for review, and wait for approval before publishing.
  Never treat an earlier quiz's publishing approval as approval for new content.

1. When source PDFs are supplied, use `scripts/extract-pdf-text.sh` to inspect
   the relevant question and answer-key text. Do not modify source PDFs. Skip
   extraction for original questions.
2. Preserve the source wording and notation accurately. Record worksheet and
   part references in `source_ref`.
3. Draft data in the shape shown by `templates/quiz-data.template.json`.
   Independently solve each question and include a concise worked solution.
4. Do not guess unclear text or silently resolve a disagreement with the key;
   report it for teacher review.
5. Check publication rights before copying source questions into public output.
   Where rights are uncertain, request guidance or propose original questions
   testing the same skill.
6. Run `scripts/validate-quiz-data.sh` on the completed data. Remember that the
   validator does not check mathematical correctness.
   For the shared page template, save `quiz-data.json` beside the quiz page,
   then run `python3 scripts/render-quiz.py "<path>/quiz-data.json"`.
   The renderer validates again and writes a standalone `index.html`.
   Supply `topic` and `instructions` in the quiz metadata; see
   `docs/original-quiz-build-method.md` for the full method and examples.
   Test selection, checking, feedback, locking, scoring, solution reveal and
   reset in a browser; report any testing that could not be completed.
7. Do not claim teacher approval, classroom testing, or deployment unless those
   steps actually occurred. Do not commit or push unless asked.

Report the source parts used, verified answers, unresolved issues, validation
result, website and source-folder paths, navigation checks, and files changed.
