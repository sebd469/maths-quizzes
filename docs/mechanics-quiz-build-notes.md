# Mixed-difficulty mechanics quizzes

Prepared on 13 October 2026 using the existing question-data contract,
`scripts/extract-pdf-text.sh`, `scripts/validate-quiz-data.sh`,
`scripts/render-quiz.py` and `templates/quiz-page.template.html`.

## Exact request and selection

Create three quizzes with exactly 10 questions each, using Exercise 2A for
Quiz 1, Exercise 2B for Quiz 2 and Exercise 2C for Quiz 3. The user specifically
requested a mix across the full range, including the harder later questions,
not Questions 1–10.

Each source exercise has 16 numbered questions. Keep each selected source
question as one scored card, including all its subparts in one complete-answer
option. Preserve original source numbers instead of renumbering the selection.

| Quiz | Selected source questions | Coverage |
|---|---|---|
| Quiz 1 - Exercise 2A | 1, 3, 5, 7, 9, 10, 13, 14, 15, 16 | Basic velocity/deceleration, unit conversion, multistage motion, time ratios |
| Quiz 2 - Exercise 2B | 1, 3, 5, 6, 8, 10, 12, 14, 15, 16 | Squared-speed equations, quadratic times, return crossings, total distance, delayed-start meeting |
| Quiz 3 - Exercise 2C | 1, 2, 4, 6, 8, 10, 11, 12, 15, 16 | Gravity basics, raised launch points, time above a height, rebound heights, delayed-launch collision |

Group questions in ascending source order, with Foundation, Intermediate and
Challenge headings. These are authoring judgements, not official source labels.
Every quiz includes source Question 16 and several questions numbered 11–15.

## Sources and exact locations

Keep shared PDFs unchanged under
`Source Files/2iec/Mechanics Chapt 01 SUVAT/`:

- `M1 chapter 1 exercises.pdf`: mostly scanned textbook pages. Exercise 2A is
  on PDF pages 9–10, Exercise 2B on pages 15–17, and Exercise 2C on pages 23–24.
- `Solutions chapter 01.pdf`: the corresponding Heinemann Solutionbank. Its
  headings use Exercise A, B and C, and its internal references identify these
  as chapter 2 exercises. Record each question's solution PDF page(s), not
  merely the document's repeated printed “Page 1 of 1” label.

The supplied filenames and existing folder refer to chapter 1, while the
textbook calls this Chapter 2, Kinematics of a particle moving in a straight
line. Preserve the user's existing `Mechanics Chapt 01 SUVAT` hierarchy and
record this distinction instead of silently renaming or relocating sources.

Text extraction alone is insufficient for the question PDF. Render and inspect
the relevant pages; use the repeated question statements in the solution PDF
as an additional cross-check, not as a reason to skip the textbook pages.
Retain an exact question and solution page reference in every `source_ref`.

## Mechanics-specific verification

- Model motion with constant acceleration only over each applicable stage.
- Define a positive direction, distinguish speed from signed velocity, and use
  a positive magnitude for a requested deceleration.
- Convert km/h to m/s before substituting into SI equations. Convert back only
  when the requested answer is in km/h.
- Retain both positive crossing times after a turning point where applicable.
  Reject negative elapsed times; check whether time is measured from the first
  or second particle's start.
- Separate total distance from signed or net displacement. Split a return
  journey at its turning point.
- For delayed starts, use `t − delay` for the second particle and state the
  valid time interval. Check that both positions agree at the selected time.
- For gravitational motion, use `g = 9.8 m/s²` and negligible air resistance.
  At maximum height velocity is zero, not acceleration.
- For rebounds, a speed ratio of `3/4` gives a height ratio of `(3/4)^2`, not
  `3/4`. Carry full precision through successive rebounds.
- Retain full precision in multistage calculations, roots and collision times.
  Round only final numerical answers. Quiz 3 uses 2 significant figures;
  Quiz 2 Q10(b) and Q15(b) use 3 significant figures, following the key.
- Check each entire multipart answer option, not only its first quantity.
  Reject equivalent options even when they use different numerical notation.

## Recorded source discrepancy

Exercise 2C Q12, solution PDF page 48, gives the quadratic
`4.9t² − 24.5t + 21 = 0` but prints denominator `2 × 9.8` in the following
quadratic formula. The correct denominator is `2 × 4.9 = 9.8`. Its stated
crossing times and final duration 2.8 s agree with the corrected denominator.
The quiz uses the correct working and flags the source typo in its teacher
review; it does not silently reproduce or silently conceal the error.

For 2A Q16(a), adapt “show that t1/t2 = 2/3” to selecting the ratio rather than
printing the result in a multiple-choice prompt. Retain the full proof in the
worked solution. The other selected subparts remain intact.

## Files and release state

Each quiz lives at
`2iec/Mechanics Chapt 01 SUVAT/<quiz title>/quiz-data.json`, with generated
`index.html` beside it. Matching `teacher-review.md` files are under
`Source Files/2iec/Mechanics Chapt 01 SUVAT/<quiz title>/`.
The 2iec menu links to a new mechanics chapter menu, which links to all three
quizzes. All quiz back links return to that chapter.

Check all 30 answers independently against the source solutions, including
multipart results, signs, SI conversions, quadratic roots and rounding. Run
the existing validator and renderer for each dataset, verify generated-page
consistency, and check forward/back navigation. Record browser rendering and
interaction checks separately; code or data checks do not substitute for them.

Release approval: the teacher approved all three quizzes and requested their
commit and publication on 13 October 2026. The user separately confirmed
permission to publish these Pearson mechanics questions and worked solutions
publicly; the solution PDF carries © Pearson Education Ltd 2008. Draft notices
were removed following this approval.

All 30 complete answer sets pass independent mathematical checks, including
rounding, units, return crossings and delayed starts. The datasets pass the
repository validator; generated pages match their data and shared template,
their scripts parse successfully, and forward/back navigation resolves.
Browser rendering, keyboard and interaction checks remain pending because no
browser connection is available. Classroom testing has not occurred. These
outstanding checks must not be represented as completed.
