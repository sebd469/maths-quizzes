# Prompt: review a quiz

Read `AGENTS.md` and `docs/quiz-template-reference.md`. Review the named quiz
against its source worksheet and answer key.

For 2iec, check `docs/2iec-source-reference.md`: Mechanics must match the
Edexcel M1 book and its Solutionbank, while Pure must match the Solomon Press
worksheets and their worked answers, unless the user specified another source.
Verify both the source family and the exact chapter/worksheet, exercise,
question parts and PDF page references; similar filenames are not sufficient.

For supplied worksheets, follow `docs/worksheet-quiz-build-method.md`. Check
the exact worksheet/exercise/part range and both PDF page references. Visually
verify fraction grouping, powers and signs against the source pages; extracted
text alone is not enough. Verify that worked solutions follow the matching
answer-key steps without copying an error or hiding an added assumption.
For equation-solving quizzes, require the complete real solution set, retain
zero roots, take both signs of square roots, and exclude original denominator
zeros. Review each distractor as a whole answer set, not just individual roots.

For original questions with no supplied sources, use `source_ref: "Original"`
and verify answers independently instead of expecting an external worksheet
or answer key. Check the requested topic counts and difficulty assumptions.
Review the teacher copy in the matching source folder. Keep the quiz in draft
when teacher approval or browser testing is outstanding; do not publish before
the user's requested review is complete.

Under the standing instruction in `AGENTS.md`, explicit teacher approval of
the current quiz also authorises its commit, push and publication, unless the
user states otherwise. Do not request separate release approval after that
confirmation. Check and record the approval date, limit the release to the
approved quiz's related changes, resolve genuine blockers, verify deployment,
and keep unperformed browser/classroom checks marked as pending.

- Check that a new quiz follows
  `<class>/<chapter, unit or topic>/<quiz name>/index.html`, with matching
  agreed names in folders, menu labels and page headings.
- Check that quiz-specific sources follow the same hierarchy under
  `Source Files/`. Shared source PDFs may remain at the matching chapter, unit
  or topic level; verify their recorded locations and avoid duplicates.
- Check navigation from the main menu to class, topic and named quiz, plus
  back links at each level. Check relative links and URL-encoded spaces after
  folder renames. Flag missing or broken menus and links.
- Confirm that source PDFs, extracted text and unrelated local changes are
  excluded from any proposed quiz commit.
- For a mixed selection, verify the exact question count, coverage across the
  full exercise and inclusion of later challenge questions. Check all parts
  of multipart answers together and record the source-number selection.
- For mechanics, check signs, units, constant-acceleration assumptions for each
  stage, both crossings after a turn, distance versus displacement, delayed
  launch times, speed ratios versus height ratios, and final rounding.
- Check that every requested source part appears once and is transcribed
  accurately.
- Solve every question independently. Compare the result with the answer key
  and the quiz's correct option index.
- Check the reasoning in each worked solution, especially signs, endpoints,
  strict versus inclusive inequalities, and domain restrictions.
- Check that each question has plausible distinct options and exactly one
  defensible correct choice unless the question explicitly requires otherwise.
- Test unanswered, correct, incorrect, locked-after-check, score, and reset
  behavior in a browser.
- Require the standard **Send result to Mr D** feature on every new quiz,
  supplied by the shared template and assets. Verify that names/classes are
  optional for practice, sending requires all questions checked and an explicit
  click, and reset clears identity and submission state. Local previews must
  explain that sending is disabled rather than show a verification failure.
- Before release, verify the new quiz's exact path, title and question count in
  `cloudflare/quiz-results/quizzes.mjs` and deploy that approved registry to the
  Worker. After publication, test a fictional submission, matching notification
  and private CSV row. Record actual results; do not infer success from another
  quiz's test or publish any pupil data or private credentials.
- Run `scripts/validate-quiz-data.sh` when structured quiz data is available.
- Separate verified defects from questions requiring teacher judgement.
- Check publication-rights concerns; do not infer permission from local access
  to a PDF.

Report findings by question ID, then folder/navigation findings, validation and
any remaining decisions.
Do not silently rewrite content or claim approval.
