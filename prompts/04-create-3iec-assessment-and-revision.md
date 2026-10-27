# Create a 3iec assessment and its revision quizzes

Read `AGENTS.md`, `docs/3iec-assessment-workflow.md` and
`docs/quiz-template-reference.md`. Preserve existing assessments, quizzes,
source files and unrelated worktree changes.

## Brief

- Assessment number: 2
- Four topics, in order: [teacher supplies]
- Exclusions, syllabus/tier and difficulty: [teacher supplies or establish]
- Time and calculator policy: [confirm; Assessment 1 was 60 minutes/calculator]
- Total marks and topic weighting: [agree; do not copy Assessment 1's 63 by default]
- Quiz lengths: [agree or state reasonable assumptions]
- Sources/files/links: Past Paper Penguin; IGCSE questions by topic; Corbettmaths
- Publication/review: [local teacher-review draft unless explicitly instructed otherwise]
- Private Git backup requested: [yes/no]

## Deliver

1. A student PDF and a separate teacher mark-scheme PDF in `3iec/Assessments/`,
   clearly numbered for this assessment, with no changes to earlier PDFs.
2. Four revision quizzes under `3iec/Assessment 2 Revision Quizzes/`, one per
   topic in the supplied order, matching the existing 2iec behaviour and style.
3. Local source and review records under `Source Files/3iec/Assessment 2/` and
   matching quiz folders under `Source Files/3iec/Assessment 2 Revision Quizzes/`.
4. A reproducible assessment generator and a record of actual checks and
   unresolved teacher decisions.

Find the actual source resources and matching answers. Record exact URLs or
local files, PDF pages and question/answer parts, plus provider, board/paper
where identifiable and permission scope. Do not invent the provider intended
by "IGCSE questions by topic". Preserve sources unchanged. Independently solve
every item; flag ambiguous questions or source-key errors. Clearly distinguish
official source allocations from proposed teacher allocations.

The paper should balance all four topics, with question/part numbers, marks,
working space and page numbers. Use A4 for a newly composed paper; preserve
the supplied page layout and spacing if reformatting an assembled paper.
The teacher PDF starts with concise answers, followed by worked solutions and
mark allocations. Check the total against every printed part mark and render
and visually inspect every final page of both PDFs.

Revision quizzes must use different questions from the assessment. Include
easier and harder practice, four distinct options and complete worked solutions.
Use verified source questions when requested; label original material honestly
when authorised. Validate JSON, render through the shared template, check all
maths and links and test the complete student flow in a browser.
Every new revision quiz must also include the shared **Send result to Mr D**
feature. Follow `docs/quiz-results-setup.md`: keep submission optional, retain
local-preview handling, and include the new quiz metadata in the approved
Worker registry deployment before publishing. Check a fictional online result
and its matching email/CSV record after release.
For trigonometry, include a labelled diagram with every question, showing only
given values and the target quantity. Check right/acute/obtuse geometry, labels,
accessible descriptions and mobile readability.

Keep assessment PDFs and keys private. If backup is requested, verify and use
`sebd469/maths-assessments-private`; never commit them to the public quiz repo.
Public quiz reproduction requires appropriate source rights. Follow the current
teacher-review/release instruction for this assessment; Assessment 1's prior
publication authorisation does not approve a new cycle. When authorised, publish
the quizzes in order and verify every live page. Keep sources, local teacher
notes, assessment generators with confidential content and unrelated files out
of the public release.
