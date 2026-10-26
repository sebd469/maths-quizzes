# 3iec assessment and revision workflow

This is the reusable procedure for Assessment 2 and later assessments. Read
`AGENTS.md`, `docs/quiz-template-reference.md` and the relevant source-based or
original quiz build method before starting. Use
`prompts/04-create-3iec-assessment-and-revision.md` as the next-task brief.

## Teacher brief

The teacher plans to provide four topics for Assessment 2. Produce a student
PDF assessment, a separate teacher PDF mark scheme and four topic revision
quizzes. Do not start choosing topics before that brief arrives.

Record assessment number, four exact topics, any exclusions, calculator policy,
time, total marks, topic weighting, difficulty, quiz lengths and review/release
instructions. Assessment 1 was a 60-minute calculator paper; its corrected
63-mark total is historical, not a default for every future paper. Agree any
missing material choices before finalising the new paper. Do useful source
inspection while clarification is pending.

## Folder and naming conventions

```text
3iec/
  index.html
  Assessments/
    3iec_Assessment_02_<short-title>.pdf
    3iec_Assessment_02_<short-title>_Mark_Scheme.pdf
  Assessment 2 Revision Quizzes/
    index.html
    Quiz 1 - <Topic>/
      quiz-data.json
      index.html
    Quiz 2 - <Topic>/...
    Quiz 3 - <Topic>/...
    Quiz 4 - <Topic>/...

Source Files/3iec/
  Assessment 2/
    <source PDFs or local extracts>
    source-register.md
    assessment-review.md
  Assessment 2 Revision Quizzes/
    Quiz 1 - <Topic>/teacher-review.md
    ...
```

Use the actual assessment number for each cycle. Preserve the established
`3iec/Assessments/` plural folder and `Assessment 1 Revision Quizzes` historical
folder. Do not overwrite earlier PDFs or remove earlier quiz menus. Existing
shared sources may remain in their current locations; reference them exactly
instead of duplicating or relocating them. Use assessment-specific generator
names and stable filenames once agreed.

## Finding questions and answers

The teacher's requested sources are **Past Paper Penguin**, **IGCSE questions
by topic**, and **Corbettmaths**. Use the actual supplied files or verified
provider resources. "IGCSE questions by topic" does not identify a unique
website, exam board or syllabus: establish those from the resources or teacher
brief instead of guessing. Check syllabus and tier suitability for 3iec.

For each selected question, keep a local register with:

| Field | Required detail |
|---|---|
| Destination | Assessment question/part or revision quiz/question ID |
| Topic and difficulty | Skill tested and foundation/developing/challenge level |
| Source | Provider, resource title, original board/year/paper if identifiable |
| Question location | Exact URL or local PDF path, PDF page, printed page and question parts |
| Answer location | Matching official/worked-answer URL or file, page and parts |
| Changes | Values, wording, diagram, numbering or layout changes |
| Checks | Independent answer, source-key agreement, ambiguities and resolutions |
| Rights | Evidence and scope of permission for private use/public reproduction |

Use `scripts/extract-pdf-text.sh` for local extraction, then visually inspect
the question and answer pages. Extraction can corrupt fractions, indices,
diagrams and mathematical symbols. Preserve original PDFs unchanged.

Match each question to its real answer key. If none is available, derive and
check the answer independently and label the mark scheme as teacher-review
material with proposed allocations; do not describe it as an official scheme.
Flag discrepancies and ambiguous questions before release.

The teacher reported an agreement with Past Paper Penguin for the Assessment 1
watermark removal. Record the scope of any future permission; do not infer
permission for Corbettmaths, other providers, or public republication from that
agreement. Do not assume that access to a download permits public copying.
Retain source attribution and record any specifically requested watermark or
footer changes in the local review record.

## PDF assessment and mark scheme

1. Build a topic/mark blueprint and choose a balanced set across the four topics.
   Keep the assessment questions separate from the public revision questions.
2. Produce a clearly named cover with class, assessment number, time, calculator
   policy, name/date fields, total marks and concise instructions. Number all
   questions and parts; show marks and page numbers. Use readable mathematical
   typography, stacked fractions and an italic variable x distinct from ×.
3. For a supplied assembled paper, preserve question positions, diagrams, answer
   lines and spacing when requested, as for Assessment 1. For a newly composed
   paper, use A4 with generous working space and sensible question page breaks.
   Do not resize a supplied paper silently.
