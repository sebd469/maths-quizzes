# 2iec source reference and release history

Last updated: 13 October 2026. The user explicitly confirmed the subject/source
mapping below. Use this as the central reference when creating or reviewing
future 2iec quizzes, together with `AGENTS.md` and the create/review prompts.

## Required source mapping

| 2iec subject | Question source | Worked-solution source |
|---|---|---|
| Mechanics | Edexcel M1 book, Pearson/Heinemann, Mechanics 1 | Matching Heinemann Solutionbank M1, Edexcel AS and A Level Modular Mathematics |
| Pure | Solomon Press worksheets, including the supplied C1 Algebra worksheets | Matching Solomon Press worked-answer worksheets |

Do not describe Mechanics exercises as Solomon worksheets, or use the M1 book
as the default source for Pure. Use these established sources unless the user
explicitly supplies a different source or requests original questions. Edexcel
is the Mechanics course/book identifier; Pearson/Heinemann identifies the
publisher/source family. Do not infer a particular edition from filenames or
from a copyright date alone.

## Supplied local files

### Mechanics: Edexcel M1

Existing website topic: `2iec/Mechanics Chapt 01 SUVAT/`.
Shared local sources: `Source Files/2iec/Mechanics Chapt 01 SUVAT/`.

| File | Role and exact source references |
|---|---|
| `M1 chapter 1 exercises.pdf` | Mostly scanned textbook pages; Exercise 2A on PDF pages 9–10, 2B on pages 15–17, 2C on pages 23–24 |
| `Solutions chapter 01.pdf` | Matching M1 Solutionbank; headings use Exercises A, B and C for textbook Exercises 2A, 2B and 2C; per-question PDF page mappings are in the teacher reviews |

The supplied filenames and local folder say chapter 1, but the textbook labels
the kinematics material as Chapter 2, Kinematics of a particle moving in a
straight line. Keep the existing filenames and `Mechanics Chapt 01 SUVAT`
folder. Record both the local path and the actual textbook exercise; do not
silently rename files or assume this is textbook Exercise 1A.

For a concrete source reference, Exercise 2A Q13 is on question PDF page 10;
its matching worked answer is on solution PDF pages 13–14. For Exercise 2C
Q12, the question is on PDF page 23 and its solution on PDF page 48. The latter
contains a quadratic-formula denominator typo; the correction and agreement
with the final answer are recorded in `docs/mechanics-quiz-build-notes.md` and
the Quiz 3 teacher review.

### Pure: Solomon worksheets

Existing website topic: `2iec/Pure Chapt 01 Quadratics/`.
Shared local sources: `Source Files/2iec/Pure Chapt 01 Quadratics/`.

| File | Role and exact source references |
|---|---|
| `C1 Algebra - Questions.pdf` | Solomon Press question worksheets; Worksheet E is on PDF page 8; Worksheet J contains the discriminant exercise used by the existing quiz |
| `C1 Algebra - Answers.pdf` | Matching Solomon Press worked answers; Worksheet E Exercise 6 is on PDF page 13, headed Answers - Worksheet E, page 3 |
| `Source Files/2iec/C1 INDEX.pdf` | Supplied index for locating Pure material; not a substitute for the question and worked-answer PDFs |

For Solving Equations, use Worksheet E Exercise 6(a)–(l), not a textbook
Exercise 2E. Preserve the worksheet letter and question-part labels. For
Discriminant Quiz, the existing page uses Worksheet J Question 6(a)–(j).

## Current quiz coverage

| Quiz | Source | Included source questions |
|---|---|---|
| Solving Equations | Solomon C1 Algebra, Worksheet E | Exercise 6(a)–(l), 12 question cards |
| Discriminant Quiz | Solomon C1 Algebra, Worksheet J | Question 6(a)–(j), 10 question cards |
| Quiz 1 - Exercise 2A | Edexcel M1, Exercise 2A | 1, 3, 5, 7, 9, 10, 13, 14, 15, 16 |
| Quiz 2 - Exercise 2B | Edexcel M1, Exercise 2B | 1, 3, 5, 6, 8, 10, 12, 14, 15, 16 |
| Quiz 3 - Exercise 2C | Edexcel M1, Exercise 2C | 1, 2, 4, 6, 8, 10, 11, 12, 15, 16 |

Each Mechanics quiz has exactly 10 cards, including easier and harder items
across the full 16-question exercise. Multipart questions remain one scored
card containing all selected parts. Keep this mixed-range policy for future
fixed-count selections unless the user specifies an exact range.

Generated quizzes use `quiz-data.json` and the shared renderer. Discriminant
Quiz is an existing hand-authored page, not an automatically migrated JSON
quiz. The old `2iec/quadratics-quiz/index.html` is a compatibility redirect to
the named Discriminant Quiz under the Pure chapter; do not create a second quiz
there or remove the redirect without considering existing links.

## Verification and provenance rules

1. Identify subject and source family before selecting any questions.
2. Record exact local files, textbook chapter or worksheet, exercise, question
   numbers/parts and one-based question/solution PDF pages in the quiz metadata
   and each `source_ref`. A document's repeated printed Page 1 of 1 is not its
   PDF page number.
3. Use `scripts/extract-pdf-text.sh` for local extraction. Render scanned or
   ambiguous source pages and inspect them visually. Keep scratch extraction
   outside the public website and preserve source PDFs unchanged.
4. Independently solve every question and compare it with the matching worked
   answer. Record source errors and added assumptions in the teacher review;
   do not silently guess or copy an erroneous step.
5. Use `scripts/validate-quiz-data.sh` and `scripts/render-quiz.py`. Keep authored
   content in JSON and regenerate HTML after content changes. Keep each teacher
   review synchronised with the current questions, choices and working.
6. Maintain class → topic → quiz navigation and relative back links, encoding
   spaces in link targets. Check both content and navigation before release.
7. Record teacher approval, source-specific reproduction permission,
   publication authorisation, deployment and browser/classroom tests as
   separate facts. Do not let a successful data check imply a browser test.

The detailed methods are in `docs/worksheet-quiz-build-method.md` and
`docs/mechanics-quiz-build-notes.md`. Explicitly requested original content uses
`docs/original-quiz-build-method.md` and `source_ref: "Original"`; it must not be
mislabelled as coming from either source family. The 6iec fraction quizzes are
original questions, not M1 or Solomon exercises.

## Publication and permissions record

| Published date | Release | Commit | Recorded checks |
|---|---|---|---|
| 13 October 2026 | 2iec Solving Equations and its navigation/workflow | `08624c1` | 12 complete solution sets and options verified; data, generated page and navigation checked; deployment succeeded and live pages matched the release |
| 13 October 2026 | All three 2iec Mechanics quizzes and navigation/workflow | `b30bef0` | 30 complete multipart answer sets and options verified; data, generated pages, script parsing and navigation checked; deployment succeeded and live pages matched the release |

The user confirmed public reproduction permission separately for the supplied
Solomon Pure questions/worked answers and for the supplied Pearson Mechanics
questions/worked solutions. Teacher approval and publication authorisation were
recorded for the Mechanics quizzes. Keep the source copyright notices and do
not expand these recorded approvals automatically to new question sets,
different books or other supplied chapters.

Browser visual rendering, keyboard and interactive behaviour checks remain
pending because no browser connection was available during these builds.
Classroom testing has not occurred. Successful publication and direct live-page
content checks do not change those outstanding statuses.

Source PDFs and extracted text remain local and are excluded from quiz
commits. After future publication, update the relevant build notes and teacher
review with the actual release date and commit, and update this register if
sources, coverage, permissions or verification status change.