4. Independently solve every part and reconcile the printed marks with the
   cover and teacher scheme. Give the teacher an opportunity to resolve any
   proposed mark or question changes rather than silently altering them.
5. Create the separate mark-scheme PDF: concise answers first, then complete
   working, method/accuracy allocations, equivalent forms, rounding and any
   ambiguity notes. Keep question numbering identical to the student paper.
6. Extract the final PDF text, render every final page and visually inspect it.
   Check diagrams, signs, units, fractions, superscripts, spacing, footer/page
   numbering, clipped content and absence of answers in the student paper.
7. Record actual checks, version and teacher-review status locally. Retain a
   reproducible generator and source register alongside the local workflow.

## Revision quizzes

Prepare one quiz for each of the four topics, in the teacher's order, using
the shared renderer and the same format as 2iec. Include easier questions,
assessment-level practice and harder extensions. Assessment 1 used 15 questions
in the first three quizzes and 18 in trigonometry; these are precedents, not
mandatory counts for every new topic.

Use different questions from the assessment itself. When source questions are
requested, select distinct appropriate items from the verified sources; do not
silently replace them with original material. Original practice may be used
when requested, with `Original` source references. For public source-derived
questions, resolve reproduction rights before publication; if uncertain,
prepare the local draft and record the unresolved item for the teacher.

Give each card four distinct plausible options, exactly one correct answer,
varied answer positions and a worked solution. Include domain restrictions and
unambiguous angle conditions. Keep exact provenance in `source_ref` for sourced
items. Never link public quizzes to confidential assessment PDFs or teacher keys.

For trigonometry, provide a labelled diagram for every question, showing the
given information and unknown quantity. Use the shared optional `diagram`
metadata and local SVG assets, with meaningful alternative text and a
not-to-scale caption. Match acute/obtuse and right-angle geometry to the prompt,
check all labels, and inspect every diagram on desktop and mobile.

Validate and render each quiz:

```sh
scripts/validate-quiz-data.sh "3iec/Assessment 2 Revision Quizzes/Quiz 1 - <Topic>/quiz-data.json"
python3 scripts/render-quiz.py "3iec/Assessment 2 Revision Quizzes/Quiz 1 - <Topic>/quiz-data.json"
```

Independently verify all answers and distractors, check embedded-page/data
agreement, TeX escaping and JavaScript syntax, then test selection, unanswered
checks, correct/incorrect feedback, score, locking, solution reveal and reset
in a browser. Check narrow and wide layout and MathJax rendering. The Chrome
extension was connected successfully during Assessment 1; reconnect through
the supported browser skill when available. Record unavailable checks honestly.

## Review, private backup and public release

- **Private PDFs:** `3iec/Assessments/` stays out of the public quiz repository's
  commits. The established backup is the separate private repository
  `sebd469/maths-assessments-private`, using `3iec/Assessments/`. Before a
  requested backup, verify private visibility, access and absence of Pages;
  stage only the intended files and verify the uploaded content. Do not change
  the public repository's remote or visibility to achieve a private backup.
- **Local source/review records:** keep downloaded PDFs, extracted text, the
  assessment register and answer-bearing teacher notes local. Do not add them
  to public quiz commits.
- **Public quizzes:** link class → Assessment N Revision Quizzes → topic quiz,
  with matching back links and URL-encoded spaces. Keep drafts local until
  teacher approval or an explicit instruction to publish before review.
- **Authorisation:** Assessment 1's immediate-publication instruction does not
  pre-approve Assessment 2. Teacher approval follows the standing quiz release
  rule; permission to publish quizzes does not release private PDFs or keys.
- **Ordered delivery:** when publishing is authorised, release Quiz 1, then 2,
  then 3, then 4; verify each deployment and provide its live link. Separate
  agents may be used when requested, with one quiz per agent and one coordinator
  managing shared menus, checks and Git. Do not promise unattended background
  execution unless that capability is actually running.
- **Final check:** inspect the exact staged files, preserve unrelated changes,
  push only to the intended repository, verify deployment/live content or the
  private upload as applicable, and state remaining teacher/classroom checks.

## Current position

Assessment 1's PDFs are in `3iec/Assessments/`, backed up privately. Its four
original revision quizzes are published under `3iec/Assessment 1 Revision Quizzes/`.
See `docs/3iec-assessment-revision.md` for that cycle's coverage and checks.
Assessment 2 is awaiting the teacher's four topics and assessment brief.
